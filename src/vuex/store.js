import Vue from 'vue'
import Vuex from 'vuex'
import status from './status'
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
      news: 7,
      product: 214,
      order_unshipped: 33,
      noReaderMsg: 1,
      order_unpaid: 27,
      order: 45
    },
    // 列表数据
    productCategory: [],
    newsCategory: [],
    messageList: [],
    staticList: [
      { value: '203', text: '网站编辑：203' },
      { value: '204', text: '网站编辑：204' },
      { value: '205', text: '网站编辑：205' },
      { value: '206', text: '网站编辑：206' },
      { value: '207', text: '网站编辑：207' }
    ],
    tagList: [],
    lanId: '1',
    uid: ['0', '0', '0']
  },
  getters: {
    user: state => state.user,
    userInfo: state => state.userInfo,
    productCategory: state => state.productCategory,
    newsCategory: state => state.newsCategory,
    messageList: state => state.messageList,
    staticList: state => state.staticList,
    tagList: state => state.tagList,
    lanId: state => state.lanId
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
    setTagList (state, tagList) {
      state.tagList = tagList
    },
    setStaticList (state, staticList) {
      state.staticList = staticList
    },
    setLanId (state, lanId) {
      state.lanId = lanId
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
          this.commit('setUser', res.attributes.data || {
            name: '未登录',
            username: '未登录',
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
    lanIdChange ({dispatch, commit}, lanId) {
      this.commit('setLanId', lanId)
      window.localStorage.setItem('lanId', lanId)
      return this._vm.$http.get('/rest/api/user/changeLan?lanId=' + lanId).then((res) => {
        if (res.success) {
          this.dispatch('getUser')
          console.log('操作成功')
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
