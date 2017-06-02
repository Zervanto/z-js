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
