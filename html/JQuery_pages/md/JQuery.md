![](../../../image/JQuery/jQuery.jpg)

[TOC]

~~~js
jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库。jQuery设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。
~~~

### JQuery教程

#### 简介

- **jQuery 库可以通过一行简单的标记被添加到网页中。**
- jQuery 库包含以下特性：
  - HTML 元素选取
  - HTML 元素操作
  - CSS 操作
  - HTML 事件函数
  - JavaScript 特效和动画
  - HTML DOM 遍历和修改
  - AJAX
  - Utilities
- 基础语法是：`$(selector).action()`
  - 美元符号定义 jQuery
  - 选择符（selector）“查询”和“查找” HTML 元素
  - jQuery 的 action() 执行对元素的操作

#### 安装

1. 通过本地引入

   - 去官网下载版本 引入到script标签即可

   - ```js
     <script src="jquery.js"></script>
     ```

   - 官网地址：https://jquery.com/

2. 通过CDN引入

   - 这种引入方式免下载，但是执行效率没有本地引入的快
   - JQueryCDN网址：https://www.jq22.com/cdn/

#### 文档就绪函数

~~~js
$(document).ready(function(){

--- jQuery functions go here ----

});
~~~

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。

如果在文档没有完全加载之前就运行函数，操作可能失败。下面是两个具体的例子：

- 试图隐藏一个不存在的元素
- 获得未完全加载的图像的大小

#### 选择器

| 语法                 | 描述                                                 |
| :------------------- | :--------------------------------------------------- |
| $(this)              | 当前 HTML 元素                                       |
| $("p")               | 所有 <p> 元素                                        |
| $("p.intro")         | 所有 class="intro" 的 <p> 元素                       |
| $(".intro")          | 所有 class="intro" 的元素                            |
| $("#intro")          | id="intro" 的元素                                    |
| $("ul li:first")     | 每个 <ul> 的第一个 <li> 元素                         |
| $("[href$='.jpg']")  | 所有带有以 ".jpg" 结尾的属性值的 href 属性           |
| $("div#intro .head") | id="intro" 的 <div> 元素中的所有 class="head" 的元素 |

