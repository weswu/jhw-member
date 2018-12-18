# jhw-management-platform
> [机汇网后台管理](http://www.jihui88.com/member_new/index.html#/)（v4.0）

## 平面
![图片](https://pro.modao.cc/uploads3/images/1966/19661206/artboard_1527473050.png)

## 软件架构
- VUE2全家桶(vue vue-router vuex)
- [axios](https://github.com/axios/axios) ajax类
- [iview](http://v1.iviewui.com/docs/guide/install) 基于Vux的UI框架
- [阿里图标](http://iconfont.cn/)
- [sortablejs] 拖拉组件
- [vue-clipboard2] 复制

#### 后期优化
搜索 `<!-- 优化`

#### 技术支持
1. [机汇网后台电脑端](https://pro.modao.cc/app/5c5bQDgEFovlgX6fdP4W77J2upRmHzb#screen=s4b3e7bdfa2152531100800)
2. [API文档-会员中心接口-pc网站相关接口](https://jihui88.oschina.io/jhw-api/?file=001-%E4%BC%9A%E5%91%98%E4%B8%AD%E5%BF%83%E6%8E%A5%E5%8F%A3/001-%E4%BA%A7%E5%93%81%E7%AE%A1%E7%90%86/001-%E4%BA%A7%E5%93%81%E5%B1%9E%E6%80%A7%E8%A7%84%E6%A0%BC)


#### safari 兼容
1.页面空白  npm install --save-dev babel-polyfill       main.js 添加import 'babel-polyfill'
2.Error in mounted hook: "TypeError: 'false' is not a constructor (evaluating 'new _assist.MutationObserver')"
在model 下出错 未知 暂无能用
3.时间
