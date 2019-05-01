---
title: QtCreator中的QML代码提示
codeName: qtcreator-qml-lint-problem
author: CNLHC
date: 2017-04-22T07:03:47.149Z
---

## 问题

有些情况下，由于QtCreator内置的qml-lint工具某些情况下不能正确的解析源代码结构，会在正确的代码处报错。 此时可以通过加注释来抑制编辑器报错信息。

```qml
    Connections {
        target: dataModel
        // @disable-check M16
        onDataChanged: {...}
    }
```

上述的代码片段,如果不添加 `// @disable-check M16`，`QtCreator`会提示

    error: Invalid property name "onDataChanged". (M16)

此处`dataModel`是一个`cpp`中的类型, 可能由于`qmllint`无法解析cpp中的方法, 导致报错。

此外，qml内置类型也有可能会遇到此问题, 比如`ChartView`:

        ChartView {
            animationOptions: ChartView.NoAnimation
            margins.top:3
            ...
        }

上述的`margins.top:3`会触发下列错误

    error: "margins" does not have members. (M17)

仍然可以通过添加`// @disable-check M16`这句注释来抑制这句错误.

猜测有可能是因为`ChartView`设置的也是cpp中的变量，所以导致`qmllint`无法解析。

## 处理

已经向Qt官方[提交了Bug报告](https://bugreports.qt.io/browse/QTCREATORBUG-20645)

上述添加`//@disable-check`标记抑制错误的方法来自于[CSDN-qml隐藏技——去掉让人烦恼的红色下划线](https://blog.csdn.net/qyvlik/article/details/46823115),尚未找到官方文档记载。

