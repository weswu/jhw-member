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
        <span class="j_tip">温馨提醒：为了你账号的安全，请及时 <a href="javascript:;" @click="href" class="">设置你的邮箱及密码</a> </span>
      </span>
      <p>
        <span>注册时间：{{user.addTime | time}}</span>
        <Badge count="正常" class-name="badge-normal" style="margin: 0 2px 0 5px"></Badge>
        <Badge count="VIP" :class="[user.pcSitePayTime ? 'badge-vip' : 'badge-gray']"></Badge>
      </p>
    </div>
    <div class="buy">
      <Select class="primary" placeholder="升级购买" @on-change="change" style="width:121px">
        <Option v-for="item in list" :value="item.value" :key="item.value" label="升级购买">
          {{ item.label }}
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
        { value: '203', label: '网站编辑：203' },
        { value: '204', label: '网站编辑：204' },
        { value: '205', label: '网站编辑：205' },
        { value: '206', label: '网站编辑：206' },
        { value: '207', label: '网站编辑：207' }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
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
  }
  .ivu-badge{
    vertical-align: initial;
  }
  .j_tip{
    color: #595959;
    margin-left: 3px;
    a{
      color: #2549a6;
      text-decoration: underline;
    }
  }
  .buy{
    float: right;
    position: relative;
    margin-top: 15px;
    .ivu-select-placeholder{
      color: #fff;text-align: right;
      height: 32px;
      line-height: 32px;
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
