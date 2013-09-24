/*柱状图
 * type:column;div:渲染div;categoreis:x轴数据;titile,sutitle：主、副标题
 * blegend:说明是否显示，
 * ytext:y轴的说明文本
 * 
 * */
var chart;
function createColumn(type, div, categories, series, title, subtitle, blegend, ytext,aver) {
	chart = new Highcharts.Chart({
		chart : {
			renderTo : div,
			type : type,
			zoomType : 'xy',
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 10,
			spacingRight:53,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : [ 0, 0, 500, 500 ],
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
						[ 1, 'rgb(200, 200, 255)' ] ]
			}
		},
		title : {
			text : title,
			style : {
				font : "bold 14px '微软雅黑', Arial, sans-serif"
			}
		},
		subtitle : {
			text : subtitle,
			style : {
				font : "bold 12px '微软雅黑', Arial, sans-serif"
			}
		},
		xAxis : {
			categories : categories,
			labels : {
				rotation : 0,
				align : 'center',
				style : {
					font : "12px bold '微软雅黑', Arial, sans-serif"
				}
			}

		},
		yAxis : {
			title : {
				text : ytext
			},
			plotLines : [{
				value : aver,
				color : 'grey',
				dashStyle : 'dash',
				width : 1,
				label : {
					text : '<b>平均值<br/>'+aver+"</b>",
					style:{
						color:'grey'
					},
					align: 'right',
					x:25,
					y:-7
				
				},
				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
			}]
		},
		legend : {
			enabled : blegend,
			layout : 'horizontal',
			backgroundColor : '#FFFFFF',
			align : 'center',
			verticalAlign : 'top',
			y : 40,
			floating : true,
			shadow : true
		},
		credits : {
			enabled : true,
			text : "copyright Essence",
			href : "",
			position : {
				align : "right",
				x : -15,
				verticalAlign : "bottom",
				y : -10
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.x + '</b><br/><b>' + this.series.name
						+ '</b> ' + ytext.split(" ")[0] + ': <b>'
						+ Highcharts.numberFormat(this.y, 1) + "</b>(mm)";
			}
		},
		plotOptions : {
			column : {
				pointPadding : 0.1,
				borderWidth : 0,
				cursor : 'pointer',
				point : {
					events : {
						click : function() {
						}
					}
				},
				dataLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold'
					},
					formatter : function() {
						return Highcharts.numberFormat(this.y, 1);
					}
				}
			}
		},
		series : series
	});
}

/*柱状图 ,共12个参数
 * type:column;div:渲染div;categoreis:x轴数据;titile,sutitle：主、副标题
 * blegend:说明是否显示，
 * ytext:y轴的说明文本
 * oData:一个对象，日前有属性：max,min
 * 柱图带有click事件
 * */
var chart;
function createColumnTwe(type, div, categories, series, title, subtitle, blegend, ytext,aver,stacking, oData) {
	if(stacking == undefined) stacking = null;
	chart = new Highcharts.Chart({
		chart : {
			renderTo : div,
			type : type,
			zoomType : 'xy',
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 10,
			spacingRight:53,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : [ 0, 0, 500, 500 ],
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
						[ 1, 'rgb(200, 200, 255)' ] ]
			}
		},
		title : {
			text : title,
			style : {
				font : "bold 14px '微软雅黑', Arial, sans-serif"
			}
		},
		subtitle : {
			text : subtitle,
			style : {
				font : "bold 12px '微软雅黑', Arial, sans-serif"
			}
		},
		xAxis : {
			categories : categories,
			labels : {
				rotation : 0,
				align : 'center',
				style : {
					font : "12px bold '微软雅黑', Arial, sans-serif"
				}
			}

		},
		yAxis : {
			title : {
				text : ytext
			},
			stackLabels:{
				enabled:true,
				style:{
					fontWeight:'bold',
					color:'gray'
				},
				formatter: function(){
					if(this.total == oData.max){
						/*for(var a in this){
								 alert(a);   在这里并不清楚这里的this 到底是什么，还有待进一步研究
						}*/
						return "<span style='color:red;'>最大</span><br/>"+formatFloat(this.total,1);
						
					}else if(this.total == oData.min){
						return "最小<br/>"+formatFloat(this.total,1);
					}
					return "<br/>"+formatFloat(this.total,1);
				},
				y:-16
				
			},
			plotLines : [{
				value : aver,
				color : '#F09CC6',
				dashStyle : 'longdashdot',
				width:2,
				label : {
					text : "<b>"+aver+"</b>",
					style:{
						color:'#e00'
					},
					align: 'right',
					x:40, //右为正
					y:3  //下为正
				
				},
				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
			}]
		},
		legend : {
			enabled : blegend,
			layout : 'horizontal',
			backgroundColor : '#FFFFFF',
			align : 'center',
			verticalAlign : 'top',
			y : 20,
			floating : true,
			shadow : true
		},
		credits : {
			enabled : true,
			text : "copyright Essence",
			href : "",
			position : {
				align : "right",
				x : -15,
				verticalAlign : "bottom",
				y : -10
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.x + '</b><br/><b>' + this.series.name
						+ '</b> ' + ytext.split(" ")[0] + ': <b>'
						+ Highcharts.numberFormat(this.y, 1) + "</b>(mm)";
			}
		},
		plotOptions : {
			column : {
				stacking: stacking,  //normal让多个数据组成stack,(null),percent
				pointPadding : 0.1,
				borderWidth : 0,
				cursor : 'pointer',
				point : {
					events : {
						click : function() {
							//do something here
						}
					}
				},
				dataLabels : {
					enabled : true,
					color: 'white',
					style : {
						//fontWeight : 'bold'
					},
					formatter : function() {
						return Highcharts.numberFormat(this.y, 1);
					}
				}
			}
		},
		series : series
	});
	return chart;
}


