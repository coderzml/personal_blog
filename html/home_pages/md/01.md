![](../../../image/home/article01.jpg)

#### 微信内置浏览器返回上一页强制刷新问题 解决方法

- 问题：==微信内置浏览器在返回上一页面，且上一页面包含AJAX代码时，页面就会被强制刷新，极度影响用户体验。而我们想要的效果是：返回上一页面时，页面还停留在原来的状态，AJAX获取到的数据还在，滚动条也在原来的位置。==
- 资料：`微信自带的浏览器使用的是QQ浏览器X5内核，该内核为腾讯公司基于开源Webkit优化的浏览器渲染引擎。`

#### 1. local Storage 解决

- 原理：

  - A页面点击链接跳转B页面的时候 用local Storage 或者 session Storage 记录有用的信息 比如：scroll位置，page页码 等，你觉得回到A页面要用到的信息 然后 回到A页面后渲染 即可。

- 记录信息

  - 在A页面点击链接跳转B页面之前记录


~~~javascript
		 localStorage.setItem('scroll', e.pageY); // 坐标位置
         localStorage.setItem('nav_index', current.index); // 哪个导航栏
         localStorage.setItem('pages_index', pages_ul_li.index); // 哪个pages
~~~

- 查看是否记录成功   控制台——application——torage——local Storage 或 session Storage 

- 取得数据

  - 回到A页面获取记录的数据 渲染即可


~~~JavaScript
localStorage.getItem('scroll')
~~~

- 判断是否来到A页面

~~~JavaScript
//1.浏览器首次运行不会进入下面的第二个if 因为local Storage 没有值 
//2.在微信内置浏览器每当B页面返回A页面都会刷新  所以每次都会进到这个if语句内 而正常浏览器 返回不会刷新 所以正常浏览器只在打开页面的第一次进入if  。 刚打开页面内的时候也会进第一个if  所以要渲染完删除 
// http://zmlong.usa3v.net/index.html是你A页面的地址
if (location.href == 'http://zmlong.usa3v.net/index.html') {
    // console.log(localStorage.getItem('scroll'));
    // 如果有值
    if (localStorage.getItem('scroll') !== null) {
        // 开始渲染
        // 改变scroll 位置
         window.scrollTo(0,localStorage.getItem('scroll')); // 改变scroll的位置 注意参数 第一个是x,第二个是y
        // 这里写了个onload事件的原因是 不通过事件调用click不会执行（如果嫌onload事件执行慢，大可换成 JQ的ready事件）。
  		 window.onload = function () {
           // 我这里调用对应的点击就实现了相应的效果 
   		   // 原生写法 nav调用点击
      		  document.querySelector('.nav_ul').querySelectorAll('li')[localStorage.getItem('nav_index')].click();
    		// JQ 写法 pages调用点击
   			 $('.pages_ul li').eq(localStorage.getItem('pages_index')).click();
    		// 到此渲染结束 ， 删除值 防止下次打开的时候渲染
   	 		localStorage.removeItem('nav_index');
            localStorage.removeItem('pages_index');
            localStorage.removeItem('scroll');
		 }
	}
}
~~~

#### 2. 通过HTML5的history API + 缓存 解决

- 参考地址：https://blog.csdn.net/weixin_33755847/article/details/91647571
- 其原理是：
  - 通过**history API**的 **history.pushState**或 **history.replaceState** 保存AJAX状态；
  - 同时将AJAX获取到的数据缓存起来（可以考虑使用H5的**localStorage**或**sessionstorage**）；
  - 当返回到这个页面时，先获取窗口的**history.state**，如果不为空，表示保存的有状态，我们要做的就是恢复到这个状态；
  - 读取缓存数据并加载。如果涉及到分页，且是滚动加载的形式，需要将当前页设置为history.state中的页数。