## JS语法ES6、ES7、ES8、ES9、ES10、ES11、ES12新特性

> 本文集合了 ES6 至 ES11 常用到的特性，包括还在规划的 ES12，只列举大概使用，详细介绍的话内容量将十分巨大~.~。PS：使用新特性需要使用最新版的 bable 就行转义（babel学习地址：在站内搜索”babel“）

#### ES6（2015）

##### 1.类（class）

~~~javascript
//声明类  
class Man {
    //构造器
        constructor(name) {
            this.name = name;
        }
    //创建功能函数
        console() {
            console.log(this.name);
        }
    }
//使用类
    const man = new Man('coderzml');
    man.console(); // coderzml
~~~

- 加new关键字，可以省去return

##### **2.模块化(ES Module)**

~~~js
// 模块 A 导出一个方法
export const sub = (a, b) => a + b;
// 模块 B 导入使用
import { sub } from './A';
console.log(sub(1, 2)); // 3
~~~

- 这个用babel转义的时候 会有reqiure找不到的报错，原因参考（站内babel学习地址）

##### 3.箭头函数

~~~js
const func = (a, b) => a + b;
func(1, 2); // 3
~~~

- 只有一条代码的时候 return 可以省略，大括号也可以
- 参数只有一个的时候（）小括号可以省略
- 箭头函数中不绑定this 所以箭头函数中的this指向的是箭头函数所在的函数(对象不是一个函数也没有自己的作用域)

##### 4.函数参数默认值

~~~js
function message(name = 'zml') {
    console.log(name);
}
message('张三');
~~~

- 如果下面调用的时候 不传入值的话，那参数默认就是zml

##### 5.模板字符串

~~~js
const name = 'zml';
const str = `Your name is ${name}`;
~~~

- 模板字符串 是ESC键下面那个符号，定义字符串可以不换行
- 插入数据用 ${变量}

##### 6.解构赋值

~~~js
//之前交换变量用
    let a = 1;
    let b = 2;
    let c;
    c = a;
    a = b;
    b = c;
//显示直接
let a = 1, b= 2;
[a, b] = [b, a]; // a 2  b 1
~~~

1. 解构赋值左右两边必须对应 必须在一行完成
2. 数组解构允许我们按照一一对应的关系提取值然后赋值给变量 如果变量的值和数组的值的数量匹配不上就会报错
3. 对象解构允许我们拿变量的名字匹配对象的属性 如果匹配成功返回对象的属性值给变量

##### 7.剩余参数

~~~js
    // 合并数组
    let arr = [1, 2, 3, 4];
    let arr2 = [5, 6, 7, 8];
    let arr3 = [...arr, ...arr2]
    console.log(arr3);
    // 添加数组
    let arr4 = [1, 2, 3, ...arr2];
    console.log(arr4);
    // 接收参数/传入参数
    function test(arr1, arr2, ...arr) {
        // 如果传入的是剩余参数，那么形参的第一个就是 剩余参数的第一个，类推。如果形参中出现...arr,代表接收全部
        console.log(arr1);
        console.log(arr2);
        console.log(arr);
    }
    test(...arr3);
~~~

1. 箭头函数没有argments属性所以接受参数 形参前面加...
2. 使用扩展运算符可以把数组进行拼接也可以把伪数组（不具备数组的一些方法）转为正真的数组 （转为真正的数组就可以使用数组中的方法）
3. **Array.form()** 可以将一个伪数组转为数组 第一个参数是要装的伪数组 第二个参数是一个回调函数 形参有item  数组内容有多少个 函数执行多少次;

##### 8.对象属性简写

~~~js
const name='zml',
const obj = { name };
~~~

##### 9. promise

~~~js
new Promise(function(reslove,reject){}).then()
~~~

- 详细学习教程在站内搜索：promise

##### 10.**let和const**

~~~js
let a = 10;
const b = 20;
~~~

- let关键字

  1. 用let关键字声明的变量是块级作用域 如果强行访问会报错 在for循环内的let也是块级作用域

  2. let关键字没有变量提升
  3. 虽然var和let毫无关系 但是在块级作用域声明了let let就会和这个块级作用域绑定 导致在这个块级作用域下的访问同名的var访问不到 也称————暂时性死区

- const关键字（常量）

  1. const关键字也具有块级作用域的特点
  2. const声明的时候必须赋值
  3. 基本数据类型常量的值不可更改 复杂数据类型的值可以更改但不支持直接赋值因为这样会改变地址

- var let const 的区别

  1. var具有全局变量的特征 let const具有块级作用域的特点
  2. **var有变量提升 let const没有变量提升所以要先声明在使用**
  3. var let都可以修改 const不可修改 用于不经常改变的值 比较节约内存

##### 11.新增数组内置对象

