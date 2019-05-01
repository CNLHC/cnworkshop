---
layout: post
title: VScode 使用WSL Tips
codeName: vscode-using-wsl-terminal
author: CNLHC
date: 2017-06-06T07:03:47.149Z
---
记录一下配置的过程

WSL ([Windows Subsystem for Linux](https://msdn.microsoft.com/en-us/commandline/wsl/about )) 发布已经有些时日了。大概16年底的时候就装机体验过一把。这两天稍稍配置一下,尝试直接在Vscode中调用 WSL终端。

在Vscode的配置文件中配置WSL的bash执行位置。

    "terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe",

注意，路径中**千万不能出现空格**。空格不影响内置终端的使用，但是会导致之后的集成Task会出错。

## 配置Task

一个Task示例。VScode的task功能提供了在windows下一键调用Linux系统工具的配置选项。例如以下配置，可以实现调用Linux中的Graphviz将dot文件编译成图片

    {
        "version": "2.0.0",
        "tasks": [
            {
                "taskName": "build",
                "command": "dot -Tps a.dot -o graph1.ps -Tgif -o graph.gif",
                "type": "shell",
            }
        ]
    }

如果前面设置了集成shell,在配置任务时，可以直接在command属性中写Linux的命令, vscode 会自动以类似于 `bash -c`的方式去执行它。
(Vscode应该在最近不久才更新了Task模块可以直接使用WSL命令的Feature。参考一个Github上的[issue](https://github.com/Microsoft/vscode/issues/6579),通过添加 "version": "2.0.0", 来实现无缝集成的解决方案大概是17年5月才添加的）
