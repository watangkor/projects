function getSttName(STCD){
   if(STCD==0) return "万泉庄";
   if(STCD==1) return "西玉河";
   if(STCD==2) return "上庄闸";
   if(STCD==3) return "苏家坨";
   if(STCD==4) return "五七水库";
   if(STCD==5) return "四季青";
   if(STCD==6) return "锦绣大地";
   if(STCD==7) return "西三旗";
   if(STCD==8) return "甘家口";
   if(STCD==9) return "温泉";
   if(STCD==10) return "学院路";
   if(STCD==11) return "马连洼";
   if(STCD==12) return "永丰园";
   if(STCD==13) return "香山";
   if(STCD==14) return "北太平庄";
   if(STCD==15) return "永定路";
   if(STCD==18) return "百旺山";
   else return "站点名称有问题";
}

function getSttCode(name){
	var stationNames = ["万泉庄","西玉河","上庄闸","苏家坨","五七水库","四季青","锦绣大地","西三旗","甘家口","温泉","学院路","马连洼","永丰园","香山","北太平庄","永定路","百旺山"];
	for(var i=0;i<stationNames.length;i++){
		if(name==stationNames[i]){return i;
		}
	}
	return "站点代码问题";
}


/*返回时间
 *参数说明：
 *无参，返回正确的时间
 *num: 为年月日时分秒数组位置
 *value: 要改变的值的大小
 */
function getFormatTime(num, value) {
	var arr = getTrueTimeArr();
	arr[num] = parseInt(arr[num]) + value;
	var year = arr[0];
	var mon = arr[1];
	var date = arr[2];
	var h = arr[3];
	var m = arr[4];
	var s = arr[5];

	// 返回时间
	return year + "-" + mon + "-" + date + " " + h + ":" + m + ":" + s;
}



/*
 * 返回基础的时间数组，年月日时分秒 demo:2012-10-24 18:38:23
 * 
 */

function getTrueTimeArr() {
	var today = new Date();
	var year = today.getFullYear();
	var mon = today.getMonth();
	var date = today.getDate();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();

	// 处理 前面加个0
	mon = checkTime(parseInt(mon) + 1);
	m = checkTime(m);
	h = checkTime(h);
	s = checkTime(s);
	return [ year, mon, date, h, m, s ];

}


function getChangeTime(changeVal){
    var today=new Date();
    today.setHours(today.getHours()+changeVal);
    var year = today.getFullYear();
    var mon = today.getMonth();
    var date = today.getDate();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();

    //处理 前面加个0
    mon = checkTime(parseInt(mon)+1);
    m=checkTime(m);
	h=checkTime(h);
    s=checkTime(s);
    return [year, mon, date, h, m, s];
}

function getChangeAndFormat(changeVal){
	var t = getChangeTime(changeVal);
	return t[0]+"-"+t[1]+"-"+t[2]+" "+t[3]+":"+t[4]+":"+t[5];
}
function getTodayEight(){
	var today=new Date();
    today.setHours(8);
    today.setMinutes(0);
    today.setSeconds(0);
    var year = today.getFullYear();
    var mon = today.getMonth();
    var date = today.getDate();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();

    //处理 前面加个0
    mon = checkTime(parseInt(mon)+1);
    m=checkTime(m);
	h=checkTime(h);
    s=checkTime(s);
	return year+"-"+mon+"-"+date+" "+h+":"+m+":"+s;
}

function getTimeArr(str){
	var t1 = str.split(" "); //将时间分成两部分 年月日，时分秒
	var time  = t1[1].split(":");
	return [t1[0],time[0],time[1],time[2]];
}


/*
 * add a zero in front of numbers<10
 * 在子符串前面加一个0 不不够完善，应当做成，自己想加的参数 先这样吧????
 */

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
//加天数
Date.prototype.addDays = function(d){
  this.setDate(this.getDate()+d);
  return this;
};

