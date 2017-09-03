
var myip = "sxydlp.cpic.com.cn";
var myport = "9085";


function myAPI(){
	
	myAPI.prototype.getDomain = function(){
		return "http://" +myip+ ":" +myport+ "/ydlp";
	};
	this.CPath  = ""+this.getDomain()+"/mobileapp/";
	
	myAPI.prototype.getImagePath = function(){
		return this.CPath + "images/";
	};
	
	
	myAPI.prototype.ajax= function(url,callBackFunction,postData){
		//this.tnmHTTP = null;
		if (url==null) return "";
		if (callBackFunction==null) return "";
		if (postData==null) var paramjson = null;
		var str=String(callBackFunction);
		this.callBackFunction =strmid(str,"function","()");
		
		url =  this.getDomain("") + url;
		var mas=url.split("?");
		
		var paramjson="{\"biz\":"+ JSON.stringify(postData)+"}";
		
		//alert(callBackFunction);
		//alert(typeof callBackFunction);
		this.TNMAjax(url,paramjson,callBackFunction);
		
	};
	
	myAPI.prototype.TNMAjax = function (requesturl,postData,callBackFunction){
		$.ajax({
		   type: "post",
		   url: requesturl,
		   timeout:60000,
		   processData: false,
		   data: "jsonKey="+postData,
		   beforeSend:function(){
				$("#loadburid").css("display","");			
		   },
		   success:function(result){
		       if(requesturl.indexOf("/querynouploadbyempno.do")!=-1||requesturl.indexOf("/searcherInfo.do?method=queryInfoBySearcherId")!=-1)
		       {
		       callBackFunction(result);
		       }
		       else
		       {
			  	$("#loadburid").css("display","none");
			 	callBackFunction(result);
			 	}  
		   }, 
		   error:function(){
		    if(requesturl.indexOf("mobilelogin"))
				   {
				    callBackFunction(null); 
					$("#loadburid").css("display","none");
				   }else
				   {
				    if(requesturl.indexOf("/querynouploadbyempno.do")!=-1||requesturl.indexOf("/searcherInfo.do?method=queryInfoBySearcherId")!=-1)
				   {
				     callBackFunction(null);
				   }
				   else
				   {
				     jAlert("数据获取失败,请稍后重试.......");
				     $("#loadburid").css("display","none");
				   }
				   }
		   }
		});
	}
	
	
	myAPI.prototype.getUrlParam = function (paras) {
		var url = location.href;
		url = url.charAt(url.length-1)=="#"?url.substring(0,url.length-1):url;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var paraObj = {};
		for (i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
					.indexOf("=") + 1, j.length);
		}
		var returnValue = paraObj[paras.toLowerCase()];
		if (typeof (returnValue) == "undefined") {
			return "";
		} else {
			return returnValue;
		}
	}
	
	
	myAPI.prototype.getDate = function getDate(str){
		
		if(this.isNull(str) == -1){
			return "";
		}
		
		var strArr = str.split("/");
		
		if(strArr.length == 1){
			strArr = str.split("-");
			return  strArr[0]+ "年" + strArr[1] + "月" + strArr[2] + "日";
		}else if(strArr.length == 3){
			return  strArr[0]+ "年" + strArr[1] + "月" + strArr[2] + "日";
		}
	}
	
	myAPI.prototype.isChinese = function isChinese(temp){
		if(this.isNull(temp) == -1){
			return false;
		}
		
		var re = /[^\u4E00-\u9FA5]+/;
		if(re.test(temp)){
			return false;
		}else{
			return true;
		}
	}
	
	//判断字符串是否含有非法字符,非法字符集具体见isinsideLegal
	myAPI.prototype.isLegal = function isLegal(temp){
		if(this.isNull(temp) == -1){
			return false;
		}
		for(var i = 0 ; i < temp.length ; i++ ){
			if(!this.isinsideLegal(temp.charAt(i))){
				return false;
			}
		}
		return true;
	}
	
	//非法字符集规则
	myAPI.prototype.isinsideLegal = function isinsideLegal(str){
		if(str >= '0' && str <= '9')
		{
			return true;
		}
		if(str >= 'a' && str <= 'z')
		{
			return true;
		}
		if(str >= 'A' && str <= 'Z')
		{
			return true;
		}
		if(str == ' ')
		{
			return true;
		}
		if(str == '·'||str == '•')
		{
			return true;
		}
		var re = /[^\u4E00-\u9FA5]+/;
		if(re.test(str)){
			return false;
		}else{
			return true;
		}
	}
	
	
	var cappnoErrors = new Array("参数未定义","报案号位数不对","报案号校验错误","验证通过");
	
	
	//正常的报案号规则是3位部门代码+2位年份+1位识别码(5:报案号,3:赔案号)+0000+5位序列号
	myAPI.prototype.isCappno = function isCappno(str){
		
		if(str == undefined){
			return 0;
		}
		if(str.length != 15){
			return 1;
		}
		//修改：叶琳琳 理赔进度查询报案号只验证15位
		/*
		var place = ["XIM","GYA","NIX","SHY","NAJ","CHQ","FUZ","TAY","DAL","CHS","NAN","HEF","BEJ","CIP","SHH","SUZ","NIB","JIN","GUZ","KUM","HAE","WUX","CHZ","ZHZ","WUH","CHD","WUL","NMG","SHZ","HAN","XIA","LAZ","SHJ","NAC","CHC","QID","QNH","TIJ","HAZ"];
		
		//验证头三位是部门代码
		var startStr = str.substr(0,3);
		var iden = 0;
		for(var i = 0;i < place.length;i++){
			if(startStr == place[i]){
				iden = 1;
				break;
			}
		}
		if(iden == 0){
			return 2;
		}
		
		
		//3位部门代码+2位年份+1位识别码+0000+5位序列号
		var reg = /^[A-Z]{3}[0-9]{2}50000$/;
		
		if(!reg.test(str.substr(0,10))){
			return 2;
		}	*/
		return 3;
	}
	
	myAPI.prototype.getObjectItem = function getObjectItem(url,obj){
		var returnStr = url + "?";
		for(var item in obj){
			returnStr += item + "=" + obj[item] + "&";
		}
		returnStr = returnStr.substr(0,returnStr.length-1);
		return returnStr;
	}
	
	//检查手机号
	myAPI.prototype.chkMobile = function chkMobile(telephone){
		if (this.isNull(telephone) == -1){
			return -1;
		}
		  var partten = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[0-9]\d{8}|18[0-9]\d{8}|14[5|7]\d{8}|17[0|6|7|8]\d{8}$/;
		if(partten.test(telephone)){
			return 1 ;
		}else{
			return -1 ;
		}
	}
	
	//检查是否为空
	myAPI.prototype.isNull = function isNull(str){
		if (str == null || typeof(str)=="undefined" || str=="null" || str==""){
			return -1;
		}
		return 1;
	}
	
	//验证虚拟身份证号方法 
	myAPI.prototype.checkvirPid = function checkvirPid(idcard){ 
		//var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
		var idcard,Y,JYM; 
		var S,M; 
		var idcard_array = new Array(); 
		idcard_array = idcard.split(""); 
		//if(area[parseInt(idcard.substr(0,2))]==null) return 3; 
		switch(idcard.length){ 
			case 15: 
				if ((parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性 
				} 
				else{ 
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性 
				} 
				if(ereg.test(idcard)) 
				return 0; 
				else 
				return 2; 
				break; 
			case 18: 
				if( parseInt(idcard.substr(6,4)) % 4 == 0 || ( parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
				} 
				else{ 
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
				} 
				if(ereg.test(idcard)){ 
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ; 
					Y = S % 11; 
					M = "F"; 
					JYM = "10X98765432"; 
					M = JYM.substr(Y,1); 
					if(M == idcard_array[17]){
						var iddate = idcard.substr(6,8);
						var idyear = parseInt(iddate.substr(0,4));
						var idmonth = parseInt(iddate.substr(4,2));
						var idday = parseInt(iddate.substr(6,2));
						//alert(iddate+","+idyear+","+idmonth+","+idday);
					    var now = new Date();
				        var year = now.getFullYear();       //年
				        var month = now.getMonth() + 1;     //月
				        var day = now.getDate();
				        //alert(now+","+year+","+month+","+day);
				        if(idyear>year){
				        	return 2;
				        }
				        else if(idyear==year){
				        	if(idmonth>month){
				        		return 2;
				        	}
				        	else if(idmonth==month){
				        		if(idday>day){
				        			return 2;
				        		}
				        		else{
				        			return 0;
				        		}
				        	}
				        	else{
				        		return 0;
				        	}
				        }
				        else{
				        	return 0; 
				        }
					} 
					else 
					return 3; 
				} 
				else 
				return 2; 
				break; 
			default: 
			return 1; 
			break; 
		} 
	}
}

function strmid(str, from, to){
	return str.substring(str.indexOf(from)+from.length, str.indexOf(to,str.indexOf(from)+from.length)).replace(/[\r\n]/g, "");
}


function backBefore()
{
	window.history.back();
}



//检查姓名的（根据规范要求）

function checkinputname(repname)
{
 //若姓名中含有数字的不符合
  if(repname.indexOf(0)!=-1)
  {
		return -1;
  }
   if(repname.indexOf(1)!=-1)
  {
		return -1;
  }
   if(repname.indexOf(2)!=-1)
  {
		return -1;
  }
   if(repname.indexOf(3)!=-1)
  {
		return -1;
  }
  if(repname.indexOf(4)!=-1)
  {
		return -1;
  }
   if(repname.indexOf(5)!=-1)
  {
		return -1;
  }
   if(repname.indexOf(6)!=-1)
  {
		return -1;
  }
  if(repname.indexOf(7)!=-1)
  {
		return -1;
  }
  if(repname.indexOf(8)!=-1)
  {
		return -1;
  }
  if(repname.indexOf(9)!=-1)
  {
		return -1;
  }
    //若字符串首位为空格不符合
  if(repname.indexOf(" ")==0)
  {
        return -1;
  }
    //若字符串末位为空格不符合
  if(repname.lastIndexOf(" ")==(repname.length-1))
  {
        return -1;
  }
    //若姓名中含有标点符号（"·"除外）时不符合
  if(myapi.isLegal(repname)==false)
  {
        return -1;
  }  
  var repnametolen=repname.length;//获取输入框内的长度
	var repnametoChlen=0;
	var re = /[\u4E00-\u9FA5]/g;
	if(re.test(repname)){
		repnametoChlen=repname.match(re).length;//获取中文长度
	}
	var repnametoEnlen=	 repnametolen-repnametoChlen;//获取非中文长度		
	
	if((repnametoChlen*2+repnametoEnlen)<2||(repnametoChlen*2+repnametoEnlen)>50){//姓名字段长度不小于2个字符姓名字段不允许长度超过25个汉字或50个字符.
		return -1;
	}
	if(repnametoChlen>0)//姓名字段中不允许含有汉字又同时含有字母
	{/*
	  var re=/[a-zA-Z+/]/g;
      if(repname.match(re).length>0)
      {
       return -1;
      }*/
	  var re= /[a-z]/ig;
      if(repname.match(re)!=null)
      {
       return -1;
      }
	    if(repname.indexOf(" ")!=-1)
     {
        return -1;
     }
	  
	}
	
}
