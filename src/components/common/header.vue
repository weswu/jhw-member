<template>
  <Row id="J_Header" type="flex" justify="space-between">
    <Col>
      <div class="logo">
        <a :href="'http://'+agent.bindUrl" target="_blank"><img :src="'http://img.jihui88.com/'+agent.manageLogo1" alt=""></a>
      </div>
      <Badge count="体验版 v4" class="badge-primary"></Badge>
      <YinDao ref="yindao"/>
    </Col>
    <Col class="userInfo">
      <Dropdown placement="bottom" class="j_dropdown_browser">
        <a class="header_link" href="javascript:;">
          建议用：360/谷歌浏览器
        </a>
        <DropdownMenu slot="list">
          <ul class="browser-dropdown">
            <li><a href="https://browser.360.cn/ee/" target="_blank">下载360极速浏览器</a></li>
            <li><a href="https://www.google.cn/chrome/" target="_blank">下载谷歌浏览器</a></li>
            <li><a href="https://ie.sogou.com/" target="_blank">下载搜狗高速浏览器</a></li>
            <li><a href="https://browser.qq.com/" target="_blank">下载QQ浏览器</a></li>
          </ul>
        </DropdownMenu>
      </Dropdown>
      <a href="#/" class="header_link">首页</a>
      <Dropdown placement="bottom" class="j_dropdown_browser j_dropdown_word">
        <a class="header_link" href="javascript:;">
          <span class="yd_jiaocheng">帮助</span>
        </a>
        <DropdownMenu slot="list">
          <ul class="browser-dropdown">
            <li @click="yindao"><a href="javascript:;">新手提示</a></li>
            <li><a href="https://docs.qq.com/doc/B3DcZh3LYq1T0nH23W15cjOF4HCYjk0Il6ZP1" target="_blank">常见问题</a></li>
            <li v-if="agent.vManage"><a :href="agent.vManage" target="_blank">后台操作视频</a></li>
            <li v-if="agent.vDesign"><a :href="agent.vDesign" target="_blank">建站流程视频</a></li>
            <li v-if="agent.dNews"><a :href="agent.dNews" target="_blank">建站资讯</a></li>
            <li v-if="agent.dLog"><a :href="agent.dLog" :target="agent.agentId ? '_blank' : '_self'">更新日志</a></li>
          </ul>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="bottom" class="j_dropdown_message" @on-visible-change="messageChange">
        <a href="#/message" class="header_link">
          消息
          <i class="iconfont icon-tixing2 yd_message"><span class="badge">{{userInfo.noReaderMsg}}</span></i>
        </a>
        <DropdownMenu slot="list">
          <div class="name">
            站内消息通知
          </div>
          <ul>
            <li v-for="(item, index) in messageList" :key="index" v-if="index<5">
              <div class="title" @click="detail(item, index)">
                {{item.title}}
              </div>
              <p>
                {{item.addTime | time('yyyy-MM-dd hh:mm')}}
              </p>
            </li>
            <li v-if="messageList.length === 0">{{message ? '暂无数据' : '加载中'}}</li>
          </ul>
          <a href="#/message/00" class="more">查看更多</a>
        </DropdownMenu>
      </Dropdown>
      <span class="border" style="background:#383d41"></span>
      <Dropdown placement="bottom-end" class="j_dropdown_username">
        <a href="javascript:void(0)" style="color: #999" class="header_link">
          {{user.username}}
          <Icon type="arrow-down-b"></Icon>
        </a>
        <a href="javascript:void(0)" class="avatar header_link">
          <i class="iconfont icon-huiyuan" v-if="!$store.state.user.headimg"></i>
          <img :src="$store.state.status.IMG_HOST+$store.state.user.headimg" v-if="$store.state.user.headimg">
        </a>
        <DropdownMenu slot="list">
          <div class="info">
            <i class="iconfont icon-huiyuan" v-if="!$store.state.user.headimg"></i>
            <img :src="$store.state.status.IMG_HOST+$store.state.user.headimg" v-if="$store.state.user.headimg">
            <p>账号：{{user.username}}</p>
          </div>
          <Row>
            <Col span="8" v-for="(item, index) in list" v-if="index < 3 && !agent.agentId" :key="index">
              <a :href="'#/' + item.path"><i :class="'iconfont icon-' + item.icon"></i>{{item.name}}</a>
            </Col>
          </Row>
          <Row v-if="list.length > 2 && !agent.agentId">
            <Col span="8" v-for="(item, index) in list" v-if="index > 2" :key="index">
              <a :href="'#/' + item.path"><i :class="'iconfont icon-' + item.icon"></i>{{item.name}}</a>
            </Col>
          </Row>
          <Row v-if="agent.agentId">
            <Col span="8" v-for="(item, index) in agentlist" :key="index">
              <a :href="'#/' + item.path"><i :class="'iconfont icon-' + item.icon"></i>{{item.name}}</a>
            </Col>
          </Row>
          <div style="height:80px;"></div>
          <a href="javascript:;" @click="signout" class="signout"> <span v-if="user.username !== '未登录'">退出</span><span v-else>登录</span> </a>
        </DropdownMenu>
      </Dropdown>
      <span class="border"></span>
    </Col>
    <Detail ref="detail"/>
    <!-- 加载中..."  -->
    <JLoading></JLoading>
  </Row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Detail from '@/pages/message/Detail'
