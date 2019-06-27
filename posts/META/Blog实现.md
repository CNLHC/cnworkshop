---
layout: post
title: Blog实现
codeName: Blog-implementation
author: CNLHC
date: 2019-06-27T17:33:47.149Z
---

本博客的源代码托管在Github [CNLHC/cnworkshop](https://github.com/CNLHC/cnworkshop)

## 技术栈

搭建本博客使用的主要技术包括 `React.js`和`Gatsby`,此外，所有的代码都使用`Typescript`开发。

## Typescript

`Typescript` 是微软公司维护的一个开源项目。它是一个带有强类型支持的编程语言。通过编译器，可以将`Typescript`代码编译成浏览器可以理解的`Javascript`
代码。

使用`Typescript`的一个好处之一是，它可以在编译期就报告一些错误。此外，使用`Typescript` 时，代码补全会变得非常方便。

## JSX与SCSS

不同于传统的直接编写`Html`+`Css`的开发方案，本博客采用 `JSX`语法, 并通过`JS`解释器生成文档DOM对象；采用`scss`来控制页面的样式。


### JSX

`JSX` 本质上是一个Javascript的语法扩展，考虑下列JSX代码

```JSX
    var a=<MyButton color="blue" shadowSize={2}> Click Me </MyButton>
```
其中既有类似于Html的标签，又有Javascript中的变量赋值操作。事实上，上述jsx语句经过编译后，等价于

```js
    var a = React.createElement(
              MyButton,
              {color: 'blue', shadowSize: 2},
              'Click Me'
            )
```
这是一条非常标准的 javascript语句。 `React.createElement`作为一个高阶函数，返回一个调用标准浏览器操作DOM接口的函数。通过这个对象，就可以动态的向
DOM对象中插入节点。

通过JSX的帮助，我们可以非常简单的构造这种模式。

### SCSS

SCSS是一个对CSS的语法扩展。支持一些方便的特性，比如嵌套书写选择器，带有作用域的变量等，可以帮助开发人员提高效率。

## SPA与SSR

可以通过JSX构建一个足够复杂的DOM操作函数，当用户访问服务器时，可以仅给用户返回一个JS文件，客户端浏览器中的JS解释器将完成页面的渲染。
满足这种模式的应用常常被称做SPA（Single Page Application）。

这种模式在有些交互比较密集的场景下会非常有用，它可以提高交互的流畅性。但是SPA也有一些缺点，其中影响最大的是

1. 因为浏览器爬虫获取不到html文件，所以很难做搜索引擎优化。
2. 由于这个Bundle到一起的JS文件通常会比较大，所以首次加载时间会非常长。

为了解决上述两个问题，有人提出了SSR（server side rendering） 技术。顾名思义，这种技术就是将页面在服务端完成渲染，然后在服务器部署静态页面，再给用户返回渲染后的静态页面。

本项目使用 `Gatsby`实现了`React`组件的服务端渲染。


## GraphQL

GraphQL 是一种结构化查询语言。本项目中，用GraphQL结合一些中间件，将网站的业务数据加载到React组件的属性中。方便进行服务端渲染。

