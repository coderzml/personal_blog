$(function () {
    //5.节流阀 互斥锁 有bug的原因是当点击了li后不需要执行第四步操作
    var flag = true;
    toggle_floor();   //很多时候写的条件是正确的但是执行的条件需要被动触发时 可以封装一个函数 打开页面就加载一次 计算位置   细节
    function toggle_floor() {
        if ($(document).scrollTop() >= tuijian) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }
    //    1. 页面滚动事件
    var tuijian = $('.tuijian').offset().top;  //获取推荐模块距离顶部的距离
    $(window).scroll(function () {
        toggle_floor();
        // 4. 电梯到导航滑倒面那个位置 就给相应的li添加类
        // 思路：通过遍历的方法拿到全部的div距离文档顶部的距离 如果超过了 就拿到div的i坐标
        if (flag) {
            $('.floor .w').each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i);
                    $('.fixedtool li').eq(i).addClass('toolred').siblings().removeClass();
                }
            });
        }
    });
    //2.点击点击跳到相应的位置
    $('.fixedtool li').click(function () {
        flag = false;
        var index = $(this).index();
        var current = $('.floor .w').eq(index).offset().top;
        $('body,html').stop().animate({  //做动画是给整个页面而不是div
            scrollTop: current   //细节
        }, function () {
            flag = true;
        });
        //3.点击谁给谁添加样式
        $(this).addClass('toolred').siblings('li').removeClass('toolred');
    });
});