import JLoading from '@/components/group/j-loading'
import YinDao from '@/components/home/j-yindao'
export default {
  components: {
    Detail,
    JLoading,
    YinDao
  },
  data () {
    return {
      visible: false,
      message: false,
      messageList: [],
      list: [
        { name: '账号信息', icon: 'account-only', path: 'account' },
        { name: '安全设置', icon: 'anquan', path: 'account' },
        { name: '费用中心', icon: 'price', path: 'cost_paid' },
        { name: '积分规则', icon: 'quanyi', path: 'point_origin' },
        { name: '账号积分', icon: 'jifen', path: 'point' },
        { name: '公司信息', icon: 'gongsi', path: 'enterprise' }
      ],
      agentlist: [
        { name: '账号信息', icon: 'account-only', path: 'account' },
        { name: '安全设置', icon: 'anquan', path: 'account' },
        { name: '公司信息', icon: 'gongsi', path: 'enterprise' }
      ],
      host: location.origin,
      safari: false
    }
  },
  computed: {
    ...mapState(['user', 'userInfo', 'status', 'agent'])
  },
  watch: {
    userInfo: {
      handler () {
        let pris = this.userInfo.privilege
        if (pris) {
          let pri = pris.split(',')
          let list = []
          this.list.forEach(item => {
            pri.forEach(row => {
              if (row === item.path) {
                list.push(item)
              }
            })
          })
          this.list = list
        }
        this.$store.commit('status/setMenuList', this.userInfo.privilege)
      }
    }
  },
  created () {
    this.$store.commit('status/setMenuList', this.userInfo.privilege)
    this.$store.commit('setLanId', window.localStorage.getItem('lanId') || '1')
    if (window.location.search.substr(1).indexOf('&lanId=') > -1) {
      var vm = this
      this.$store.dispatch('lanIdChange', window.localStorage.getItem('lanId')).then((res) => {
        vm.get()
      })
    } else {
      this.get()
    }
    this.getUserInfo()
    this.getCustomData()
    // 判断是否safari浏览器
    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
      this.safari = true
    }
  },
  methods: {
    ...mapActions(['getUser', 'getUserInfo', 'getCustomData', 'getEnterprise']),
    get () {
      this.getUser()
      this.getEnterprise()
    },
    signout () {
      // 新版PC注销操作
      this.ilogout('iframepclogout', 'http://pc.' + (this.agent.agentId ? this.agent.bindUrl : 'jihui88.com') + '/rest/api/user/logout')
      // 订购系统注销操作
      this.ilogout('iframeorderlogout', 'http://buy.jihui88.com/api/user/logout')
      this.ilogout('iframebuylogout', this.host + '/rest/buy/api/user/logout')
      if (this.user.username === '未登录') {
        window.location.href = this.host + '/manage_v4/login.html?backURL=' + decodeURIComponent(window.location.origin + window.location.pathname)
      } else {
        this.$http.get('/rest/api/user/logout').then((res) => {
          if (res.success) {
            window.location.href = this.host + '/manage_v4/login.html?backURL=' + window.location.origin + window.location.pathname
          } else {
            this.$Message.success(res.msg)
          }
        })
      }
      window.localStorage.setItem('lanId', '1')
    },
    ilogout (id, url) {
      let ifr = document.createElement('iframe')
      ifr.id = id
      ifr.setAttribute('src', url)
      ifr.style.display = 'none'
      document.getElementById('JHW').appendChild(ifr)
    },
    detail (item, index) {
      this.$refs.detail.open(item.messageId)
      if (this.userInfo.noReaderMsg > 0) {
        this.userInfo.noReaderMsg -= 1
        this.status['menuMessage'].menu[1].count = this.userInfo.noReaderMsg
        this.messageList.splice(index, 1)
      }
      if (this.userInfo.noReaderMsg > 4) this.getMessage()
    },
    getMessage () {
      this.$http.get('/rest/api/message/list?page=1&pageSize=5&recvState=00').then((res) => {
        if (res.success) {
          this.messageList = res.attributes.data
          this.message = true
        }
      })
    },
    messageChange () {
      if (this.messageList.length === 0 && !this.message) {
        this.getMessage()
      }
      if (this.messageList.length > 0) {
        this.message = true
      }
    },
    yindao () {
      this.$refs.yindao.open()
    }
  }
}
</script>

