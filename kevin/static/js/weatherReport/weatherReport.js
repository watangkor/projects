
function look(date){
	// 用ajax  的  POST 方法   从数据库 读取数据
	$.ajax({
		type:'POST',
		async:false,
		contentType : 'application/json;charset=utf-8',
		url : basePath + "crossDomainAction/look",
		data :"{\"date\":\""+date+"\"}",
		dataType : 'json',
		success : function(data) {
			var o = data.jsonData;
			$("#table tbody").html("");
			for(var i=0;i<o.length;i++){
				var date = o[i].C_DATE_Y;
				var datehere = date+o[i].C_TIME;
				$("#table tbody").append("<tr id='"+o[i].N_ID+"' name='"+o[i].C_TIME+"'><td style='cursor:pointer'>"+datehere+"</td></tr>");
			}
			// 给 历史列表的 行 加 点击事件  
			$("#table tbody tr").click(function(){
				var id = $(this).attr("id");
				var name = $(this).attr("name");
				// 定义   一个   方法   （方法是 随便 定义的   只要 一致就行   关键是方法体 ）
				queryById(id,name);
				
			});
		}
	});
	// id 为 d 的 表格  隐藏 
// 	$("#d").hide();
	$("#table tbody tr").hover(function(){
		$(this).addClass("mHover");
	},function(){
		$(this).removeClass("mHover");
	}).click(function(){
		$("#table tbody tr").removeClass("clicked");
		$("#table tbody tr").removeClass("mHover");
		$(this).addClass("clicked");
	});
}
//根据当前时间显示不同表格
function showByLocalTime(){
	var now1 = new Date();
	var isday = false;
	if(now1.getHours()>6&&now1.getHours()<18){
		isday = true;
		$("#night").hide();
		$("#d").show();
	}else{
		$("#night").show();
		$("#d").hide();
	}
	$.ajax({
		type : 'GET',
		async : true,
		contentType : 'application/json;charset=utf-8',
		url : basePath + "crossDomainAction/getData?uri=http://m.weather.com.cn/data/101010200.html",
		dataType : 'json',
		success : function(data) {
			var result = data.jsonData[0].weatherinfo;
			var a = result.temp1;
			var b = result.temp2;
			var c = result.temp3;
			var d = result.temp4;
			var e = result.temp5;
			var f = result.temp6;
			var a1 =a.split("~");
			var b1 =b.split("~");
			var c1 =c.split("~");
			var d1 =d.split("~");
			var e1 =e.split("~");
			var f1 =f.split("~");
			if(!isday){
				var now = new Date();
				//晚上				
				$(".ntem:eq(0)").html(a1[0]);
				$(".ntem:eq(1),.temp:eq(0)").html(a1[1]);				
				$(".ntem:eq(2),.temp:eq(1)").html(b1[0]);
				$(".ntem:eq(3),.temp:eq(2)").html(b1[1]);
				$(".ntem:eq(4),.temp:eq(3)").html(c1[0]);
				$(".ntem:eq(5),.temp:eq(4)").html(c1[1]);
				$(".ntem:eq(6),.temp:eq(5)").html(d1[0]);
				$(".ntem:eq(7),.temp:eq(6)").html(d1[1]);
				$(".ntem:eq(8),.temp:eq(7)").html(e1[0]);
				$(".ntem:eq(9),.temp:eq(8)").html(e1[1]);
				$(".ntem:eq(10),.temp:eq(9)").html(f1[0]);
				$(".ntem:eq(11),.temp:eq(10)").html(f1[1]);
				$(".temp:eq(11)").html("暂无");
				
	// 天气 
				$(".nweather:eq(0)").html(result.img_title1);
				$(".nweather:eq(1),.weather:eq(0)").html(result.img_title2);
				$(".nweather:eq(2),.weather:eq(1)").html(result.img_title3);
				$(".nweather:eq(3),.weather:eq(2)").html(result.img_title4);
				$(".nweather:eq(4),.weather:eq(3)").html(result.img_title5);
				$(".nweather:eq(5),.weather:eq(4)").html(result.img_title6);
				$(".nweather:eq(6),.weather:eq(5)").html(result.img_title7);
				$(".nweather:eq(7),.weather:eq(6)").html(result.img_title8);
				$(".nweather:eq(8),.weather:eq(7)").html(result.img_title9);
				$(".nweather:eq(9),.weather:eq(8)").html(result.img_title10);
				$(".nweather:eq(10),.weather:eq(9)").html(result.img_title11);
				$(".nweather:eq(11),.weather:eq(10)").html(result.img_title12);
				$(".weather:eq(11)").html("");
				
				var imgArr = [];
				var imgName = [];
				var weekHere = [];
				for(var imgIndex=1;imgIndex<13;imgIndex++){
					imgArr.push(result["img"+imgIndex]);
				}
				for(var i=0;i<imgArr.length;i++){
					if(i%2){
						if(imgArr[i].length==1){
							imgName.push("d0"+imgArr[i]+".gif");
						}else{
							if(imgArr[i]=="99"){
								if(imgArr[i-1].length==1){
									imgName.push("d0"+imgArr[i-1]+".gif");
								}else{
									imgName.push("d"+imgArr[i-1]+".gif");
								}
							}else{
								imgName.push("d"+imgArr[i]+".gif");
							}
						}
					}else{
						if(imgArr[i].length==1){
							imgName.push("n0"+imgArr[i]+".gif");
						}else{
							imgName.push("n"+imgArr[i]+".gif");
						}
					}
					for(var j=0;j<imgName.length;j++){
						$("#night img:eq("+j+")").attr("src",uri1+imgName[j]);
						if(j!=0){
							$(".weatherImg:eq("+(j-1)+")").attr("src",uri1+imgName[j]);
						}
					}
				}
		//日期		
				
				//获取回传数据中week的值
				var weekNum = result.week;
//	 			var d = dateNum +"日"+weekNum;
				//得到回传数据中的week是上面定义的星期数组的第几个
				var weekIndex = getIndexOfArray(week,weekNum);
				//如果是星期一
				if(weekIndex==0){
					for(var i=weekIndex;i<week.length;i++){
						weekHere.push(now.getDate()+"日"+week[i]);
						now.setDate(now.getDate()+1);
					}
				}else{
					for(var i=weekIndex;i<week.length;i++){
						weekHere.push(now.getDate()+"日"+week[i]);
						now.setDate(now.getDate()+1);
					}
				}
				for(var j=0;j<weekIndex;j++){
					weekHere.push(now.getDate()+"日"+week[j]);
					now.setDate(now.getDate()+1);
				}
				for(var weekspan=0;weekspan<7;weekspan++){
					$(".nweek:eq("+weekspan+")").html(weekHere[weekspan]);
					if(weekspan!=0){
						$(".date:eq("+(weekspan-1)+")").html(weekHere[weekspan]);
					}
				}
			}else{
				//白天
				$("#qiwen1,.temp:eq(0)").html(a1[0]);
				$("#qiwen2,.temp:eq(1)").html(a1[1]);
				$("#qiwen3,.temp:eq(2)").html(b1[0]);
				$("#qiwen4,.temp:eq(3)").html(b1[1]);
				$("#qiwen5,.temp:eq(4)").html(c1[0]);
				$("#qiwen6,.temp:eq(5)").html(c1[1]);
				$("#qiwen7,.temp:eq(6)").html(d1[0]);
				$("#qiwen8,.temp:eq(7)").html(d1[1]);
				$("#qiwen9,.temp:eq(8)").html(e1[0]);
				$("#qiwen10,.temp:eq(9)").html(e1[1]);
				$("#qiwen11,.temp:eq(10)").html(f1[0]);
				$("#qiwen12,.temp:eq(11)").html(f1[1]);
				
				
				// 天气  
				$("#weather1,.weather:eq(0)").html(result.img_title1);
				$("#weather2,.weather:eq(1)").html(result.img_title2);
				$("#weather3,.weather:eq(2)").html(result.img_title3);
				$("#weather4,.weather:eq(3)").html(result.img_title4);
				$("#weather5,.weather:eq(4)").html(result.img_title5);
				$("#weather6,.weather:eq(5)").html(result.img_title6);
				$("#weather7,.weather:eq(6)").html(result.img_title7);
				$("#weather8,.weather:eq(7)").html(result.img_title8);
				$("#weather9,.weather:eq(8)").html(result.img_title9);
				$("#weather10,.weather:eq(9)").html(result.img_title10);
				$("#weather11,.weather:eq(10)").html(result.img_title11);
				$("#weather12,.weather:eq(11)").html(result.img_title12);
				//图片用for循环定义  imgIndex 变量在  1 到  13之间  ++ 
				var imgArr = [];
				var imgName = [];
				for(var imgIndex=1;imgIndex<13;imgIndex++){
					imgArr.push(result["img"+imgIndex]);
				}
				
				for(var i=0;i<imgArr.length;i++){
					if(i%2){
						if(imgArr[i].length==1){
							imgName.push("n0"+imgArr[i]+".gif");
						}else{
							if(imgArr[i]=="99"){
								if(imgArr[i-1].length==1){
									imgName.push("n0"+imgArr[i-1]+".gif");
								}else{
									imgName.push("n"+imgArr[i-1]+".gif");
								}
							}else{
								imgName.push("n"+imgArr[i]+".gif");
							}
						}
					}else{
						if(imgArr[i].length==1){
							imgName.push("d0"+imgArr[i]+".gif");
						}else{
							imgName.push("d"+imgArr[i]+".gif");
						}
					}
					for(var j=0;j<imgName.length;j++){
						$("#d img:eq("+j+")").attr("src",uri1+imgName[j]);
						$(".weatherImg:eq("+j+")").attr("src",uri1+imgName[j]);
						
						
					}
				}
				// 设定星期  
				var weekHere = [];
				var weekNum = result.week;
				var now = new Date();
				var hereTime = result.date_y;
				var yy = hereTime.split("年")[0];
				var mm = hereTime.split("年")[1].split("月")[0];
				var dd = hereTime.split("年")[1].split("月")[1].split("日")[0];
				now.setFullYear(yy);
				now.setMonth(parseInt(mm)-1);
				now.setDate(dd);
				var d = result.date_y +"日"+weekNum;
				var weekIndex = getIndexOfArray(week,weekNum);
				if(weekIndex==0){
					for(var i=weekIndex;i<week.length-1;i++){
						weekHere.push(now.getDate()+"日"+week[i]);
						now.setDate(now.getDate()+1);
					}
				}else{
					for(var i=weekIndex;i<week.length;i++){
						weekHere.push(now.getDate()+"日"+week[i]);
						now.setDate(now.getDate()+1);
					}
				}
				for(var j=0;j<weekIndex-1;j++){
					weekHere.push(now.getDate()+"日"+week[j]);
					now.setDate(now.getDate()+1);
				}
				for(var weekspan=0;weekspan<6;weekspan++){
					$(".week:eq("+weekspan+")").html(weekHere[weekspan]);
					$(".date:eq("+weekspan+")").html(weekHere[weekspan]);
				}
			}
			$("#pageloading").hide();
		}
	});
}

