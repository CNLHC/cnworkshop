---
layout: post
title: vim根据文件类型加载配置文件
codeName: vim-load-confg-file-by-filetype
author: CNLHC
date: 2017-03-15T07:03:47.149Z
---

随着要处理的文件种类增多, 面对各种各样需要经常执行的Tool chains, `Vim` 的快捷键显得不够用了。需要想办法让Vim在打开不同类型的文件时，自动加载不同的快捷键。

## 一种可行的方案

使用`autocmd`特性，在vimrc中加入

    au BufReadPre *.c source $HOME/.vim/profile/Shortkey/HotKey_YcmGoto.vim

BufReadPre的触发条件是

    |BufReadPre|  starting to edit a new buffer, before reading the file

可以满足需求。此外，某些其他的autocmd触发条件也可以实现相同的功能。

## 另一种可行的方案

使用`ftplugin`特性。在启动时，VIM会自动扫描`$VIMRUNPATH`这个环境变量下的所有`ftplugin`文件夹，并加载其中和filetype相关的配置文件(如果存在的话).
可以在`$HOME/.vim`这个目录下(`$VIMRUNPATH`的一部分)建立一个名为`ftplugin`的文件，并把相应的配置文件丢进去。