<style lang="less">
@import '../../assets/variables.less';
#J_Header{
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #383d41;
  .logo{
    float:left;
    height: 50px;
    border-right: 1px solid #000;
    img{
      max-height: 36px;
      min-width: 50px;
      margin: 0 16px 0 25px;
      vertical-align: middle;
    }
  }
  .userInfo{
    text-align: right;
    .header_link{
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      display: inline-block;
      color: #fff
    }
    .ivu-dropdown{
      height: 50px;
      vertical-align: top;margin-right: -3px;
      .ivu-dropdown-rel{
        height: 50px;
      }
      .ivu-select-dropdown{
        margin: 0;
        padding: 0;
        border-radius: 0;
        color: #5d5d5d;
        z-index: 1000;
      }
    }
    .j_dropdown_username{
      margin-left: 15px;
      background: #2a2a2a;
      .ivu-icon-arrow-down-b{
        transition: all .3s;
      }
      &:hover{
        .ivu-icon-arrow-down-b{
          transform: rotate(-180deg);
        }
      }
      .ivu-select-dropdown{
        position: fixed !important;
        left: auto !important;
        right: 0;
        text-align: center;
        .ivu-dropdown-menu{
          width: 270px;
        }
        .info{
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 10px;
          padding: 30px 0 20px 0;
          line-height: 2.5;
          img{
            width: 32px;
            height: 32px;
            border-radius: 50%;
            vertical-align: middle;
          }
          p{
            font-size: 14px;
            font-weight: bold;
          }
        }
        .ivu-row{
          line-height: 36px;
          i{
            display: block;
            font-size: 32px;
            color: #6d8290;
          }
          a{
            color: #333;
            display: block;
            margin: 5px;
            padding: 10px 0 0 0;
            &:hover{
              background: @background-gray-color;
            }
          }
        }
        .signout{
          position: absolute;
          bottom: 0;
          width: 100%;
          left: 0;
          background: @background-gray-color;
          color: #4f4e4f;
          font-size: 14px;
        }
      }
      .avatar{
        background: #000;
        padding: 0 7px 0 8px;
        text-align: center;
        img{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .icon-huiyuan{
        width: 32px;
        background: #ff6700;
        color: #fff;
        padding: 8px;
        border-radius: 100%;
      }
    }
    // 消息弹出框
    .j_dropdown_message{
      text-align: left;
      i{
        cursor: pointer;
        font-size: 16px;vertical-align: middle;
        .badge{
          font-size: 12px;
          background: #ff6700;
          color: #fff;
          border-radius: 4px;
          padding: 3px 5px;
          margin-left: 5px;
          vertical-align: top;
        }
      }
      .header_link{
        padding: 0 10px;
      }
      .ivu-dropdown-menu{
        width: 280px;
        max-height: 500px;
        .name{
          background: #eaedf1;
          color: #555;
          padding: 0 16px;
          font-size: 14px;
          &::after{
            content: '';position: absolute;
            top: -10px;
            left: 120px;
            display: block;
            width: 0;
            height: 0;
            border-color: #eaedf1 transparent;
            border-style: solid;
            border-width: 0 10px 10px;
          }
        }
        ul{
          padding: 0 1px;
          li{
            border-bottom: 1px solid #eaedf1;
            padding: 9px 15px;
            line-height: 1.6;
            .title{
              color: #72dced;
              cursor: pointer;
            }
            p{
              color: #595959;
            }
          }
        }
        .more{
          color: #72dced;
          text-align: center;
          width: 100%;
          line-height: 55px;
          height: 55px;
          display: inline-block;
        }
      }
    }
  }
  .border{
    background: #000;
    display: inline-block;
    width: 1px;
    padding: 0 !important;
  }
  .j_dropdown_browser{
    &:hover{
      a{
        color: #fff
      }
    }
    .header_link{
      color: #999;
    }
    .ivu-dropdown-menu{
      width: 150px;
    }
    .browser-dropdown{
      background-color: #fff;
      padding: 10px 15px;
      text-align: left;
      li{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #eaeaea;
        padding: 0 5px;
        &:last-child{
          border-bottom: none;
        }
        a{
          color: #333;
          &:hover{
            color: #333
          }
        }
      }
    }
  }
  .j_dropdown_word{
    .header_link{
      color: #fff;
    }
    .ivu-dropdown-menu{
      width: 115px;
    }
  }
}
</style>
