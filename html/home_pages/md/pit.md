#### 1.className会重置类名

- className 会重置之前的类名  如果按照class选择器 会找不到元素

~~~js
<body>
   <p class="colorRed"></p>
</body>

<script>
    let colorRed = document.querySelector('.colorRed');
	console.log(colorRed); // 有值
    colorRed.className = 'colorBlue';
    console.log(colorRed); // undefined
</script>
~~~

- 解决办法：建议使用classList.add()

~~~js
	let colorRed = document.querySelector('.colorRed');
    console.log(colorRed);// 有值
    colorRed.classList.add('colorBlue');
    console.log(colorRed);// 有值
~~~

#### 2.页面一直转圈，代码却运行正常

- 图片或文件路径的问题，建议使用本地图片路径，如果用网上的，他炸了你也炸了

#### 3.form表单域会刷新页面

其解决的方法有两种:

1. 如果不希望刷新页面，使用ajax提交表单，submit按钮上要加个onclick="return false;"就可以解决这个问题！
2. 阻止form表单元素的默认行为,在点击时间中添加:event.preventDefault();

#### 4.swiper，fullpage区别

swiper主要做移动端的全屏滚动效果，fullpage主要做PC端全屏滚动效果

#### 5.生成元素太多就用克隆

- 如果DOM中生成要生成的元素太多 可以先写好一个母版隐藏 用JQ克隆然后再添加到指定位置

~~~js
let box2 = $(".box1").clone();
$('body').append(box2)
~~~

- clone()参数true 代表深克隆，事件处理函数

