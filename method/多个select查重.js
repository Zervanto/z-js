/**
 * 校验标签名是否重复
 * @param file
 */
function checkRepeat(obj){
	tagList=[];
	tagList = [
	           $("#productTag1").val(),
	           $("#productTag2").val(),
	           $("#productTag3").val(),
	           $("#productTag4").val(),
	           $("#productTag5").val(),
	           ];
	tagList.remove($(obj).val());
//	console.log(tagList);
	for(var i=0;i<tagList.length;i++){
		if(tagList[i]==$(obj).val() && $(obj).val()!=""){
			createPopup("标签重复，请重新选择！");
		}
	}
}
