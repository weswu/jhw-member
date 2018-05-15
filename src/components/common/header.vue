<template>
  <Row id="J_Header" type="flex" justify="space-between">
    <div class="logo">
      <a href="http://www.jihui88.com"><img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png" height="30" alt=""></a>
    </div>
    <Col span="18" class="userInfo">
      <a href="#/" class="header_link">首页</a>
      <a href="#/" class="header_link">服务反馈</a>
      <Dropdown placement="bottom" class="j_dropdown_message">
          <a href="#/message" class="header_link">
              <i class="iconfont icon-tixing2"><span class="badge">{{userInfo.noReaderMsg}}</span></i>
          </a>
          <DropdownMenu slot="list">
            <div class="name">
              站内消息通知
            </div>
            <ul>
              <li v-for="(item, index) in messageList" :key="index" v-if="index<5">
                <div class="title" @click="detail(item.messageId)">
                  {{item.title}}
                </div>
                <p>
                  {{item.addTime | time('yyyy-MM-dd hh:mm')}}
                </p>
              </li>
              <li v-if="messageList.length === 0">暂无数据</li>
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
            <i class="iconfont icon-huiyuan"></i>
          </a>
          <DropdownMenu slot="list">
            <div class="info">
              <i class="iconfont icon-huiyuan"></i>
              <p>账号：{{user.username}}</p>
            </div>
            <Row>
              <Col span="8"><a href="#/account"><i class="iconfont icon-account-only"></i>账号信息</a></Col>
              <Col span="8"><a href="#/account"><i class="iconfont icon-anquan"></i>安全设置</a></Col>
              <Col span="8"><a href="#/cost_order"><i class="iconfont icon-price"></i>费用中心</a></Col>
            </Row>
            <Row>
              <Col span="8"><a href="#/point_origin"><i class="iconfont icon-quanyi"></i>积分来源</a></Col>
              <Col span="8"><a href="#/point"><i class="iconfont icon-jifen"></i>账号积分</a></Col>
              <Col span="8"><a href="#/enterprise"><i class="iconfont icon-gongsi"></i>公司信息</a></Col>
            </Row>
            <a href="javascript:;" @click="signout" class="signout">退出</a>
          </DropdownMenu>
      </Dropdown>
      <span class="border"></span>
    </Col>
    <Detail ref="detail"/>
  </Row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Detail from '@/pages/message/Detail'
export default {
  components: {
    Detail
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    ...mapState(['user', 'userInfo', 'messageList'])
  },
  created () {
    this.$store.commit('setLanId', window.localStorage.getItem('lanId') || '1')
    this.getUser()
    this.getUserInfo()
    this.getMessage()
  },
  methods: {
    ...mapActions(['getUser', 'getUserInfo', 'getMessage']),
    signout () {
      let ctx = this
      // 新版PC注销操作
      this.ilogout('iframepclogout', 'http://pc.jihui88.com/rest/api/user/logout')
      // 订购系统注销操作
      this.ilogout('iframeorderlogout', 'http://buy.jihui88.com/api/user/logout')
      this.$http.get('/rest/api/user/logout').then((res) => {
        if (res.success) {
          ctx.$store.commit('setUser', {})
          window.location.href = 'http://www.jihui88.com/member/login.html?backURL=' + decodeURIComponent(window.location.href)
        } else {
          ctx.$Message.success(res.msg)
        }
      })
      window.localStorage.setItem('lanId', '1')
    },
    ilogout (id, url) {
      let ifr = document.createElement('iframe')
      ifr.id = id
      ifr.setAttribute('src', url)
      ifr.style.display = 'none'
      document.getElementById('JHW').appendChild(ifr)
    },
    detail (id) {
      this.$refs.detail.open(id)
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
    width: 120px;
    border-right: 1px solid #000;
    img{
      height: 36px;
      margin: 4px 0 0 25px;
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
          height: 404px;
        }
        .info{
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 10px;
          padding: 30px 0 20px 0;
          line-height: 2.5;
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
        font-size: 22px;
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
}
</style>
