<template>
  <div class="j_home_website j_panel">
    <div class="img" @click="href">
      <Avatar shape="square" :src="$store.state.status.IMG_HOST+user.enterprise.logo" size="large" v-if="user.enterprise.logo" class="head_portrait"/>
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
      <Select class="primary" placeholder="升级购买" @on-change="change" style="width:123px">
        <Option class="head" value="0" label="升级购买"> 网站 </Option>
        <Option v-for="item in staticList" :value="item.layoutId" :key="item.layoutId" label="升级购买">
          网站编号：{{ item.layoutId }}
        </Option>
        <Option class="head" v-for="item in list" :value="item.value" :key="item.value" label="升级购买">
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
    return {
      list: [
        { value: '1', text: '小程序' },
        { value: '2', text: '微分销' },
        { value: '3', text: '微传单' },
        { value: '4', text: '其它功能' },
        { value: '5', text: '其它套餐' }
      ]
    }
  },
  computed: {
    ...mapState(['user', 'staticList'])
  },
  methods: {
    href () {
      this.$router.push({'path': '/account'})
    },
    change (e) {
      if (e === '0') {
        console.log('0')
      } else if (e === '4') {
        window.location.href = 'http://buy.jihui88.com/#/?tab=tab1'
      } else if (e === '5') {
        window.location.href = 'http://buy.jihui88.com/#/'
      } else {
        window.location.href = 'http://buy.jihui88.com/#/?layoutId=' + e
      }
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
    line-height: 34px;
    padding: 14px 0 0;
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
    .ivu-select-dropdown {
      max-height: 340px;
      .head{
        background: #e7eaef;text-align: left;padding: 8px 16px;
        color: #6a6a6a;
      }
      .ivu-select-item{
        padding: 7px 10px;
        text-align: left;
      }
    }
    .ivu-select-placeholder,.ivu-select-selected-value{
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
