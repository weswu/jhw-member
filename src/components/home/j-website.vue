<template>
  <div class="j_website j_panel">
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
        <span v-if="user.pcSitePayTime">账号到期时间：{{user.pcSitePayTime}}</span>
        <span v-if="!user.pcSitePayTime">未购买</span>
        <Badge count="正常" class-name="badge-normal" style="margin: 0 2px 0 5px"></Badge>
        <Badge count="VIP" :class="[user.pcSitePayTime ? 'badge-vip' : 'badge-gray']"></Badge>
      </p>
    </div>
    <a href="http://buy.jihui88.com/#/" target="_blank" class="buy"><Button type="primary"><i class="iconfont icon-update"></i>升级购买</Button></a>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    href () {
      this.$router.push({'path': '/account'})
    }
  }
}
</script>

<style lang="less">
.j_website{
  padding: 25px 26px 34px 30px;
  overflow: hidden;
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
    a{
      color: #2549a6;
      text-decoration: underline;
    }
  }
  .buy{
    float: right;
    .icon-update{
      padding-right: 5px;
      font-size: 18px;
    }
    button{
      padding: 7px 18px;
      font-size: 13px;
    }
  }
}
</style>