/*用于月降雨量页面
 * 柱状图 ,共11个参数
 * type:column;div:渲染div;categoreis:x轴数据;titile,sutitle：主、副标题
 * blegend:说明是否显示，
 * ytext:y轴的说明文本
 * 柱状图有点击事件
 * 可返回chart对象
 * oData:一个对象，日前有属性：max,min
 * stacking:是否让柱图叠加
 * dlSW,True，dataTables是否启用，在柱子中间的数字，false则看不到
 * */
var yearchartClick = [], monthchartClick=[],daychartClick=[],hourchartClick=[]; //记录各柱图被占击的柱子，数组
function createColumnTen(type, div, categories, series, title, subtitle, blegend, ytext,aver,stacking, oData,dlSW) {
	var chart;
	if(stacking == undefined) stacking = null;
	chart = new Highcharts.Chart({
		chart : {
			renderTo : div,
			type : type,
			zoomType : 'xy',
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 10,
			spacingRight:53,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : [ 0, 0, 500, 500 ],
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
						[ 1, 'rgb(200, 200, 255)' ] ]
			}
		},
		title : {
			text : title,
			style : {
				font : "bold 14px '微软雅黑', Arial, sans-serif"
			}
		},
		subtitle : {
			text : subtitle,
			style : {
				font : "bold 12px '微软雅黑', Arial, sans-serif"
			}
		},
		xAxis : {
			categories : categories,
			labels : {
				rotation : 0,
				align : 'center',
				style : {
					font : "12px bold '微软雅黑', Arial, sans-serif"
				}
			}

		},
		yAxis : {
			title : {
				text : ytext
			},
			stackLabels:{
				enabled:true,
				style:{
					fontWeight:'bold',
					color:'gray'
				},
				formatter: function(){
					this.total = formatFloat(this.total,1);
					if(this.total == oData.max){
						/*for(var a in this){
								 alert(a);   在这里并不清楚这里的this 到底是什么，还有待进一步研究
						}*/
						return "<span style='color:red;'>最大</span><br/>"+this.total;
						
					}else if(this.total == oData.min){
						return "最小<br/>"+this.total;
					}
					return "<br/>"+this.total;
				},
				y:-16
				
			},
			plotLines : [{
				id:"line"+aver,
				value : aver,
				color : '#F09CC6',
				dashStyle : 'longdashdot',
				
				width:2,
				label : {
					text : "<b>"+aver+"</b>",
					style:{
						color:'#e00'
					},
					align: 'right',
					x:40, //右为正
					y:3  //下为正
				
				},
				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
			}]
		},
		legend : {
			enabled : blegend,
			layout : 'horizontal',
			backgroundColor : '#FFFFFF',
			align : 'center',
			verticalAlign : 'top',
			y : 20,
			floating : true,
			shadow : true
		},
		credits : {
			enabled : true,
			text : "copyright Essence",
			href : "",
			position : {
				align : "right",
				x : -15,
				verticalAlign : "bottom",
				y : -10
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/><b>' +this.x 
						+ '</b> ' + ytext.split(" ")[0] + ': <b>'
						+ Highcharts.numberFormat(this.y, 1) + "</b>(mm)";
			}
		},
		plotOptions : {
			column : {
				stacking: stacking,  //normal让多个数据组成stack,(null),percent
				pointPadding : 0.1,
				borderWidth : 0,
				cursor : 'pointer',
				point : {
					events : {
						click : function() {
							var stnm = "",st="",et="",tem="";
							if(div=="mdiv"){
								monthchartClick.push(this.x);  //记录每次
								markCol(mchart,1,monthchartClick);
								times.month++;
								//第一次柱子点击事件
								if(times.month==1){
									mchart.setSize(pageWidth()-80,400);
									$("#mdiv,#ddiv,#hdiv").css({"width":pageWidth()-80});
									$("#dtab").css("display","block");
								}
								stnm = categories[this.x];
								tem = {year:title.split("年")[0],month:parseInt(title.split("年")[1].split("月")[0])};
								st = new Date(tem.year,tem.month-1,1);
								et = new Date(tem.year,tem.month,1);
								
								getDayColumn(st,et,stnm);
								topDiv("ddiv");
								nexttabOn("mdiv");
								getMonthTable(st,et);
							}else if(div=="ddiv"){
								daychartClick.push(this.x);  //记录每次
								markCol(dchart,1,daychartClick);
								times.day++;
								if(times.day==1){
									mchart.setSize(pageWidth()-110,400);
									dchart.setSize(pageWidth()-110,400);
									$("#mdiv,#ddiv,#hdiv").css({"width":pageWidth()-110});
									$("#htab").css("display","block");
								}
								stnm=title.split(" ")[1].split(" ")[0];
								tem = {year:title.split("年")[0],month:parseInt(title.split("年")[1].split("月")[0])-1,day:this.x+1};
								st = new Date(tem.year,tem.month,tem.day,8);
								et = new Date(tem.year,tem.month,tem.day+1,8);
								
								
								getHourColumn(st,et,stnm);
								topDiv("hdiv");
								nexttabOn("ddiv");
								getMSTMHourT(st,et);
							}
							//点击生成某站点的年月雨量
							/*if(title.indexOf("多") != -1){
								//给点击的柱子标记
								//先恢复每个柱子的原来的颜色再改变，解决点击多次，多个柱子颜色改变
								yearchartClick.push(this.x);  //记录每次
								
								markCol(yearchart,2,yearchartClick);
								var year = title.split("年")[0];
								var stnm = this.category;
								var st  = new Date(year, 0 ,1);
								var et  = new Date(parseFloat(year)+1, 0 ,1);
								showMonthChartFrame(st,et,stnm);
							//点击生成某站点的年月日雨量
							}else if(title.split(" ")[0].length==5){
								monthchartClick.push(this.x);  //记录每次
								markCol(monthchart,1,monthchartClick);
								var stnm = title.split(" ")[1];
								var year = title.substr(0,4);
								var month = this.x;
								var st = new Date(year,month,1);
								var et = new Date(year,month+1,1);
								showDayChartFrame(st,et,stnm);
							//点击生成某站点的年月日时雨量,避免小时的点击事件
							}else if(title.split(" ")[0].length>5&&title.split(" ")[0].length<9){
								daychartClick.push(this.x);  //记录每次
								markCol(daychart,1,daychartClick);
								var stnm = title.split(" ")[1];
								var year = title.split("年")[0];
								var month = title.split("月")[0].split("年")[1];
								var date = this.x+1;
								var st = changeDate(year+"-"+month+"-"+date,"h8");
								var et = changeDate(year+"-"+month+"-"+(date+1),"h8");
								showHourChartFrame(st,et,stnm);
							}*/
						}
					}
				},
				dataLabels : {
					enabled : dlSW,
					color: 'white',
					style : {
						//fontWeight : 'bold'
					},
					formatter : function() {
						return Highcharts.numberFormat(this.y, 1);
					}
				}
			}
		},
		series : series
	});
	return chart;
}
/*用于日降雨量
 * 柱状图 ,共11个参数
 * type:column;div:渲染div;categoreis:x轴数据;titile,sutitle：主、副标题
 * blegend:说明是否显示，
 * ytext:y轴的说明文本
 * 柱状图有点击事件
 * 可返回chart对象
 * oData:一个对象，日前有属性：max,min
 * stacking:是否让柱图叠加
 * dlSW,True，dataTables是否启用，在柱子中间的数字，false则看不到
 * */
