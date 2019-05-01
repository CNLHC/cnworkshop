---
layout: post
title: 使用doxygen撰写设计文档Tips
codeName: doxygen-using-tips
author: CNLHC
date: 2017-09-15T07:03:47.149Z
---

`doxygen` 1.8之后的版本可以识别`markdown`语法. 它在标准 markdown 语法的语法上进行了一定的修改.

`doxygen` 命令可以解析配置目录里的以`md`或`markdown`结尾的文件，并处理其中的特殊语法和引用关系。

## 不同Markdown文件间的交叉引用

实现不同文件间引用需要先对各 `markdown` 文件进行索引。

如果不显式的申明，doxygen会自动将文件名或者一级标题名作为引用标签。

也可以用如下方法在标题处显式的声明标签索引

    Header 1                {#labelid}
    ========

参见[官方文档中的例子](https://www.stack.nl/~dimitri/doxygen/manual/markdown.html#md_header_id)
