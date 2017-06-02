/*
* @Author: Zervanto
* @Date:   2017-03-19 15:01:45
* @Last Modified by:   Zervanto
* @Last Modified time: 2017-05-31 15:03:16
*/

'use strict';
if (!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    };
}