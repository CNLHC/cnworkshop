---
layout: post
title: Docker分步构建时通过缓存提高速度
codeName: Docker-cache-in-multistage-build
author: CNLHC
date: 2019-10-19T23:41:00+8000
tags: ["DevOps", "Docker"]
---

分步构建是一种常见的构建Docker镜像范式, 例如

```Dockerfile

FROM debian:9.0
RUN apt-get update
RUN apt-get install -y vim

WORKDIR /root
COPY hello.c .
RUN gcc -o helloworld hello.c
CMD ["./helloworld"]

```
