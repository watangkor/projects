/** ********************************************************************************************* */
/*
 * Hllinc-JSF.js --hllinc code 方法介绍 1.format('yyyy-MM-dd'); 格式化时间
 * 2.pageWidth();pageHeight();分别获得当前页面的宽度和高度(不包含滚动条)
 * 3.JSON.stringify($('#searchForm').serializeObject());将该form表单中的内容转换成json串
 * 4.formatFloat(src, pos);保留小数位数，第一个参数是需要处理的小数，第二个参数是要保留的小数位
 * 5.RandomFrom(iFirstValue,iLastValue);取两数之间的随机整数
 */
/** ********************************************************************************************* */
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

/** ********************************************************************************************* */
/*
 * 2.获得当前操作区域的宽度和高度（不加滚动条的，如果有滚动条的话就应该使用另一方法来获得滚动条的高度，该方法以后补上）
 */
function pageWidth() {
	if ($.browser.msie) {
		return document.compatMode == "CSS1Compat"
				? document.documentElement.clientWidth
				: document.body.clientWidth;
	} else {
		return self.innerWidth;
	}
}

// 获得当前操作区域的高度
function pageHeight() {
	if ($.browser.msie) {
		return document.compatMode == "CSS1Compat"
				? document.documentElement.clientHeight
				: document.body.clientHeight;
	} else {
		return self.innerHeight;
	}
};

/** ********************************************************************************************* */
/*
 * 3.将表单数据封装成json数据格式
 * 该方法如果会被jQuery提示插件捕捉到，首先提示这个方法里的$，我晕，故这里就先将其注释，因为要使用jQuery的部分代码提示功能，
 * 且这个方法目前还没有用到，之前是用form传递数据到后台，现在因为提交的数据量不大，没有必要将其封装成json，手写就成，故先保存，以备后用。
 */
// $.fn.serializeObject = function() {
// var o = {};
// var a = this.serializeArray();
// $.each(a, function() {
// if (o[this.name]) {
// if (!o[this.name].push) {
// o[this.name] = [ o[this.name] ];
// }
// o[this.name].push(this.value || '');
// } else {
// o[this.name] = this.value || '';
// }
// });
// return o;
// };
// /*调用方法*/
// var elemSearchInfo = $('#searchForm');
// var searchInfo = elemSearchInfo.serializeObject();
// var jsonSearchInfo = JSON.stringify(searchInfo);
// alert(jsonSearchInfo);
/** ********************************************************************************************* */

/*
 * 4.将结果保留两位小数 第一个参数是需要处理的小数，第二个参数是要保留的小数位
 */
function formatFloat(src, pos) {
	return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

/** ********************************************************************************************* */
/*
 * 5.取两数之间的随机数 该方法将产生两个数（可以是小数）之间的任意整数
 */
function RandomFrom(iFirstValue, iLastValue) {
	var iChoces = Math.abs(iLastValue - iFirstValue) + 1;
	return Math.floor(Math.random() * iChoces + iFirstValue);
}
/**
 * 将时间格式为2012年2月3日中的数字提取出来
 */
function getDateMember(myDate) {
	var Year, Month, Day;
	if(myDate.indexOf("年")!=-1){
		Year = myDate.split("年")[0];
		Month = myDate.split("年")[1].split("月")[0];
		Day = myDate.split("年")[1].split("月")[1].split("日")[0];
	}else{
		Year = myDate.split("-")[0];
		Month = myDate.split("-")[1];
		Day = myDate.split("-")[2]; 
	}
	var date = {year:Year,month:Month,day:Day};
	return date;
}

/**
 * 线性插值算法
 */
function linearValue(key,start_key,start_value,end_key,end_value,pos){
	var value = start_value + ((end_value - start_value) * (key - start_key))
				/ (end_key - start_key);
	return formatFloat(value, pos);
}
/**
 * javascript对象转换成json
 * @param o
 * @returns
 */
function jsObjectToJson(o)
{
    if(o == null)
        return 'null';
    var s = '';
    switch(typeof(o))
    {
        case 'object':
            
            if(o.constructor == Array)        // checks if it is an array [,,,]
            {
                
                for(var i=0; i<o.length; ++i)
                {
                    s += jsObjectToJson(o[i]);

                    if(i < o.length -1)
                        s += ',';
                }

                return '[' + s + ']';
            }
            else
            {
                for(var p in o)
                {
                    if(typeof(o[p])!="function"){
                        s += "\"" + p +"\":" + jsObjectToJson(o[p]);
                        s += ',';
                    }
                }
                return '{' + s.substring(0,s.length-1) + '}';
            }
            break;
        case 'string':
            return '\"' + o.replace(/(["\\])/g, '\\$1') + '\"';
        default:
            return String(o);
    }
}
