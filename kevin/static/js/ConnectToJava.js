/*
 * 系统前台连接后台js
 * */

//导出word
function HtmlToWord(html) {
	var message = "";
	$.ajax({
				type : 'POST',
				async : false,
				url : basePath + "poiAction/htmlToWord",
				data : {'htmlStr':html},
				dataType : 'html',
				success : function(data) {
					message = data;
					var fileName = message.split("&&")[1];	
					downloadReport(fileName);
				}
			});
	return message;
}
//下载文件
function downloadReport(fileName){
	window.open(basePath+"poiAction/download?fileName="+fileName);
	return;
	$.ajax({
		type:'GET',
		async:false,
		dataType: "jsonp",
		url:basePath+"poiAction/download?fileName="+fileName,
		success:function(data){
			
		}
	});
}
//获取本取数据库数据 第一个参数传递字符串select语句，第二个参数为boolean类型，可以不写，默认为false（异步加载）
function operateDataBase(params,action,callback,async) {
	if(async==undefined){
		async = false;
	}
	$.ajax({
				type : 'POST',
				async : async,
				contentType : 'application/json;charset=utf-8',
				//url : basePath + "sqlAction/getList",
				url : basePath + action,
				data:convertToJSON(params),
				dataType : 'json',
				success : function(data) {
					callback(data);
			}
	});
}

function convertToJSON(o){
	var data = "{";
	if(o.length>0){
		for(var i=0;i<o.length;i++){
			if(i==o.length-1){
				data += "\""+o[i].key+"\":\"" + o[i].value + "\"}";
			}else{
				data += "\""+o[i].key+"\":\"" + o[i].value + "\",";
			}
		}
		return data;
	}else{
		return "{\"flag\":\"nodata\"}";
	}
}


