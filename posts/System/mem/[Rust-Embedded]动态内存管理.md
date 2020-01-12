---
title: "[Rust-Embedded]动态内存管理-使用alloc和alloc-cortex-m"
codeName: rust-e
date: 2019-12-12T16:46:00.123Z
tags: ["system", "memory", "rust", "embedded"]
---

## 简述

嵌入式环境中，没有操作系统提供内存管理基础设施时,依赖动态数据类型的`rust-std`不可用。

为了使用动态类型，需要自行提供内存管理逻辑, 在`Rust`中可以通过实现`alloc` Crate中的几个接口以为标准库提供运行环境。

## 细节

代码来自某嵌入式开发项目(target STM32H750, armv7架构处理器)，抽取关键部分分析。

首先关掉`std`编译支持，打开一些Rust语言特性. (需要`Nightly Channel`)

```rust
#![no_std]
#![feature(lang_items)]
#![feature(alloc)]
#![feature(global_allocator)]
#![feature(alloc_error_handler)]]
```

定义一个static变量作为堆。注意此时堆还没有初始化。

`alloc-cortex-m`Crate 是为`CORTEX-M`处理器(架构`armv7`)设计的轻量级内存管理器, 由Rust Embedded WG维护, 
本质上是对另一个通用内存分配器
[`linked-list-allocator`](https://github.com/phil-opp/linked-list-allocator)的封装。

```rust 
extern crate alloc_cortex_m;
use alloc_cortex_m::CortexMHeap;

#[cfg(not(test))]
#[global_allocator]
static ALLOCATOR: CortexMHeap = CortexMHeap::empty();
```

定义OOM(Out of Memory)处理函数,用于处理内存不足时的情况.

```rust
#[cfg(not(test))]
#[alloc_error_handler]
fn my_example_handler(layout: core::alloc::Layout) -> ! {
    ...
    panic!("memory allocation of {} bytes failed", layout.size())
}
```

在合适的地方初始化堆。

```rust
use super::ALLOCATOR;
#[no_mangle]
pub extern fn construct(begin:*mut u8, size: usize) -> *mut BC26<'static> {
    unsafe {
        let start = begin as usize;
        ALLOCATOR.init(start,size) ;
    }
    ...
}
```

上述`construct`函数在外部c程序中调用。如下，在C程序中为rust分配了 2KBytes 的堆空间。

```c
char BC26Heap[2048];
...
int main(){
    ...
    BC26 * bc26Obj = construct(BC26Heap,2048);
}
```

完成上述步骤后，就能使用需要动态内存支持的设施了。 由于无`std`,所以使用时需要从`alloc` Crate中引入。
`alloc`中包括了动态数据结构(`String`,`Vec`, `binary_heap`,`btree_map`,`btree_set`,`linked_list`,`vec_deque`), `format!`宏, `Box`等基础工具，接口和`std`完全一致。

## 简单测试


### 动态内存分配

rust 代码
```rust
#[no_mangle] 
pub extern fn heap_test() -> * const u8{
    let hello3 =  Box::new(String::from("again,hello"));
    unsafe {(*Box::into_raw(hello3)).as_ptr()} 
}
```

c++代码
```cpp
  BC26 * bc26Obj = construct(BC26Heap,150);
  print_pointer("HeapHead",BC26Heap);
  while (1) {
	  uint8_t * instance = heap_test();
	  print_pointer("Boxed",instance);
  }
```

测试输出
```
HeapHead:0x20000230
Boxed:0x20000230
Boxed:0x20000248
Boxed:0x20000260
Boxed:0x20000278
panic: OOM 
```

堆空间大小150Bytes。 只分配，不回收，第四次分配时OOM.


### 动态内存分配+回收

rust 堆内存分配
```rust
#[no_mangle] 
pub extern fn heap_test() -> * const u8{
    let hello3 =  Box::new(String::from("again,hello"));
    unsafe {Box::into_raw(hello3) as * const u8} 
}
```

rust 堆内存回收.

这里的回收比较trick。虽未显式调用`free`或`dealloc`函数，但是内存释放确实发生了。
秘密在于`from_raw`将指针的所有权传递给了boxed对象。
函数返回时，boxed对象生命周期结束，由于其实现了`Drop Trait`,内存得以释放。

```rust 
#[no_mangle] 
pub extern fn heap_free(ptr: * mut u8) {
    unsafe{
        let boxed = Box::from_raw(ptr as * mut String);
    };
 }
```

c++ 代码

```cpp
  print_pointer("HeapHead",BC26Heap);
  while (1) {
      sleep(1000);
	  uint8_t * instance = heap_test();
	  print_pointer("Boxed",instance);
	  heap_free(instance);
  }
```

输出结果

```
HeapHead:0x20000230
Boxed:0x2000023c
Boxed:0x2000023c
Boxed:0x2000023c
Boxed:0x2000023c
```

得到了期望中的结果: 每次都分配了相同的堆地址。

至于为什么是0x2000023c 而不是0x2000230..大概是Box的特性?
下面打出了free前的堆内存, 可见`Box::into_raw(hello3)`实际上返回了Box指向的堆空间的尾部（而非头部）.

```
0x20000230 : 0x20000230 
  Address            0 - 3     4 - 7     8 - B     C - F               
  0000000020000210  00000000  00000000  00000000  30020020          
  0000000020000220  C8000000  00000000  48020020  94D30000          
  //here            a g a i   n , h e   l l o 70  00
  0000000020000230  61676169  6E2C6865  6C6C6F70  30020020          
  0000000020000240  0B000000  0B000000  B0000000  00000000          
  0000000020000250  426F7865  643A3078  3233300D  426F7865          
  0000000020000260  643A3078  41303030  30323363  0A000000          
```
                                    

## 其他

### 对接 c 中的

实际上，即使是单片处理器嵌入式环境, 也存在可用的内存分配解决方案。

1. `newlib`(嵌入式版`libc`): 提供和`libc`类似的`malloc`/`free`接口。
2. `FreeRTOS`: 嵌入式操作系统, 提供了`heap1`到`heap5`五种内存管理设施。 

也许使用FFI对接现有的方案, 也是在rust-embedded中实现动态类型一个选择.

### 奇怪的命名

在标准rust里，`alloc`是在`std`命名空间下的; 
但是嵌入式rust 里，不知为何 `alloc` 和 `core`平级，难道不应该是 `core::alloc`吗 🤔?
