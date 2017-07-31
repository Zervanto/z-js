/**
 * 自定义信息提示框，有回调函数（“确定”，“取消”按钮）
 * 
 * @param message
 *            提示信息
 * @param method
 *            回调函数
 */
function createConfirmMethod(message, method1, method2) {

	var newPopup = document.createElement("div"); // 弹出对话框
	var newMask = document.createElement("div"); // 遮罩层，用来屏蔽灰掉背部界面
	var newBtn = document.createElement("input"); // 弹出对话框中按钮
	var newBtn2 = document.createElement("input"); // 弹出对话框中"取消"按钮
	var inner;
	// 弹出对话框中要呈现的内容
	inner = '<h1 style="font-size:14px; font-family: 微软雅黑; color:#fff; margin-left:10px; margin-top:-22px">提示</h1>';
	if (message.length > 40) {
		inner += '<div style="font-size:13px; text-align:center; margin-top:22px; padding-left:10px; padding-right:10px; height: 56px; overflow-y: auto; overflow-x: hidden;"><span style="font-family: 宋体;"> '
				+ message + '</span></div>';
	} else {
		inner += '<div style="font-size:13px; text-align:center; margin-top:36px; padding-left:10px; padding-right:10px;"><span style="font-family: 宋体;"> '
				+ message + '</span></div>';
	}
	// 创建遮罩层
	if (!document.getElementById("mask") && 1) {
		newMask.id = "mask";
		newMask.style.position = "absolute";
		newMask.style.zIndex = "9996";
		newMask.style.width = "100%";
		newMask.style.height = Math.max(document.body.scrollHeight,
				document.documentElement.scrollHeight)
				+ "px";
		newMask.style.top = "0px";
		newMask.style.left = "0px";
		newMask.style.background = "gray";
		newMask.style.opacity = "0.5";
		newMask.style.filter = "Alpha(opacity=50)";
		document.body.appendChild(newMask);
	}
	// 创建弹出层
	if (!document.getElementById("promptID")) {
		newPopup.id = "promptID";
		newPopup.style.position = "fixed";
		newPopup.style.width = "300px";
		newPopup.style.height = "150px";
		newPopup.style.zIndex = "9997";
		newPopup.style.top = parseInt(window.screen.height * 0.28) + "px";
		newPopup.style.left = parseInt(window.screen.width * 0.3) + "px";
		newPopup.style.border = "1.5px solid #1b6bb8";
		newPopup.style.backgroundColor = "#FFFFFF";
		newPopup.style.borderRadius = "5px";
		newPopup.style.fontFamily = "宋体";
		newPopup.style.borderTop = "30px solid #1b6bb8";
		newPopup.innerHTML = inner;
		document.body.appendChild(newPopup);
	}
	// 创建弹出层中"确定"按钮
	if (!document.getElementById("btnSubID")) {
		newBtn.id = "btnSubID";
		newBtn.type = "button";
		newBtn.style.width = "80px";
		newBtn.style.height = "30px";
		newBtn.style.position = "absolute";
		newBtn.style.top = "66%";
		newBtn.style.left = "50px";
		newBtn.style.background = "#1b6bb8";
		newBtn.style.color = "#fff";
		newBtn.style.border = "0px";
		newBtn.style.borderRadius = "5px";
		newBtn.style.fontFamily = "宋体";
		newBtn.style.fontSize = "12px";
		newBtn.style.cursor = "pointer";
		newBtn.value = "确  定";
		newBtn.onmouseover = function() {
			newBtn.style.background = "#1B3F88";
		};
		newBtn.onmouseout = function() {
			newBtn.style.background = "#1b6bb8";
		};
		newBtn.onclick = function() {
			removeElement(document.getElementById("btnSubID"));
			removeElement(document.getElementById("btnSubID2"));
			removeElement(document.getElementById("promptID"));
			removeElement(document.getElementById("mask"));
			method1();
		};
		document.getElementById("promptID").appendChild(newBtn);

		// 回车键关闭
		document.getElementById("btnSubID").focus();
		document.getElementById("btnSubID").onkeydown = function(e) {
			if (!e)
				e = window.event;// 火狐中是 window.event
			if ((e.keyCode || e.which) == 13) {
				var obtnSearch = document.getElementById("btnSubID");
				// obtnSearch.focus();// 让另一个控件获得焦点就等于让文本输入框失去焦点
				obtnSearch.click();
			}
		};
	}
	// 创建弹出层中"取消"按钮
	if (!document.getElementById("btnSubID2")) {
		newBtn2.id = "btnSubID2";
		newBtn2.type = "button";
		newBtn2.style.width = "80px";
		newBtn2.style.height = "30px";
		newBtn2.style.position = "absolute";
		newBtn2.style.top = "66%";
		newBtn2.style.left = "170px";
		newBtn2.style.background = "#1b6bb8";
		newBtn2.style.color = "#fff";
		newBtn2.style.border = "0px";
		newBtn2.style.borderRadius = "5px";
		newBtn2.style.fontFamily = "宋体";
		newBtn.style.fontSize = "12px";
		newBtn2.style.cursor = "pointer";
		newBtn2.value = "取  消";
		newBtn2.onmouseover = function() {
			newBtn2.style.background = "#1b6bb8";
		};
		newBtn2.onmouseout = function() {
			newBtn2.style.background = "#1B3F88";
		};
		newBtn2.onclick = function() {
			if (method2 != null && method2 != "" && method2 != undefined) {
				removeElement(document.getElementById("btnSubID"));
				removeElement(document.getElementById("btnSubID2"));
				removeElement(document.getElementById("promptID"));
				removeElement(document.getElementById("mask"));
				method2();
			} else {
				removeElement(document.getElementById("btnSubID"));
				removeElement(document.getElementById("btnSubID2"));
				removeElement(document.getElementById("promptID"));
				removeElement(document.getElementById("mask"));
			}
		};
		document.getElementById("promptID").appendChild(newBtn2);
	}
};
