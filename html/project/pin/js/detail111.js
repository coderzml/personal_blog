// 显示隐藏小选项
function hidden() {
    var dd_bottom = document.querySelector('.dd_bottom');
    dd_bottom.style.height = '0';
    var list_item = document.querySelectorAll('.dd_item');
    for (var i = 0; i < list_item.length; i++) {
        list_item[i].style.display = 'none';
    }
    var flag = false;
    var dt_top = document.querySelector('.dt_top');
    if (flag == false) {
        dt_top.addEventListener('mouseover', function () {
            dd_bottom.style.height = '465px';
            for (var i = 0; i < list_item.length; i++) {
                list_item[i].style.display = 'block';
            }

        });
    }
    // 小选项li
    function list() {
        var contant = document.querySelector('.item_teb').querySelectorAll('div');
        var index;
        for (var i = 0; i < list_item.length; i++) {
            list_item[i].setAttribute('date-index', i);
            list_item[i].addEventListener('mouseover', function () {
                // list_item[i].classList.remove('on');
                this.classList.add('on');
                index = this.getAttribute('date-index');
                contant[index].style.display = 'block';

            });
            list_item[i].addEventListener('mouseout', function () {
                this.classList.remove('on');
            })
            contant[i].addEventListener('mouseout', function () {
                for (var i = 0; i < contant.length; i++) {
                    contant[i].style.display = 'none';
                }
                flag = true;
                dd_bottom.style.height = '0';
                for (var i = 0; i < list_item.length; i++) {
                    list_item[i].style.display = 'none';
                }

                if (flag == true) {
                    dd_bottom.addEventListener('mouseleave', function () {
                        flag = false;
                    });
                }

            });
        }
    }
    list();
}
hidden();
//京东放大镜效果
var box_img = document.querySelector('.preview_img'); //小盒子
var show = document.querySelector('.huakuai');   //滑块
var max_box = document.querySelector('.max_img_box');//大盒子
var max_img = document.querySelector('.max_img');  //大盒子图片
//鼠标划上时元素显示
box_img.addEventListener('mousemove', function (e) {
    show.style.display = 'block';
    max_box.style.display = 'block';
    //求鼠标在元素中的坐标
    var x = e.pageX - this.offsetWidth + 50;
    var y = e.pageY - this.offsetHeight / 2 - 30;

    //     //求show的最大移动距离
    var bigyiX = box_img.offsetWidth - show.offsetWidth;
    var bigyiY = box_img.offsetHeight - show.offsetHeight;
    // console.log(bigyiX, bigyiY);
    // 让滑块居中
    var miny = y - show.offsetHeight / 2;
    var minx = x - show.offsetWidth / 2;
    if (minx <= 0) {   //限制遮罩层最小移动距离
        minx = 0;      //直接赋值为0 就是说限制死
    } else if (minx >= bigyiX) {  //限制遮罩层的移动距离 让他在自己的最大移动距离内 
        minx = bigyiX;     //如果也想超过最大移动距离就把他限制死
    }
    if (miny <= 0) {
        miny = 0;
    } else if (miny >= bigyiY) {
        miny = bigyiY;
    }
    show.style.left = minx + 'px';
    show.style.top = miny + 'px';
    var maximgx = max_img.offsetWidth - max_box.offsetWidth;
    var maximgy = max_img.offsetHeight - max_box.offsetHeight;
    var bigMaxY = miny * maximgy / bigyiY;
    var bigMaxX = minx * maximgx / bigyiX;
    max_img.style.top = -bigMaxY + 'px';
    max_img.style.left = -bigMaxX + 'px';
});
box_img.addEventListener('mouseout', function () {
    show.style.display = 'none';
    max_box.style.display = 'none';
});

//放大镜
var right = document.querySelector('.preview_list_right');
var left = document.querySelector('.preview_list_left');
var min_img = document.querySelector('.min_img');  //小盒子图片
//preview_list_border
var preview_list = document.querySelector('.preview_list').querySelectorAll('li');
var preview_img = document.querySelector('.preview_list').querySelectorAll('img');
var num = 0;
var sum = 0;
for (var i = 0; i < preview_img.length; i++) {
    preview_img[i].addEventListener('mouseover', function () {
        for (var i = 0; i < preview_list.length; i++) {
            preview_img[i].classList.remove('preview_list_border');
        }
        this.classList.add('preview_list_border');
        var src = this.src;
        max_img.src = src;
        min_img.src = src;
    });
}
var width = preview_img.length * 61.666;
var over = document.querySelector('.over');
var ulwidth = over.offsetWidth;
var dong = document.querySelector('.dong');

right.addEventListener('click', function () {
    dong.style.marginLeft = -(width - ulwidth) + 'px';
})
left.addEventListener('click', function () {
    dong.style.marginLeft = '0'
})

// 选择tyoe
function type(obj) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].addEventListener('click', function () {
            for (var i = 0; i < obj.length; i++) {
                obj[i].classList.remove('current');
            }
            this.classList.add('current');
        });
    }
}
var choose_tao = document.querySelector('.choose_tao').querySelectorAll('a');
type(choose_tao)
var choose_type = document.querySelector('.choose_type').querySelectorAll('a');
type(choose_type)
var choose_container = document.querySelector('.choose_container').querySelectorAll('a');
type(choose_container)
var choose_version = document.querySelector('.choose_version').querySelectorAll('a');
type(choose_version)
var choose_color = document.querySelector('.choose_color').querySelectorAll('a');
type(choose_color)

//购物车
$(function () {
    $('.add').click(function () {
        var n = $('.addcar_num').val();
        n++;
        $('.addcar_num').val(n);

    });
    $('.reduce').click(function () {
        var n = $('.addcar_num').val();
        if (n == 1) {
            return false;
        }
        //当初始值拿过来等于1 时就禁止下面的操作
        n--;
        $('.addcar_num').val(n);

    });
});