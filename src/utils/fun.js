import Vue from 'vue'
// 全局方法

/*
 * @author: wes
 * @date: 2018-5-8
 * @desc: 时间选择
*/
Vue.prototype.dataFormat = function (date, format) {
  date = new Date(date)
  format = 'yyyy-MM-dd hh:mm'
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}
/**
 * 还原ID
 * @method [字符串] - decodeId ( 还原ID )
 * @param id
 * @param prefix
 * @param length
 * @return {string}
 * @author wyj 15.1.13
 * @example
 *      Est.decodeId('123' , 'Product_' , 32);
 *      ==> Product_00000000000000000000123
 */
Vue.prototype.decodeId = function (id, prefix, length) {
  var len = prefix.length + id.length - 1
  return prefix + new Array(length - len).join('0') + id
}
