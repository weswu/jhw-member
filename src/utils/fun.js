import Vue from 'vue'
import qs from 'qs'
// 全局方法

/*
 * @author: wes
 * @date: 2018-5-8
 * @desc: 时间选择
*/
Vue.prototype.dateFormat = function (date, format) {
  if (!date) return ''
  date = new Date(date)
  format = format || 'yyyy-MM-dd hh:mm'
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

/*
 * @author: wes
 * @date: 2017-8-7
 * @desc: 图片缩略图
*/
Vue.prototype.picUrl = function (src, number) {
  if (!src || src.length === 0) return 'upload/j/j2/jihui88/picture/2015/04/01/72041ac7-51fa-4163-906d-8b576955d29e.jpg'
  if (number > 10) {
    src = src + '!' + number
  } else {
    var src2 = src.substring(src.lastIndexOf('.') + 1, src.length)
    src = src.substring(0, src.lastIndexOf('.')) + '_' + number + '.' + src2
  }
  return src
}

/*
 * @author: wes
 * @date: 2018-5-5
 * @desc: 时间选择
*/
Vue.prototype.index2 = function (index, obj) {
  return index + (obj.page - 1) * obj.pageSize + 1
}

/*
 * @author: wes
 * @date: 2018-5-18
 * @desc: 路由
*/
Vue.prototype.url = function (e) {
  this.$router.push({ path: e })
}

/*
 * @author: wes
 * @date: 2018-5-18
 * @desc: 排序
*/
Vue.prototype.sortable = function (a, b, url, id) {
  let objA = this.list[a]
  let objB = this.list[b]
  let sortA = this.list[a].sort
  let sortB = this.list[b].sort
  this.sortPost(this.list[a][id], sortB, url)
  this.sortPost(this.list[b][id], sortA, url)
  objA.sort = sortB
  objB.sort = sortA
  this.list[a] = objB
  this.list[b] = objA
}
Vue.prototype.sortPost = function (id, sort, url) {
  let data = {
    model: JSON.stringify({
      id: id,
      sort: sort,
      editField: true
    }),
    _method: 'put'
  }
  this.$http.post('/rest/api/' + url + '/detail/' + id, qs.stringify(data)).then((res) => {
    if (res.success) {
      console.log(sort)
    } else {
      this.$Message.error(res.msg)
    }
  })
}

Vue.prototype.update = function (e) {
  e.info('更新中...')
}
