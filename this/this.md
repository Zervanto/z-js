---
date: 2017-05-25 10:26
status: public
title: 关于this
---

摘要：this 关键字是JavaScript 中最复杂的机制之一。它是一个很特别的关键字，被自动定义在
所有函数的作用域中。但是即使是非常有经验的JavaScript 开发者也很难说清它到底指向什么。

## 对于this的常见误解
1. 误解一：指向函数自身 
这里的this就没有像我们期望中那样指向函数自身
```js
function foo (num){
    console.log("foo"+num);
    this.count++;//使用标识符代替this，改成foo.count++
}
foo.count = 0;
for(let i=0;i<10;i++){
    if(i>5){
    foo(i);  //改成foo.call(foo,i)  
    }
}
//6 7 8 9
//0
```
如果要从函数对象内部引用它自身，那只使用this 是不够的。一般来说你需要通过一个指向函数对象的词法标识符（变量）来引用它。使用call(..) 可以确保this 指向函数对象foo 本身

2. 误解二：this指向函数的作用域
this 在任何情况下都不指向函数的词法作用域。
```js
function foo() {
    var a = 2;
    this.bar();
}
function bar() {
    console.log( this.a );
}
foo(); // ReferenceError: a is not defined
```

## this究竟是什么
this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

## 为什么要用this
函数foo内部声明的属性或方法前加this目的在于保护变量同时可以被实例化的对象访问，如果直接声明私有变量，无法实例化后使用，而若成为全局变量又可能造成污染。

## 调用位置与调用栈
- 调用位置就是函数在代码中被调用的位置（而不是声明的位置）
- 调用栈（就是为了到达当前执行位置所调用的所有函数）。
- 调用位置就在当前正在执行的函数的前一个调用中。
```js
function baz() {
// 当前调用栈是：baz
// 因此，当前调用位置是全局作用域
console.log( "baz" );
bar(); // <-- bar 的调用位置
}
function bar(){
// 当前调用栈是baz -> bar
// 因此，当前调用位置在baz 中
    console.log( "bar" );
    foo(); // <-- foo 的调用位置
}
function foo() {
// 当前调用栈是baz -> bar -> foo
// 因此，当前调用位置在bar 中
    console.log( "foo" );
}
baz(); // <-- baz 的调用位置
```

## 绑定规则与优先级
1. 默认绑定
默认：在严格模式下绑定到undefined，否则绑定到全局对象。
2. 隐式绑定 
由上下文对象调用？绑定到那个上下文对象。
3. 显式绑定
由call 或者apply（或者bind）调用？绑定到指定的对象。
4. new绑定
由new 调用？绑定到新创建的对象。

现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的
顺序来进行判断：
1. 函数是否在new 中调用（new 绑定）？如果是的话this 绑定的是新创建的对象。
let bar = new foo()
2. 函数是否通过call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
指定的对象。
let bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
下文对象。
let bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到
全局对象。
let bar = foo()

## 总有一些例外
如果你把null 或者undefined 作为this 的绑定对象传入call、apply 或者bind，这些值
在调用时会被忽略，实际应用的是默认绑定规则

## es6箭头函数 
ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定
this，具体来说，箭头函数会继承外层函数调用的this 绑定（无论this 绑定到什么）。这
其实和ES6 之前代码中的self = this 机制一样。

## 经典题目
请说明要输出正确的myName的值要如何修改程序?
```js
foo = function (){
    this.personName = "Zervanto";
}
foo.prototype.sayName = function(){
    console.log("My name is "+this.personName);
}
foo.prototype.bar = function(){
    setTimeout(this.sayName, 1000);
}
let f = new foo;
f.bar();
```
foo 为函数，不能作为对象调用内部的方法，f是foo的实例化对象，可以调用内部方法。
bar()调用后this指向f这个实例化对象
然后setTimeout，此函数为异步执行，其this指向全局对象，找不到personName属性所以结果为undefined

1. 可以在实例化foo后,调用一次foo，这样foo里面的this就指向全局,然后全局对象就有了personName属性
```js
let f= new foo;
foo();
f.bar();
```
2. 可以使用call,apply，bind方法将setTimeout的this绑定到当前调用对象
```js
foo.prototype.bar = function(){
    setTimeout(this.sayName.bind(this), 1000);
   // setTimeout(this.sayName.call(this), 1000);
    //setTimeout(this.sayName.apply(this), 1000);
}
```
3. 使用that
```js
foo.prototype.sayName = function(that){
    console.log("My name is "+that.personName);
}
foo.prototype.bar = function(){
    let that = this;
    setTimeout(function(){that.sayName(that)}, 1000);
}
```  
4. 使用箭头函数
```js
foo.prototype.bar = function(){
    setTimeout(()=>{this.sayName()}, 1000);
}
```
