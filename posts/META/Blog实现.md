---
layout: post
title: 交互编程设计课程Blog实现
codeName: Blog-implementation
author: CNLHC
date: 2019-06-27T17:33:47.149Z
---

本博客的源代码托管在Github [CNLHC/cnworkshop](https://github.com/CNLHC/cnworkshop)。

本文同时作为北京航空航天大学<交互编程设计>课程设计的说明文档，所以可能会在某些地方过分的强调不必要的细节。

## 效果

首页

![2019-06-29-12-58-47](https://cnworkshop.oss-cn-beijing.aliyuncs.com/images%5Cb54d9c3dc59dc8fb758421b736ce8462.png)

文章页

![2019-06-29-12-59-19](https://cnworkshop.oss-cn-beijing.aliyuncs.com/images%5Cd0679b43624cd6d3eb199ca463e8add2.png)

支持数学公式与代码高亮

![2019-06-29-13-00-47](https://cnworkshop.oss-cn-beijing.aliyuncs.com/images%5Ca8234c3df614f695694fbb26aa367843.png)

## 技术栈

搭建本博客使用的主要技术包括 `React.js`和`Gatsby`,此外，所有的代码都使用`Typescript`开发。

## Typescript

`Typescript` 是微软公司维护的一个开源项目。它是一个带有强类型支持的编程语言。通过编译器，可以将`Typescript`代码编译成浏览器可以理解的`Javascript`
代码。

本质上, `Typescript`是 Javascript 的一个超集，可以看作是添加了面向对象特性和静态类型支持的Javascript。

举一个非常简单的例子,假设我们想实现一个函数计算两个参数之和,在Javascript中,代码如下

```js
function add(a,b){
    return a+b
}
```

上述代码当然能实现我们的要求，但是当我们用不同方式调用它时，可能会带来一些问题。如下述代码片段所示

``` js
add(1,1) //返回2,正常
add(2) //返回 NaN 错误
add(1,"1") //返回 "11" 错误
```

在一些错误的调用时，由于Javascript不具备静态类型，可能会带来以想不到的结果。

相同的代码用Typescript实现如下

```ts
function add(a:number,b:number){
    return a+b
}
```

在Typescript中调用 `add`方法时，必须输入且仅输入两个数字类型的变量

``` ts
let a:number=1
let b=2
add(a,b) //返回3
```

其他调用方式都会在编译期间报错，这就避免了Javascript中出现 `1+1=11`的情况发生。

`TypeScript` 的类型系统非常强大，在本项目中，我们运用它来约束数据库返回的Scheme.

例如下述语句

```ts
  export interface IPostMeta {
    title:string
    excerpt:string
    id:string
    url:string
    tags:string[]
    }
  const postMetaList:IPostMeta[]= data.allMarkdownRemark.edges.map(e=>({
    id:e.node.id,
    excerpt:e.node.excerpt,
    title:e.node.frontmatter.title,
    url:e.node.fields.slug,
    tags:e.node.frontmatter.tags,
    date:e.node.frontmatter.date
  }))
```

约束了 `postMetaList` 必须遵照要求的字段进行赋值，否则Typescript在编译期间就会报错，这能大大的减少修复Bug的时间，提高开发效率。

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

通过JSX的帮助，我们可以非常简单的构造这种模式。并仅通过浏览器的Js解释器就渲染出一整个网页。

### SCSS

Scss本质上 是对 CSS 的扩展，让 CSS 语言更强大、优雅。 它允许你使用变量、嵌套规则、 mixins、导入等众多功能， 并且完全兼容 CSS 语法。 Sass 有助于保持大型样式表结构良好， 同时也让你能够快速开始小型项目， 特别是在搭配 Compass 样式库一同使用时。

其中，嵌套规则非常方便，例如如下 Css代码片段使用级联选择器来实现为某些元素添加样式

```css
.a {
    width:100%;
}
.b,.a {
    height:100%
}
```

通过Scss的嵌套规则，我们可以避免使用繁复的级联选择器文法.

```scss
.b {
    height:100%
    .a {
        width:100%;
    }
}
```

和 Typescript类似, Sass也有自己的编译器。在项目发布时，需要将Sass编译成浏览器可以理解的CSS。

## SPA与SSR

上文中提到，我们可以通过JSX构建一个足够复杂的Javascript对象。当用户访问服务器时，可以仅给用户返回一个JS文件，客户端浏览器中的JS解释器将通过JSX编译输出的函数，完成页面的渲染,
满足这种模式的应用常常被称做单页面应哟程序SPA（Single Page Application）。

SPA模式在有些场景下会非常有用。比如网页的并发访问量极大时，使用SPA能够降低服务器的压力（因为服务器不需要Serve太多的文件或是频繁的执行字符串拼接操作)；使用SPA也可以提高用户的体验
因为SPA所需要的资源均被打包在了一个Bundle中，所以一旦该Bundle加载完成，页面的操作无需过多的网络请求，于是交互体验会非常流畅。

但是SPA也有一些缺点，其中影响最大的两点是

1. 因为浏览器爬虫获取不到html文件，所以很难做搜索引擎优化。
2. 由于这个Bundle到一起的JS文件通常会比较大，所以用户首次加载时间会非常长。

SPA应用程序通常是CSR（Client Server Render)客户端渲染的。即页面由客户端的Js解释器完成渲染。
如下图所示,使用CSR的应用程序，在浏览器执行完React函数之前，页面都是不可见的。在Bundle比较大时，较长的加载时间可能会带来不好的用户体验。

![2019-06-29-12-41-13](https://cnworkshop.oss-cn-beijing.aliyuncs.com/images%5C2ff38a0e7f3c8f7211015b11f33c0668.png)

为了解决上述两个问题，有人提出了服务端渲染SSR（server side rendering） 技术。顾名思义，SSR就是将页面在服务端完成渲染，在服务器部署静态页面，用户请求时，给用户返回渲染后的静态页面。

![2019-06-29-12-42-43](https://cnworkshop.oss-cn-beijing.aliyuncs.com/images%5Cccd71e69e7da1e7291cc5be556f75408.png)

SSR实现的基本原理是,React为了优化性能，会在底层维护一个虚拟的DOM树。正常情况下，即CSR时，浏览器在执行React程序时，React程序会对内存中的虚拟DOM节点，而非真实浏览器中的节点进行操作，在完成全部操作后，再将虚拟DOM同步到真实DOM，以提高性能。

使用SSR时，我们利用类似于Google V8一类的脚本解释器，在服务器上运行React程序，并将部分虚拟DOM节点渲染成一个Html文件再返回给用户。浏览器在收到这一个Html页面后，立即就有画面显示。通过这种方式，我们可以提高应用程序的首屏性能。

本项目使用 `Gatsby`框架实现了 `React`组件的服务端渲染。

## GraphQL

GraphQL 是一种结构化查询语言。本项目中，用GraphQL结合一些中间件，将网站的业务数据加载到React组件的属性中。方便进行服务端渲染。

例如在本项目中存在这样的语句

```ts
export const query=graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          fields{
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            codeName
            date
            tags
          }
        }
      }
    }
  }
`
```

其中query变量定义了一次graphql查询。通过这种结构化查询的方式，我们可以动态的控制接口返回的数据,例如上述语句中我请求了文章的id,缩略，标题，日期和标签属性，而没有请求正文属性。

GraphQL这种可以定制接口返回的特性非常有用，例如当我在渲染一个博客文章列表时，不需要加载正文内容，只需要一些文章的元信息即可。使用GraphQL定制需要的字段，可以避免返回过多冗余数据浪费带宽。

GraphQL的数据存储后端可以有很多种。传统的数据源，例如 `MySQL`,`Redis`,`Hive`等，都可以通过类似于 `Apollo`一类的中间服务器，对外统一暴露GraphQL接口。

在本项目中,使用文件作为GraphQL的数据源。事实上，由于使用了SSR，Query数据的相关代码只会在服务端而不是客户端执行。通过`Gatsby`提供的相关插件，使用本地存储了博客文章文件的目录作为数据源，在部署期间，会通过服务器Js解释器，将这些数据自动渲染到Html文件中提供给用户。