function createColumnTenD(type, div, categories, series, title, subtitle, blegend, ytext,aver,stacking, oData,dlSW) {
	var chart;
	if(stacking == undefined) stacking = null;
	chart = new Highcharts.Chart({
		chart : {
			renderTo : div,
			type : type,
			zoomType : 'xy',
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 10,
			spacingRight:53,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : [ 0, 0, 500, 500 ],
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
						[ 1, 'rgb(200, 200, 255)' ] ]
			}
		},
		title : {
			text : title,
			style : {
				font : "bold 14px '微软雅黑', Arial, sans-serif"
			}
		},
		subtitle : {
			text : subtitle,
			style : {
				font : "bold 12px '微软雅黑', Arial, sans-serif"
			}
		},
		xAxis : {
			categories : categories,
			labels : {
				rotation : 0,
				align : 'center',
				style : {
					font : "12px bold '微软雅黑', Arial, sans-serif"
				}
			}

		},
		yAxis : {
			title : {
				text : ytext
			},
			stackLabels:{
				enabled:true,
				style:{
					fontWeight:'bold',
					color:'gray'
				},
				formatter: function(){
					this.total = formatFloat(this.total,1);
					if(this.total == oData.max){
						/*for(var a in this){
								 alert(a);   在这里并不清楚这里的this 到底是什么，还有待进一步研究
						}*/
						return "<span style='color:red;'>最大</span><br/>"+this.total;
						
					}else if(this.total == oData.min){
						return "最小<br/>"+this.total;
					}
					return "<br/>"+this.total;
				},
				y:-16
				
			},
			plotLines : [{
				value : aver,
				color : '#F09CC6',
				dashStyle : 'longdashdot',
				width:2,
				label : {
					text : "<b>"+aver+"</b>",
					style:{
						color:'#e00'
					},
					align: 'right',
					x:40, //右为正
					y:3  //下为正
				
				},
				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
			}]
		},
		legend : {
			enabled : blegend,
			layout : 'horizontal',
			backgroundColor : '#FFFFFF',
			align : 'center',
			verticalAlign : 'top',
			y : 20,
			floating : true,
			shadow : true
		},
		credits : {
			enabled : true,
			text : "copyright Essence",
			href : "",
			position : {
				align : "right",
				x : -15,
				verticalAlign : "bottom",
				y : -10
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/><b>' +this.x 
						+ '</b> ' + ytext.split(" ")[0] + ': <b>'
						+ Highcharts.numberFormat(this.y, 1) + "</b>(mm)";
			}
		},
		plotOptions : {
			column : {
				stacking: stacking,  //normal让多个数据组成stack,(null),percent
				pointPadding : 0.1,
				borderWidth : 0,
				cursor : 'pointer',
				point : {
					events : {
						click : function() {
							var stnm = "",st="",et="",tem="";
							console.info("123");
							alert("asd");
							console.info("div"+div);
							if(div=="ddiv"){
								daychartClick.push(this.x);  //记录每次
								times.day++;
								if(times.day==1){
									dchart.setSize(pageWidth()-80,400);
									$("#mdiv,#ddiv,#hdiv").css({"width":pageWidth()-80});
									$("#htab").css("display","block");
								}
								stnm = categories[this.x];
								tem = {year:title.split("年")[0],month:parseFloat(title.split("年")[1].split("月")[0])-1,day:parseFloat(title.split("年")[1].split("月")[1].split("日")[0])};
								st = new Date(tem.year,tem.month,tem.day,8);
								et = new Date(tem.year,tem.month,tem.day+1,8);
								
								nexttabOn("ddiv");
								topDiv("hdiv");
								getHourColumn(st,et,stnm);
								//生成多站24时的table
								$("#ddivT").hide();
								getMSTMHourT(st,et);
								
							}
						}
					}
				},
				dataLabels : {
					enabled : dlSW,
					color: 'white',
					style : {
						//fontWeight : 'bold'
					},
					formatter : function() {
						return Highcharts.numberFormat(this.y, 1);
					}
				}
			}
		},
		series : series
	});
	return chart;
}

