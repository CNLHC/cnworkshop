---
layout: post
title: 使用vim检测目录中是否存在特定文件
codeName: vim-detect-specific-files
author: CNLHC
date: 2017-04-12T07:03:47.149Z
---

本文讨论的"检测"包括两个层面

1. 判断某文件是否在硬盘上存在
2. 判断当前打开的文件是什么类型

## 判断文件是否存在

如果在一个工程文件夹中存在一个Makefile文件，在打开该项目中的一个`.c`文件后我们可能会
希望原本绑定了其他命令的快捷键`<F5>`自动拥有别的行为，例如执行

    :make

可以通过探测`Makefile`文件是否存在实现该功能

方法1:使用VIMSCRIPT自带的`filereadable()`函数

    :function! SomeCheck()
    :   if filereadable("Makefile")
    :       echo "SpecificFile exists"
    :   endif
    :endfunction

方法2:使用VIMSCRIPT自带的`empty()`函数

    :if !empty(glob("path/to/Makefile"))
    :   echo "File exists."
    :endif

方法2在处理路径上更加灵活。

## 判断文件的具体类型

vim自带文件类型检测功能(确保选项 `:filetype on` 已经打开), 但支持的格式有限。

要尝试某个扩展名是否能被vim自动检测，可以打开该扩展名的文件，然后在vim中执行

    :set ft

例如在编辑`a.md`时使用该命令，VIM回显

    filetype=markdown

如果某特定扩展名的文件类型不被vim所支持，那么可以结合`autocmd`的技术扩展vim支持的文件类型。
例如`*.ioc`文件为STM32CubeMX生成的项目描述文件，并不能被vim自动识别。我们可以在用户的vimrc中添加如下配置来实现自动将ioc文件的filetype设置为`STM32CubeMX`

    au BufRead,BufNewFile *.ioc set filetype=STM32CubeMX
