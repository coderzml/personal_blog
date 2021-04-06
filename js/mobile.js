// 移动端

// 禁用缩放、放大
function ban_big() {
    // 禁用缩放
    function addMeta() {
        $('head').append('<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />');
    }
    setTimeout(addMeta, 3000);

    // 禁用双指放大
    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, {
            passive: false
        });

    // 禁用双击放大
    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, {
            passive: false
        });
}

// 移动端
if (document.body.clientWidth < 500) {
    // 禁止放大
    ban_big();
    // 点击侧边栏
    $(".mobile_nav").click(function () {
        $(".nav_list").slideToggle(400);
    })
    // 点击搜索框
    $(".mobile_search").click(function () {
        if ($(".nav").css("top") == "0px") {
            $('.nav').animate({
                top: "51px"
            }, 350, function () {
                // 动画做完之后 获得焦点 调出键盘
                $('.search_left').focus();
            });
        } else {
            $('.nav').animate({
                top: "0"
            }, 300, function () {
                // 动画做完之后 失去焦点
                $('.search_left').blur();
                // 改回tips位置
                if ($('.tips').css("marginTop") == "50px") {
                    $('.tips').animate({
                        marginTop: 0
                    })
                }
            });
        }
    });
    // 点击侧边栏做动画
    $(".mobile_nav").click(function () {
        if (!$('.top').hasClass('rotate')) {
            $('.top').addClass('rotate');
            $(".center").css({
                opacity: 0,
            });
            $('.top').css({
                top: '8px',
                transform: "rotate(45deg)"
            })
            $('.bottom').css({
                top: '-8px',
                transform: "rotate(-45deg)"
            })
        } else {
            $('.top').removeClass('rotate');
            $(".center").css({
                opacity: 1,
            });
            $('.top').css({
                top: '0px',
                transform: "rotate(0deg)"
            })
            $('.bottom').css({
                top: '0px',
                transform: "rotate(0deg)"
            })
        }
    })

    // 点击nav里面的任何一项 切换完 让导航收上去
    $('.nav_ul li').click(function () {
        // 点击了nav里面的li代表去到首页了 那么让blog文字显示
        $('.blog_font').show(200);
        // 往上收的方式取代了 调用 点击侧边栏  但是动画要重新做
        $('.nav_list').slideUp();
        $(".center").css({
            opacity: 1,
        });
        // 同样移出class
        $('.top').removeClass('rotate');
        $('.top').css({
            top: '0px',
            transform: "rotate(0deg)"
        })
        $('.bottom').css({
            top: '0px',
            transform: "rotate(0deg)"
        })
        // 改回原来的样式
        // 让blog文字显示
        $('.blog_font').show();
        // 改回背景色
        $('.content').css({
            background: "#e6e6e6",
            marginTop: '20px',
        });
        // 点击谁改document-title
        document.title = $(this).html();
    });
    // 点击进入详情页的时候
    if (location.search !== '') {
        // 让blog文字隐藏（只在首页显示）
        $('.blog_font').hide();
        // 让背景色改为白色
        $('.content').css({
            background: "#fff",
            marginTop: 0,
        });
    }
    // 点击搜索的时候一样还原样式 （因为去到详情页的时候改样式了）
    $('.search_right').click(function () {
        // 改回背景色
        $('.content').css({
            background: "#e6e6e6",
            marginTop: '20px',
        });
    })
}