---
title: "[Redis-源码分析]-过期机制"
codeName: how-redis-expire-work
date: 2019-12-12T16:46:00.123Z
tags: ["system", "db", "kv", "redis"]
---

## 相关命令

Redis 中和过期相关的命令包括

1. `EXPIRE`: 设置某 Key 在特定时间后过期
2. `EXPIREAT`: 设置某 Key 在某时间戳时过期
3. `PEXPIRE`: 同 EXPIRE, 单位不同
4. `PEXPIREAT`: 同 EXPIREAT, 单位不同
5. `TTL`: 查询一个 Key 的剩余寿命
6. `PTTL`: 同 TTL,单位不同
7. `PERSIST`: 移除一个 Key 的生命周期标记,让它永不过期
8. `TOUCH`: 更改一个 Key 的最后访问时间

实际上只有四个命令, `EXPIRE`,`TTL`,`PERSIST`,`TOUCH`. 其余都是语法糖。

## 代码分析

### TOUCH

`TOUCH`在输入 Key 上执行一次读操作来刷新 Key 的访问时间.

```c
void touchCommand(client *c) {
    int touched = 0;
    for (int j = 1; j < c->argc; j++)
        if (lookupKeyRead(c->db,c->argv[j]) != NULL) touched++;
    addReplyLongLong(c,touched);
}
```

沿着 call path 往下走几层可以找到更新访问时间的代码片段。
除了超时机制外，redis 还要跑缓存替换算法，所以记录每个 Key 的访问时间是必不可少的。

```c
{{path=src/db.c line=60-70}}

/* Update the access time for the ageing algorithm.
    * Don't do it if we have a saving child, as this will trigger
    * a copy on write madness. */
if (!hasActiveChildProcess() && !(flags & LOOKUP_NOTOUCH)){
    if (server.maxmemory_policy & MAXMEMORY_FLAG_LFU) {
        updateLFU(val);
    } else {
        val->lru = LRU_CLOCK();
    }
}
```

### PERSIST

先判断 Key 是否存在，如果存在则调用`removeExpire`删除

```c
/* PERSIST key */
void persistCommand(client *c) {
    if (lookupKeyWrite(c->db,c->argv[1])) {
        if (removeExpire(c->db,c->argv[1])) {
            addReply(c,shared.cone);
            server.dirty++;
        } else {
            addReply(c,shared.czero);
        }
    } else {
        addReply(c,shared.czero);
    }
}
```

`removeExpire`内执行删除逻辑。从代码可以看出 redis 在内部维护了一张 HashTable,用于存储 Key 的生命周期信息。 `removeExpire`实际上在删除
这张散列表中的 Key

```c
{{path=src/db.c line=1141-1146}}

int removeExpire(redisDb *db, robj *key) {
    /* An expire may only be removed if there is a corresponding entry in the
     * main dict. Otherwise, the key will never be freed. */
    serverAssertWithInfo(NULL,key,dictFind(db->dict,key->ptr) != NULL);
    return dictDelete(db->expires,key->ptr) == DICT_OK;
}
```

### TTL

TTL 命令的入口首先检查 Key 是否存在,然后在`getExpire`中执行查询逻辑。

```c
/* Implements TTL and PTTL */
{{path=src/expire.c line=554-564}}

void ttlGenericCommand(client *c, int output_ms) {
    long long expire, ttl = -1;

    /* If the key does not exist at all, return -2 */
    if (lookupKeyReadWithFlags(c->db,c->argv[1],LOOKUP_NOTOUCH) == NULL) {
        addReplyLongLong(c,-2);
        return;
    }
    /* The key exists. Return -1 if it has no expire, or the actual
     * TTL value otherwise. */
    expire = getExpire(c->db,c->argv[1]);

```

`getExpire`负责从内部散列表中取出超时相关信息，计算并返回剩余寿命. 当 Key 即将过期与永不过期都会返回-1.

```c
{{path=src/db.c line=1168-1179}}

long long getExpire(redisDb *db, robj *key) {
    dictEntry *de;

    /* No expire? return ASAP */
    if (dictSize(db->expires) == 0 ||
       (de = dictFind(db->expires,key->ptr)) == NULL) return -1;

    /* The entry was found in the expire dict, this means it should also
     * be present in the main dict (safety check). */
    serverAssertWithInfo(NULL,key,dictFind(db->dict,key->ptr) != NULL);
    return dictGetSignedIntegerVal(de);
}
```

### EXPIRE

包括`EXPIRE`, `PEXPIRE`, `EXPIREAT`, `PEXPIREAT` 在内的四个命令入口都是`expire.c`中的`expireGenericCommand`函数.

```c
{{path=src/expire.c line=508-529}}

if (when <= mstime() && !server.loading && !server.masterhost) {
    robj *aux;

    int deleted = server.lazyfree_lazy_expire ? dbAsyncDelete(c->db,key) :
                                                dbSyncDelete(c->db,key);
    serverAssertWithInfo(c,key,deleted);
    server.dirty++;

    /* Replicate/AOF this as an explicit DEL or UNLINK. */
    aux = server.lazyfree_lazy_expire ? shared.unlink : shared.del;
    rewriteClientCommandVector(c,2,aux,key);
    signalModifiedKey(c->db,key);
    notifyKeyspaceEvent(NOTIFY_GENERIC,"del",key,c->db->id);
    addReply(c, shared.cone);
    return;

} else {
    setExpire(c,c->db,key,when);
    addReply(c,shared.cone);
    signalModifiedKey(c->db,key);
    notifyKeyspaceEvent(NOTIFY_GENERIC,"expire",key,c->db->id);
    server.dirty++;
    return;
}
```

该函数的核心逻辑有两条执行路径。if 中有三个条件

1. `when<=mstime()`: 假如设置了负的过期时间（或是过去的时间戳）时满足
2. `!server.loading`: 和 redis aof 特性相关，当前没有从磁盘加载文件时满足
3. `!server.masterhost`: 和 redis 集群模式相关, 当前 redis 工作在从模式下满足

假如一个 Slave 结点上的 Key 需要立即被过期，且没有在加载 AOF 文件时，那么就执行 if 分支中的代码，直接删除/Unlink 该Key,
否则执行 else 分支中的代码,通过 `setExpire`设置内部散列表,`notifyKeyspaceEvent`启动 hooks 调用...

此处可以参看一下
[redis 官方文档](https://redis.io/commands/expire#how-expires-are-handled-in-the-replication-link-and-aof-file).

> However while the replicas connected to a master will not expire keys independently (but will wait for the DEL coming from the master), they'll still take the full state of the expires existing in the dataset, so when a replica is elected to master it will be able to expire the keys independently, fully acting as a master.

Slave结点确实会保存所有和 expire 相关的信息，当从结点被选举为主结点后，可以独立的完成过期一个 key 的操作。


## Redis中的过期机制


### 被动过期

每次在读取一个key前，redis都会检查该key是否过期，如果过期了就删除它。

TODO: 这个流程还没那么Trivial，有空分析一下。入口从Touch命令那儿找就可以.

### 主动过期

除了被动过期外，redis还有一套主动过期的机制。

运行时，每100ms redis都会随机检查20个key，主动检查他们是否过期。
如果某次主动检查中,发现超过四分之一的key过期了，就将重复的操作立即再执行一遍。

主动过期的意义在于减少内存占用。


TODO: 看一看主动过期的代码
