import Vue from 'vue'
import Vuex from 'vuex'
import status from './status'
import qs from 'qs'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: '未登录',
      username: '未登录',
      addTime: 1272102123858,
      enterprise: {}
    },
    userInfo: {
      noReaderMsg: 1
    },
    lanId: '1',
    uid: ['0', '0', '0'],
    // 列表数据
    productCategory: [],
    newsCategory: [],
    messageList: [],
    memberRankList: [],
    memberAttrList: [],
    tagList: [],
    areaList: [],
    // 站点
    staticList: [
      { layoutId: '203', title: '网站编号：203' },
      { layoutId: '204', title: '网站编号：204' },
      { layoutId: '205', title: '网站编号：205' },
      { layoutId: '206', title: '网站编号：206' },
      { layoutId: '207', title: '网站编号：207' }
    ],
    layoutId: '0',
    customData: {
      isCollapsed: true,
      linkList: [
        { value: '#/static', text: '站点数据管理', icon: 'icon-shuju' },
        { value: '#/member', text: '会员管理', icon: 'icon-Group' },
        { value: '#/shop', text: '订单管理', icon: 'icon-dingdandaifukuan' }
      ],
      productShow: ['序号', '产品图片', '产品名称', '产品型号', '产品分类', '添加时间', '是否上架', '排序'],
      shopShow: ['序号', '订单编号', '用户名', '订单总额', '订单状态', '付款状态', '配送状态', '支付方式', '配送方式', '下单时间'],
      homeSort: [
        { value: 'static', text: '我的网站', status: '01' },
        { value: 'link', text: '链接', status: '01' },
        { value: 'order', text: '订单管理', status: '01' }
      ]
    }
  },
  getters: {
    user: state => state.user,
    userInfo: state => state.userInfo,
    lanId: state => state.lanId,
    // 列表
    productCategory: state => state.productCategory,
    newsCategory: state => state.newsCategory,
    messageList: state => state.messageList,
    memberRankList: state => state.memberRankList,
    memberAttrList: state => state.memberAttrList,
    tagList: state => state.tagList,
    areaList: state => state.areaList,
    // 站点
    staticList: state => state.staticList,
    layoutId: state => state.layoutId,
    customData: state => state.customData
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setProductCategory (state, productCategory) {
      state.productCategory = productCategory
    },
    setNewsCategory (state, newsCategory) {
      state.newsCategory = newsCategory
    },
    setMessageList (state, messageList) {
      state.messageList = messageList
    },
    setMemberRankList (state, memberRankList) {
      state.memberRankList = memberRankList
    },
    setMemberAttrList (state, memberAttrList) {
      state.memberAttrList = memberAttrList
    },
    setTagList (state, tagList) {
      state.tagList = tagList
    },
    setAreaList (state, areaList) {
      state.areaList = areaList
    },
    setStaticList (state, staticList) {
      state.staticList = staticList
    },
    setLayoutId (state, layoutId) {
      state.layoutId = layoutId
    },
    setLanId (state, lanId) {
      state.lanId = lanId
    },
    setCustomData (state, customData) {
      state.customData = customData
    },
    // 全局唯一标识
    nextUid (state) {
      let index = state.uid.length
      let digit
      while (index) {
        index--
        digit = state.uid[index].charCodeAt(0) // 从低位开始循环
        if (digit === 57) { //  /*'9'*/如果低位计算到了9，改位从A开始计算
          state.uid[index] = 'A'
          return
        }
        if (digit === 90) { //   /*'Z'*/如果该位计算到Z，则从0开始计算
          state.uid[index] = '0'
        } else {
          state.uid[index] = String.fromCharCode(digit + 1) // 下一个字符
          return
        }
        if (index === 1) {
          state.uid.unshift('0') // 如果每位字符上的都发生了改变，则在高位前面用‘0’补充
        }
      }
    }
  },
  actions: {
    getUser ({commit, state}) {
      this._vm.$http.get('/rest/api/user/detail').then((res) => {
        if (res.success) {
          let data = res.attributes.data
          if (data) {
            data.enterprise.addresslist = data.enterprise.address && data.enterprise.address.split(',')
          }
          this.commit('setUser', data || {
            name: '未登录',
            username: '未登录',
            addTime: 1272102123858,
            enterprise: {}
          })
        } else {
          this._vm.$Message.success(res.msg)
        }
      })
    },
    getUserInfo ({commit, state}) {
      this._vm.$http.get('/rest/api/user/index').then((res) => {
        if (res.success) {
          this.commit('setUserInfo', res.attributes.data)
        }
      })
    },
    getMessage ({commit, state}) {
      this._vm.$http.get('/rest/api/message/list?page=1&pageSize=5&recvState=00').then((res) => {
        if (res.success) {
          this.commit('setMessageList', res.attributes.data)
        }
      })
    },
    getProductCategory ({commit, state}) {
      this._vm.$http.get('/rest/api/category/product?pageSize=1000').then(res => {
        if (res.success) {
          let data = res.attributes.data
          let list = []
          // 1级
          data.forEach(item => {
            if (!item.belongId && item.isdisplay === '1') {
              item._checked = true
              item._selected = true
              item.grade = '1'
              list.push(item)
            }
          })
          // 2级
          data.forEach(row => {
            row.isdisplay === '1' && list.forEach((item, index) => {
              if (item.grade === '1' && (row.belongId === item.categoryId)) {
                row._checked = false
                item._selected = false
                row.grade = '2'
                list.splice(index + 1, 0, row)
              }
            })
          })
          // 3级
          data.forEach(row => {
            row.isdisplay === '1' && list.forEach((item, index) => {
              if (item.grade === '2' && (row.belongId === item.categoryId)) {
                row._checked = false
                row.grade = '3'
                list.splice(index + 1, 0, row)
              }
            })
          })
          list.forEach((item, index) => {
            item.isroot = false
            if (list.length > (index + 1)) {
              if (item.grade === '1') {
                item.isroot = item.grade === '1' && list[index + 1].grade === '2'
              }
              if (item.grade === '2') {
                item.isroot = item.grade === '2' && list[index + 1].grade === '3'
              }
            }
          })
          this.commit('setProductCategory', list)
        }
      })
    },
    getNewsCategory ({commit, state}) {
      this._vm.$http.get('/rest/api/category/news?pageSize=1000').then(res => {
        if (res.success) {
          let data = res.attributes.data
          let list = []
          // 1级
          data.forEach(item => {
            if (!item.belongId && item.isdisplay === '1') {
              item._checked = true
              item._selected = true
              item.grade = '1'
              list.push(item)
            }
          })
          // 2级
          data.forEach(row => {
            row.isdisplay === '1' && list.forEach((item, index) => {
              if (item.grade === '1' && (row.belongId === item.categoryId)) {
                row._checked = false
                item._selected = false
                row.grade = '2'
                list.splice(index + 1, 0, row)
              }
            })
          })
          // 3级
          data.forEach(row => {
            row.isdisplay === '1' && list.forEach((item, index) => {
              if (item.grade === '2' && (row.belongId === item.categoryId)) {
                row._checked = false
                row.grade = '3'
                list.splice(index + 1, 0, row)
              }
            })
          })
          list.forEach((item, index) => {
            item.isroot = false
            if (list.length > (index + 1)) {
              if (item.grade === '1') {
                item.isroot = item.grade === '1' && list[index + 1].grade === '2'
              }
              if (item.grade === '2') {
                item.isroot = item.grade === '2' && list[index + 1].grade === '3'
              }
            }
          })
          this.commit('setNewsCategory', list)
        }
      })
    },
    getTagList ({commit, state}) {
      this._vm.$http.get('/rest/api/tag/list?pageSize=1000').then(res => {
        if (res.success) {
          this.commit('setTagList', res.attributes.data)
        }
      })
    },
    getAreaList ({commit, state}) {
      this._vm.$http.get('/rest/api/area/list').then((res) => {
        if (res.success) {
          let area = res.attributes.data
          let data = []
          area.forEach(item => {
            if (item.level === 0) {
              data.push({
                value: item.areaId,
                label: item.name,
                children: []
              })
            }
          })
          area.forEach(item => {
            if (item.level === 1) {
              data.forEach(row => {
                if (row.value === item.belongId) {
                  row.children.push({
                    value: item.areaId,
                    label: item.name,
                    children: []
                  })
                }
              })
            }
          })
          area.forEach(item => {
            if (item.level === 2) {
              data.forEach(row => {
                row.children.forEach(item2 => {
                  if (item2.value === item.belongId) {
                    item2.children.push({
                      value: item.areaId,
                      label: item.name
                    })
                  }
                })
              })
            }
          })
          this.commit('setAreaList', data)
        }
      })
    },
    getMemberRank ({commit, state}) {
      this._vm.$http.get('/rest/api/member/rank/list').then(res => {
        if (res.success) {
          this.commit('setMemberRankList', res.attributes.data)
        }
      })
    },
    getMemberAttr ({commit, state}) {
      return this._vm.$http.get('/rest/api/member/attr/list').then(res => {
        if (res.success) {
          this.commit('setMemberAttrList', res.attributes.data)
        }
      })
    },
    getStaticList ({commit, state}) {
      return this._vm.$http.get('/rest/pc/api/baseLayout/list?page=1&pageSize=50').then(res => {
        if (res.success) {
          this.commit('setStaticList', res.attributes.data)
          if (res.attributes.data.length > 0) {
            this.commit('setLayoutId', res.attributes.data[0].layoutId)
          }
        }
      })
    },
    getCustomData ({commit, state}) {
      this._vm.$http.get('/rest/api/custom/detail').then(res => {
        if (res.success) {
          this.commit('setCustomData', JSON.parse(res.attributes.data.content))
        }
      })
    },
    layoutIdChange ({dispatch, commit}, layoutId) {
      this.commit('setLayoutId', layoutId)
      window.localStorage.setItem('layoutId', layoutId)
    },
    lanIdChange ({dispatch, commit}, lanId) {
      this.commit('setLanId', lanId)
      window.localStorage.setItem('lanId', lanId)
      return this._vm.$http.get('/rest/api/user/changeLan?lanId=' + lanId).then((res) => {
        if (res.success) {
          this.dispatch('getUser')
        } else {
          this._vm.$Message.success(res.msg)
        }
      })
    },
    SAVE_CUSTOM_DATA  ({commit, state}) {
      this._vm.$http.post('/rest/api/custom/update', qs.stringify({content: JSON.stringify(state.customData)})).then(res => {
        if (res.success) {
          console.log('自定义数据保存成功')
        } else {
          this._vm.$Message.success(res.msg)
        }
      })
    }
  },
  modules: {
    status
  }
})

export default store
