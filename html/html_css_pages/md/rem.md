![](https://www.runoob.com/wp-content/uploads/2015/12/1505196wwz21kmjckgk22k.jpg)

[TOC]



#### em和rem的区别

##### em 

- em是相对于**父级文字大小**来说的

- ~~~css
    <style>
          .box {
              font-size: 12px;
          }
    
          p {
              width: 10em;
              height: 10em;
              background-color: pink;
          }
      </style>
    
  <body>
      <div class="box">
          <p></p>
      </div>
  </body>
  ~~~

- em很难实现整体控制效果，因为页面中父元素的字体大小都不一样

- **注意：**任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px\*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。

##### rem

- rem （root em，根em）是相对 页面中的**html文字大小**来说的

- ~~~css
     html {
              font-size: 12px;
          }
        
          .box {
              width: 15rem;
              height: 15rem;
              background-color: purple;
          }
        
  ~~~

- rem的优点就是可以通过修改html里面的文字大小来改变页面中元素的大小，可以实现整体控制效果

- 也就说 使用rem可以使页面的大小 根据 html的文字大小而改变

- 兼容性

- ~~~css
  p {font-size:14px; font-size:.875rem;}
  ~~~

- 如果是进行的移动端开发就不用考虑兼容性了，IE8之前 这样处理兼容，不支持rem的会直接忽略。

#### 媒体查询

- 语法规范

~~~css
@media mediatype and|not|only (media featrue) {

}
~~~

- @media代表声明媒体查询
- mediartpe 是媒体类型
  - all 用于所有设备
  - print 打印机
  - scree **电脑屏幕、平板电脑、智能手机**
- 关键字 and not only 
  - **and**  并且的意思 媒体特性链接到一起
  - not 排除某个媒体特性
  - only 指定特定的媒体类型
- media featrue 媒体特性 必须有小括号
  - width 定义输出设备中页面可视区域的宽度
  - min-width 定义输出设备中页面最小可视区域
  - max-width 定义输出设备中页面最大可视区域

~~~css
    /* 在800像素以内 */
        @media screen and (max-width:800px) {
            body {
                background-color: pink;
            }
        }
~~~

##### 根据不同大小改变颜色

~~~css
    /* 在539像素以内 */
        @media screen and (max-width:539px) {
            body {
                background-color: palegreen;
            }
        }

        /* 超过540像素 */
        @media screen and (min-width:540px) {
            body {
                background-color: pink;
            }
        }

        /* 超过970像素 */
        @media screen and (min-width:970px) {
            body {
                background-color: purple;
            }
        }
~~~

![](../../../image/html_css/media.jpg)

- 尽量从小到大或者从大到小的写，因为样式有层叠性 后面的样式会把前面的给覆盖掉

##### 媒体查询+rem实现元素动态大小

~~~css
  <style>
        .box {
            width: 100%;
            height: 10rem;
            background-color: pink;
            text-align: center;
            line-height: 10rem;
            font-size: 5rem;
            color: aliceblue;
        }

        /* 超过320px的 */
        @media screen and (min-width:320px) {
            html {
                font-size: 8px;
            }
        }

        /* 超过640px的 */
        @media screen and (min-width:640px) {
            html {
                font-size: 16px;
            }
        }
    </style>

<body>
    <div class="box">我是文字</div>
</body>
~~~

- 通过媒体查询改变html的文字大小  也就 改变了元素大小

##### 针对不通屏幕大小 调用不同的css文件

- 建议从小到大写

~~~css
    <!-- 屏幕尺寸大于320时 -->
    <link rel="stylesheet" href="style320.css" media="screen and (min-width:320px)">
    <!-- 屏幕尺寸大于640时 -->
    <link rel="stylesheet" href="style640.css" media="screen and (min-width:640px)">

<body>
    <div></div>
    <div></div>
</body>
~~~

#### rem适配方案

- 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候 等比例适配当前设备。
- 使用媒体查询根据不同设备按比例设置html的字体大小，然后页面元素使用rem做尺寸单位，当html字体大小改变，元素尺寸也会发生改变，从而达到等比所放的适配

##### rem实际开发适配方案

1. 按照设计稿与设备宽度的比例，动态计算并设置html跟标签的font-size大小（媒体查询）
2. css中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为rem为单位的值

![](../../../image/html_css/rem.png)

##### rem适配方案技术使用（市场主流）

- 技术方案1

  - less   
  - 媒体查询       
  - rem

  less方便计算rem，媒体查询动态改变大小，rem自适应布局

- 技术方案2

  - flxible.js
  - rem

  相比方案1 这个更简单一些

##### less+rem+媒体查询

|     设备      |                           常见宽度                           |
| :-----------: | :----------------------------------------------------------: |
|  iPhone4、5   |                            640px                             |
| iPhone6、7、8 |                            750px                             |
|    android    | 常见320px , 360px , 375px , 384px , 400px,  414px , 500px , 720px , **大部分4.7-5.0寸的手机安卓设备为720px** |

1. 首先选一套**标准尺寸** 750为准
2. 用屏幕尺寸 / 划分的份数 得到 html里的文字大小   750 / 15 = html的文字大小 （划分不一定非要是15 也可以是10，20）
3. 页面元素的rem值 = 原始px / html的文字大小

~~~css
    /* 大于等于320的时候 */
        @media screen and (min-width:320px) {
            html {
                font-size: 21.3px;
            }
        }

        /* 大于等于750的时候 */
        @media screen and (min-width:750px) {
            html {
                font-size: 50px;
            }
        }

        div {
            width: 2rem;
            height: 2rem;
            background-color: pink;
        }
~~~

- ==只需围绕一套标准的去计算就行了，其他的根据媒体查询自动改大小 也就同样得到了适配==

- 比如

- ~~~css
  // 定义一个750的标准（750 / 15 = 50）
  @baseFont:50px;
    input{
              width: 100%;
              height: 66rem / @baseFont;
              border:0;
              outline: none;
              font-size: 25rem / @baseFont;
              color: #757575;
              border-radius: 44rem / @baseFont;
              margin-top: 12rem / @baseFont;
              background-color: #FFF2CC;
              padding-left: 55rem / @baseFont;
              box-sizing:border-box;
          }
  ~~~

- 这里的50只是在750标准下划分15份得到的px，最终改变元素的大小还是看媒体查询里面的文字大小

- 注意单位问题

用less给每一个尺寸进行划分

~~~css
// 我们此次定义的划分的份数 为 15
// rem算法：屏幕元素的px / (标准屏幕大小 / 切的份数)
// 给个默认的文字大小（750）后面的会把前面的层叠掉
html {
    font-size: 50px;
}
@no: 15;
// 320
@media screen and (min-width: 320px) {
    html {
        font-size: 320px / @no; 
    }
}
// 360
@media screen and (min-width: 360px) {
    html {
        font-size: 360px / @no;
    }
}
// 375 iphone 678
@media screen and (min-width: 375px) {
    html {
        font-size: 375px / @no;
    }
}

// 384
@media screen and (min-width: 384px) {
    html {
        font-size: 384px / @no;
    }
}

// 400
@media screen and (min-width: 400px) {
    html {
        font-size: 400px / @no;
    }
}
// 414
@media screen and (min-width: 414px) {
    html {
        font-size: 414px / @no;
    }
}
// 424
@media screen and (min-width: 424px) {
    html {
        font-size: 424px / @no;
    }
}

// 480
@media screen and (min-width: 480px) {
    html {
        font-size: 480px / @no;
    }
}

// 540
@media screen and (min-width: 540px) {
    html {
        font-size: 540px / @no;
    }
}
// 720
@media screen and (min-width: 720px) {
    html {
        font-size: 720px / @no;
    }
}

// 750
@media screen and (min-width: 750px) {
    html {
        font-size: 750px / @no;
    }
}
// 960
 @media screen and (min-width:960px){
     html{
         font-size: 960px / @no;
     }
 }
~~~

- 可以把这个文件单独写，利用less的导入 到index.css里面

- 建议给body加上最小宽度和最大宽度

- ~~~css
  min-width:320px;
  max-width:750px;
  ~~~

- 320是手机最小宽度，750是标准手机宽度，当然也可以写的更大

#### 实战

![](../../../image/html_css/less_rem_media.png)

##### 预览地址：http://zmlong.usa3v.net/html/project/less_rem_media/index.html