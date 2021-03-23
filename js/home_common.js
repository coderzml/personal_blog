(function () {
    // 请求数据
    // 确保 ajax传递给全局变量，否则要多次查询浪费资源
    // 使用JQ有解决方法，但是　因为一些数据就使用JQ　有些不妥
    let data = request_data();
    function request_data() {
        let xhr = new XMLHttpRequest();
        let request;
        xhr.onreadystatechange = function () {
            // 判断是否成功 最严谨的做法
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    request = JSON.parse(xhr.responseText);
                } else {
                    alert('request error');
                }
            }
        }
        // 请求头 这个改为同步请求了 报了警告 使用异步不能给全局变量赋值
        xhr.open('get', '/json/home.json', false);
        xhr.send(null);
        // 返回数据
        return request.home_info;
    }
    // 渲染头部
    function header() {
        let header = document.querySelector('.header');
        let coderzml = document.querySelector('.coderzml');
        let blog_font_fill = document.querySelector('.blog_font_fill');
        header.style.backgroundImage = 'url(' + data.blog_bg + ')';
        // src属性不属于css样式
        coderzml.src = data.blog_name;
        blog_font_fill.innerHTML = data.blog_font;
    }
    header();
    // 渲染nav
    function nav() {
        let ul = document.createElement('ul');
        ul.classList.add('nav_ul');
        for (let i = 0; i < data.nav.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = data.nav[i];
            ul.appendChild(li);
        }
        let nav_list = document.querySelector('.nav_list');
        nav_list.appendChild(ul);
        let nav_ul_li = document.querySelector('.nav_ul').querySelectorAll('li');
        // 给li设置索引
        for (let i = 0; i < nav_ul_li.length; i++) {
            nav_ul_li[i].index = i;
        }
        // 默认第一个是白色
        let nav_li_filst = nav_list.querySelector('li')
        nav_li_filst.classList.add('click_li');
        // 渲染search
        let search_right = document.querySelector('.search_right');
        search_right.style.backgroundImage = 'url(' + data.big_glass + ')';
    }
    nav();
    // 点击coderzml的时候回到主页
    document.querySelector('.coderzml').onclick = function () {
        location.href = '/index.html';
    }


    // 移动端的JS 代码
    // 这个刷新页面的用处是 让下面的if语句 被绑定 ------------------
    // 这个写法是错误的 如果是在pc端打开 调试工具为移动真机 要重新刷新页面才会执行，因为切换到真机预览不会重新执行代码。但是移动端不一样 移动端是直接重新执行的代码 所以这一步 不需要，而且 这一步 会造成 下拉搜索框的时候 布局发生改变 那么屏幕大小就改变了  就会造成点击搜索框刷新页面！

    // window.onresize = function () {
    //     window.location.reload();
    // }
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
})()

