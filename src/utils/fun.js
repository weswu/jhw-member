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

Vue.prototype.cellSort = (vm, h, params) => {
  return h('div', [
    h('i', {
      class: {
        'none': true,
        'iconfont': true,
        'icon-bianji2': true
      },
      on: {
        click: () => {
          params.row.edittingCell[params.column.key] = true
        }
      }
    }),
    h('span', {
      class: {
        'j_sort': true
      }
    }, [
      h('i', {
        class: {
          'none': true,
          'iconfont': true,
          'icon-icon--': true
        },
        on: {
          click: () => {
            if (params.index > 0) {
              vm.sortable(params.index, params.index - 1, params.row.edittingCell.api, params.row.edittingCell.id)
            }
          }
        }
      }),
      h('i', {
        class: {
          'none': true,
          'iconfont': true,
          'icon-tuozhuai': true
        }
      }),
      h('i', {
        class: {
          'none': true,
          'iconfont': true,
          'icon-icon--1': true
        },
        on: {
          click: () => {
            if (params.index < vm.list.pageSize - 1) {
              vm.sortable(params.index, params.index + 1, params.row.edittingCell.api, params.row.edittingCell.id)
            }
          }
        }
      })
    ])
  ])
}
Vue.prototype.cellInput = (vm, h, params) => {
  return h('Input', {
    props: {
      type: 'text',
      value: params.row[params.column.key]
    },
    on: {
      input: (val) => {
        params.row[params.column.key] = val
      }
    }
  })
}
Vue.prototype.incellEditBtn = (vm, h, params) => {
  if (params.column.key === 'sort') {
    return vm.cellSort(vm, h, params)
  } else {
    return h('i', {
      class: {
        'none': true,
        'iconfont': true,
        'icon-bianji2': true
      },
      on: {
        click: (event) => {
          params.row.edittingCell[params.column.key] = true
        }
      }
    })
  }
}
Vue.prototype.saveIncellEditBtn = (vm, h, params) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'checkmark'
    },
    on: {
      click: (event) => {
        params.row.edittingCell[params.column.key] = false
        vm.list[params.index] = params.row
        let model = {
          id: params.row.id,
          editField: true
        }
        model[params.column.key] = params.row[params.column.key]
        let data = {
          model: JSON.stringify(model),
          _method: 'put'
        }
        vm.$http.post('/rest/api/' + params.row.edittingCell.api + '/detail/' + params.row.edittingCell.id, qs.stringify(data)).then((res) => {
          if (res.success) {
            if (params.column.key === 'sort') {
              vm.get()
            }
            vm.$Message.success('修改成功')
          } else {
            vm.$Message.error(res.msg)
          }
        })
      }
    }
  })
}
Vue.prototype.cellEdit = (vm, h, params) => {
  return h('Row', {
    props: {
      type: 'flex',
      align: 'middle',
      justify: 'center'
    }
  }, [
    h('Col', {
      props: {
        span: params.column.key === 'sort' ? '14' : '22'
      }
    }, [
      !params.row.edittingCell[params.column.key] ? h('span', params.row[params.column.key]) : vm.cellInput(vm, h, params)
    ]),
    h('Col', {
      props: {
        span: params.column.key === 'sort' ? '10' : '2'
      }
    }, [
      params.row.edittingCell[params.column.key] ? vm.saveIncellEditBtn(vm, h, params) : vm.incellEditBtn(vm, h, params)
    ])
  ])
}
