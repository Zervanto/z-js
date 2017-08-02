/*
 * 数字动态增长 使用方法：loadNum(num,id,timerFlag,number);
 * 带百分号%
 */
function loadNum(num,id,timerFlag,number){
	if(!timerFlag){
		interval=setInterval(function(){setTimeshow(num,id,timerFlag)},100); 
	}
	/*计时器显示的信息*/
	function setTimeshow(totalnum,id,timerFlag){
		var addnum = parseInt(totalnum*0.1);
		if(addnum == 0){
			addnum = totalnum*0.1;
		}
		var totalstr = String(totalnum);
		totalstr = totalstr.split(".")[1];
		if(!$.isNull(totalstr)){
			totalstr = "."+totalstr;
		}else{
			totalstr = "";
		}
		if(number >= totalnum){
			clearInterval(interval);
			$("."+id).html(cutStr(totalnum) + totalstr+"%");
			timerFlag = true;
		}else{
			$("."+id).html(cutStr(number)+"%");
			number = number + addnum;
			timerFlag = false;
		}
	}
};

str+='<div class="product-rate c999"><span annualized="'+o.rate+'" class="annualized"><span class="detailnum'+i+'">'+o.rate+'<span></span></div>';
for(var j = 0; j < $(".annualized").length; j++) {
			var addnumclass = $(".annualized").eq(j).find("span").attr("class");
			var addnumstr = $(".annualized").eq(j).attr("annualized");
			loadNum(addnumstr, addnumclass, false, 0);
		};
