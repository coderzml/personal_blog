## JS语法ES6、ES7、ES8、ES9、ES10、ES11、ES12新特性

> 本文集合了 ES6 至 ES11 常用到的特性，包括还在规划的 ES12，只列举大概使用，详细介绍的话内容量将十分巨大~.~。PS：使用新特性需要使用最新版的 bable 就行转义

#### ES6（2015）

##### 类（class）

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

##### **模块化(ES Module)**

