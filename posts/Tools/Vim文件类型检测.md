---
layout: post
title: Vim文件类型检测
codeName: vim-filtetype-detect
author: Ghost
date: 2017-02-30T07:03:47.149Z
---

文件类型检测是实现语法高亮，语义补全以及其他一系列功能的基础。本文将简单讨论`vim`是如何得到一个文件的类型并加载相关插件的。

首先需要注意, 此处**文件类型**并不是 **文件扩展名**，在绝大多数情况下，扩展名到文件类型是一个`"满射"`而非`"单射"`。

## 步骤1:加载filetype.vim

让vim实现类型检测的必要条件是在 `vimrc` 里开启 `filetype` 选项。开启该选项将使Vim在特定位置加载 `filetype.vim`

    Detail: The ":filetype on" command will load one of these files:
            Amiga      $VIMRUNTIME/filetype.vim
            Mac    $VIMRUNTIME:filetype.vim
            MS-DOS      $VIMRUNTIME\filetype.vim
            RiscOS      Vim:Filetype
            Unix        $VIMRUNTIME/filetype.vim
            VMS        $VIMRUNTIME/filetype.vim

## 步骤2:加载XXX.vim

`filetype.vim`中较为关键的内容如下

        exe 'runtime! ftplugin/' . name . '.vim ftplugin/' . name . '_*.vim ftplugin/' . name . '/*.vim'

如果`$RUNTIMEPATH`文件夹下有多个`ftplugin`文件夹，则所有文件夹中特定的`.vim`都会被执行。
例如c语言的语法高亮就是在`/usr/share/vim80/ftplugin/c.vim`中进行定义的。
而观察`/usr/share/vim80/ftplugin/cpp.vim`可知`c++`的语法高亮和`c`语言应该一致,其中有如下定义

    " Behaves just like C
    runtime! ftplugin/c.vim ftplugin/c_*.vim ftplugin/c/*.vim
