//二维码
var erweima = document.getElementsByClassName('erweima')[0]
erweima.addEventListener('mouseover', function () {
  var tupian = document.getElementsByClassName('tupian3')[0];
  tupian.style.display = 'block';
})
erweima.addEventListener('mouseout', function () {
  var tupian = document.getElementsByClassName('tupian3')[0];
  tupian.style.display = 'none';
})
//选项卡
var box = document.getElementById('jiaohu');
var input = box.getElementsByTagName('input');
var div = box.getElementsByTagName('div');
for (i = 0; i < input.length; i++) {
  input[i].index = i;
  input[i].onclick = function () {
    for (j = 0; j < div.length; j++) {
      input[j].className = ' ';
      div[j].style.display = 'none';
    }
    this.className = 'lei';
    div[this.index].style.display = 'block';
  }
}
//手机号格式
var inp = document.getElementsByClassName('phone')[0];
var p = document.getElementsByClassName('tihuan')[0];
inp.onchange = function () {
  var nub = this.value;
  var reg = /^1\d\d\d\d\d\d\d\d\d\d$/;
  if (reg.test(nub)) {
    p.innerHTML = ' ';
  } else {
    p.style.color = 'red';
    p.innerHTML = '您输入的号码格式不正确';
  }
}
//验证码格式
var inp2 = document.getElementsByClassName('phone2')[0];
var tihuan2 = document.getElementsByClassName('tihuan2')[0];
inp2.onchange = function () {
  var nub = this.value;
  var reg = /^\d+$/;
  if (reg.test(nub)) {
    tihuan2.innerHTML = ' ';
  } else {
    tihuan2.style.color = 'red';
    tihuan2.innerHTML = '您输入的验证码不正确';
  }
}
//获取验证码
var djs = document.getElementsByClassName('yzm')[0];
var times;
var kaiguan = true;
djs.onclick = function () {
  if (kaiguan) {
    kaiguan = false;
    var sj = 60;
    times = setInterval(function () {
      sj--;
      djs.innerHTML = sj;
      if (sj == 0) {
        kaiguan = true;
        clearInterval(times);
        djs.innerHTML = '重新获取';
      }
    }, 1000);
  }
}