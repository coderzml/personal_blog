var lunbo = document.querySelector('.lunbo');
var ul = lunbo.children[0];
var w = lunbo.offsetWidth;
var index = 0;
var ol = lunbo.children[1];
//1.没过两秒让动画动以下
var timer = setInterval(function () {
    //动画每动一次就让index加1 
    index++;
    var translatex = -index * w;
    //动画每次所移动的距离就是变量×图片的宽度
    ul.style.transition = 'all .5s';
    ul.style.transform = 'translateX(' + translatex + 'px' + ')';
}, 2000);
//2.检测轮播到第三张图片的时候迅速跳转到首页 而且是动画过渡完成后
ul.addEventListener('transitionend', function () {
    if (index >= 3) {
        index = 0;
        var translatex = -index * w;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px' + ')';
    } else if (index < 0) {
        //如果动画是倒着走的就到最后一张上去 因为index赋值给了最后一张图片的下标
        index = 2;
        var translatex = -index * w;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px' + ')';
    }
    //3.小圆点跟随   重点 两行代码解决了大部分麻烦
    //先找到真带有on的类的标签 然后去掉 
    ol.querySelector('.on').classList.remove('on');
    // 去掉之后给index个添加 这里index指的是图片的index 刚哈匹配
    ol.children[index].classList.add('on');
});
//4.手指拖动轮播图
//手指的移动距离= 手指移动后的距离 -  手指初始化距离
// 元素移动距离 = 初始化元素距离+手指的移动距离
var startX = 0;
var moveX = 0;
//这里写全局变量是为了下面判断滑动的距离 回弹
var flag = false;
ul.addEventListener('touchstart', function (e) {
    //手指的初始化坐标
    startX = e.changedTouches[0].pageX;
    //手指划上取消定时器
    clearInterval(timer);
});
ul.addEventListener('touchmove', function (e) {
    //手指的移动后距离
    moveX = e.changedTouches[0].pageX - startX;
    //元素的移动距离因为是局部变量所以给上面不冲突 translatex
    var translatex = -index * w + moveX;
    ul.style.transition = 'none';
    ul.style.transform = 'translateX(' + translatex + 'px' + ')';
    flag = true;
});
// 3.用手指滑动后判断位置
ul.addEventListener('touchend', function () {
    if (flag) {
        //用取绝对值是为了把滑动的结果不管正值负值 都去正值好计算
        if (Math.abs(moveX) > 50) {
            //如果move X大于零 说明是右滑 就是正数
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px' + ')';
        } else {
            //如果手指滑动的距离小于50 就不做操作
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px' + ')';
        }
    }
    // 4.手指离开i后开启定时器
    //开启前先清除 注意不加var
    clearInterval(timer);
    timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translatex + 'px' + ')';
    }, 2000);
});
//返回顶部
var goback = document.querySelector('.goback');
var nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
    if (window.pageYOffset >= nav.offsetTop) {
        goback.style.display = 'block';
    } else {
        goback.style.display = 'none';
    }
});
goback.addEventListener('click', function () {
    window.scroll(0, 0);
});