$.setscroll = function(){
	var Scrollheight = window.innerHeight - $("header").height();
	$("#indexpart").height(Scrollheight+"px");
	mui("#indexpart").scroll();
};