/*用于时降雨量
 * 柱状图 ,共11个参数
 * type:column;div:渲染div;categoreis:x轴数据;titile,sutitle：主、副标题
 * blegend:说明是否显示，
 * ytext:y轴的说明文本
 * 柱状图有点击事件
 * 可返回chart对象
 * oData:一个对象，日前有属性：max,min
 * stacking:是否让柱图叠加
 * dlSW,True，dataTables是否启用，在柱子中间的数字，false则看不到
 * */
function createColumnTenH(type, div, categories, series, title, subtitle, blegend, ytext,aver,stacking, oData,dlSW) {
	var chart;
	if(stacking == undefined) stacking = null;
	chart = new Highcharts.Chart({
		chart : {
			renderTo : div,
			type : type,
			zoomType : 'xy',
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 10,
			spacingRight:53,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : [ 0, 0, 500, 500 ],
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
						[ 1, 'rgb(200, 200, 255)' ] ]
			}
		},
		title : {
			text : title,
			style : {
				font : "bold 14px '微软雅黑', Arial, sans-serif"
			}
		},
		subtitle : {
			text : subtitle,
			style : {
				font : "bold 12px '微软雅黑', Arial, sans-serif"
			}
		},
		xAxis : {
			categories : categories,
			labels : {
				rotation : 0,
				align : 'center',
				style : {
					font : "12px bold '微软雅黑', Arial, sans-serif"
				}
			}

		},
		yAxis : {
			min:0,
			stackOnTick:true,
			title : {
				text : ytext
			},
			stackLabels:{
				enabled:true,
				style:{
					fontWeight:'bold',
					color:'gray'
				},
				formatter: function(){
					this.total = formatFloat(this.total,1);
					if(this.total == oData.max){
						/*for(var a in this){
								 alert(a);   在这里并不清楚这里的this 到底是什么，还有待进一步研究
						}*/
						return "<span style='color:red;'>最大</span><br/>"+this.total;
						
					}else if(this.total == oData.min){
						return "最小<br/>"+this.total;
					}
					return "<br/>"+this.total;
				},
				y:-16
				
			},
			plotLines : [{
				value : aver,
				color : '#F09CC6',
				dashStyle : 'longdashdot',
				width:2,
				label : {
					text : "<b>"+aver+"</b>",
					style:{
						color:'#e00'
					},
					align: 'right',
					x:40, //右为正
					y:3  //下为正
				
				},
				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
			}]
		},
		legend : {
			enabled : blegend,
			layout : 'horizontal',
			backgroundColor : '#FFFFFF',
			align : 'center',
			verticalAlign : 'top',
			y : 20,
			floating : true,
			shadow : true
		},
		credits : {
			enabled : true,
			text : "copyright Essence",
			href : "",
			position : {
				align : "right",
				x : -15,
				verticalAlign : "bottom",
				y : -10
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/><b>' +this.x 
						+ '</b> ' + ytext.split(" ")[0] + ': <b>'
						+ Highcharts.numberFormat(this.y, 1) + "</b>(mm)";
			}
		},
		plotOptions : {
			column : {
				stacking: stacking,  //normal让多个数据组成stack,(null),percent
				pointPadding : 0.1,
				borderWidth : 0
			/*	cursor : 'pointer',
				point : {
					events : {
						click : function() {
						
						}
					}
				},*/
			},
			series:{
				dataLabels : {
					enabled : dlSW,
					borderRadius: 5,
		            backgroundColor: 'rgba(252, 255, 197, 0.7)',
		            borderWidth: 1,
		            borderColor: '#AAA',
		            y: -15,
		            formatter : function() {
					return Highcharts.numberFormat(this.y, 1);
					}
				}
			}
		},
		series : series
	});
	return chart;
}
/*用于雨量累积曲线
 * 柱状图 ,共11个参数
 * type:column;div:渲染div;categoreis:x轴数据;titile,sutitle：主、副标题
 * blegend:说明是否显示，
 * ytext:y轴的说明文本
 * 柱状图有点击事件
 * 可返回chart对象
 * oData:一个对象，日前有属性：max,min
 * stacking:是否让柱图叠加
 * dlSW,True，dataTables是否启用，在柱子中间的数字，false则看不到
 * */
