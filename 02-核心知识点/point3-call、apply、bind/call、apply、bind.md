一、《this、apply、call、bind》掘金

链接：https://juejin.cn/post/6844903496253177863

#### this的指向

this的指向：最后调用包含this的函数的那个对象

```js
// 调用1：在普通函数内调用this，指向windows，如：
function fn() {
    console.log(this)
}
fn()  // 打印window对象；这里相当于是window.fn()

// 调用1补充：在普通函数内，要调用变量，不需要通过this
const name = 'window'
function fun() {
    const name = 'fun'
    console.log(this, this.name) // this:打印出window，但是this.name会报错或者undefined；
    console.log(name) // fun: 调用函数内部的数据，不需要this，因为不是构造函数；
  					  // window：如果fun内部没有定义name变量，会通过作用域链向上调用；
}

/*
文章中说，打印“this.name”，如果是非严格模式，会得到'window'；如果是严格模式，会报错；
但实际上，打印“this.name”，不会得到'window'，也不会报错；会得到undefined
*/
```

```js
// 调用2：在对象中调用this，指向这个对象本身
const name = 'window'
const obj = {
    name: 'obj',
    fn: function() {
        console.log(this.name)
    }
}
obj.fn()  // 打印：'obj'
```



#### 改变this的指向

方式简述：

	1. 使用箭头函数：() => {}
 	2. 在函数中使用：that = this
 	3. 使用apply、call、bind
 	4. new实例化一个对象

```js
// 为什么要改变this指向？
// 因为在某些作用域内，当前指向的this不是我们需要的this，如使用定时器函数时
const name = 'window'
const obj = {
    name: 'obj',
    fun1: function() {
        console.log(this.name)
    },
    fun2: function() {
        setTimeout(function() {
            this.fun1()
        }, 100)
    }
}
obj.fun2()  // 报错：调用fun2，里面有一个定时器函数，定时器函数里的this指向window，window里没有fun1

// 使用call、apply改造：
    fun2: function() {
        setTimeout(function() {
            this.fun1()
        }.call(obj), 100)   // 这里也可以换成{}.apply(obj)
    }
// 使用bind改造：由于bind只改变this指向，但是不会进行调用，所有需要再加一个'()'进行调用
	fun2: function() {
        setTimeout(function() {
            this.fun1()
        }.bind(obj)(), 100)
    }
```



#### new的过程

```js
function Person(name, age) {
    this.name = name
    this.age = age
}
const Tom = new Person('Tom', 12)
Tom.name // Tom

new Person {
    const obj = {}
    obj.__proto__ = Person.prototype
    const result = Person.call(obj, 'Tom', 12)
    return typeof result === 'object' ? result : obj
}
/**
 1. 创建一个空对象obj；
 2. 将新创建的空对象的隐式原型指向其构造函数的显式原型：目的未知，记住即可；
 3. 使用call改变构造函数的this指向为=》新建的空对象，并调用，结果保存为result；
 4. 判断result，存在且为object，则返回result；不存在或者不为对象，则返回obj
*/
```





二、《实现call、apply、bind》掘金

链接：https://juejin.cn/post/6934726003533185038

#### 从this指向开始

##### 1. this指向分类：

0. 总览：this指向分为：默认绑定、隐式绑定、显式绑定、new操作、箭头函数；

1. 默认绑定：普通函数，默认绑定window

   ```js
   function fn1() {
       console.log(this)
   }
   fn1()  // window对象
   ```

2. 显式绑定：函数引用有上下文的时候，隐式绑定为这个上下文

   ```js
   const obj = {
       name: 'obj',
       fn1: function() {
           console.log(this, this.name)
       }
   }
   obj.fn1()  // 这里的obj就是fn1的上下文；所以this隐式绑定为obj
   ```

3. 显式绑定：即手动绑定，通过call、apply、bind改变函数this指向

4. new操作：this从构造函数身上，转移到实例上。

5. 箭头函数：看它外层函数的this指向





三、《嗨，你真的懂this吗？》掘金

链接：https://juejin.cn/post/6844903805587619854

前言提问1：如何准确判断this指向的是什么？

```js
/**
 0. 一般this指向分为默认绑定、隐式绑定、显式绑定、new操作、箭头函数
 1. 判断所在的作用域是哪？一般定义的时候，可能是在构造函数中，类中；在使用的时候，一般都在函数体内；
 2. 判断调用这个this的上下文环境是什么？obj.fn()，这里的上下文环境就是obj
*/
```

前言提问2：请问下面这题打印结果是什么？

```js
const number = 5
const obj = {
    number: 3,
    fn1: (function(){
        let number;
        this.number *= 2
        number = number * 2
        number = 3
        return function() {
            const num = this.number
            this.number *= 2
            console.log(num);
            number *= 3
            console.log(number);
        }
    })()
}
const fn1 = obj.fn1
fn1.call(null)
obj.fn1()
console.log(window.number);
```

#### this是什么？

​	首先，this本身是什么？this本身就是一个指针，指向调用函数的对象。

#### this的绑定规则

1. 默认绑定；

2. 隐式绑定：有个大问题 -》绑定很容易丢失；

   ```js
   function sayHi() {
       console.log('hi', this.name)
   }
   const person = {
       name: 'name',
       sayHi: sayHi
   }
   var name = 'bbb'
   var hi = person.sayHi
   hi()  // hi bbb
   ```

   



















