---
layout: post
title: vim编译笔记
codeName: vim-compile-note
author: CNLHC
date: 2016-12-15T07:03:47.149Z
---

## *NIX平台

### 相关插件支持

`+python`特性至关重要.许多必备的插件，例如`YouCompleteMe`都依赖vim对`python`的支持。

    --enable-pythoninterp --with-python-config-dir=/usr/lib/python2.7/config-x86_64-linux-gnu/

注意不要同时打开`python`和`python3`选项，同时打开两个选项有时好像会造成问题。

### 系统剪切板交互

`+clipboard`特性最重要的功能是使终端下的VIM获得直接和系统剪切板交互的能力(使用`"+p\d`)
参考源代码目录内的`src/features.h`,其中有如下语句

```C
    #ifdef FEAT_GUI
    # ifndef FEAT_CLIPBOARD
    #  define FEAT_CLIPBOARD
    #  ifndef FEAT_VISUAL
    #   define FEAT_VISUAL
    #  endif
    # endif
    #endif
    #if defined(FEAT_NORMAL) && defined(FEAT_VISUAL) \
                && (defined(UNIX) || defined(VMS)) \
                && defined(WANT_X11) && defined(HAVE_X11)
    # define FEAT_XCLIPBOARD
    # ifndef FEAT_CLIPBOARD
    #  define FEAT_CLIPBOARD
    # endif
    #endif
```

可以推知编译需要添加以下参数的支持

    --enable-gui --with-x --with-features=huge

此外实践中发现，还需要安装如下依赖项

```sh
    sudo apt install libgtk2.0-dev libx11-dev libxt-dev
```

### 最终编译配置命令

```sh
    ./configure  \
    --with-features=huge  \
    --enable-rubyinterp  \
    --enable-perlinterp  \
    --enable-gui=gtk2  \
    --enable-cscope  \
    --enable-luainterp  \
    --enable-perlinterp  \
    --enable-multibyte  \
    --enable-python3interp  \
    --with-python3-config-dir=/usr/lib/python3.6/config-3.6m-x86_64-linux-gnu  \
    --with-x \
    --prefix=/usr \
```