function createLineTwe(type, div, categories, series, title, subtitle, blegend, ytext,aver,stacking, oData,dlSW) {
	var chart;
	if(stacking == undefined) stacking = null;
	chart = new Highcharts.Chart({
		chart : {
			renderTo : div,
			type : type,
			zoomType : 'xy',
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 10,
			spacingRight:53,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : [ 0, 0, 500, 500 ],
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
				          [ 1, 'rgb(200, 200, 255)' ] ]
			}
		},
		title : {
			text : title,
			style : {
				font : "bold 14px '微软雅黑', Arial, sans-serif"
			}
		},
		subtitle : {
			text : subtitle,
			style : {
				font : "bold 12px '微软雅黑', Arial, sans-serif"
			}
		},
		xAxis : {
			categories : categories,
			labels : {
				rotation : 0,
				align : 'center',
				style : {
					font : "12px bold '微软雅黑', Arial, sans-serif"
				}
			}
		
		},
		yAxis : {
			min:0,
			stackOnTick:true,
			title : {
				text : ytext
			},
			stackLabels:{
				enabled:true,
				style:{
					fontWeight:'bold',
					color:'gray'
				},
				formatter: function(){
					this.total = formatFloat(this.total,1);
					if(this.total == oData.max){
						/*for(var a in this){
								 alert(a);   在这里并不清楚这里的this 到底是什么，还有待进一步研究
						}*/
						return "<span style='color:red;'>最大</span><br/>"+this.total;
						
					}else if(this.total == oData.min){
						return "最小<br/>"+this.total;
					}
					return "<br/>"+this.total;
				},
				y:-16
				
			},
			plotLines : [{
				value : aver,
				color : '#F09CC6',
				dashStyle : 'longdashdot',
				width:2,
				label : {
					text : "<b>"+aver+"</b>",
					style:{
						color:'#e00'
					},
					align: 'right',
					x:40, //右为正
					y:3  //下为正
					
				},
				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
			}]
		},
		legend : {
			enabled : blegend,
			layout : 'horizontal',
			backgroundColor : '#FFFFFF',
			align : 'center',
			verticalAlign : 'top',
			y : 20,
			floating : true,
			shadow : true
		},
		credits : {
			enabled : true,
			text : "copyright Essence",
			href : "",
			position : {
				align : "right",
				x : -15,
				verticalAlign : "bottom",
				y : -10
			},
			style : {
				cursor : "pointer",
				color : "#909090",
				fontSize : "10px"
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/><b>' +this.x 
				+ '</b> ' + ytext.split(" ")[0] + ': <b>'
				+ Highcharts.numberFormat(this.y, 1) + "</b>(mm)";
			}
		},
		plotOptions : {
			spline : {
				cursor:'pointer',
				point:{
					events:{
						click:function(){
							lclks.push({x:this.x,info:categories[this.x],y:this.y});
							if(lclks.length>1){
								var len = lclks.length;
								if(lclks[len-2].x<=lclks[len-1].x){
									$("#tooltipInfo").html(lclks[len-2].info+"--"+lclks[len-1].info);
									$("#tooltipData").html("降雨量："+formatFloat((lclks[len-1].y-lclks[len-2].y),1)+" mm");
								}else{
									$("#tooltipInfo").html(lclks[len-1].info+"--"+lclks[len-2].info);
									$("#tooltipData").html("降雨量："+formatFloat((lclks[len-2].y-lclks[len-1].y),1)+" mm");
								}
							}
						}
					}
				}
			},
			series:{
				dataLabels : {
					enabled : dlSW,
					borderRadius: 5,
					backgroundColor: 'rgba(252, 255, 197, 0.7)',
					borderWidth: 1,
					borderColor: '#AAA',
					y: -15,
					formatter : function() {
						return Highcharts.numberFormat(this.y, 1);
					}
				}
			}
		},
		series : series
	});
	return chart;
}

	//多站30日的table
	function getMonthTable(st,et){
		if(dTable != undefined){
			dTable.fnDestroy();
			$("#dtable thead th").remove();
			$("#dtable tbody tr").remove();
			$("#dtable tfoot tr").remove();
		}
		$("#ddivT").show();
		operateDataBase([{key:"method",value:"getManySTSDay"},{key:"st",value:st.format("yyyy-MM-dd")},{key:"et",value:et.format("yyyy-MM-dd")}],"sqlAction/getList",function(data){
		var data = data.jsonData;
			et.setDate(et.getDate()-1);
		var head = "<tr><th rowspan='2'><div style='width:38px;text-align:center'>站名</div></th><th colspan='"+et.getDate()+"' style='text-align:center'>"+st.format("yyyy年MM月")+"</th><th rowspan='2'>总降雨量(mm)</th></tr><tr>";
		for(var i=0;i<et.getDate();i++){
			head +="<th>"+(i+1)+"日</th>";
		}
		head += "</tr>";
		$("#dtable thead").html(head);
		data = groupData(data);  
		for(var i=0;i<data.length;i++){
			var trstr = "<tr><td >"+data[i][0].STNM+"</td>";
			for(k=0;k<=data[i].length;k++){
				trstr += "<td>&nbsp;</td>";
			}
			trstr = $(trstr+"</tr>");
			$("#dtable tbody").append(trstr);
			var sum = 0;
			for(var j=0;j<data[i].length;j++){
				var position = new Date(data[i][j].TIME).getDate();
				trstr.find("td:eq("+position+")").html("<span class='nordata'>"+formatFloat(data[i][j].RAINFALL,1)+"</span>");
				if(data[i][j].DATATYPE==0){
					trstr.find("td:eq("+position+")").append("<span class='prodata'>&nbsp;&nbsp;&nbsp; * </span>");
					//alert(data[i][j]);
				}
				sum +=  data[i][j].RAINFALL;
			}
			
			trstr.find("td:last").html("<td ><span class='nordata'>"+formatFloat(sum,1)+"</span></td>");
			
		}
		//先找出最大值
		var maxarr = [],colsumarr=[];
		for(var i=1;i<et.getDate()+2;i++){
			var max =0,colsum=0;
			$("#dtable tbody").find("tr").find("td:eq("+i+") .nordata").each(function(){
				var value = parseFloat($(this).html());
				(max<value)?max=value:max;
				colsum += value;
			});
			maxarr.push(max);
			colsumarr.push(colsum);
		}
		//再给再大值设置样式
		for(var i=1;i<et.getDate()+2;i++){
			$("#dtable tbody").find("tr").find("td:eq("+i+") .nordata").each(function(){
				if(maxarr[i-1]==$(this).html())
				$(this).css({"color":"red","font-weight":"bold"});
			});
		}
		//加最下面的一行平均值
		var avgstr = "<tr style='background:#D3D6FF;'><td width='50px' style='text-align:center;border:1px solid #eee;font-weight:bold;'>平均降雨量</td>";
		for(var i=0;i<colsumarr.length;i++){
			avgstr += "<td class='avg'>"+formatFloat(colsumarr[i]/17,1)+"</td>";
		}
		avgstr+="</tr>";
		$("#dtable tfoot").append(avgstr);
		
		$(".nordata").click(function(){
			var nordataWin = $.ligerDialog.open({
				name:new Date().getTime(),
				//url:basePath+"page/fxkh/yqxx/yczylcx/promonth?stcd="+encodeURI(stnm)+"&time="+clickdate.format("yyyy-MM-dd"),
				title:"123",
				width:600,
				height:500,
				buttons:[{text:'确定',onclick:function(){
					  //console.info($(window.document).contents().find("#iframe2"));
							$(window.document).contents().find("[name='"+name+"']")[0].contentWindow.test();
						 }},
				         {text:'取消',onclick:function(item,dialog){
				        	 nordataWin.close();
				         }}]
			});
		});
		
		//标星点的数据点击事件
		$(".prodata").hover(function(){
			$(this).addClass("tdhover").attr("title","数据有问题，点击修改");
		},function(){
			$(this).removeClass("tdhover");
		}).click(function(){
			var stnm = $(this).parent().parent().find("td").html();
			//找到当前数据是第几个
			var num = "";
			var rainfall = parseFloat($(this).siblings("span").html());
			$(this).parent().parent().find("td span:first-child").each(function(index){
				if(parseFloat($(this).html())==rainfall) num = index;
			});
			
			var clickdate = new Date(st.getFullYear(),num,1);
			var win = $.ligerDialog.open({
				name:new Date().getTime(),
				url:basePath+"page/fxkh/yqxx/yczylcx/promonth?stnm="+encodeURI(stnm)+"&time="+clickdate.getTime(),
				title:stnm,
				width:600,
				height:500,
				buttons:[{text:'确定',onclick:function(){
					//console.info($(window.document).contents().find("#iframe2"));
							$(window.document).contents().find("[name='"+name+"']")[0].contentWindow.test();
						 }},
				         {text:'取消',onclick:function(item,dialog){
				        	 win.close();
				         }}]
			});
		});
		
		dTable = $("#dtable").dataTable({
			"bPaginate":false,
			"aaSorting":[[0,"asc"]],
			"bJQueryUI":true,
			"cache":false,
			"sScrollX":"100%",
			//"sScrollXInner":"110%",
			//"bScrollCollapse": true,
			"bDeferRender":true,
			"oLanguage":{
				"sUrl": basePath+"static/js/language_kevin.txt"
			}
			//,"aoColumnDefs":[{
			//	"sClass":"center","aTargets":[0,1,2,3,4,5,6,7,8,9,10,11,12]
			//}]
		});
		
	},false);
		
	}
	