1. find()  

   返回符合条件的对象 找不倒返回undifined

   语法： obj.find(回调函数（item，index）{    })

2. findIndex()

   返回符合条件的数组中的索引

3. includes()

   检测数组中是否包含这个元素 返回布尔  类似indexof方法

4. reduce()

   ~~~ javascript
   let reslut = arr.reduce((tmp, item, index) => {
   // tmp 是前一个数加上后一个数的和 
   return index != arr.length - 1 ? tmp + item : (tmp + item) / arr.length;
   });
   ~~~

    reduce就是汇总 常用于求总数和平均数
    字符串

5. filter()

   过滤器 常用于条件判断

6. map()

   //说白了 map 就是映射 一一对应 进去几个出来几个 一般用来做判断

7. forEach()

   循环  常用于条件判断

8. some()

   判断是否有满足条件的元素 返回布尔值 遇到第一个满足条件的不会继续往下执行

- filter  map  forEach  some 语法：

  ~~~javascript
  arr.filter(function(value,index,arr){
      //value 当前元素的值
      //index 当前元素的下标
      //arr  数组本身
  })
  ~~~

9. `Array.from()` 

   - 方法可以让我通过类数组(array-like)或可迭代对象来创建一个新的 Array(数组) 实例。

   ~~~ javascript
     const obj = { length: 3, 0: 'foo', 1: 'bar', 2: 'baz' };
     const array = Array.from(obj);
     for (const value of array) {
       console.log(value);
     }
   ~~~


##### 12.新增字符串内置对象

1. `模板字符串` 用反点引着 支持换行 插入变量用 $(变量)；
2. startsWith(123);判断字符串是不是以123开头  返回布尔
3. endsWith(123);判断字符串是不是以123结尾  返回布尔
4. ‘字符串’.repeat(次数) 让原字符串重复n次 返回一个新字符串

##### 13.新增对象内置对象

1. new Set（）  是一个构造函数 可以实现数组去重

   ~~~JavaScript
   const s1 = new Set([1, 2, 2]);
   console.log(s1.size);
   var arr = [...s1];
   console.log(arr);
   ~~~

2. JSON.parse(对象);    字符串转JSON

3. JSON.stringify(对象);  对象转字符串

4. for of

   遍历数组

   ~~~javascript
   const obj = {1,2,3};
   for (const value of obj) { 
       console.log(value);
   }
   ~~~

   遍历对象需要转换

   ~~~javascript
   const obj = { length: 3, 0: 'foo', 1: 'bar', 2: 'baz' };
   const array = Array.from(obj);
   Array.from转为数组格式
   for (const value of array) { 
       console.log(value);
   }
   ~~~

   

#### ES7（2016）

#####  1. Array.prototype.includes()

~~~js
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
~~~

- Array.prototype.includes()的作用，是查找一个值在不在数组里，若在，则返回true，反之返回false。
- Array.prototype.includes()方法接收两个参数：要搜索的值和搜索的开始索引。当第二个参数被传入时，该方法会从索引处开始往后搜索（默认索引值为0）。若搜索值在数组中存在则返回true，否则返回false。
- 有了这个属性就不用再用循环去判断每一个了

##### 2.指数运算符

~~~js
// (2 ** 3) === (2 * 2 * 2)
let a = 2 ** 3
// (2 ** 4) === (2 * 2 * 2 * 2)
let b = 2 ** 4
console.log(a)//8
console.log(b)//16
~~~

- 指数运算又叫幂运算，在aⁿ(a≠0)中a为底数，n为指数，指数位于底数的右上，指数运算表示指数个底数相乘。

#### ES8（2017）

##### 1.**async/await**

~~~js
    async function show() {
        try {   //成功的时候
            let data1 = await $.ajax({ url: './data/1.txt', dataType: "json" });
            let data2 = await $.ajax({ url: './data/2.json', dataType: "json" });
            console.log(data1, data2);
            //中间可以插入判断
            if (data2.name == 123) {
                let data3 = await $.ajax({ url: './data/3.txt', dataType: "json" });
                console.log(data1, data2, data3);
            }
        } catch{    //失败的时候
            console.log('出错');
        }
    }
    show();
~~~

- 异步终极解决方案

##### 2.Object.keys()

~~~js
  let obj = { name: 'zml', sex: 'man' }
    console.log(Object.keys(obj));
~~~

- **返回的是属性名（只能返回自身可被枚举的属性）**

##### 3.Object.values

~~~js
    let obj = { name: 'zml', sex: 'man' }
    console.log(Object.values(obj));
~~~

- **返回的是属性值（只能返回自身可被枚举的属性）**
- 和Object.keys对应

##### 4.Object.entries

~~~js
    var obj3 = { foo: 'bar', baz: 42 };
    console.log(Object.entries(obj3));
~~~

- Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
- 注意嵌套





