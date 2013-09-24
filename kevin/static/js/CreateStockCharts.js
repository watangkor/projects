/*
 * 创建Stock拆线图或柱状图
 * 参数data的格式为[[1116806400000,39.76],[1116892800000,39.7],[1116979200000,39.78],[1117065600000,40.74],[1117152000000,40.56],[1117497600000,39.76]]
 * div为渲染的div的id，title为图表的标题，Sname为series的name，格式为"降雨量 mm"，中间以空格隔开
 * series为数据，格式为
 * 		[{type:type,name:name,data:data},{},.....]
 * aver为平均线的值
*/
function CreateStockLineOrColumn(div,title,series,defaultSelected,legend){
//	alert("开始绘制HighStock!");
	if(defaultSelected == undefined){
		defaultSelected = 0;
	}
	if(legend == undefined){
		legend = true;
	}
	var s = [];
	for(var i=0;i<series.length;i++){
		s[i] = {
				type: series[i].type,//类型spline、column等
				name : series[i].name,//数据对象名称
				marker : {
				enabled : true,
				radius : 2
				},
				data : series[i].data,//数据
				tooltip: {
					yDecimals: 2
				}
		};
	}
	Highcharts.setOptions({
		global : {
			useUTC : false
		},
		lang: {
			loading: '加载中...',
			months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
					'八月', '九月', '十月', '十一月', '十二月'],
			shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
					'八月', '九月', '十月', '十一月', '十二月'],
			weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			decimalPoint: '.',
			resetZoom: '原始大小',
			resetZoomTitle: '缩放比例 1:1',
			thousandsSep: ','
		}
	});
	window.chart = new Highcharts.StockChart({
		chart : {
			renderTo : div,
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 25,
			spacingRight : 25,
			spacingBottom : 25,
			spacingTop : 15,
			shadow : true,
			backgroundColor : {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 1,
					y2 : 1
				},
				stops : [[0, 'rgb(255, 255, 255)'], [1, 'rgb(200, 200, 255)']]
			}
		},
		legend: {
			enabled: legend,
			layout: 'horizontal',
			backgroundColor: '#FFFFFF',
			align: 'center',
			itemStyle: {
				font: "12px '微软雅黑', Arial, sans-serif"
			},
			labelFormatter: function() {
				return this.name.split(" ")[0];
			},
			verticalAlign: 'top',
			y: 20,
//			x: 155,
//			floating: true,
			shadow: true
		},
		plotOptions: {
            column: {
//                pointPadding: 0,
//                borderWidth: 0,
                dataLabels:{
                	enabled:true,
                	style:{
                		fontWeight:'bold'
                	},
                	formatter:function(){
                		return this.y;
                	}
                	
                },
                groupPadding:0.1
//                borderRadius:5,
//                pointerPadding:10,
            },
            series:{
                shadow: true
            }
        },
		navigator: {
//            series: {
//                color: 'green'    
//            },
//            maskFill: 'rgba(247,250,172, 0.75)'
        },
		rangeSelector : {
			buttons : [
			{
				count : 60*12,
				type : 'minute',
				text : '12小时'
			},
			{
				count : 1,
				type : 'day',
				text : '24小时'
			},{
				count : 30,
				type : 'day',
				text : '30天'
			}, {
				count : 12,
				type : 'month',
				text : '12个月'
			}, {
				type : 'all',
				text : '年'
			}],
			buttonSpacing:4,
			buttonTheme: {
				width: 45,
				height: 16,
				padding:2,
				r: 10,
				zIndex: 10,
				style: {
					fontSize:12,
					fontFamily:'微软雅黑'
				}
			},
			inputEnabled : true,
			inputDateFormat:'%Y-%m-%d %H:%M',
			inputEditDateFormat:'%Y-%m-%d %H:%M',
			inputStyle:{
				width:'142px',
				height:'22px',
				fontWeight:'bold',
				fontFamily:'微软雅黑',
				color:'#4572A7'
			},
			labelStyle:{
				fontFamily:'微软雅黑'
			},
			selected: defaultSelected
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
		title : {
			text : title,
			style:{
				color: '#3E576F',
				fontSize: '16px',
				fontFamily:'微软雅黑'
			}
		},
		yAxis : {
//			title : {
//				text : ''
//			},
//			plotLines : [{
//				value : aver,
//				color : 'red',
//				dashStyle : 'shortdash',
//				width : 3,
//				label : {
//					text : '平均值:'+aver+" mm",
//					style:{
//						color:'red',
//						marginLeft:20
//					}
//				},
//				zIndex:5//zIndex为5时平均线刚好在柱状图的上面，在鼠标提示的下面
//			}
//			]
		},
		tooltip : {
//格式化tooltip的格式
formatter : function() {
	var s = '<b>' + Highcharts.dateFormat('%Y年%m月%d日 %H:%M %A', this.x) + '</b>';

	$.each(this.points, function(i, point) {
		//alert(this.series.name.split(" ")[2]);
		//这里存在浏览器兼容问题
		s += "<div style='color:#" + this.series.color + ";'>" + this.series.name.split(" ")[0] + "： " + point.y + " " + this.series.name.split(" ")[1] + "</div>";
	});
	return s;
}
},

		xAxis: {
			maxZoom : 1 * 3600000*12 // 一个小时
//            tickColor: 'green',
//            tickLength: 10,
//            tickWidth: 3,
//            tickPosition: 'inside'
        },
		
//		series : [{
//			type: type,
//			name : Sname,
//			marker : {
//			enabled : true,
//			radius : 3
//			},
//			data : data,
//			tooltip: {
//				yDecimals: 2
//			}
//		}]
		series :s
	});
}
//微型图
function CreateStockLineOrColumn2(div,title,series,defaultSelected,legend){
//	alert("开始绘制HighStock!");
	if(defaultSelected == undefined){
		defaultSelected = 0;
	}
	if(legend == undefined){
		legend = true;
	}
	var s = [];
	for(var i=0;i<series.length;i++){
		s[i] = {
				type: series[i].type,//类型spline、column等
				name : series[i].name,//数据对象名称
				marker : {
				enabled : true,
				radius : 2
				},
				data : series[i].data,//数据
				tooltip: {
					yDecimals: 2
				}
		};
	}
	Highcharts.setOptions({
		global : {
			useUTC : false
		},
		lang: {
			loading: '加载中...',
			months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
					'八月', '九月', '十月', '十一月', '十二月'],
			shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
					'八月', '九月', '十月', '十一月', '十二月'],
			weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			decimalPoint: '.',
			resetZoom: '原始大小',
			resetZoomTitle: '缩放比例 1:1',
			thousandsSep: ','
		}
	});
	window.chart = new Highcharts.StockChart({
		chart : {
			renderTo : div,
			borderWidth : 1,
			borderRadius : 15,
			spacingLeft : 15,
			spacingRight : 15,
			spacingBottom : 20,
			spacingTop : 10,
			shadow : true,
			backgroundColor : {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 1,
					y2 : 1
				},
				stops : [[0, 'rgb(255, 255, 255)'], [1, 'rgb(200, 200, 255)']]
			}
		},
		legend: {
			enabled: legend,
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			align: 'right',
			itemStyle: {
				font: "12px '微软雅黑', Arial, sans-serif"
			},
			labelFormatter: function() {
				return this.name.split(" ")[0];
			},
			verticalAlign: 'top',
			y: 50,
			x: 155,
			floating: true,
			shadow: true
		},
		rangeSelector : {
			buttons : [{
				count : 60,
				type : 'minute',
				text : '1小时'
			},{
				count : 1,
				type : 'day',
				text : '1天'
			},{
				count : 10,
				type : 'day',
				text : '10天'
			}, {
				count : 1,
				type : 'month',
				text : '1个月'
			}, {
				type : 'all',
				text : '全部'
			}],
			buttonTheme: {
				width: 35,
				height: 16,
				padding:2,
				r: 5,
				zIndex: 10
				// style: {
					// position:'absolute',
					// left:20,
					// x:0
				// }
			},
			inputEnabled : true,
			inputDateFormat:'%Y年%m月%d日',
			inputEditDateFormat:'%Y-%m-%d',
			inputStyle:{
				width:'110px',
				fontWeight:'bold',
				color:'#4572A7'
			},
			selected: defaultSelected
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
		title : {
			text : title
		},
		tooltip : {
//格式化tooltip的格式
formatter : function() {
	var s = '<b>' + Highcharts.dateFormat('%Y年%m月%d日 %H:%M %A', this.x) + '</b>';

	$.each(this.points, function(i, point) {
		//alert(this.series.name.split(" ")[2]);
		//这里存在浏览器兼容问题
		s += "<br/><b><span style='color:" + this.series.color + ";'>" + this.series.name.split(" ")[0] + "： " + point.y + " " + this.series.name.split(" ")[1] + "</span></b>";
	});
	return s;
}
},

		xAxis : {
			maxZoom : 1 * 3600000 // 一个小时
		},
		
//		series : [{
//			type: type,
//			name : Sname,
//			marker : {
//			enabled : true,
//			radius : 3
//			},
//			data : data,
//			tooltip: {
//				yDecimals: 2
//			}
//		}]
		series :s
	});
}