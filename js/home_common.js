(function () {
    // 请求数据(这里渲染的不是文章数据 而是 页面数据（nav、blog——font）)
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
        // 先删除值，再回到首页
        localStorage.removeItem('nav_index');
        localStorage.removeItem('pages_index');
        localStorage.removeItem('scroll');
        location.href = '/index.html';
    }
})()