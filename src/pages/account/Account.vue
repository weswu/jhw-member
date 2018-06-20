<template>
  <Layout class="j_layout ivu-layout-has-sider j_account">
      <MenuBar :data="'menuAccount'" :active="'account'"/>
      <Layout class="j_layout_content">
        <JHeader :title="'安全设置'"/>
        <Content class="scroll">
          <Row :gutter="24" class="account_user">
            <Col span="6" style="width:130px">
              <div @click="avatar">
                <Avatar shape="square" :src="$store.state.status.IMG_HOST+user.headimg" size="large" v-if="user.headimg" class="head_portrait"/>
                <i class="iconfont icon-huiyuan" v-if="!user.headimg"></i>
              </div>
              <a href="javascript:;" @click="avatar">修改头像</a>
            </Col>
            <Col span="18">
              <div class="name">
                账号昵称：<Input v-model="user.nickName" @on-blur="input" placeholder="账号昵称" style="width:130px"></Input><br>
                会员账号ID：{{user.username}}<br>
                注册时间： {{user.addTime | time}}<br>
                <Badge :count="user.username === '未登录' ? '未登录' : '正常'" class-name="badge-normal" style="margin-right: 2px"></Badge>
                <Badge count="VIP" :class="[user.pcSitePayTime ? 'badge-vip' : 'badge-gray']"></Badge>
              </div>
            </Col>
          </Row>
          <div class="account_bind">
            <span>您当前的账号安全程度</span>
            <Progress :percent="percent" hide-info></Progress>
            <span>安全级别:
              <span v-if="percent < 60" style="color:#e7ae5f">低</span>
              <span v-if="percent === 60" style="color:#e7ae5f">中</span>
              <span v-if="percent > 60" style="color:#e7ae5f">高</span>
            </span>
            <span v-if="percent < 100" style="padding-left: 40px">继续努力</span>
            <span v-if="percent === 100" style="padding-left: 40px">继续保持</span>
          </div>
          <div class="account_bind_edit">
            <Row type="flex">
              <Col span="4" class="flex-left">登录密码</Col>
              <Col span="14">安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</Col>
              <Col span="6" class="flex-right">
                <span class="success"><i class="iconfont icon-dagou"></i>已设置</span>
                <span>|</span> <a href="javascript:;" @click="password">修改</a>
              </Col>
            </Row>
            <Row type="flex" v-for="(item, index) in list" :key="index" v-if="item.type === 'cellphone'">
              <Col span="4" class="flex-left">手机绑定</Col>
              <Col span="14">
                <span v-if="item.nickname && item.nickname !== '未绑定'">您已绑定了手机{{item.nickname}} [您的手机为安全手机，可以找回密码，但不能用于登录]</span>
                <span v-else>您可以绑定手机, 可以找回密码，但不能用于登录</span>
              </Col>
              <Col span="6" class="flex-right">
                <span class="success" v-if="item.nickname && item.nickname !== '未绑定'"><i class="iconfont icon-dagou"></i>已设置</span>
                <span class="error" v-else><i class="iconfont icon-gantanhao"></i>未设置</span>
                <span>|</span> <a href="javascript:;" @click="unbind(item)">修改</a></Col>
            </Row>
            <Row type="flex">
              <Col span="4" class="flex-left">备用邮箱</Col>
              <Col span="14">
                <span v-if="user.email">您已绑定了邮箱{{user.email | limitEmail}} [机汇网发送的各类系统、营销、服务通知将发送到您的备用邮箱。]</span>
                <span v-else>您可以绑定邮箱, 机汇网发送的各类系统、营销、服务通知将发送到您的备用邮箱。</span>
              </Col>
              <Col span="6" class="flex-right">
                <span class="success" v-if="user.email"><i class="iconfont icon-dagou"></i>已设置</span>
                <span class="error" v-else><i class="iconfont icon-gantanhao"></i>未设置</span>
                <span>|</span> <a href="javascript:;" @click="changeEail">修改</a>
              </Col>
            </Row>
            <Row type="flex" v-for="(item, index) in list" :key="index" v-if="item.type === 'weixin'">
              <Col span="4" class="flex-left">微信绑定</Col>
              <Col span="14">
                <span v-if="item.nickname && item.nickname !== '未绑定'">您已绑定了微信{{item.nickname}} [可用于扫码登录]</span>
                <span v-else>您可以绑定微信, 可用于扫码登录</span>
              </Col>
              <Col span="6" class="flex-right">
                <span class="success" v-if="item.nickname && item.nickname !== '未绑定'"><i class="iconfont icon-dagou"></i>已设置</span>
                <span class="error" v-else><i class="iconfont icon-gantanhao"></i>未设置</span>
                <span>|</span> <a href="javascript:;" @click="unbind(item)">修改</a>
              </Col>
            </Row>
            <Row type="flex" v-for="(item, index) in list" :key="index" v-if="item.type === 'qq'">
              <Col span="4" class="flex-left">QQ绑定</Col>
              <Col span="14">
                <span v-if="item.nickname && item.nickname !== '未绑定'">您已绑定了QQ{{item.nickname}} [可用于快捷登录]</span>
                <span v-else>您可以绑定QQ, 可用于快捷登录</span>
              </Col>
              <Col span="6" class="flex-right">
                <span class="success" v-if="item.nickname && item.nickname !== '未绑定'"><i class="iconfont icon-dagou"></i>已设置</span>
                <span class="error" v-else><i class="iconfont icon-gantanhao"></i>未设置</span>
                <span>|</span> <a href="javascript:;" @click="unbind(item)">修改</a>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      <div class="login-frame" :class="open ? 'fade_in' : ''">
          <div class="wrapper" :style="{width: width + 'px'}">
            <iframe id="loginiFrame" :src="src" frameBorder="0" scrolling="no"></iframe>
            <img src="http://www.jihui88.com/member/static/images/f-x.png" alt="close" class="close" @click="close">
          </div>
        </div>
      </div>
      <Password ref="password"/>
      <JAlbum :title="'修改头像'" ref="ablum" @on-change="picChange" v-if="ablumToggle"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JAlbum from '@/components/group/j-album'
