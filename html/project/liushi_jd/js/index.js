// 点击关闭app
var off_app = document.getElementsByClassName('off_app')[0];
var app = document.getElementsByClassName('app')[0];
off_app.onclick = function() {
    app.style.display = 'none';
}

let t1 = 0;
let t2 = 0;
let timer = null; // 定时器

// scroll监听
document.onscroll = function() {
    clearTimeout(timer);
    timer = setTimeout(isScrollEnd, 100);
    t1 = document.documentElement.scrollTop || document.body.scrollTop;
}

function isScrollEnd() {
    var search = document.getElementsByClassName('search')[0];
    t2 = document.documentElement.scrollTop || document.body.scrollTop;
    if (t2 == t1) {
        console.log('滚动结束了')
            // 滚动时让search吸顶
        search.style.position = 'fixed';
        search.style.top = 0;
        var app = document.getElementsByClassName('app')[0];
        app.style.opction = 0;
    }
}