//多站24时的table
	function getMSTMHourT(st,et){
  	//移去上一次表格的元素
    if(hTable!=undefined){
    	hTable.fnDestroy(); 
    	$("#htable thead th").remove();
    	$("#htable tbody tr").remove();
    	$("#htable tfoot tr").remove();
    }
		$("#hdivT").show();
		operateDataBase([{key:"method",value:"getMSTMHourT"},{key:"st",value:st.format("yyyy-MM-dd hh:mm")},{key:"et",value:et.format("yyyy-MM-dd hh:mm")}],"sqlAction/getList",function(data){
		var data = data.jsonData;
		var colnum = 24;
		var head = "<tr><th rowspan='2'><div style='width:38px;text-align:center'>站名</div></th><th colspan='"+colnum+"' style='text-align:center'>"+st.format("yyyy年MM月dd日")+"</th><th rowspan='2'>总降雨量(mm)</th></tr><tr>";
		for(var i=8;i<colnum+8;i++){
			if(i<24){
				head +="<th>"+i+"时</th>";
			}else{
				head +="<th><div style='width:25px'>次日"+(i-24)+"时</div></th>";
			}
		}
		head += "</tr>";
		$("#htable thead").html(head);
		data = groupData(data);  
		for(var i=0;i<data.length;i++){
			var trstr = "<tr><td >"+data[i][0].STNM+"</td>";
			for(k=0;k<=data[i].length;k++){
				trstr += "<td>&nbsp;</td>";
			}
			trstr = $(trstr+"</tr>");
			$("#htable tbody").append(trstr);
			var sum = 0;
			for(var j=0;j<data[i].length;j++){
				var position = new Date(data[i][j].TIME).getHours();
				if(position>7){ position =position - 7;
				}else if(position<=7)position = position + 17;
				trstr.find("td:eq("+position+")").html("<span class='nordata'>"+formatFloat(data[i][j].RAINFALL,1)+"</span>");
				if(data[i][j].DATATYPE==0){
					trstr.find("td:eq("+position+")").append("<span class='prodata'>&nbsp;&nbsp;&nbsp; * </span>");
					//alert(data[i][j]);
				}
				sum +=  data[i][j].RAINFALL;
			}
			
			trstr.find("td:last").html("<td ><span class='nordata'>"+formatFloat(sum,1)+"</span></td>");
			
		}
		//先找出最大值
		var maxarr = [],colsumarr=[];
		for(var i=1;i<colnum+2;i++){
			var max =0,colsum=0;
			$("#htable tbody").find("tr").find("td:eq("+i+") .nordata").each(function(){
				var value = parseFloat($(this).html());
				(max<value)?max=value:max;
				colsum += value;
			});
			maxarr.push(max);
			colsumarr.push(colsum);
		}
		//再给再大值设置样式
		for(var i=1;i<colnum+2;i++){
			$("#htable tbody").find("tr").find("td:eq("+i+") .nordata").each(function(){
				if(maxarr[i-1]==$(this).html())
				$(this).css({"color":"red","font-weight":"bold"});
			});
		}
		//加最下面的一行平均值
		var avgstr = "<tr style='background:#D3D6FF;'><td width='50px' style='text-align:center;border:1px solid #eee;font-weight:bold;'>平均降雨量</td>";
		for(var i=0;i<colsumarr.length;i++){
			avgstr += "<td class='avg'>"+formatFloat(colsumarr[i]/17,1)+"</td>";
		}
		avgstr+="</tr>";
		$("#htable tfoot").append(avgstr);
		
		$(".nordata").click(function(){
			var nordataWin = $.ligerDialog.open({
				name:new Date().getTime(),
				//url:basePath+"page/fxkh/yqxx/yczylcx/promonth?stcd="+encodeURI(stnm)+"&time="+clickdate.format("yyyy-MM-dd"),
				title:"123",
				width:600,
				height:500,
				buttons:[{text:'确定',onclick:function(){
					  //console.info($(window.document).contents().find("#iframe2"));
							$(window.document).contents().find("[name='"+name+"']")[0].contentWindow.test();
						 }},
				         {text:'取消',onclick:function(item,dialog){
				        	 nordataWin.close();
				         }}]
			});
		});
		
		//标星点的数据点击事件
		$(".prodata").hover(function(){
			$(this).addClass("tdhover").attr("title","数据有问题，点击修改");
		},function(){
			$(this).removeClass("tdhover");
		}).click(function(){
			var stnm = $(this).parent().parent().find("td").html();
			//找到当前数据是第几个
			var num = "";
			var rainfall = parseFloat($(this).siblings("span").html());
			$(this).parent().parent().find("td span:first-child").each(function(index){
				if(parseFloat($(this).html())==rainfall) num = index;
			});
			
			var clickdate = new Date(st.getFullYear(),num,1);
			var win = $.ligerDialog.open({
				name:new Date().getTime(),
				url:basePath+"page/fxkh/yqxx/yczylcx/promonth?stnm="+encodeURI(stnm)+"&time="+clickdate.getTime(),
				title:stnm,
				width:600,
				height:500,
				buttons:[{text:'确定',onclick:function(){
					//console.info($(window.document).contents().find("#iframe2"));
							$(window.document).contents().find("[name='"+name+"']")[0].contentWindow.test();
						 }},
				         {text:'取消',onclick:function(item,dialog){
				        	 win.close();
				         }}]
			});
		});
		
		hTable = $("#htable").dataTable({
			"bPaginate":false,
			"aaSorting":[[0,"asc"]],
			"bJQueryUI":true,
			"cache":false,
			"sScrollX":"100%",
			//"sScrollXInner":"110%",
			//"bScrollCollapse": true,
			"bDeferRender":true,
			"oLanguage":{
				"sUrl": basePath+"static/js/language_kevin.txt"
			}
			//,"aoColumnDefs":[{
			//	"sClass":"center","aTargets":[0,1,2,3,4,5,6,7,8,9,10,11,12]
			//}]
		});
		
	},false);
}
	
	//分组方法
