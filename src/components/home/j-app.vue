<template>
  <div class="j_app j_panel">
    <Poptip trigger="hover" placement="right" width="228">
      <img src="static/img/app.png" alt="">
      <div slot="content">
        <img src="static/img/app.png" alt="" style="width:182px;height:182px;">
      </div>
    </Poptip>
    <p>
      <span>机汇网会员登录（小程序）</span>
      随时随地移动管控<br>
      独有的行业咨询、在线直播<br>
      更安全，更便捷
    </p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.j_app{
  padding: 28px 0 27px 27px;
  .ivu-poptip{
    float: left;
    width: 91px;
    margin-right: 15px;
    img{
      width: 91px;
      cursor: pointer;
    }
  }
  p{
    padding-left: 90px;
    line-height: 1.67;
    color: #a0a0a0;
    span{
      color: #707070;font-size: 16px;display: block;padding-bottom:4px;
    }
  }
}
</style>
