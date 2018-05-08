<template>
  <div class="j_website j_panel">
    <Row :gutter="24" style="width:440px;float:left;">
      <Col span="6" >
        <div @click="href">
          <Avatar shape="square" :src="'http://img.jihui88.com/'+user.enterprise.logo" size="large" v-if="user.enterprise.logo" class="head_portrait"/>
          <i class="iconfont icon-huiyuan" v-if="!user.enterprise.logo"></i>
        </div>
      </Col>
      <Col span="18">
        <div class="name">
          <span>账号昵称：<span class="nickName" @click="href">{{user.nickName || user.username}}</span> </span>
          <p>
            <span v-if="user.pcSitePayTime">账号到期时间：{{user.pcSitePayTime}}</span>
            <span v-if="!user.pcSitePayTime">未购买</span>
            <Badge count="正常" class-name="badge-normal" style="margin: 0 2px 0 5px"></Badge>
            <Badge count="VIP" :class="[user.pcSitePayTime ? 'badge-vip' : 'badge-gray']"></Badge>
          </p>
        </div>
      </Col>
    </Row>
    <a href="http://buy.jihui88.com/#/" target="_blank" class="buy"><Button type="primary"><i class="iconfont icon-update"></i>升级购买</Button></a>
    <ul class="j_nav_link">
      <li><a href="http://pc.jihui88.com/pc/index.html" target="_blank"><i class="iconfont icon-diannaoshouji01"></i>网站界面管理</a></li>
      <li><a href="http://www.jihui88.com/member/index.html" target="_blank"><i class="iconfont icon-shujuku"></i>数据管理中心</a></li>
      <li><a href="http://www.jihui88.com/member/index.html#/seo_list" target="_blank"><i class="iconfont icon-seo-marketing-business-code-validation"></i>SEO管理</a></li>
      <li class="add"><Icon type="plus"></Icon>定制功能模块</li>
    </ul>
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
@import '../../assets/variables.less';
.j_website{
  padding: 25px 26px 34px 30px;
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
.j_nav_link{
  overflow: hidden;
  clear: both;
  li{
    margin-top: 21px;
    float: left;
    text-align: center;
    background: @background-color;
    list-style-type: none;
    margin-right: 25px;
    color: #9c9c9c;
    width: 130px;
    height: 138px;
    a{
      color: #9c9c9c;
    }
    i{
      display: block;
      font-size: 60px;
      color: #bfcace;
      padding-top: 5px;
    }
  }
  .add{
    background: none;
    border: 1px solid #e8e8e8;
    i{
      font-size: 40px;
      padding-top: 32px;
      padding-bottom: 20px;
    }
  }
  .ivu-badge-count{
    height: 19px;line-height: 19px;
  }
}
</style>
