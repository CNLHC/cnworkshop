---
layout: post
title: YouCompleteMe通过ctags文件补全
codeName: youcompleteme-complete-by-ctags
author: CNLHC
date: 2017-05-05T07:03:47.149Z
---
## 要点

### ctags的版本

输入`ctags --version`后，应该看到类似的输出

    Exuberant Ctags 5.9~svn20110310, Copyright (C) 1996-2009 Darren Hiebert

YCM仅仅支持`Exuberant Ctags`(MAC下默认是`Plain Ctags`)

### 编译时的选项

生成ctags时，务必添加源文件语言信息。即生成ctags时别忘了添加以下选项

    --fields=+l

此外，ctags默认将h文件认为是c++项目，有需要应该手动设置成c项目

    --langmap=c:.c.h

### YCM配置

确定在vimrc中将以下选项打开

    let g:ycm_collect_identifiers_from_tags_files = 1
