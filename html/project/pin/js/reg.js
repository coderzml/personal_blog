
function regexp(obj, reg, dui, cuo) {
    obj.onblur = function () {
        if (reg.test(obj.value)) {
            this.nextElementSibling.style.display = 'inline-block';
            this.nextElementSibling.children[0].className = 'true';
            this.nextElementSibling.children[1].className = 'font_true';
            this.nextElementSibling.children[1].innerHTML = dui;
        } else {
            this.nextElementSibling.style.display = 'inline-block';
            this.nextElementSibling.children[0].className = 'false';
            this.nextElementSibling.children[1].className = 'font_false';
            this.nextElementSibling.children[1].innerHTML = cuo;
        }
    }
}
var tel = document.querySelector('#in');
var tel_reg = /^1[3|4|5|7|8]\d{9}$/;
regexp(tel, tel_reg, '您输入的没毛病', '手机号码格式不正确，请从新输入');
var msg = document.querySelector('#in2');
var msg_reg = /^\d{6}$/;
regexp(msg, msg_reg, '您输入的没毛病', '请检查6位短信验证码');
var pad = document.querySelector('#in3');
var pad_reg = /^\w{6,16}$/;
regexp(pad, pad_reg, '您输入的没毛病', '请6-16位密码 并检查是否输入正确');
pad.addEventListener('blur', function () {
    if (this.value.trim() != '') {
        var ls = this.value.length;
        if (ls <= 8) {
            document.querySelector('.zhong').style.display = 'none';
            document.querySelector('.qiang').style.display = 'none';
            document.querySelector('.ruo').style.display = 'inline-block';
        } else if (ls <= 12 && ls >= 8) {
            document.querySelector('.ruo').style.display = 'none';
            document.querySelector('.qiang').style.display = 'none';
            document.querySelector('.zhong').style.display = 'inline-block';
        } else {
            document.querySelector('.ruo').style.display = 'none';
            document.querySelector('.qiang').style.display = 'inline-block';
            document.querySelector('.zhong').style.display = 'none';
        }
    }
})
var is_pad = document.querySelector('#in4');
is_pad.onblur = function () {
    if (this.value == pad.value) {
        this.nextElementSibling.style.display = 'inline-block';
        this.nextElementSibling.children[0].className = 'true';
        this.nextElementSibling.children[1].className = 'font_true';
        this.nextElementSibling.children[0].innerHTML = '';
    } else {
        this.nextElementSibling.style.display = 'inline-block';
        this.nextElementSibling.children[0].className = 'false';
        this.nextElementSibling.children[1].className = 'font_false';
        this.nextElementSibling.children[1].innerHTML = '量词输入的密码不一致';
    }
}