//通过id查询数据库
function queryById(id,nm){
	var now = new Date();
	var isday = false;
	if(nm!="18:00"){
		isday = true; 
		$("#d").show();
		$("#night").hide();
	}else{
		$("#d").hide();
		$("#night").show();
	}
	//id 为  d的 表格 显示  
	$.ajax({
			type:'POST',
			async:false,
			contentType:'application/json;charset=utf-8',
			url:basePath+"crossDomainAction/select",
			data :"{\"id\":\""+id+"\",\"name\":\""+nm+"\"}",
			dataType:'json',
			success:function(data){
				var result = data.jsonData[0];
			
				// 温度 
//	 			$("#temp1").html(result.TEMP1);
//	 			$("#temp2").html(result.TEMP2);
//	 			$("#temp3").html(result.TEMP3);
//	 			$("#temp4").html(result.TEMP4);
//	 			$("#temp5").html(result.TEMP5);
//	 			$("#temp6").html(result.TEMP6);
				
				var a = result.TEMP1;
				var b = result.TEMP2;
				var c = result.TEMP3;
				var d = result.TEMP4;
				var e = result.TEMP5;
				var f = result.TEMP6;
				var a1 =a.split("~");
				var b1 =b.split("~");
				var c1 =c.split("~");
				var d1 =d.split("~");
				var e1 =e.split("~");
				var f1 =f.split("~");
				if(isday){
					//白天
					$("#qiwen1").html(a1[0]);
					$("#qiwen2").html(a1[1]);
					$("#qiwen3").html(b1[0]);
					$("#qiwen4").html(b1[1]);
					$("#qiwen5").html(c1[0]);
					$("#qiwen6").html(c1[1]);
					$("#qiwen7").html(d1[0]);
					$("#qiwen8").html(d1[1]);
					$("#qiwen9").html(e1[0]);
					$("#qiwen10").html(e1[1]);
					$("#qiwen11").html(f1[0]);
					$("#qiwen12").html(f1[1]);
					
					
					// 天气  
					$("#weather1").html(result.IMG_TITLE1);
					$("#weather2").html(result.IMG_TITLE2);
					$("#weather3").html(result.IMG_TITLE3);
					$("#weather4").html(result.IMG_TITLE4);
					$("#weather5").html(result.IMG_TITLE5);
					$("#weather6").html(result.IMG_TITLE6);
					$("#weather7").html(result.IMG_TITLE7);
					$("#weather8").html(result.IMG_TITLE8);
					$("#weather9").html(result.IMG_TITLE9);
					$("#weather10").html(result.IMG_TITLE10);
					$("#weather11").html(result.IMG_TITLE11);
					$("#weather12").html(result.IMG_TITLE12);
					//图片用for循环定义  imgIndex 变量在  1 到  13之间  ++ 
					var imgArr = [];
					var imgName = [];
					for(var imgIndex=1;imgIndex<13;imgIndex++){
						imgArr.push(result["IMG"+imgIndex]);
					}
					
					for(var i=0;i<imgArr.length;i++){
						if(i%2){
							if(imgArr[i].length==1){
								imgName.push("n0"+imgArr[i]+".gif");
							}else{
								if(imgArr[i]=="99"){
									if(imgArr[i-1].length==1){
										imgName.push("n0"+imgArr[i-1]+".gif");
									}else{
										imgName.push("n"+imgArr[i-1]+".gif");
									}
								}else{
									imgName.push("n"+imgArr[i]+".gif");
								}
							}
						}else{
							if(imgArr[i].length==1){
								imgName.push("d0"+imgArr[i]+".gif");
							}else{
								imgName.push("d"+imgArr[i]+".gif");
							}
						}
						for(var j=0;j<imgName.length;j++){
							$("#d img:eq("+j+")").attr("src",uri1+imgName[j]);
							
							
						}
					}
					// 设定星期  
					var weekHere = [];
					var weekNum = result.C_WEEK;
					var now = new Date();
					var hereTime = result.C_DATE_Y;
					var yy = hereTime.split("年")[0];
					var mm = hereTime.split("年")[1].split("月")[0];
					var dd = hereTime.split("年")[1].split("月")[1].split("日")[0];
					now.setFullYear(yy);
					now.setMonth(parseInt(mm)-1);
					now.setDate(dd);
					var d = result.C_DATE_Y +"日"+weekNum;
					var weekIndex = getIndexOfArray(week,weekNum);
					if(weekIndex==0){
						for(var i=weekIndex;i<week.length-1;i++){
							weekHere.push(now.getDate()+"日"+week[i]);
							now.setDate(now.getDate()+1);
						}
					}else{
						for(var i=weekIndex;i<week.length;i++){
							weekHere.push(now.getDate()+"日"+week[i]);
							now.setDate(now.getDate()+1);
						}
					}
					for(var j=0;j<weekIndex-1;j++){
						weekHere.push(now.getDate()+"日"+week[j]);
						now.setDate(now.getDate()+1);
					}
					for(var weekspan=0;weekspan<6;weekspan++){
						$(".week:eq("+weekspan+")").html(weekHere[weekspan]);
					}
				}else{
					//晚上
					$("#nqiwen1").html(a1[0]);
					$("#nqiwen2").html(a1[1]);
					$("#nqiwen3").html(b1[0]);
					$("#nqiwen4").html(b1[1]);
					$("#nqiwen5").html(c1[0]);
					$("#nqiwen6").html(c1[1]);
					$("#nqiwen7").html(d1[0]);
					$("#nqiwen8").html(d1[1]);
					$("#nqiwen9").html(e1[0]);
					$("#nqiwen10").html(e1[1]);
					$("#nqiwen11").html(f1[0]);
					$("#nqiwen12").html(f1[1]);
					
					
					// 天气  
					$("#nweather1").html(result.IMG_TITLE1);
					$("#nweather2").html(result.IMG_TITLE2);
					$("#nweather3").html(result.IMG_TITLE3);
					$("#nweather4").html(result.IMG_TITLE4);
					$("#nweather5").html(result.IMG_TITLE5);
					$("#nweather6").html(result.IMG_TITLE6);
					$("#nweather7").html(result.IMG_TITLE7);
					$("#nweather8").html(result.IMG_TITLE8);
					$("#nweather9").html(result.IMG_TITLE9);
					$("#nweather10").html(result.IMG_TITLE10);
					$("#nweather11").html(result.IMG_TITLE11);
					$("#nweather12").html(result.IMG_TITLE12);
					//图片用for循环定义  imgIndex 变量在  1 到  13之间  ++ 
					var imgArr = [];
					var imgName = [];
					for(var imgIndex=1;imgIndex<13;imgIndex++){
						imgArr.push(result["IMG"+imgIndex]);
					}
					
					for(var i=0;i<imgArr.length;i++){
						if(i%2){
							if(imgArr[i].length==1){
								imgName.push("n0"+imgArr[i]+".gif");
							}else{
								if(imgArr[i]=="99"){
									if(imgArr[i-1].length==1){
										imgName.push("n0"+imgArr[i-1]+".gif");
									}else{
										imgName.push("n"+imgArr[i-1]+".gif");
									}
								}else{
									imgName.push("n"+imgArr[i]+".gif");
								}
							}
						}else{
							if(imgArr[i].length==1){
								imgName.push("d0"+imgArr[i]+".gif");
							}else{
								imgName.push("d"+imgArr[i]+".gif");
							}
						}
						for(var j=0;j<imgName.length;j++){
							$("#night img:eq("+j+")").attr("src",uri1+imgName[j]);
							
							
						}
					}
					// 设定星期  
					var weekHere = [];
					var weekNum = result.C_WEEK;
					var now = new Date();
					var hereTime = result.C_DATE_Y;
					var yy = hereTime.split("年")[0];
					var mm = hereTime.split("年")[1].split("月")[0];
					var dd = hereTime.split("年")[1].split("月")[1].split("日")[0];
					now.setFullYear(yy);
					now.setMonth(parseInt(mm)-1);
					now.setDate(dd);
					var d = result.C_DATE_Y +"日"+weekNum;
					var weekIndex = getIndexOfArray(week,weekNum);
					if(weekIndex==0){
						for(var i=weekIndex;i<week.length-1;i++){
							weekHere.push(now.getDate()+"日"+week[i]);
							now.setDate(now.getDate()+1);
						}
					}else{
						for(var i=weekIndex;i<week.length;i++){
							weekHere.push(now.getDate()+"日"+week[i]);
							now.setDate(now.getDate()+1);
						}
					}
					for(var j=0;j<weekIndex-1;j++){
						weekHere.push(now.getDate()+"日"+week[j]);
						now.setDate(now.getDate()+1);
					}
					for(var weekspan=0;weekspan<6;weekspan++){
						$(".nweek:eq("+weekspan+")").html(weekHere[weekspan]);
					}
				}
				
			}

		});
}
function getIndexOfArray(arr,value){
	for(var i in arr){
		if(arr[i]==value){
			return i;
		}
	}
}