//增加日期的小数
Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
};
//language zh/en/en_sim
Date.prototype.getDayFormat = function(lan){
  var week_zh = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
  var week_en = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  if(lan=="zh") return  week_zh[this.getDay()-1];
	  else if(lan == "en") return  week_en[this.getDay()-1];;
};
Date.prototype.simple = function(){
	  var time = this.toLocaleString();
	  time = time.replace("年", "-");   //此处的转换可以用正则表达式，但是还不会
	  time = time.replace("月","-");
	  time = time.replace("日","");
	  return time; 
};
Date.prototype.getDateFromStr=function(str){
	  var date = new Date();
	  var arr = str.split("-");
	  alert(str);
	  date.setFullYear(parseInt(arr[0]));
	  date.setMonth(parseInt(arr[1]));
	  date.setDate(parseInt(arr[2]));
	  date.setHours(0);
	  date.setMinutes(0);
	  date.setSeconds(0);
	  return date;
};
/*以字符串"2012-11-14"为基础,得到日期对象，后分别为年、月、日、时、分、秒来改变大小。
 * y,M,d在基础上增加， h,m,s默认为0，h8：小时为8时
 * 返回日期类型
 *************************************************y\M\d\h\m\s
*/
function changeDate(str,y,M,d,h,m,s){
    var str = str.split("-");
    var date = new Date(str[0],parseFloat(str[1])-1,str[2]);
    var args = [y,M,d,h,m,s];
    for(var i=0;i<args.length;i++){
      if(args[i]!=undefined){
        if(args[i].substr(0,1)=="y"&&args[i].substr(1)!=""){
          date.setFullYear(parseFloat(str[0])+parseFloat(args[i].substr(1)));
        }else if(args[i].substr(0,1)=="M"&&args[i].substr(1)!=""){
          date.setMonth(parseFloat(str[1])+parseFloat(args[i].substr(1))-1);
        }else if(args[i].substr(0,1)=="d"&&args[i].substr(1)!=""){
          date.setDate(parseFloat(str[2])+parseFloat(args[i].substr(1)));
        }else if(args[i].substr(0,1)=="h"&&args[i].substr(1)!=""){
          date.setHours(parseFloat(args[i].substr(1)));
        }else if(args[i].substr(0,1)=="m"&&args[i].substr(1)!=""){
          date.setMinutes(parseFloat(args[i].substr(1)));
        }else if(args[i].substr(0,1)=="s"&&args[i].substr(1)!=""){
          date.setSeconds(parseFloat(args[i].substr(1)));
        }
      }
    }
       return date;
}


/** ********************************************************************************************* */
/*
 * 1.格式化时间函数 将时间格式化
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
		// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
						- RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
							? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};
/* 调用方法 */
var d = new Date().format('yyyy-MM-dd');



//从"2012-12-12"转换成Date类型;

function  getSttTable(){
	var sttNames = getList("dataAction/getSttName");
	var sttTable = "";
	for(var i=0;i<9;i++){
		sttTable += "<div style='float:left;width:75px;'><input type='checkbox' name='stations' value='"+sttNames[i].stcd+"'>"+sttNames[i].stnm+"</div>";
	}
	for(var i=9;i<sttNames.length;i++){
		sttTable += "<div style='float:left;width:75px;'><input type='checkbox' name='stations' value='"+sttNames[i].stcd+"'>"+sttNames[i].stnm+"</div>";
	}
	return sttTable;
}
/*function  getSttTable(){
	var sttNames = getList("dataAction/getSttName");
	var sttTable = "<table id='sttNameT'><tr>";
	for(var i=0;i<9;i++){
		sttTable += "<td><span style='margin-right:5px;display:inline-block;'><input type='checkbox' name='stations' value="+sttNames[i].stcd+">"+sttNames[i].stnm+"</span></td>";
	}
	sttTable +="</tr><tr>";
	for(var i=9;i<sttNames.length;i++){
		sttTable += "<td><span style='margin-right:5px;display:inline-block;'><input type='checkbox' name='stations' value="+sttNames[i].stcd+">"+sttNames[i].stnm+"</span></td>";
	}
	sttTable +="</tr></table>";
	return sttTable;
}
*/
//传两个参数， 按钮的id,要显示隐藏的div的id 移动这里有问题，图片不显示？？？
function displayBtn(btn,div){
    $(btn).hover(function(){
		$(this).css({
			"background":"url(<%=basePath%>static/img/upbtn2.gif) no-repeat"
		});
	},function(){
		$(this).css({
			"background":"url(<%=basePath%>static/img/upbtn1.gif) no-repeat"
		});
	}).toggle(function(){
		$(div).slideUp();
    	$(this).css({
			"background":"url(<%=basePath%>static/img/downbtn1.gif) no-repeat"
		});
    	$(this).hover(function(){
			$(this).css({
				"background":"url(<%=basePath%>static/img/downbtn2.gif) no-repeat"
			});
		},function(){
			$(this).css({
				"background":"url(<%=basePath%>static/img/downbtn1.gif) no-repeat"
			});
		});
	},function(){
		$(div).slideDown();
		$(this).css({
			"background":"url(<%=basePath%>static/img/upbtn1.gif) no-repeat"
		});
		$(this).hover(function(){
			$(this).css({
				"background":"url(<%=basePath%>static/img/upbtn2.gif) no-repeat"
			});
		},function(){
			$(this).css({
				"background":"url(<%=basePath%>static/img/upbtn1.gif) no-repeat"
			});
		});
	});
}
//得到select的option，n1-n2,如(0,23)为0到23个option
function getOptions(n1,n2){
	  var hourOptions="";
	  for(var i=n1;i<=n2;i++){
		  if(i<10){
			  hourOptions += "<option value="+i+">0"+i+"</option>";
		  }else{
			  hourOptions += "<option value="+i+">"+i+"</option>";
		  }
	  }
	  return hourOptions;
}