function groupData(data){
	var flag = data[0].STCD;
	var st = [];
	var d = [];
	for(var i = 0;i < data.length;i++){
		if(flag == data[i].STCD){
			d.push(data[i]);
			if(i == data.length-1){
				st.push(d);
			}
		}else{
			st.push(d);
			d = [];
			d.push(data[i]);
			flag = data[i].STCD;
		}
	}
	return st;
}
	

/**
 * 用来颜色来标记点击的那根柱子的，
 * 
 * 代替方法：在柱子上冒一个泡就来标记这个柱子被点击
 * 
 * @para chart 为哪个chart里的柱子被点击
 * @para num 为series里有几个数组，因为年降雨量的stack为两个值，故有两个,这里**先用这样用吧**
 * @para clicknum 为点击的次数的数组，记录每次点击的柱子x轴值,全局定义
 */
function markCol(chart,num,clicknum){
		//恢复上一次因点击事件颜色改变的柱子的颜色
		if(clicknum.length >1){
			var numlast = clicknum[clicknum.length-2];
			if(num==1){
				chart.series[0].data[numlast].update({"color":"#4572A7"});
			}else if(num==2){      
				chart.series[0].data[numlast].update({"color":"#4572A7"});
				chart.series[1].data[numlast].update({"color":"#AA4643"});
			}
		}
		var numnow = clicknum[clicknum.length-1];
		//改变这次被点击柱子的颜色
		for(var i=0;i<num;i++){
			
			chart.series[i].data[numnow].update({"color":"blue"});
		}
}

function setChart(name, categories, data, color) {
	chart.xAxis[0].setCategories(categories, false);
	chart.series[0].remove(false);
	chart.addSeries({
		name: name,
		data: data,
		color: color || 'white'
	}, false);
	chart.redraw();
}