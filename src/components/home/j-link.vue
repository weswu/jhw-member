<template>
  <ul class="j_nav_link j_panel">
    <li><a href="http://pc.jihui88.com/pc/index.html" target="_blank"><i class="iconfont icon-diannaoshouji01"></i>网站界面管理</a></li>
    <li><a href="http://www.jihui88.com/member/index.html" target="_blank"><i class="iconfont icon-shujuku"></i>数据管理中心</a></li>
    <li><a href="http://www.jihui88.com/member/index.html#/seo_list" target="_blank"><i class="iconfont icon-seo-marketing-business-code-validation"></i>SEO管理</a></li>
    <li class="add"><i class="iconfont icon--jia"></i></li>
  </ul>
</template>

<script>
export default {
}
</script>

<style lang="less">
.j_nav_link{
  overflow: hidden;
  background: #fff;
  padding: 23px;
  li{
    float: left;
    text-align: center;
    list-style-type: none;
    color: #9c9c9c;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    a{
      color: #9c9c9c;
    }
    i{
      display: block;
      font-size: 42px;
      color: #bfcace;
    }
  }
  .add{
    border: 1px solid #e9e9e9;
    width: 61px;
    height: 61px;
    margin-top: 15px;
    i{
      font-size: 28px;
      line-height: 61px;
    }
  }
  .ivu-badge-count{
    height: 19px;line-height: 19px;
  }
}
</style>
