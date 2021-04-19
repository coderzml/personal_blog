// 点击a跳转的时候 添加参数
function _blank() {
  let _blank_a = document.querySelectorAll('._blank');
  // console.log(_blank_a);
  for (let y = 0; y < _blank_a.length; y++) {
    _blank_a[y].index = y;
    _blank_a[y].onclick = function (e) {
      // console.log(this.href);
      // 先获取原来标签内的href 再添加新的href和参数
      // console.log(this.href);
      let str = this.href;
      let current = document.querySelector('.nav_ul').querySelector('.click_li');
      // 参数分别为 nav的index 属于哪个目录 和pages
      // console.log(str);
      let title = this.parentNode.parentNode.querySelector('.title_box').querySelector('.title');
      let time = this.parentNode.parentNode.querySelector('.time_read').querySelector('.time');
      // console.log(time);

      this.href = str + '?index=' + encodeURI(current.index) + '?name=' + encodeURI(current.innerText) + '?title=' + encodeURI(title.innerText) + '?time=' + encodeURI(time.innerText) + '';
      // console.log(this.href);
      // console.log(e.pageY);
      localStorage.setItem('scroll', e.pageY); // 坐标位置
      localStorage.setItem('nav_index', current.index); // 哪个导航栏
      let pages_ul_li = document.querySelector('.pages_ul').querySelector('.pages_current');
      localStorage.setItem('pages_index', pages_ul_li.index); // 哪个pages
    }
  }
}
// search
function search() {
  let search_button = document.querySelector('.search_right');
  let search_value = document.querySelector('.search_left');
  let search_left = document.querySelector('.search_left');
  // JQuery-ui，搜索提示功能
  $('head').append('<link rel="stylesheet" href="/css/jquery-ui.min.css">');
  $('html').append('<script src="/js/jquery-ui.min.js"></script>');
  search_left.onfocus = function () {
    let data = request_data().content_font;
    let arr = [];
    for (let key in data) {
      for (let i = 0; i < data[key].length; i++) {
        arr.push(data[key][i].title);
      }
    }
    // 核心函数
    $("#tags").autocomplete({
      source: arr
    });
  }


  search_button.onclick = function () {
    // 判断搜索内容不是空
    let value = search_value.value;
    if (value.trim() == '') {
      alert('请输入搜索内容');
      return false;
    }

    // 删除上一个搜索盒子 
    if (document.querySelector('.tips ') != null) {
      document.body.querySelector('div').removeChild(document.querySelector('.tips '));
    }
    // 插入一个小盒子 提示正在搜索
    let tips = document.createElement('div');
    tips.classList.add('tips');
    tips.classList.add('type_area');
    // 在元素钱买你插入元素
    document.body.querySelector('div').insertBefore(tips, document.querySelector('.container'))
    tips.innerHTML = '';
    tips.innerHTML = '"' + value + '"的搜索结果：'
    // 如果在详情页插入 提示的信息会被盖住 就加一条样式
    // if (location.href !== 'http://zmlong.usa3v.net/index.html') {
    if (location.search !== '' && document.body.clientWidth < 500) {
      // if (location.href !== 'http://127.0.0.1:5501/index.html' && document.body.clientWidth < 500) {
      document.querySelector('.tips').style.marginTop = '50px';
    }
    // 获取数据
    let data = request_data()
    let search_datas = data.content_font;
    let arr = [];
    for (const key in search_datas) {
      // console.log(datas[key]);
      for (let i = 0; i < search_datas[key].length; i++) {
        // 首次写indexOf 的时候 值和变量弄反了
        if (search_datas[key][i].title.indexOf(value) != -1) {
          arr.push(search_datas[key][i]);
        } else if (search_datas[key][i].font.indexOf(value) != -1) {
          arr.push(search_datas[key][i]);
        }
      }
    }
    // console.log(arr);
    let content_ = document.querySelector('.content');
    // content_.style.height = '688px';
    content_.innerHTML = '';
    let html = '';
    // 大盒子
    let content = document.createElement('div');
    content.classList.add('info');
    content.classList.add('search_info');
    for (let i = 0; i < arr.length; i++) { //每一个
      // console.log(each_data[i]);
      // 先判断类型再渲染
      let ClassName = '';
      // console.log(each_data[i]);
      // 根据类型添加样式
      // *******************************************************************
      // 警告：这个地方后期要有新语言类型 要手动添加样式和 switch 
      switch (arr[i].language_type) {
        case 'HTML':
          ClassName = 'html_type'
          break;
        case 'CSS':
          ClassName = 'css_type'
          break;
        case 'JS':
          ClassName = 'js_type'
          break;
        case 'JQuery':
          ClassName = 'JQuery_type'
          break;
        case 'VUE':
          ClassName = 'vue_type'
          break;
        default:
          ClassName = 'othe'
          break;
      }
      // 渲染 每个小盒子
      // -----------------------------------转义和实现点击nav更新_blank_info数据
      //window.location.href   接收
      // console.log(_blank_info);
      // <a href="${each_data[i].target_url}?index=${_blank_info.index}?name=${encodeURI(_blank_info.name)}?title=${encodeURI(each_data[i].title)}" target="_blank"><h1 class="title">${each_data[i].title}</h1></a>
      html = `<div class="box_list">
        <div class="box_list_left">
            <img src="${arr[i].img}" alt="">
        </div>
        <div class="box_list_right">
            <div class="title_box">
                <a href="${arr[i].target_url}" class="_blank" target="_blank"><h1 class="title">${arr[i].title}</h1></a>
                <div class="language_type ${ClassName}">${arr[i].language_type}</div>
            </div>
            <div class="font_box">
                <p class="font">${arr[i].font}
                </p>
            </div>
            <div class="time_read"><span class="time">发布于：${arr[i].font_time}</span>
            <a href="${arr[i].target_url}" target="_blank" class="_blank"><span class="readAll">阅读全文 > </span></a><div>
        </div>
    </div>`;
      content.innerHTML += html;
      // 到这里 html就是一组的str 
      // console.log(html);
      document.querySelector('.content').appendChild(content);
    }
    // 显示info
    // 抛出错误的原因是 找不到内容也就渲染不了info这里就会报错
    try {
      document.querySelector('.info').style.display = 'block';
    } catch (error) {
      // console.log('search 没有找到内容');
    }
    // 移出pages
    // 上面抛出错误 用下面的这种方法也行，判断有没有这个标签再做行为
    let pages = document.querySelector('.pages');
    if (pages != null) {
      document.body.querySelector('div').removeChild(pages);
    }
    // 绑定点击nav的时候渲染相应数据 （双点击）
    click_nav_load();
    // 渲染完数据a标签是美有被绑定上点击事件的
    _blank();
  }
  // 点击回车的时候
  document.querySelector('.search_left').onkeydown = function (e) {
    if (e.keyCode == 13) {
      document.querySelector('.search_right').click();
    }
  }
}

