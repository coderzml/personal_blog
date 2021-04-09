#### 响应式+bootstrap+栅格系统及实战

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

