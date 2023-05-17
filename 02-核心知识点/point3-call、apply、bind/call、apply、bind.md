一、《this、apply、call、bind》掘金

链接：https://juejin.cn/post/6844903496253177863

#### this的指向

this的指向：最后调用包含this的函数的那个对象

```js
// 调用1：在普通函数内调用this，指向windows，如：
function fn() {
    console.log(this)
}
fn()  // 这里相当于是window.fn()

// 调用2：在
```