// 获取数据
function request_data() {
  // 请求
  let xhr = new XMLHttpRequest();
  let request;
  // 检测返回
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
  // 发送请求
  xhr.send(null);
  // 返回数据
  return request.home_info;
}



// 写到load函数外面的功能函数 都是load内部调用的，写到外面的原因是 后面还有函数要用到，这里就采用了分离写法。
function load() {
  // 全局数据 传给全局变量不用来回请求数据浪费资源
  let data = request_data();
  // 这个属性用于记录一个索引值（要有默认值 0 默认渲染第一个pages 没默认值会报错 渲染找不到） 当点击pages的时候替换索引值，在点击nav的时候 根据设置的索引值渲染相应的pages
  let pages_current_num = {};
  // 给默认值
  for (let key in data.content_font) {
    pages_current_num[key] = 0;
  }
  // 记录 blank 传递过去的值
  let _blank_info = {};
  let nav_ul = document.querySelector('.nav_ul').querySelector('.click_li');
  _blank_info.index = nav_ul.index;
  _blank_info.name = nav_ul.innerText;
  // console.log(_blank_info);

  // 实现顶置效果 原理是重写数据，达到顶置效果的条件是：每条数据的最后一个，id也是最后一个
  function overhead() {
    // 深度克隆数据  后面修改克隆的数据 不影响主数据
    let clone_data = clone(data.content_font);
    function clone(obj) {
      if (obj === null) return null
      if (typeof obj !== 'object') return obj;
      if (obj.constructor === Date) return new Date(obj);
      var newObj = new obj.constructor();  //保持继承链
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
          var val = obj[key];
          newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
      }
      return newObj;
    };

    // 新数据 （为什么有克隆的数据了还要新数据 因为修改数据是在克隆的数据上修改的  然后push到的新数据  达到数据的替换。）
    let new_data = {
      "home": [],
      "HTML_CSS": [],
      "JavaScript": [],
      "JQuery": [],
      "works_total": [],
      "about_me": []
    };
    // 遍历克隆的数据 下面都是替换
    for (let key in clone_data) {
      // console.log(clone_data[key]);
      // 这个变量 是新数据的id
      let num_id = -1;
      // 先给没有isOverhead的重新渲染和推进newdata
      for (let i = 0; i < clone_data[key].length; i++) {
        if (clone_data[key][i].isOverhead == undefined) {
          num_id++;
          clone_data[key][i].id = num_id;
          // console.log(clone_data[key][i].id);
          new_data[key].push(clone_data[key][i]);
        }
      }
      // 再处理有 overhead 的
      for (let i = 0; i < clone_data[key].length; i++) {
        if (clone_data[key][i].isOverhead !== undefined) {
          num_id++;
          clone_data[key][i].id = num_id;
          // console.log(clone_data[key][i]);
          new_data[key].push(clone_data[key][i]);
        }
      }

    }
    // console.log(new_data);
    // console.log(clone_data);
    // 更新数据（这里更新了数据  全局数据都被更新了）
    data.content_font = new_data;
  }
  overhead();

  // 渲染content 
  function content() {
    let data_info = data.content_font;
    // console.log(data_info); // 总的 font——content
    for (let key in data_info) { // 执行6次
      // console.log(data_info[key]); // ，每一个HTML CSS  组
      let html = '';
      // 大盒子
      let content = document.createElement('div');
      content.classList.add(key + '_info', 'info');
      let each_data = data_info[key];
      // console.log(each_data);
      // console.log(each_data);
      // console.log(each_data.length - 1);
      // console.log(each_data.length - 4);

      for (let i = each_data.length - 1; i >= 0; i--) { //每一个
        // console.log(i);
        // console.log(each_data[i]);
        // 先判断类型再渲染
        let ClassName = '';
        // console.log(each_data[i]);
        // 根据类型添加样式
        // *******************************************************************
        // 警告：这个地方后期要有新语言类型 要手动添加样式和 switch 
        switch (each_data[i].language_type) {
          case 'HTML':
            ClassName = 'html_type'
            break;
          case 'CSS':
            ClassName = 'css_type'
            break;
          case 'JS':
            ClassName = 'js_type'
            break;
          case 'JQuery':
            ClassName = 'JQuery_type'
            break;
          case 'VUE':
            ClassName = 'vue_type'
            break;
          default:
            ClassName = 'othe'
            break;
        }
        if (each_data[i].id >= each_data.length - 4 && each_data[i].id <= each_data.length - 1) {
          // if (each_data[i].id <= 3 && each_data[i].id >= 0) {
          // 渲染 每个小盒子
          // -----------------------------------转义和实现点击nav更新_blank_info数据
          //window.location.href   接收
          // console.log(_blank_info);
          // <a href="${each_data[i].target_url}?index=${_blank_info.index}?name=${encodeURI(_blank_info.name)}?title=${encodeURI(each_data[i].title)}" target="_blank"><h1 class="title">${each_data[i].title}</h1></a>
          html = `<div class="box_list">
            <div class="box_list_left">
                <img src="${each_data[i].img}" alt="">
            </div>
            <div class="box_list_right">
                <div class="title_box">
                    <a href="${each_data[i].target_url}" class="_blank" target="_blank"><h1 class="title">${each_data[i].title}</h1></a>
                    <div class="language_type ${ClassName}">${each_data[i].language_type}</div>
                </div>
                <div class="font_box">
                    <p class="font">${each_data[i].font}
                    </p>
                </div>
                <div class="time_read"><span class="time">发布于：${each_data[i].font_time}</span>
                <a href="${each_data[i].target_url}" target="_blank" class="_blank"><span class="readAll">阅读全文 > </span></a>
        </div>`;
          content.innerHTML += html;
        }
      }
      // 到这里 html就是一组的str 
      // console.log(html);
      document.querySelector('.content').appendChild(content);
    }
    // 渲染完后才能实现点击，引用的方式 不会出现没渲染完毕就绑定事件的报错行为。
    nav_click();
    // 同上
    pages();
  }
  content();
  _blank();



  // 全局 pages_current背景渲染
  // 点击nav交互
  function nav_click() {
    // 检测是否在PC端 如果是就让 进详情页被修改的高恢复
    if (document.body.clientWidth >= 980) {
      document.querySelector('.content').style.height = '688px';
    }
    // 删除上一个搜索盒子
    if (document.querySelector('.tips ') != null) {
      document.body.querySelector('div').removeChild(document.querySelector('.tips '));
    }
    // 初始化
    // 只显示一个
    let infos = document.querySelector('.content').querySelectorAll('.info');
    let nav_li = document.querySelector('.nav_ul').querySelectorAll('li');
    // 初始化
    for (let i = 0; i < infos.length; i++) {
      infos[i].style.display = 'none';
    }
    infos[0].style.display = 'block';
    // 循环绑定事件
    for (let i = 0; i < nav_li.length; i++) {
      nav_li[i].index = i;
      nav_li[i].onclick = function () {
        // 渲染title
        document.title = $(this).html();
        // 判断有没有这个标签如果有就移出 防止渲染content的时候 连location一块渲染了
        let location = document.querySelector('.location');
        let md = document.querySelector('.md');
        let content_title = document.querySelector('.content_title');
        // console.log(location);
        if (location != null) {
          // console.log(1);
          document.querySelector('.content').removeChild(location);
          document.querySelector('.content').removeChild(md);
          document.querySelector('.content').removeChild(content_title);
        }

        // 网页不刷新 修改url
        // location.pathname = '/index.html';
        history.pushState('', '', '/');
        // 更新_blank_info的数据
        _blank_info.index = this.index;
        _blank_info.name = this.innerText;
        // console.log(_blank_info);

        // 交互
        for (let y = 0; y < nav_li.length; y++) {
          nav_li[y].classList.remove('click_li');
        }
        this.classList.add('click_li');
        for (let y = 0; y < infos.length; y++) {
          infos[y].style.display = 'none';
        }
        // console.log(this.index);
        infos[this.index].style.display = 'block';
        // 传入参数动态渲染
        // let data_info = data.content_font;
        // *******************************************************************
        // 警告：点击获取相应的索引 给对应的 数据（长度）传到pages 动态渲染多少个pages小方块
        switch (this.index) {
          case 0:
            pages('home');
            break;
          case 1:
            pages('HTML_CSS');
            break;
          case 2:
            pages('JavaScript');
            break;
          case 3:
            pages('JQuery');
            break;
          case 4:
            pages('works_total');
            break;
          case 5:
            pages('about_me');
            break;
          default:
            break;
        }
        // *******************************************************************
        // 点击nav传名字到pages 方便pages更新数据 
        if (this.innerHTML == '首页') {
          click_pages('home');
        } else if (this.innerHTML == 'HTML+CSS') {
          click_pages('HTML_CSS');
        } else if (this.innerHTML == 'JavaScript') {
          click_pages('JavaScript');
        } else if (this.innerHTML == 'JQuery') {
          click_pages('JQuery');
        } else if (this.innerHTML == '作品集') {
          click_pages('works_total');
        } else if (this.innerHTML == '关于我') {
          click_pages('about_me');
        }
      }
    }
  }
  var click_next;
  // pages渲染
  function pages(pages_name = 'home') {
    click_next = pages_name;
    // console.log(pages_name);
    if (document.querySelector('.pages') == null) {
      let pages = document.createElement('div');
      pages.classList.add('pages');
      let str = `
            <div class="type_area pages_bg">
                <div class="pages_box">
                    <ul class="pages_ul"></ul>
                </div>
            </div>`;
      pages.innerHTML = str;
      document.body.querySelector('div').appendChild(pages);
    }
    document.querySelector('.pages_ul').innerHTML = '';
    let data_info = data.content_font[pages_name];
    // console.log(data_info);
    let li_num = Math.ceil(data_info.length / 4);
    for (let i = 0; i < li_num; i++) {
      let li = document.createElement('li');
      li.innerHTML = i + 1;
      document.querySelector('.pages_ul').appendChild(li);
    }
    // 添加 >
    let li = document.createElement('li');
    li.innerHTML = '>';
    li.classList.add('next');
    document.querySelector('.pages_ul').appendChild(li);

    let li_last = document.createElement('li');
    li_last.innerHTML = '<';
    li_last.classList.add('last');
    document.querySelector('.pages_ul').appendChild(li_last);


    // 动态添加page_box的宽度实现居中
    let li_length = document.querySelector('.pages_ul').querySelectorAll('li').length;
    document.querySelector('.pages_box').style.width = li_length * 44 + 'px';
    // pages默认背景色 根据索引动态添加
    // console.log(pages_current_num[pages_name]);
    document.querySelector('.pages_ul').querySelectorAll('li')[pages_current_num[pages_name]].classList.add('pages_current');
    click_pages();
  }

  // pages 点击
  function click_pages(pages_info_name = 'home') {
    // console.log(pages_info_name);
    let pages_li = document.querySelector('.pages_ul').querySelectorAll('li');
    for (let i = 0; i < pages_li.length - 2; i++) {
      pages_li[i].index = i;
      pages_li[i].onclick = function () {
        // let str1 = '';
        // 这一步省略了 因为传过来之前已经做了判断
        // if (pages_info_name == 'home') {
        //     console.log(1);
        //     pages_info_name = 'home';
        // } else if (pages_info_name == 'HTML') {
        //     console.log(2);
        //     pages_info_name = '.HTML_info';
        // }

        // console.log(pages_info_name);
        // console.log(this.index);
        // 记录当前的索引 给全局变量索引赋值
        // console.log(this.index);
        // console.log(pages_info_name);
        // console.log(pages_current_num);
        // pages_info_name的值没有传到位 每次都是 home传了过来。原因是switch没写到点击事件内，改后行了。
        pages_current_num[pages_info_name] = this.index;
        // console.log(pages_current_num);
        // 点击谁给谁添加背景色 和 切换pages
        for (let y = 0; y < pages_li.length; y++) {
          pages_li[y].classList.remove('pages_current');
        }
        this.classList.add('pages_current');
        let page = pages_info_name;
        // console.log(page);

        let data_info = data.content_font[page];
        if (this.innerHTML == i + 1) {
          // hake方法 -----------------------------------------------
          // 后面如果pages小方快 多于3个 就会报错 因为 这里实现了3个,也就是12个页面
          // 算法 num1每次加4 , num2 每次加4 .取的区间就算 4个页面
          // 为什么要这样写呢 因为直接套到循环内部 实现不了
          let num1;
          let num2;
          if (this.innerHTML == 1) {
            num1 = data_info.length - 4;
            num2 = data_info.length - 1;
            // console.log(num1);
            // console.log(num2);
          } else if (this.innerHTML == 2) {
            num1 = data_info.length - 8;
            num2 = data_info.length - 5;
            // console.log(num1);
            // console.log(num2);

          } else if (this.innerHTML == 3) {
            num1 = data_info.length - 12;
            num2 = data_info.length - 9;
            // console.log(num1);
            // console.log(num2);

          }

          // console.log(data_info);
          let html = '';
          for (let i = data_info.length - 1; i >= 0; i--) {
            // console.log(data_info[i].id);
            if (data_info[i].id >= num1 && data_info[i].id <= num2) {
              let ClassName = '';
              // console.log(each_data[i]);
              // 根据类型添加样式 -------------------------------------------
              // 同content
              switch (data_info[i].language_type) {
                case 'HTML':
                  ClassName = 'html_type'
                  break;
                case 'CSS':
                  ClassName = 'css_type'
                  break;
                case 'JS':
                  ClassName = 'js_type'
                  break;
                case 'JQuery':
                  ClassName = 'JQuery_type'
                  break;
                case 'VUE':
                  ClassName = 'vue_type'
                  break;
                default:
                  ClassName = 'othe'
                  break;
              }
              // let str = data_info[i].language_type;
              html += `<div class="box_list">
                            <div class="box_list_left">
                                <img src="${data_info[i].img}" alt="">
                            </div>
                            <div class="box_list_right">
                                <div class="title_box">
                                <a href="${data_info[i].target_url}" class="_blank" target="_blank"><h1 class="title">${data_info[i].title}</h1></a>
                                <div class="language_type ${ClassName}">${data_info[i].language_type}</div>
                                </div>
                                <div class="font_box">
                                    <p class="font">${data_info[i].font}
                                    </p>
                                </div>
                            <div class="time_read">
                                <span class="time">发布于：${data_info[i].font_time}</span>
                                <a href="${data_info[i].target_url}" target="_blank" class="_blank"><span class="readAll">阅读全文 > </span></a>
                             </div>
                            </div>
                        </div>`;
            }
          }
          // console.log(html);
          let className = page + '_info';
          // console.log(className);

          document.querySelector('.' + className).innerHTML = html;
        }
        // 点击pages的时候a标签被替换了 所以得重新调用
        _blank();
      }

    }
    // 点击next
    pages_li[pages_li.length - 2].onclick = function () {
      if (pages_current_num[click_next] < pages_li.length - 3) {
        pages_current_num[click_next]++;
        pages_li[pages_current_num[click_next]].click();
      }
    }
    // 点击last
    pages_li[pages_li.length - 1].onclick = function () {
      if (pages_current_num[click_next] < pages_li.length - 2) {
        if (pages_current_num[click_next] > 0) {
          pages_current_num[click_next]--;
          pages_li[pages_current_num[click_next]].click();
        }
      }
    }
  }
  // 重新绑定搜索
  search();
}
// load函数结束

