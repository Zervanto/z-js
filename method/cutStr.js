/*每三位加一个逗号*/
var cutStr=function(str){
	  str = str.toString(); 
	  str =str.split('.')[0];
	  var newStr=new Array(str.length+parseInt(str.length/3));  
	  var strArray=str.split("");
	  newStr[newStr.length-1]=strArray[strArray.length-1];   
	  var currentIndex=strArray.length-1;
	  for(var i=newStr.length-1;i>=0;i--){ 
	    if((newStr.length-i)%4==0){  
	    	if(i == 0){
	    		 newStr[i]=strArray[currentIndex--]
	    	}else{
	    		newStr[i]=",";  
	    	}
	    }  
	    else{   
	      newStr[i]=strArray[currentIndex--];   
	    }   
	  }   
	  return newStr.join("")   
};