import Password from '@/pages/account/Password'
export default {
  components: {
    MenuBar,
    JHeader,
    JAlbum,
    Password
  },
  data () {
    return {
      list: [
        {
          language: null,
          type: 'weixin',
          country: null,
          enterpriseId: null,
          memberId: null,
          addTime: null,
          openId: null,
          updateTime: null,
          sex: null,
          city: null,
          province: null,
          nickname: '未绑定',
          oauthId: '1',
          headimg: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2017//01//04/408b4599-ff18-44bb-adeb-11ca47f640d0.png!120?v=3627039652',
          memberType: null,
          unionid: null
        },
        {
          language: null,
          type: 'qq',
          country: null,
          enterpriseId: null,
          memberId: null,
          addTime: null,
          openId: null,
          updateTime: null,
          sex: null,
          city: null,
          province: null,
          nickname: '未绑定',
          oauthId: '2',
          headimg: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2017//01//04/408b4599-ff18-44bb-adeb-11ca47f640d0.png!120?v=3627039652',
          memberType: null,
          unionid: null
        },
        {
          language: null,
          type: 'cellphone',
          country: null,
          enterpriseId: null,
          memberId: null,
          addTime: null,
          openId: null,
          updateTime: null,
          sex: null,
          city: null,
          province: null,
          nickname: '未绑定',
          oauthId: '3',
          headimg: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2017//01//04/408b4599-ff18-44bb-adeb-11ca47f640d0.png!120?v=3627039652',
          memberType: null,
          unionid: null
        }
      ],
      width: '348',
      src: 'http://www.jihui88.com/member/login.html?backURL=http://www.jihui88.com/member/qqRedirect.html&scope=snsapi_login_quick',
      open: false,
      email: '',
      ablumToggle: false
    }
  },
  computed: {
    ...mapState(['user']),
    percent () {
      let percent = 20
      if (this.user.email) {
        percent += 20
      }
      this.list.forEach(item => {
        if (item.nickname && item.nickname !== '未绑定' && item.type !== 'user') {
          percent += 20
        }
      })
      return percent
    }
  },
  created () {
    this.get()
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.type === 1) {
        // 处理iframe  src地址和隐藏弹出框
        ctx.src = 'http://www.jihui88.com/member/login.html?backURL=http://' + location.host + '/redirect&scope=snsapi_login_quick'
        ctx.close()
        ctx.get()
      }
    }, false)
  },
  methods: {
    get () {
      this.$http.get('/rest/api/oauth/list').then((res) => {
        if (res.success) {
          this.list = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    avatar () {
      this.ablumToggle = true
      var ctx = this
      setTimeout(function () {
        ctx.$refs.ablum.open()
      }, 100)
    },
    password () {
      this.$refs.password.open()
    },
    // 修改user
    picChange (e) {
      this.user.headimg = e.src
      this.$store.commit('setUser', this.user)
      this.changeUser({
        headimg: e.src
      })
    },
    input (e) {
      this.changeUser({
        nickName: this.user.nickName
      })
    },
    changeUser (info) {
      let data = {
        model: JSON.stringify(info),
        _method: 'put'
      }
      this.$http.post('/rest/api/user/accountInfo/' + this.user.userId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    unbind (item) {
      var ctx = this
      if (item.nickname !== '未绑定') {
        // 解绑
        this.$Modal.confirm({
          title: '重新绑定',
          content: '你确定要解绑并重新绑定吗?',
          onOk: () => {
            ctx.$http.post('/rest/api/user/oauthUnBind', qs.stringify({
              model: JSON.stringify({
                oauthType: item.type
              })
            })).then((res) => {
              if (res.success) {
                ctx.$Message.success('成功解除绑定')
                item.nickname = '未绑定'
                ctx.bind(item)
              } else {
                ctx.$Message.error(res.msg)
              }
            })
          },
          onCancel: () => {}
        })
      } else {
        this.bind(item)
      }
    },
    bind (item) {
      // 加绑
      var bindType = item.type
      if (bindType === 'qq') {
        this.width = '692'
      } else {
        this.width = '348'
      }
      if (bindType !== 'weixin') {
        this.open = true
      }
      this.src = 'http://www.jihui88.com/member/login.html?addBind=1&bindType=' + bindType + '&page=bind&isAccount=1&scope=snsapi_login_quick&backURL=http://www.jihui88.com/member/qqRedirect.html'
    },
    close () {
      this.open = false
      setTimeout(function () {
        this.width = '348'
      }, 300)
    },
    changeEail () {
      var ctx = this
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: '',
              autofocus: true,
              placeholder: '修改邮箱'
            },
            on: {
              input: (val) => {
                this.email = val
              }
            }
          })
        },
        onOk: () => {
          if (!this.email) return this.$Message.info('邮箱不能为空')
          let user = this.user
          user.email = this.email
          let data = {
            model: JSON.stringify(user),
            _method: 'put'
          }
          this.$http.post('/rest/api/user/detail/' + this.user.userId, qs.stringify(data)).then((res) => {
            if (res.success) {
              ctx.$Message.success('修改成功')
              ctx.user.email = ctx.email
              ctx.$store.commit('setUser', ctx.user)
            } else {
              ctx.$Message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_account{
  .icon-huiyuan{
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
    background: #ff6700;
    display: block;
    color: #fff;
    font-size: 36px;
    cursor: pointer;
    border-radius: 6px;
  }
  .head_portrait img{
    border-radius: 6px;
  }
  .account_user{
    width:660px;
    padding: 2px 0 20px 0;
    .ivu-avatar-large{
      width: 110px;
      height: 110px;
    }
    a{
      display: block;
      padding: 10px 0 0 30px;
      line-height: 34px;
    }
    .name{
      line-height: 27px;
      color: #5f5f5f;
    }
  }
  .account_bind{
    color: #5f5f5f;
    padding: 40px 0;
    border-top: 1px solid #c9c9c9;
    border-bottom: 1px solid #e4e4e4;
    span{
      padding-right: 20px
    }
    .ivu-progress{
      margin-right: 20px;width: 210px;
      .ivu-progress-inner{
        background: #f5f5f5;
        border-radius: 5px;
        .ivu-progress-bg{
          border-radius: 5px;
          background: #e7ae5f;
          height: 19px !important
        }
      }
    }
  }
  .account_bind_edit{
    .ivu-row-flex{
      padding: 35px 0;
      border-bottom: 1px solid #e4e4e4;
    }
    .flex-left{
      font-weight: bold;
      text-align: center;
      vertical-align: middle;
      color: #000;
    }
    .flex-right{
      text-align: center;
      color: #cdcdcd;
      span{
        padding: 0 5px;
      }
      i{
        padding-right: 5px;
      }
      .success{
        color: #43952a;
      }
      .error{
        color: #f29c39;
      }
    }
    a{
      color: #2467c5;
    }
  }
  a:hover{
    text-decoration: underline;
  }
}
.login-frame{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);overflow:hidden;z-index:1000;pointer-events:none;opacity:0;transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;-webkit-transition:all .3s}
.login-frame.fade_in{opacity:1;pointer-events:auto}
.login-frame .wrapper{width:348px;height:500px;z-index:999;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%)}
.login-frame iframe{width:100%;height:500px;box-shadow:0 0 6px 3px #3d3d3d;border-radius:3px;background:#fff}
.login-frame .close{position:absolute;right:11px;top:10px;cursor:pointer;z-index:99}
</style>