// 点击nav渲染原始页面
function click_nav_load() {
  let ul_li = document.querySelector('.nav_ul').querySelectorAll('li');
  for (let i = 0; i < ul_li.length; i++) {
    ul_li[i].onclick = function () {
      // 不管点击谁 都渲染content
      document.querySelector('.search_left').value = '';
      // 清除searchinfo模块
      if (document.querySelector('.search_info') != null) {
        document.querySelector('.content').removeChild(document.querySelector('.search_info'));
        // 清空搜索框内的值
      }
      load();
      // 渲染玩content再次点击就会实现跳转 所以这里直接实现 双点击
      this.click();
    }
  }
}
// 渲染所在位置
function pages_location() {
  // search 重新绑定
  search();
  let url = decodeURI(location.search);// 传递的参数
  url = url.split('?'); // 分割字符串转数组
  url.shift(); // 删除第一个数组没用的东西
  let obj = {};// 数据
  for (let i = 0; i < url.length; i++) {
    let newArr = url[i].split('='); // 再次分割等号 
    obj[newArr[0]] = newArr[1];//分配到对象内
  }
  // console.log(obj);
  // nav默认的click
  let nav_li = document.querySelector('.nav_ul').querySelectorAll('li');
  // 初始化
  for (let i = 0; i < nav_li.length; i++) {
    nav_li[i].classList.remove('click_li');
  }
  // console.log(obj);
  if (obj.index != null) {
    nav_li[obj.index].classList.add('click_li');
  }
  // 渲染传递过来的内容
  document.querySelector('.location_font').innerHTML = obj.name + ' > ' + obj.title;
  document.querySelector('.title').innerHTML = obj.title;
  document.querySelector('.time').innerHTML = obj.time;
  // 改页面的title
  document.title = obj.title;
  // pages隐藏
  let pages = document.querySelector('.pages');
  document.querySelector('div').removeChild(pages);
  // content的高
  document.querySelector('.content').style.height = 'auto';
}
// 请求md文件
function md(url) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    // 判断是否成功 最严谨的做法
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        document.querySelector('.md').innerHTML = xhr.responseText;
      } else {
        alert('request error');
      }
    }
  }
  xhr.open('get', url);
  xhr.send(null);
}
// 简单化页面 这些代码本应写在每个article内
function template(url) {
  // 点击nav的时候渲染load（首页）
  click_nav_load();
  // 渲染pages位置信息
  pages_location();
  // 请求md
  md(url);
}

