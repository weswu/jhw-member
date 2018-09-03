import Vue from 'vue'
// 全局过滤器

/*
 * @author: wes
 * @date: 2017-7-28
 * @desc: 金额,过滤2位
*/
Vue.filter('price', function (v) {
  var f = parseFloat(v)
  if (isNaN(f)) {
    return
  }
  f = Math.round(v * 100) / 100
  return f
})
/*
 * @author: wes
 * @date: 2017-7-28
 * @desc: 时间字符格式化
 * 1.判断格式化样式
 * 2.各时间段
 * 3.合并
*/
Vue.filter('time', function (date, format) {
  if (!date) return ''
  date = new Date(date)
  format = format || 'yyyy-MM-dd hh:mm:ss'
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
})
/*
 * @author: wes
 * @date: 2017-8-3
 * @desc: 字符长度
*/
Vue.filter('limitString', function (input, begin, end) {
  return input.substring(begin, input.length - end)
})
/*
 * @author: wes
 * @date: 2017-8-3
 * @desc: 邮箱中间过滤
*/
Vue.filter('limitEmail', function (str) {
  var reg = /(.{1}).+(.{0}@.+)/g
  return str.replace(reg, '$1****$2')
})
/*
 * @author: wes
 * @date: 2017-8-7
 * @desc: 图片缩略图
*/
Vue.filter('picUrl', function (src, number) {
  if (src === null || src.length === 0) return 'http://img.jihui88.com/upload/j/j2/jihui88/picture/2015/04/01/72041ac7-51fa-4163-906d-8b576955d29e.jpg'
  if (number > 10) {
    src = src + '!' + number
  } else {
    var src2 = src.substring(src.lastIndexOf('.') + 1, src.length)
    src = src.substring(0, src.lastIndexOf('.')) + '_' + number + '.' + src2
  }
  return src
})
/*
 * @author: wes
 * @date: 2018-6-12
 * @desc: 图片名字
*/
Vue.filter('postfix', function (src) {
  return '.' + src.split('.')[1].split('?')[0]
})
/*
 * @author: wes
 * @date: 2018-6-12
 * @desc: 站点地址过滤
*/
Vue.filter('http', function (src) {
  return src.indexOf('http') > -1 ? src : ('http://' + src)
})
