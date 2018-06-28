import iView from 'iview'
import axios from 'axios'
axios.defaults.timeout = 15000
// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // header都加上token
  if (config.url.indexOf('/rest/pc/api/') > -1 || config.url.indexOf('/rest/buy/api/') > -1) {
    config.headers['X-CSRF-Token'] = window.token
  }
  iView.LoadingBar.start()
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.status === 654) { // 百度云请求超时检测
    window.alert('请求超时！')
  }
  if (res.config.url === '/rest/api/user/detail' && res.data.success) {
    if (res.data.attributes.data) {
      window.token = res.headers['x-csrf-token']
    }
  }
  if (typeof res.data === 'string') {
    return res.data
  }
  if (!res.data.success) {
    if (res.data.msg === '未登录' || res.data.msg === '未登陆') {
      window.localStorage.setItem('lanId', '1')
      if (location.port !== '8080') window.location.href = 'http://www.jihui88.com/manage_v4/login.html?backURL=' + window.location.origin + window.location.pathname
    }
  }
  iView.LoadingBar.finish()
  return res.data
}, (error) => {
  console.log('promise error:' + error)
  if (error.response && error.response.status === 401) {
    if (error.response.data.err_code === '用户不存在') {
      window.alert('请联系客服,账号未关联到机汇云')
    } else {
      window.alert('发送失败')
    }
  }
  return Promise.reject(error)
})
export default axios