// 微信内置浏览器在返回上一页面，且上一页面包含AJAX代码时，页面就会被强制刷新，极度影响用户体验。而我们想要的效果是：返回上一页面时，页面还停留在原来的状态，AJAX获取到的数据还在，滚动条也在原来的位置
// 每当微信返回刷新的时候就会执行 || 刚打开的时候 所以要渲染完删除
// if (location.href == 'http://zmlong.usa3v.net/') {
if (location.search == '') {
  // console.log(localStorage.getItem('scroll'));
  // 如果有值

  let scroll = localStorage.getItem('scroll');
  if (scroll !== null) {
    // 开始渲染
    // 触发事件 调用点击
    $(document).ready(function () {
      window.scrollTo(0, scroll); // 改变scroll的位置 注意参数 第一个是x,第二个是y
      // JQ 调用点击
      $('.nav_ul li').eq(localStorage.getItem('nav_index')).click();
      $('.pages_ul li').eq(localStorage.getItem('pages_index')).click();
      // 原生调用点击
      // document.querySelector('.nav_ul').querySelectorAll('li')[localStorage.getItem('nav_index')].click();
      // document.querySelector('.pages_ul').querySelectorAll('li')[localStorage.getItem('pages_index')].click();
      // 到此渲染结束 ， 删除值 防止下次打开的时候渲染
      localStorage.removeItem('nav_index');
      localStorage.removeItem('pages_index');
      localStorage.removeItem('scroll');
    })
    // onload函数执行太慢了（等页面元素都加载完毕后才执行）就会造成 如果渲染慢 出现 短暂的闪屏情况 。而JQ的ready时间是dom元素被解析就执行
    // window.onload = function () {

    // }
  }
}


// 被卷曲的头部 点击回到顶部
window.onscroll = function (e) {
  // console.log($(document).scrollTop());
  let scroll = $(document).scrollTop()
  if (scroll > 2500) {
    if (document.body.querySelector('.go_top') == null) {
      let img = document.createElement('img');
      img.className = 'go_top';
      img.src = '/image/detail/top.png';
      document.body.appendChild(img);
    }
    $('.go_top').click(function () {
      $(this).stop().animate({
        top: 0
      });
      $("body, html").stop().animate({
        scrollTop: 0
      });
    })
  } else {
    if (document.body.querySelector('.go_top') !== null) {
      document.body.removeChild(document.querySelector('.go_top'));
    }
  }

}
