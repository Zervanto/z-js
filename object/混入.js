/*
* @Author: Zervanto
* @Date:   2017-05-31 09:27:14
* @Last Modified by:   Zervanto
* @Last Modified time: 2017-05-31 10:10:38
*/

'use strict';
//显式混入
function mixin (sourceObj,targetObj){
    for(let k in sourceObj){
        // 只会在不存在的情况下复制
        if(!(k in targetObj)){
            //浅复制
            targetObj[k] = sourceObj[k]
        }
    }
    return targetObj
}
//隐式混入
let Something = {
    cool:function(){
        this.greeting = "Hello World";
        this.count = this.count ? this.count + 1 : 1;
    }
}
Something.coll();
Something.greeting;
Something.count;

let Another = {
    cool:function(){
        // 隐式把Something 混入Another
        Something.cool.call(this);
    }
}
Another.cool();
Another.greeting;
Another.count;