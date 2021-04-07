![](https://less.bootcss.com/public/img/less_logo.png)

[TOC]

> Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。Less 可以运行在 Node 或浏览器端。 	

#### 维护css的弊端

css是一门非编程式语言，没有变量、函数、作用域等概念

- css需要书写大量看似没有逻辑的代码，css冗余度是比较高的
- 不方便维护及扩展，不利于复用
- css没有很好的计算能力

#### 安装使用less

- 安装1（推荐）

- less 官网：https://less.bootcss.com/
- 因为less可以在node.js环境上使用 所以这里建议直接安装

 cmd 运行 

~~~cmd
npm install -g less
~~~

- 安装成功后会出现版本号
- 注意：如果你电脑上没有安装 node.js  请先安装node.js 
- nodeJS 官网：https://nodejs.org/en/



- 安装2

- 这种方法是免下载 在文件内引入即可

- ```
  <link rel="stylesheet/less" type="text/css" href="styles.less" />`
  `<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.11.1/less.min.js" ></script>
  ```

**使用less**

1. 新建一个后缀为.less 的文件 例如：index.less

2. 并写入内容：

   ~~~css
   @color：red;
   p{
   color:@color;
   }
   ~~~

- 因为浏览器是没办法解析后缀是less的文件的，所以在使用的时候要把less转为css

- cmd先进入（cd）到对应的文件夹内（如果使用VScode编辑器 建议直接右键在终端打开 就省了cd的步骤）

- ```
  lessc styles.less styles.css
  ```

- styles是你新建的less文件名
- 运行成功后你就得到了一后缀.css文件，然后引入 即可

#### less插件

- 你有没有发现，在每次写less之后想看效果 都要  运行一下 `lessc styles.less styles.css ` 
- 这是极其不方便的，反而浪费了好多时间，这里推荐一个插件 `easy less`,它可以让你写完less按ctrl+s的同时就编译好了css文件，大大节省了效率
- VScode安装方法：点击扩展——搜索 easy less  安装即可
- 安装完后 随便写点less， 保存后自动编译到了css文件内 则就代表安装成功

#### 变量（定义变量）

- less定义变量用 @ 关键字，语法：@键：值；

~~~css
@color:red;
body {
    background-color: @color;
}
~~~

- 编译为

~~~css
body {
  background-color: red;
}
~~~

- 这种方法的好处就是 后面如果想该那个颜色 直接就可以在less文件内替换 而不用一个个修改。便于维护。

#### 混合（定义类）

- 通俗点将 就像定义函数一样，定义之后 其他标签也能调用

- 定义类的后面加（） 代表不渲染到css文件内，不加（）代表渲染到css内部 。大类里面是可以嵌套小类的 

- ~~~css
  .class(){
   // 不渲染到css内    
  }
  .class{
      // 渲染到css内
  }
  ~~~

~~~css
// 定义类
.border{
    margin-top: 20px;
    border: 1px solid #000;
}
// 使用类
.hunhe {
    text-align: center;
    .border();
}
.message {
	color:red;
    .border();
}
~~~

#### 嵌套（省略父级元素）

- 通俗点讲就是 像书写html结构一样书写 css ,。节省不必要的标签名 ，不用考虑样式的权重问题

~~~css
// 嵌套
.qiantao {
    margin-top: 20px;
    .font {
        color: red;
        text-align: center;
    }
}
~~~

- 也可以把此方法与伪元素和混合一块写 实现清除浮动  (`&` 表示当前选择器的父级）

~~~css
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
~~~

- 调用的时候极其的方便

~~~css
.div {
.clearfix();
}
~~~

#### 运算 （计算大小）

- 算术运算符 `+`、`-`、`*`、`/` 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。==计算的结果以最左侧操作数的单位类型为准==。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

~~~css
// 计算
@width:100px;
.jisuan {
    width: 300px - @width;
    height: 300px - 200em;
    background-color: skyblue;
}
~~~

- 计算结果的单位 以最==左边==为准 如果没有单位或单位没意义 则忽略

- calc

- ~~~css
  .jisuan {
      height: calc(@width - 10px);
  }
  ~~~

- calc是css内置函数 没有 less也能用 注意都要加单位

- ==除法运算要加（）==

- ~~~css
  wisth:(500px / 5);
  ~~~

#### 转义（定义字符）

- 转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 `~"anything"` 或 `~'anything'` 形式的内容都将按原样输出，除非 [interpolation](https://less.bootcss.com/features/#variables-feature-variable-interpolation)。

~~~css
// 转义（可以理解为定义字符）
@minWidth:~"(min-width:800px)";
@media @minWidth {
    .jisuan {
        background-color: red;
    }
}

//  解析为
@media (min-width:800px) {
  .jisuan {
    background-color: red;
  }
}
~~~

#### 函数（功能）

- Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在[Less 函数手册](https://less.bootcss.com/functions/)中有详细介绍。

  函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

~~~css
// 函数
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}

//解析为
.class {
  width: 50%;
  color: #f6430f;
  background-color: #f8b38d;
}
~~~

- 函数的用法有很多，详细函数手册地址：https://less.bootcss.com/functions/

#### 命名空间和访问符（类中类）

- 有时，出于组织结构或仅仅是为了提供一些封装的目的，你希望对混合（mixins）进行分组。你可以用 Less 更直观地实现这一需求。假设你希望将一些混合（mixins）和变量置于 `#colorAll`之下，为了以后方便重用或分发：

~~~css
// 命名空间
    // 这是大类 , name后跟（） 代表不渲染到css内，不带（）代表渲染到css内
#colorAll() {
    // 这是小类
    .red {
        background-color: red;
    }
    .blue {
        background-color: blue;
    }
    .pink {
        background-color: pink;
    }
}
.namespace {
    width: 100px;
    height: 100px;
    #colorAll.blue();
}
~~~

- 链式调用

#### 映射（对象添加属性）

- 相当于对象定义数据

~~~css
// 映射
#colors() {
    nav_color:red;
    banner_color:green;
}
.nav {
    width: 1000px;
    height: 100px;
    background-color: #colors[nav_color];
}
.banner {
    width: 500px;
    height: 500px;
    background-color: #colors[banner_color];
}
~~~

- 不知道什么原因报了语法错误，但是不影响渲染和输出

#### 作用域（向上查找原则）

- Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。

~~~css
@key:hotpink;
.space{
    @key:skyblue;
    width: 300px;
    height: 150px;
    background-color: @key;
}
// 输出
.space {
  width: 300px;
  height: 150px;
  background-color: skyblue;
}
~~~

- 与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。也可以先引用再定义

#### 注释

~~~css
/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
~~~

#### 导入

- “导入”的工作方式和你预期的一样。你可以导入一个 `.less` 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 `.less` 扩展名，则可以将扩展名省略掉：

~~~css
@import "library"; // library.less
@import "typo.css";
~~~