//获取本取数据库数据 第一个参数传递字符串select语句，第二个参数为boolean类型，可以不写，默认为false（异步加载）
function getList(action,async) {
	if(async==undefined){
		async = false;
	}
	var jsonData = [];
	$.ajax({
				type : 'POST',
				async : async,
				contentType : 'application/json;charset=utf-8',
				url : basePath + action,
				dataType : 'json',
				success : function(data) {
					jsonData = data.jsonData;
				}
			});
	return jsonData;
}
//根据站点代码获取单个站点信息
function getSingleStation(sttCode) {
	var stnm = "";
	$.ajax({
				type : 'POST',
				async : false,
				contentType : 'application/json;charset=utf-8',
				url : basePath + "dataAction/getSingleStation",
				data : "{\"sttCode\":\"" + sttCode + "\"}",
				dataType : 'json',
				success : function(data) {
					stnm = data.jsonData[0].stnm;
				}
			});
	return stnm;
}
//执行本地数据库脚本，参数为字符串，直接写insert,update,delete语句
function executeSql(sql) {
	var message = "";
	$.ajax({
				type : 'POST',
				async : false,
				contentType : 'application/json;charset=utf-8',
				url : basePath + "sqlAction/executeSql",
				data : "{\"sql\":\"" + sql + "\"}",
				dataType : 'json',
				success : function(data) {
					message = data.msg;
				}
			});
	return message;
}
//读取excel
function readExcel(fileName,action,timeGap,times,tableName) {
	$.ajax({
		type : 'POST',
		contentType : 'application/json;chartset=utf-8',
		url :  basePath + 'utilAction/'+action,
		data : "{\"fileName\":\"" + fileName + "\",\"timeGap\":\"" + timeGap + "\",\"times\":\"" + times + "\"}",
		dataType : 'json',
		success : function(data) {
			if (data.flag == "ok") {
				$.ligerDialog.success(data.msg);
			} else {
				$.ligerDialog.error(data.msg);
				executeSql("delete "+tableName+" where c_flag='"+times+"'");
			}
		}
	});
}
//保存图片的字节流到oracle数据库
function saveImage(fileName,serial) {
	$.ajax({
		type : 'POST',
		contentType : 'application/json;chartset=utf-8',
		url :  basePath + 'uploadAction/uploadLDImages?fileName='+fileName+'&serial='+serial,
		data : "",
		dataType : 'json',
		success : function(data) {
			//$.ligerDialog.success(data.msg);
		}
	});
}
//上传Excel到服务器
function excelUpload(id,queue,isAuto,isMulti){
	$(id).uploadify({
		'uploader'       : basePath+"static/uploadify/scripts/uploadify.swf",
		'script'         : basePath+"static/uploadify/upload.jsp",
		'cancelImg'      : basePath+"static/uploadify/cancel.png",
		'folder'         : basePath+"static/uploads",
		'queueID'        : queue,
		'height' 		 : 20,
		'width' 		 : 60,
		'auto'           : isAuto,
		'multi'          : isMulti,
		'buttonText'     : 'browse',
		'buttonImg'		 :basePath+"static/uploadify/btn.png", 
		//'fileDesc'		 : '音频文件*.mp3;*.wav;*.mid',
		'fileDesc'		 : 'Excel文件*.xls;*.xlsx',
		'fileExt'		 : '*.xls;*.xlsx',
		'sizeLimit'		 : 512000,
//		'rollover'		 : true,
		'onComplete'	 : function(event,queueId,fileObj,response,data){
			//$.ligerDialog.success("唯一标识:"+queueId+"\n"+"文件名："+fileObj.name+"\n"+"文件大小："+fileObj.size+"\n"+"文件类型："+fileObj.type+"\n"+"返回值："+$.trim(response)+"\n"+"剩余未完成文件数："+data.fileCount+"\n"+"上传平均速度："+data.speed);
			$.ligerDialog.success("导入的文件名："+fileObj.name+"<br>"+"文件大小："+fileObj.size+" B");
			//fileName = fileObj.name;
			//这是更名后的文件名
			fileName = $.trim(response).split("/")[1];
			//alert(fileName);
		},
		'onAllComplete'	 : function(event,data){
			//$.ligerDialog.success("上传的所有文件个数:"+data.filesUploaded+"\n"+"所有上传文件的总大小:"+data.allBytesLoaded);
			//readExcel(fileName,action);
		}
	});
}
//上传图片到服务器
function imagesUpload(id,queue,isAuto,isMulti){
	var i = 0;
	$(id).uploadify({
		'uploader'       : basePath+"static/uploadify/scripts/uploadify.swf",
		'script'         : basePath+"static/uploadify/uploadImages.jsp",
		'cancelImg'      : basePath+"static/uploadify/cancel.png",
		'folder'         : basePath+"static/uploads",
		'queueID'        : queue,
		'height' 		 : 20,
		'width' 		 : 60,
		'auto'           : isAuto,
		'multi'          : isMulti,
		'buttonText'     : 'browse',
		'buttonImg'		 :basePath+"static/uploadify/btn.png", 
		//'fileDesc'		 : '音频文件*.mp3;*.wav;*.mid',
		'fileDesc'		 : '图片文件*.jpeg;*.JPEG;*.gif;*.GIF;*.png;*.PNG',
		'fileExt'		 : '*.jpeg;*.JPEG;*.gif;*.GIF;*.png;*.PNG',
		'sizeLimit'		 : 512000,
//		'rollover'		 : true,
		'onComplete'	 : function(event,queueId,fileObj,response,data){
			//$.ligerDialog.success("唯一标识:"+queueId+"\n"+"文件名："+fileObj.name+"\n"+"文件大小："+fileObj.size+"\n"+"文件类型："+fileObj.type+"\n"+"返回值："+$.trim(response)+"\n"+"剩余未完成文件数："+data.fileCount+"\n"+"上传平均速度："+data.speed);
			//$.ligerDialog.success("导入的文件名："+fileObj.name+"<br>"+"文件大小："+fileObj.size+" B");
			//fileName = fileObj.name;
			//这是更名后的文件名
			fileNames[i] = $.trim(response).split("/")[1];
			$("#uploadNum").html("已上传"+(i+1)+"张图片到服务器文件夹");
			i++;
		},
		'onAllComplete'	 : function(event,data){
			$.ligerDialog.success("上传的所有文件个数:"+data.filesUploaded+"\n"+"所有上传文件的总大小:"+data.allBytesLoaded);
			//readExcel(fileName,action);
		}
	});
}
function filesUpload(id,queue,isAuto,isMulti,numdiv,filenames,displaynames){
	var num =0;
	$(id).uploadify({
		'uploader'       : basePath+"static/uploadify/scripts/uploadify.swf",
		'script'         : basePath+"static/uploadify/uploadImages.jsp",
		'cancelImg'      : basePath+"static/uploadify/cancel.png",
		'folder'         : basePath+"static/uploads",
		'queueID'        : queue,
		'height' 		 : 20,
		'width' 		 : 60,
		'auto'           : isAuto,
		'multi'          : isMulti,
		'buttonText'     : 'browse',
		'buttonImg'		 :basePath+"static/uploadify/btn.png", 
		//'fileDesc'		 : '音频文件*.mp3;*.wav;*.mid',
		'fileDesc'		 : '文件*.*',
		'fileExt'		 : '*.*',
		'sizeLimit'		 : 51200000,
//		'rollover'		 : true,
//		'onSelect' : function() {
//			$("#"+queue+" .uploadifyQueueItem").append("<input type='button' value='test'/>");
//			queueIndex++;
//		},
//		onCheck : function() {
//			alert('check');
//		},
		'onComplete'	 : function(event,queueId,fileObj,response,data){
			//$.ligerDialog.success("唯一标识:"+queueId+"\n"+"文件名："+fileObj.name+"\n"+"文件大小："+fileObj.size+"\n"+"文件类型："+fileObj.type+"\n"+"返回值："+$.trim(response)+"\n"+"剩余未完成文件数："+data.fileCount+"\n"+"上传平均速度："+data.speed);
			//$.ligerDialog.success("导入的文件名："+fileObj.name+"<br>"+"文件大小："+fileObj.size+" B");
			//fileName = fileObj.name;
			//这是更名后的文件名
			if($.trim(response).split("/")[1].split("-ESS@ESS-").length==2){
				displaynames.push($.trim(response).split("/")[1].split("-ESS@ESS-")[0]+"."+$.trim(response).split("/")[1].split("-ESS@ESS-")[1].split(".")[1]);
			}else{
				displaynames.push($.trim(response).split("/")[1]);
			}
			filenames.push($.trim(response).split("/")[1]);
//			$("#uploadNum").html("已上传"+(num+1)+"张图片到服务器，点击[添加]按钮确定上传。");
		},
		'onAllComplete'	 : function(event,data){
			$.ligerDialog.success("上传的所有文件个数:"+data.filesUploaded+"\n"+"所有上传文件的总大小:"+data.allBytesLoaded+"\n点击[添加]按钮确定上传。");
			//readExcel(fileName,action);
			var html = "<table style='font-size:12px;line-height:22px;'>";
//			$('#'+numdiv).append("<table>");
			for(var i=0;i<displaynames.length;i++){
				html += "<tr><td>"+displaynames[i]+"</td><td><input type='text' style='font-size:12px;height:20px;'/></td></tr>";
			}
			html += "</table>";
			$('#'+numdiv).html(html);
			displaynames = [];
		}
	});
}
