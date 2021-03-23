$(function() {
    //有一个报错是因为绑定事件时 给input绑定的单击事件 后面双击生成后input后 再次点击input  input的单击事件还在所以会报错 不过不影响(需要修改可以添加类名)
    // 页面一打卡就加载数据
    load();
    // 1.打开页面后获取locas的数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            data = JSON.parse(data);
            return data;
        } else {
            return [];
        }
    }
    // 1.2.1
    function addData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    // 2.渲染数据
    function load() {
        var data = getData();
        $('ol,ul').html('');
        var todocount = 0;
        var donecount = 0;
        $.each(data, function(index, value) {
            if (value.done) {
                $('ul').prepend("<li> <input type='checkbox' checked = 'checked'> <p class='ul_p'>" + value.title + "</p> <a href='javascript:;' id=" + index + "></a> </li>");
                donecount++;
            } else {
                $('ol').prepend("<li> <input type='checkbox'> <p class='ol_p'>" + value.title + "</p> <a href='javascript:;' id=" + index + "></a> </li>");
                todocount++;
            }
        });
        $('.todocount').text(todocount);
        $('.donecount').text(donecount);

    }
    // 3.删除操作
    $('ol,ul').on('click', 'a', function() {
        // 3.1获取数据
        var data = getData();
        // 3.2修改数据(拿到对应的索引)
        var index = $(this).attr('id');
        data.splice(index, 1);
        // 3.3添加数据
        addData(data);
        // 3.4重新渲染页面
        load();
    });
    // ４.选中状态和非选中状态
    $('ol,ul').on('click', 'input', function() {
        // 获取本地存储的数据
        var data = getData();
        var index = $(this).siblings('a').attr('id');
        // 修改数据（细节）
        data[index].done = $(this).prop('checked');
        // 添加数据
        addData(data);
        // 渲染数据
        load();
    });
    // 1.1 点击回车的时候
    $('#title').on('keydown', function(e) {
        if ($(this).val().trim() !== '') {
            if (e.keyCode === 13) {
                var local = getData();
                //    1.2保存到本地存储;
                local.push({ 'title': $('#title').val(), 'done': false });
                addData(local);
                load();
            }
        }

    });
    //双击的时候可以替换内容
    $('ol,ul').on('dblclick', 'p', function() {
        //获取当前p的font
        var str = $(this).text();
        //声明一个this == p 后面input能用
        var thet = $(this);
        //生成input标签
        $(this).html('<input type="text" class="addinput">');
        //改变p标签this的val==str 并全选方便删除
        $(this).children('input').val(str).select();
        //给后来添加的input绑定事件（尽量用on绑定 因为都是后来添加的元素 这样不容易出错）
        $(this).children('input').on('blur', function() {
            //如果输入框有内容就改内容 
            if ($(this).val() != '') {
                //获取input的val 方便存
                var val = $(this).val();
                // 获取数据
                var data = getData();
                // 获取下标用于修改哪个
                var index = $(this).parent('p').siblings('a').attr('id');
                // 修改数据
                data[index].title = val;
                // 添加（保存）数据
                addData(data);
                // 重新渲染页面
                load();
            } else {
                // 如果输入框没内容就重新渲染 不修改内容
                load();
            }
        });
    })
});