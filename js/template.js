// 这里写的是article 模板
(function () {
    let str = `
<div class="page">
        <div class="header">
           <div class="mobile_nav">
                   <div class="top"></div>
                   <div class="center"></div>
                   <div class="bottom"></div>
           </div>
           <div class="type_area">
                 <img src="/image/home/coderzml.png" alt="回到主页" class="coderzml">
           </div>
           <div class="mobile_search"></div>
      </div>
        <div class="blog_font">
            <div class="type_area">
                <div class="blog_font_fill"></div>
            </div>
        </div>
        <div class="nav">
            <div class="type_area">
                <div class="nav_list"></div>
                <div class="search ui-widget">
                    <input type="text" class="search_left" placeholder="搜索文章"  id="tags">
                    <div class="search_right"></div>
                </div>
            </div>
        </div>

        <div class="type_area container">
            <div class="content">
                <div class="location">
                    <strong>您现在的位置是: </strong>
                    <span class="location_font"></span>
                </div>
                <div class="content_title">
                    <span class="title"></span>
                    <p class="time"></p>
                </div>
                <div class="md">
                    <img src="/image/detail/loading.gif" alt="加载" class="loading">
                </div>
            </div>

        </div>

        <div class="pages">
            <div class="type_area pages_bg">
                <div class="pages_box">
                    <ul class="pages_ul"></ul>
                </div>
            </div>
        </div>
    </div>
`;
    document.body.innerHTML = str;
})();