| $('ul li:last')             | 每个 <ul> 的最后一个 <li> 元素 |
| --------------------------- | ------------------------------ |
| $('ul li').eq(2)            | ul下面的第几个li               |
| $('ol li:odd')              | 选择奇数                       |
| $('ol li:even'）            | 选择偶数                       |
| $('div').parent()           | 选中DIV的亲父元素              |
| $('div').children('p')      | DIV的亲孩子，P元素             |
| $('div').find('p')          | DIV下面的子孙后代的P元素       |
| $('ul li').siblings('li')   | 选中自己的亲兄弟（除了自己）   |
| $('ul .item').nextAll('li') | 自己以下的所有li元素           |
| $('ul .item').prevAll('li') | 自己以上的所有li元素           |

| $("h2").next();                           | 下一个同胞元素                                           |
| ----------------------------------------- | -------------------------------------------------------- |
| $("h2").prev()                            | 上一个同胞元素                                           |
| $("h2").nextUntil("h6");                  | 返回介于 <h2> 与 <h6> 元素之间的所有同胞元素（向下查找） |
| $("h2"). prevUntil()                      | 返回介于 <h2> 与 <h6> 元素之间的所有同胞元素（向上查找） |
| $('.p').parents()                         | 选择p的父亲们（返回一个数组）                            |
| $('.qq').parentsUntil('body')             | 获取自己到指定标签的所有父（祖先）元素                   |
| $("p").filter(".intro");                  | 返回带有类名 "intro" 的所有 <p> 元素：                   |
| $("p").not(".intro");                     | 返回不带有类名 "intro" 的所有 <p> 元素：                 |
| **$("p").parent().is("div")**//返回布尔值 | is() 方法用于查看选择的元素是否匹配选择器。              |
|                                           |                                                          |

更多选择器详细地址：https://www.w3school.com.cn/jquery/jquery_ref_selectors.asp

#### 名称冲突

jQuery 使用 $ 符号作为 jQuery 的简介方式。

某些其他 JavaScript 库中的函数（比如 Prototype）同样使用 $ 符号。

jQuery 使用名为 noConflict() 的方法来解决该问题。

例如

使用自己的名称（比如 jq）来代替 $ 符号。

~~~js
let jq = $.noConflict();
console.log(jq('.p'));
~~~

也可以（注意第一个j是小写）

~~~js
 $.noConflict();
 console.log(jQuery('.p'));
~~~

这种方式是把变量传给了read，在代码块内可以使用$,出去后还得使用jQuery

~~~js
    $.noConflict();
    jQuery(document).ready(function ($) {
        $('button').click(function () {
            console.log($(this));
        })
    })
~~~

### JQuery效果

#### 隐藏显示

~~~js
//隐藏
$("#hide").click(function(){
  $("p").hide();
});
//显示
$("#show").click(function(){
  $("p").show();
});
~~~

- 参数

~~~js
$(selector).hide(speed,callback);
$(selector).show(speed,callback);
~~~

1. 第一个参数是时间，不用带单位 默认毫秒
   - "slow"、"fast" 或毫秒 。对应：慢，快，自定义
2. 第二个参数是回调函数，当隐藏或显示之后需要执行的代码

**toggle**

- 使用 toggle() 方法来切换 hide() 和 show() 方法

~~~js
$("button").click(function(){
  $("p").toggle();
});
~~~

- 这个方法可以来实现点击隐藏和显示，就不用单独写hide和show了
- 参数同上

#### 淡入淡出

1. fadeIn()  慢慢显示元素
2. fadeOut() 默默隐藏元素
3. fadeToggle() 来回切换 满满隐藏或显示
4. fadeTo() 以给定的时间，给定的透明度隐藏

前三个的语法

~~~javascript
$(selector).fadeIn(speed,callback);
~~~

fadeTo()的语法

~~~js
$(selector).fadeTo(speed,opacity,callback);
~~~

- 前两项是必填的，参数1是时间，参数2是透明度 0是全透明1是不透明，参数3是回调函数

#### 滑动

1. slideDown() 向下滑动
2. slideUp() 向上滑动（收起滑动）
3. slideToggle() 切换滑动

参数

~~~js
$(selector).slideDown(speed,callback);
~~~

#### 动画

animate() 方法用于创建自定义动画。

语法

~~~js
$(selector).animate({params},speed,callback);
~~~

必需的 params 参数定义形成动画的 CSS 属性。

可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是动画完成后所执行的函数名称。

例如：

~~~js
  $('.box').click(function () {
        $(this).animate({ left: '400px' })
    })
~~~

**使用相对值**

- 需要在值的前面加上 += 或 -=：

~~~js
    $('.box').click(function () {
        $(this).animate({ left: '+=400px' })
    })
~~~

- 意思是在原来的基础上，再运动400px
- 可以实现 不断的++效果

**使用预定义的值**

~~~js
 $('.box').click(function () {
        $(this).animate({ left: '+=400px', height: 'toggle' })
    })
~~~

- 这个能在做动画的同时，就给div隐藏或显示了。非常方便
- **注意：在动画中 使用display属性是没效果的**，可以使用透明度opacity代替
- 参考文献：http://www.360doc.com/content/15/0112/10/8072791_440071286.shtml

**队列功能**

~~~js
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
~~~

- 就是动画后面接着动画，没必要使用回调函数（使用也能实现 不过嵌套的可能有点多，一般回调函数可以做点小功能，如果动画后面还要动画 还是建议不要写在回调函数里面）

#### 停止动画

**stop() 方法用于在动画或效果完成前对它们进行停止。**

~~~js
$("#stop").click(function(){
  $("#panel").stop();
});
~~~

- stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

- 语法

- ~~~js
  $(selector).stop(stopAll,goToEnd);
  ~~~

- 可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

  可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。

- 如果没有参数 stop（） 代表停止动画，但不影响动画队列之后的执行

- 如果参数是stop（true） 代表 停止所有动画，停止所有动画队列

- 如果参数是 stop（true，true）代表 停止所有动画，但是要执行完**当前动画**（嗖的一下）

- 例子：https://www.w3school.com.cn/tiy/t.asp?f=jquery_stop_params

**停止之前的动画**

~~~js
    $('.box').click(function () {
        $(this).stop().animate({ height: "5000px" }, 10000);
    })
~~~

- 在动画前面加stop可以停止动画之前的队列，这样点的再快，也只是会执行一次。

**执行完当前的动画，清除队列的动画**

~~~js
$("#start").click(function(){
		$("div").animate({height:300},1500);
		$("div").animate({width:300},1500);
		$("div").animate({height:100},1500);
		$("div").animate({width:100},1500);
	});
	$("#stop").click(function(){
		$("div").clearQueue();
	});
~~~

#### 设置延迟

- 2秒后再执行

~~~js
$("button").click(function(){
    $("#div1").delay(2000).fadeIn();
});
~~~

#### 完成所有动画

- 和stop（true，true）不同的是，这个是瞬间执行完毕所有动画。而stop（true，true）是瞬间执行完当前动画

~~~js
$("#start").click(function(){
		$("div").animate({height:300},3000);
		$("div").animate({width:300},3000);
	});
	$("#complete").click(function(){
		$("div").finish();
	});
~~~

#### 链式调用

- JQuery是支持链式调用的

- ~~~js
  $("#p1").css("color","red").slideUp(2000).slideDown(2000);
  ~~~

- 把 css(), slideUp(), and slideDown() 链接在一起。"p1" 元素首先会变为红色，然后向上滑动，然后向下滑动：

### JQueryDOM操作

#### 获取设置内容/属性

**获取文字**

1. text() - 设置或返回所选元素的文本内容
2. html() - 设置或返回所选元素的内容（包括 HTML 标记）
3. val() - 设置或返回表单字段的值

~~~js
$("#btn1").click(function(){
  alert("Text: " + $("#test").text());
});
~~~

- 这三个方法是有回调函数的

~~~js
   $('button').click(function () {
        $('p').html(function (index, oldstr) {
            console.log(index, oldstr);
            return '我是新文字' + '这是旧文字:' + oldstr;
        })
    })
~~~

- 回调函数有两个参数，参数1是获取元素的下标，参数2是老的文字，
- return一个新设置的文字即可设置新文字

**获取属性（重点）**

**对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。**

**对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。**

参考文献：https://blog.csdn.net/weixin_42430217/article/details/81116772

- prop() 方法用于获取元素固有属性值。

~~~js
  $('button').click(function () {
        console.log($('input').prop('type'));
    })
~~~

- 一个参数是获取，两个参数是 设置，参数1是获取，参数二是设置的新内容
- 也可以通过对象的方式设置多个

~~~js
$("button").click(function(){
  $("#w3s").prop({
    "href" : "http://www.w3school.com.cn/jquery",
    "title" : "W3School jQuery Tutorial"
  });
});
~~~

- prop设置的时候也有回调函数 用来获取旧的数据

~~~js
$("button").click(function(){
  $("#w3s").prop("href", function(i,origValue){
    return origValue + "/jquery";
  });
});
~~~

#### 添加新元素/内容

1. append() - 在被选元素的结尾插入内容（里面）
2. prepend() - 在被选元素的开头插入内容（里面）
3. after() - 在被选元素之后插入内容（外面）
4. before() - 在被选元素之前插入内容（外面）

一般父盒子参入子元素的情况用append，插入兄弟元素的时候用after

**append**

~~~js
   $('button').click(function () {
        $('p').append('插入内容');
    })
~~~

- 有这个方法就不用html再获取老数据拼接了，直接在后面跟上
- **如果数据存在，就是移动数据**

添加元素（在元素内部）

~~~js
function appendText()
{
var txt1="<p>Text.</p>";               // 以 HTML 创建新元素
var txt2=$("<p></p>").text("Text.");   // 以 jQuery 创建新元素
var txt3=document.createElement("p");  // 以 DOM 创建新元素
txt3.innerHTML="Text.";
$("p").append(txt1,txt2,txt3);         // 追加新元素
}
~~~

**after() **

~~~js
   $('button').click(function () {
        $('p').after('插入内容');
    })
~~~

- 注意：元素的后面，和元素后面是有区别的。一个在元素里面，一个在元素外面

添加元素（在元素外部）

~~~js
function afterText()
{
var txt1="<b>I </b>";                    // 以 HTML 创建新元素
var txt2=$("<i></i>").text("love ");     // 通过 jQuery 创建新元素
var txt3=document.createElement("big");  // 通过 DOM 创建新元素
txt3.innerHTML="jQuery!";
$("img").after(txt1,txt2,txt3);          // 在 img 之后插入新元素
}
~~~

#### 删除元素

1. remove() - 删除被选元素（及其子元素）
2. empty() - 从被选元素中删除子元素

- 一个是删除元素和子元素，一个是删除子元素。要分清

~~~js
$('button').click(function () {
        $('.box').remove();
})
~~~

- 可以加过滤

~~~js
$("p").remove(".italic");
~~~

- 删除 class="italic" 的所有 <p> 元素：

~~~js
$('.box p').remove('.p');
~~~

- 删除box下面的p元素class是.p的元素

#### 操作类

1. addClass() - 向被选元素添加一个或多个类
2. removeClass() - 从被选元素删除一个或多个类
3. toggleClass() - 对被选元素进行添加/删除类的切换操作
4. css() - 设置或返回样式属性
5. hasClass-判断有没有这个类

**添加多个类是用空格分开 不是逗号**

~~~js
$("button").click(function(){
  $("#div1").addClass("important blue");
});
~~~

**切换类挺有意思的能实现很多效果**

~~~js
   $('button').click(function () {
        $('.box p').toggleClass("blue");
    })
~~~

#### 返回css

**返回CSS属性**

~~~js
$("p").css("background-color");
~~~

**设置CSS属性**

```js
$("p").css("background-color","yellow");
```

- **如果要设置多个，css里面写为对象的模式**

- ~~~js
  css({"propertyname":"value","propertyname":"value",...});
  ~~~

**判断有没有这个类**

~~~js
$('.box p').hasClass('p')
~~~

- 大多用于条件判断，返回值是布尔值

#### 尺寸操作

1. width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。
2. height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）。
3. innerWidth() 方法返回元素的宽度（包括内边距）。
4. innerHeight() 方法返回元素的高度（包括内边距）。
5. outerWidth() 方法返回元素的宽度（包括内边距和边框）。如果括号内加true，代表加上外边距
6. outerHeight() 方法返回元素的高度（包括内边距和边框）。如果括号内加true，代表加上外边距

**下面的box2的统一样式为**

~~~css
  .box2 {
            width: 500px;
            height: 500px;
            margin: 10px 10px;
            padding: 20px 20px;
            border: 5px solid #000;
            background-color: skyblue;
        }
~~~

**获取width**

~~~js
  $('button').click(function () {
        console.log($('.box2').width());//500
    })
~~~

- 啥也不带

**获取innerWidth**

~~~js
    $('button').click(function () {
        console.log($('.box2').innerWidth()); //540（padding上下20）
    })
~~~

**获取uterWidth**

~~~js
   $('button').click(function () {
        console.log($('.box2').outerWidth()); //550(上下padding+上下border)
    })
~~~

**获取uterWidth（true）**

- 获取元素的全部大小（外边距+内边距+边框+自身高度）

~~~js
 $('button').click(function () {
        console.log($('.box2').outerWidth(true)); //570(上下padding+上下border+上下margin)
    })
~~~

**获取documen和window的宽**

~~~js
$(document).width();
$(window).width();
~~~

**设置宽高**

~~~js
$("button").click(function(){
  $("#div1").width(500).height(500);
});
~~~

#### 给元素包裹标签

~~~js
$("button").click(function(){
    $("p").wrap("<div></div>");
});
~~~

- 取消包裹的标签（父元素）用 unwrap()

#### clone

- 克隆所有的 <p> 元素，并插入到 <body> 元素的结尾

~~~js
  $("button").click(function () {
        $("ul li").clone(true).appendTo("body");
    });
~~~

- **不加参数默认false，不克隆事件。加true，代表克隆事件。**

#### appendTo

- appendTo() 方法在被选元素的结尾插入 HTML 元素。

~~~js
   $('button').click(function () {
        $('ul li:last').appendTo('<li>3</li>');
    })
~~~

- 注意当前标签可能会消失

#### data（向元素添加数据）

语法（取得之后只要name）

~~~js
$(selector).data(name,value)
~~~

~~~js
   $('ul li:first').data('current', 'currentIndex');
            setTimeout(function () {
                console.log($('ul li:first').data('current'));
            }, 2000);
~~~

- 注意和attr和pop是有区别的，这个添加数据，attr是添加属性。这个添加数据（标签）不显示，attr显示。
- 移除用：removeData

#### 序列化对象

- param() 方法创建**数组或对象**的序列化表示形式。

  **序列化的值可在生成 AJAX 请求时用于 URL 查询字符串中。**

  有了这个方法ajax传值的时候 就不用手动拼接了

~~~js
  		   let obj = {
                name: "zml",
                sex: 'man'
            }
            console.log($.param(obj)); //name=zml&sex=man
~~~

#### toArray

- 把元素转换为数组

~~~js
console.log($('ul li:first').toArray());
~~~



#### 更多属性和方法参考地址

https://www.runoob.com/jquery/jquery-ref-html.html

### JQuery遍历

#### each（遍历元素）

- JQ中的循环

- 语法

~~~js
$(selector).each(function(index,element))
~~~

~~~js
   $('ul li').each(function (i, ele) {
                console.log(i);
                console.log(ele);
            });
~~~

#### $.each(遍历对象)

~~~js
 let arr = [1, 2, 3];
    $.each(arr, function (index, value) {
        console.log(index, value);
    })
~~~

#### filter

- 过滤器

- filter() 方法返回符合一定条件的元素。

  该方法让您规定一个条件。不符合条件的元素将从选择中移除，符合条件的元素将被返回。

~~~js
//让calss为current的li改变颜色
$('ul li').filter('.current').css('background', 'red')
// 让偶数的改变颜色
$('ul li').filter(':even').css('background', 'red')
//通过函数来筛选
$('li').filter(function(index) {
  return $('strong', this).length == 1;
}).css('background-color', 'red');
~~~

#### slice

- slice() 方法选取基于索引的元素的子集。

~~~js
$('ul li').slice(2, 3).css('background', 'red');
~~~

#### map

- 映射每一个数组的内容 加4 并返回一个新数组

~~~js
 let arr = [1, 2, 3];
            let map = $.map(arr, function (value,index) {
                console.log(value);
                return n + 4;
            })
            console.log(map);
~~~

- 如果映射的是对象，第二个参数是对象名

- map也可以实现 内部条件判断，比如 去除比10小的值，和移除元素

- 移除元素

- ~~~js
  return (a > 50 ? a : null);
  ~~~


#### 合并对象

~~~js
  var object1 = {
        apple: 0,
        banana: { weight: 52, price: 100 },
        cherry: 97
    };
    var object2 = {
        banana: { price: 200 },
        durian: 100
    };
    /* object2 合并到 object1 中 */
    $.extend(object1, object2);
    console.log(object1);
~~~

#### 根据数组返回下标

- jQuery.inArray（） 第一个参数是数组元素，第二个参数是查找哪个数组
- **找打就返回对应下标，找不到就返回-1**

~~~js
	let arr2 = ['name', 'age']
    console.log(jQuery.inArray('age', arr2)); //1
~~~

#### 判断是不是数组类型

~~~js
    let arr2 = ['name', 'age']
    console.log(jQuery.isArray(arr2)); //true
~~~

- 返回布尔值



### JQuery Ajax

#### load

- load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

语法

~~~js
$(selector).load(URL,data,callback);
~~~

必需的 *URL* 参数规定您希望加载的 URL。

可选的 *data* 参数规定与请求一同发送的查询字符串键/值对集合。

可选的 *callback* 参数是 load() 方法完成后所执行的函数名称。

~~~js
   $('button').click(function () {
        $('.box2').load('./data.txt'）
    })
~~~

- 就会把请求到的结果给box2，内部调用的 text()

**可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：**

- *responseTxt* - 包含调用成功时的结果内容
- *statusTXT* - 包含调用的状态
- *xhr* - 包含 XMLHttpRequest 对象

~~~js
   $('button').click(function () {
        $('.box2').load('./data.txt', 'name:zml', function (responseTxt, statusTXT, xhr) {
            console.log(responseTxt, statusTXT, xhr);
            if (statusTXT == 'screen') {
                console.log('成功');
            } else if (statusTXT == 'error') {
                console.log('失败');
            }
        });
    })
~~~

#### get/post

- GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。
- POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

**$.get()**

```js
$.get(URL,callback);
```

必需的 *URL* 参数规定您希望请求的 URL。

可选的 *callback* 参数是请求成功后所执行的函数名。参数 data,status 一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

~~~js
    $('button').click(function () {
        $.get('./data.txt', function (data, status) {
            console.log(data, status);// 我是data数据 success
        })
    })
~~~

**$.post()**

```js
$.post(URL,data,callback);
```

必需的 *URL* 参数规定您希望请求的 URL。

可选的 *data* 参数规定连同请求发送的数据。

可选的 *callback* 参数是请求成功后所执行的函数名。

~~~js
    $('button').click(function () {
        $.post("/try/ajax/demo_test_post.php",
            {
                name: "菜鸟教程",
                url: "http://www.runoob.com"
            },
            function (data, status) {
                alert("数据: \n" + data + "\n状态: " + status);
            });
    })
~~~

#### $.ajax

- 这个是用的最多的方法，综合了get和post
- 基本语法如下

~~~js
$.ajax({
                data: "shuju",
                url: './data.txt',
                type: 'get',
                success: function (data) {
                    console.log(data);
                },
                error: function (err) {
                    console.log(err);
                }
            })
~~~

- async属性表示是否异步，默认是true，所以不用手动设置
- 还有请求前执行的函数和请求完成后执行的函数 都在一下文档
- 如需用到复杂的语法 文档地址：https://www.runoob.com/jquery/ajax-ajax.html
- **data传值的时候 可用 $.param() 属性序列书数据**

#### 更多ajax事件 尽在

https://www.runoob.com/jquery/jquery-ref-ajax.html

例如：ajax执行前和执行后

~~~js
$(document).ajaxStart(function(){
    $("#wait").css("display","block");
});
$(document).ajaxComplete(function(){
    $("#wait").css("display","none");
});
~~~

### JQuery事件

**大多数事件都与原生JS的大差不差，只不过不用写ｏｎ前缀了**

#### **bind事件**

- 绑定多个事件

~~~js
   $(document).bind("click keydown", function () {
            console.log($(this));
    })
~~~

- 事件用空格分开

#### **delegate**

- **delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。**

  **使用 delegate() 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）。**

~~~js
      $(document).delegate("button", "click", function () {
            console.log('111');
        })
~~~

- 是给被选元素的子元素添加事件，不是自身。可以针对未来元素添加

#### **hover**

- 当鼠标指针悬停在上面时，改变 <p> 元素的背景颜色：

~~~js
   $("p").hover(function () {
            $("p").css("background-color", "yellow");
        }, function () {
            $("p").css("background-color", "pink");
        });
~~~

hover() 方法规定当鼠标指针悬停在被选元素上时要运行的两个函数。

方法触发 [mouseenter](https://www.runoob.com/jquery/event-mouseenter.html) 和 [mouseleave](https://www.runoob.com/jquery/event-mouseleave.html) 事件。

**注意:** 如果只指定一个函数，则 mouseenter 和 mouseleave 都执行它。

语法

~~~js
$(selector).hover(inFunction,outFunction)
~~~

- 如果只定义了一个方法

- ~~~js
  $(selector).hover(handlerInOut)
  ~~~

- 等同于

- ~~~js
  $( selector ).on( "mouseenter mouseleave", handlerInOut );
  ~~~

#### **on事件（重点）**

- on() 方法在被选元素及子元素上添加一个或多个事件处理程序。

- **注意：****使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。**

  **提示：**如需移除事件处理程序，请使用 [off()](https://www.runoob.com/jquery/event-off.html) 方法。

  **提示：**如需添加只运行一次的事件然后移除，请使用 [one()](https://www.runoob.com/jquery/event-one.html) 方法。

- 给父元素绑定（此时就是正常的给父元素绑定事件）

~~~js
  $('ul').on('click', function () {
        console.log('点击的ul');
    });
~~~

- 给子元素绑定（事件代理的简单应用）

~~~js
 $('ul').on('click', 'li', function () {
        console.log('点击的li');
   });
~~~

**on事件和click事件的区别**

- 二者在绑定静态控件时没有区别，但是如果面对动态产生的控件，只有 on() 能成功的绑定到动态控件中。

~~~js
   $('ul li').click(function () {
        console.log('点击li');
    })
    $('ul').on('click', 'li', function () {
        console.log('点击li');
    });
    // 未来元素
    $('ul').append('<li>3</li>');
~~~

off() 方法通常用于移除通过 [on()](https://www.runoob.com/jquery/event-on.html) 方法添加的事件处理程序。

当然也可以移出click添加的事件

~~~js
$("button").click(function(){
    $("p").off("click");
});
~~~

#### **one事件**

- 当点击 <p> 元素时，增加该元素的文本大小（每个 <p> 元素只能触发一次事件）：

~~~js
$("p").one("click",function(){
$(this).animate({fontSize:"+=6px"});
});
~~~

#### 事件文档地址

https://www.runoob.com/jquery/jquery-ref-events.html

**这个文档地址全的很，下面列举几个特殊的事件**

### JQuery 杂项

- https://www.runoob.com/jquery/jquery-ref-misc.html
- 包括
  - 杂项
  - 使用方法（判断验证）
  - 回调函数
  - 延迟对象

#### jQuery的属性

1. [jQuery.fx.interval](https://www.runoob.com/jquery/prop-jquery-fx-interval.html) 减少动画帧率
2. [jQuery.fx.off](https://www.runoob.com/jquery/prop-jquery-fx-off.html)开启关闭全局动画

### 测试JQuery掌握程度地址

https://www.w3school.com.cn/quiz/quiz.asp?quiz=jquery

### 被卷去的头部

~~~javascript
 $(function () {
        var boxTop = $('.box').offset().top;  //box距离顶部的距离
        $(window).scroll(function () {
            console.log($(document).scrollTop()); //页面卷曲的大小
            if ($(document).scrollTop() >= boxTop) {
                $('.back').fadeIn();
            } else {
                $('.back').fadeOut();
            }
            $('.back').click(function () {
                // $(document).scrollTop(0);  这样可以实现 但是没有动画
                $('body,html').animate({  //注意这里不能写document 因为动画只能给元素加
                    scrollTop: 0
                });
            });
        });
    });
~~~

### 插件

- fullpage可以用来做全屏滚动
- circlr 用来做360度滚动
- jquery.stellar.min 用来做时差滚动

