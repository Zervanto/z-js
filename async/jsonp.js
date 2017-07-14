jsonp({
    url:'',
    callback:'',
    data:{},
    success:function(json){},
    fail:function(){},
    time:10000
});


function jsonp(options){
    options = options || {};
    if(!options.url || !options.callback){
        throw new Error("Parameter is not legal");
    }
    var callbankName = ('jsonp_' + Math.random()).replace(".","");
    var zHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbankName;
    var params = formatParams(options.data);
    var zScript = document.createElement('script');
    zHead.appendChild(zScript);

    window[callbackName] = function(json){
        zHead.removeChild(zScript);
        clearTimeout(zScript.timer);
        window[callbankName] = null;
        options.success && options.success(json);
    };

    zScript.src = options.url + '?' + params;

    if(options.time){
        zScript.timer = setTimeout(function(){
            window[callbankName] = null;
            zHead.removeChild(zScript);
            options.fail && options.fail({message:'overtime'});
        },time);
    }
}


   function formatParams(data) {
       var arr = [];
       for (var name in data) {
           arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[i]));
       }
       return arr.join('&');
   }
