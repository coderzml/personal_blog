### 插件一

#### jQuery Easing.js 插件

- easing是jquery的一个插件，使用它可以创建更加绚丽的动画效果。
- 因为easing是jQuery的插件，所以必须是在引入jquery之后再引入它
- jQuery自定义动画的函数.animate( properties [, duration] [, easing] [, complete] )有四个参数：
  1. properties：一组包含作为动画属性和终值的样式属性和及其值的集合
  2. duration(可选)：动画执行时间，其值可以是三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000)
  3. easing(可选)：要使用的过渡效果的名称，如："linear" 或"swing"
  4. complete(可选)：在动画完成时执行的函数

~~~js
    //$(".car").animate({"left": "150%"},  4000, "linear", function() {});
~~~

其中参数easing默认有两个效果："linear"和"swing"，如果需要更多效果就要插件支持了，jQuery Easing Plugin提供了像"easeOutExpo"、"easeOutBounce"等30多种效果，大家可以点击这里去看每一种easing的演示效果，下面详细介绍下其使用方法及每种easing的曲线图。

#### 引入

~~~js
<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.js"></script>
<script type="text/javascript" src="http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js"></script>
~~~

- 依旧是老规矩，先引入JQ 再引入插件

引入之后，easing参数可选的值就有以下32种：

1. linear
2. swing
3. easeInQuad
4. easeOutQuad
5. easeInOutQuad
6. easeInCubic
7. easeOutCubic
8. easeInOutCubic
9. easeInQuart
10. easeOutQuart
11. easeInOutQuart
12. easeInQuint
13. easeOutQuint
14. easeInOutQuint
15. easeInExpo
16. easeOutExpo
17. easeInOutExpo
18. easeInSine
19. easeOutSine
20. easeInOutSine
21. easeInCirc
22. easeOutCirc
23. easeInOutCirc
24. easeInElastic
25. easeOutElastic
26. easeInOutElastic
27. easeInBack
28. easeOutBack
29. easeInOutBack
30. easeInBounce
31. easeOutBounce
32. easeInOutBounce

当然一般一个项目中不可能会用到这么多效果，为了减少代码冗余，必要时可以不用引入整个jquery.easing.1.3.js，我们可以只把我们需要的几种easing放入Javascript文件中，如项目中只用到"easeOutExpo"和"easeOutBounce"两种效果，只需要下面的代码就可以了

~~~js

jQuery.extend( jQuery.easing,
{
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
});
~~~

#### 使用

~~~js
$('.box').animate({
        width: 1000,
        height: 500
    }, {
            easing: 'easeOutBounce',
            duration: 500,
            complete: function () {
                console.log('动画完成');
            }
        }
    )
~~~

**值得一提的是jQuery 1.4版本中对animate()方法，easing的方法进行了扩展，支持为每个属性指定easing方法，详细请参考[这里](http://james.padolsey.com/javascript/easing-in-jquery-1-4a2/)，如：**

~~~js
    $('.box').animate({
        width: [1000, 'easeOutBounce'],
        height: [500, 'easeOutQuad']
    }, {
            duration: 500,
            complete: function () {
                console.log('动画完成');
            }
        }
    )
~~~

也可以使用另外一种写法

~~~js
 $('.box').animate({
        width: 1000,
        height: 500,
    }, {
            specialEasing: {
                width: 'easeOutBounce',
                height: 'easeOutQuad'
            },
            duration: 500,
            complete: function () {
                console.log('动画完成');
            }
        }
    )
~~~

#### 图解

![](../../../image/JQuery/ease.png)

- 地址：https://www.runoob.com/jqueryui/api-easings.html

- **参考文献：https://blog.csdn.net/xiaolongtotop/article/details/8309635**



### 插件二

#### 视差滚动效果

- 视差滚动（Parallax Scrolling）指网页滚动过程中，多层次的元素进行不同程度的移动，视觉上形成立体运动效果的网页展示技术

- 主要核心就是前景和背景以不同的速度移动，从而创造出3D效果。 这种效果可以给网站一个很好的补充。

**特性**

- 视差滚动效果酷炫，适合于个性展示的场合。
- 视差滚动徐徐展开，适合于娓娓道来，讲故事的场合。
- 视差滚动容易迷航，需要具备较强的导航功能。

**原理**

- 传统的网页的文字、图片、背景都是一起按照相同方向相同速度滚动的，而视差滚动则是在滚动的时候，内容和多层次的背景实现或不同速度，或不同方向的运动。
- 有的时候也可以加上一些透明度、大小的动画来优化显示。 
- 利用background-attachment属性实现。
- **background-attachment: fixed || scroll || local**

#### Stellar.js是什么？

[stellar.js]是一个 jQuery插件，能很容易地给网站添加视差滚动效果。 尽管已经停止了维护，但它非常稳定，与最新版本的jQuery兼容，很多开发者也在使用它。 这个插件在jQuery插件库里很流行。

http://markdalgleish.com/projects/stellar.js/   官网

#### 引用

~~~js
<script src="path/to/jquery/jquery.min.js"></script>
<script src="path/to/jquery.stellar.min.js"></script>
~~~

**HTML**

~~~js
<div class="content" id="content1">
    <p>TEXT HERE</p>
</div>
<div class="content" id="content2">
    <p>TEXT HERE</p>
</div>
<div class="content" id="content3" data-stellar-background-ratio="0.5">
    <p>TEXT HERE</p>
</div>
<div class="content" id="content4" data-stellar-background-ratio="0.5">
    <p>TEXT HERE</p>
</div>
<div class="content" id="content5" data-stellar-background-ratio="0.5">
    <p>TEXT HERE</p>
</div>
<div class="content" id="content6" data-stellar-background-ratio="0.5">
    <p>TEXT HERE</p>
</div> 
~~~

**CSS**

~~~js
body {
    font-size: 20px;
    color: white;
    text-shadow: 0 1px 0 black, 0 0 5px black;
}
p {
    padding: 0 0.5em;
    margin: 0;
}
.content {
    background-attachment: fixed;
    height: 400px;
}
#content1 {
    background-image: url("xxx.jpg");
}
#content2 {
    background-image: url("xxx.jpg");
}
#content3 {
    background-image: url("xxx.jpg");
}
#content4 {
   background-image: url("xxx.jpg");
}
#content5 {
   background-image: url("xxx.jpg");");
}
#content6 {
    background-image: url("xxx.jpg");
}
~~~

- 可以用JS遍历生成

#### JS调用

~~~js
$.stellar({
    horizontalScrolling: false,
    responsive: true
});
~~~

#### 详细参数

| 名称                                     | 说明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| horizontalScrolling 和 verticalScrolling | 该配置项用来设置视差效果的方向。horizontalScrolling设置水平方向，verticalScro设置垂直方向， 为布尔值，默认为true |
| responsive                               | 该配置项用来制定load或者resize时间触发时是否刷新页面，其值为布尔值，默认为false |
| hideDistantElements                      | 该配置项用来设置移出视线的元素是否隐藏，其值为布尔值，若不想隐藏则设置为false |
| data-stellar-ratio="2"                   | 定义了此元素针对页面滚动的速度比率，比如，0.5为页面滚动的50%，2为页面滚动的200%，所以数值越大，你可以看到页面元素滚动速度越快。 |
| data-stellar-background-ratio            | 该配置项用在单个元素中，其值为一个正数，用来改变被设置元素的影响速度。 例如 值为0.3时，则表示背景的滚动速度为正常滚动速度的0.3倍。如果值为小数时最好在样式表中设置 |

