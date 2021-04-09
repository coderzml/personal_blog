响应式+bootstrap+栅格系统及实战

#### 响应式

- 响应式需要一个父级作为布局容器，来配合子元素实现变化效果

- 原理是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式的变化

  一般把屏幕分为四类

|       **设备划分**       |      尺寸区间      |
| :----------------------: | :----------------: |
|     超小屏幕（手机）     |      < 768px       |
|     小屏设备（平板）     | >= 768px ~ < 992px |
|  中等屏幕（桌面显示器）  | >= 992px ~ <1200px |
| 宽屏设备（大屏幕显示器） |     >= 1200px      |

- 就可以根据这四个区间去设置响应式

~~~css
  .container {
            height: 150px;
            background-color: pink;
            margin: 0 auto;
        }

        /* 根据不通屏幕下显示不同的宽度 */
        /* 小于768（手机） */
        @media screen and (max-width:768px) {
            .container {
                width: 100%；
            }
        }

        /* 大于768（平板） */
        @media screen and (min-width:768px) {
            .container {
                width: 750px;
            }
        }

        /* 大于992（桌面显示器） */
        @media screen and (min-width:992px) {
            .container {
                width: 1200px;
            }
        }

        /* 大于1200（大屏幕显示器） */
        @media screen and (min-width:1200px) {
            .container {
                width: 1500px;
            }
        }
~~~

##### 响应式导航

- 在屏幕小于648的时候，导航一行排三个，在大于648的时候 排一行

~~~css
 <style>
        .container ul li {
            height: 50px;
            background-color: pink;
            list-style: none;
            line-height: 50px;
            color: white;
            text-align: center;
            float: left;
        }

        .container ul {
            width: 100%;
        }

        @media screen and (max-width:648px) {
            .container ul li {
                width: 33.33%;

            }
        }

        @media screen and (min-width:648px) {
            .container ul li {
                width: 64.8px;
            }
        }
    </style>

<body>
    <div class="container">
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
        </ul>
    </div>
</body>
~~~

#### Bootstrap前端开发框架

- bootstrap是基于html、css、JavaScript 开发的框架，它简洁灵活、使得web开发更加灵活
- 中文官网：https://www.bootcss.com/

##### 使用

- 下载相应的文件后 引入
- 在boot的官网中 找你喜欢的样式，然后复制到你自己的html中即可
- 使用的方法这里就不赘述了，官网讲的比我清楚

##### 响应式的布局容器

1. container类

~~~html
 <div class="container">
        <button type="button" class="btn btn-success">（成功）Success</button>
        <button type="button" class="btn btn-danger">（危险）Danger</button>
    </div>
~~~

- 有了container类，就不用再写媒体查询了，因为boot内部都已经写好了 分别是
- 大屏（>=1200px） 宽度定为 1170px
- 中屏（>=992px） 宽度定为970px
- 小屏（>=768px） 宽度定为750px
- 超小屏（100%）
- 一个页面中不是只能有一个container类，可以根据需求搭配使用

2. container-fliud

- 流式布局容器 百分比宽度
- 占据全部视口的容器
- 适合于单独做移动端开发

##### 栅格系统

- 又叫网格系统，它指将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局
- boot提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或者视口尺寸的增加，系统会自动分为12等份。
- 不管是在小屏幕下还是在大屏幕下 都是把页面划分为12等份，当屏幕缩小的时候每一份也会跟着缩小，就实现了响应式的效果 ，份数不变（默认）