<template>
  <div class="j_home_website j_panel">
    <div class="img" @click="href">
      <Avatar shape="square" :src="'http://img.jihui88.com/'+user.enterprise.logo" size="large" v-if="user.enterprise.logo" class="head_portrait"/>
      <i class="iconfont icon-huiyuan" v-if="!user.enterprise.logo"></i>
    </div>
    <div class="name">
      <span>
        账号昵称：
        <span class="nickName" @click="href">{{user.nickName || user.username}}</span>
        <div class="j_tip">温馨提醒：为了你账号的安全，请及时 <span class="a_underline" @click="href">设置你的邮箱及密码</span></div>
      </span>
      <p>
        <span>注册时间：{{user.addTime | time}}</span>
        <Badge :count="user.username === '未登录' ? '未登录' : '正常'" class-name="badge-normal" style="margin: 0 2px 0 5px"></Badge>
        <Badge count="VIP" :class="[user.pcSitePayTime ? 'badge-vip' : 'badge-gray']"></Badge>
      </p>
    </div>
    <div class="buy">
      <Select class="primary" placeholder="升级购买" @on-change="change" style="width:121px">
        <Option v-for="item in staticList" :value="item.value" :key="item.value" label="升级购买">
          {{ item.text }}
        </Option>
      </Select>
      <i class="iconfont icon-update"></i>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['user', 'staticList'])
  },
  methods: {
    href () {
      this.$router.push({'path': '/account'})
    },
    change (e) {
      this.$Message.info('更新中...' + e)
    }
  }
}
</script>

<style lang="less">
.j_home_website{
  padding: 25px 26px 34px 30px;
  .img{
    float:left;
    width: 75px;
    margin-right: 16px;
  }
  .icon-huiyuan{
    width: 75px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    background: #ff6700;
    display: block;
    color: #fff;
    font-size: 36px;
    cursor: pointer;
  }
  .ivu-avatar-large{
    width: 75px;
    height: 75px;
    cursor: pointer;
  }
  .name{
    float:left;
    line-height: 33px;
    padding: 8px 0 0 0;
    color: #9b9b9b;
    .nickName{
      color: #000;
      font-size: 14px;
      font-weight: bold;
      padding-right: 3px;
      cursor: pointer;
    }
    .j_tip{
      display: inline-block;
      margin: 0 0 0 3px
    }
  }
  .ivu-badge{
    vertical-align: initial;
  }
  .buy{
    float: right;
    position: relative;
    margin-top: 15px;
    .ivu-select-placeholder{
      text-align: right;
    }
    .ivu-icon-arrow-down-b{
      display: none;
    }
    .icon-update{
      font-size: 18px;
      position: absolute;
      top: 3px;
      color: #fff;
      left: 22px;
    }
  }
}
</style>
