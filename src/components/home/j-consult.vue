<template>
  <div class="j_consult">
    <div class="j_consult_btn" @click="toggle">
      <i class="iconfont icon-paimaizixun"></i>
      咨<br/>询<br/> <span>.</span><br/>建<br/>议
    </div>
    <Card class="j_consult_content" v-if="display">
      <i class="iconfont icon-x" @click="close"></i>
      <Row>
        <a href="http://wpa.qq.com/msgrd?v=3&uin=1220328180&site=qq&menu=yes" target="_blank" style="color: #595959">
          <Col span="4"> <i class="iconfont icon-shezhizaixianzixun"></i> </Col>
          <Col span="20">智能顾问<p>智能诊断，秒级解答</p></Col>
        </a>
      </Row>
      <Row>
        <Col span="4"> <i class="iconfont icon-dkw_tianxie"></i> </Col>
        <Col span="20" style="cursor: pointer">
          <div @click="open">
            聆听.建议反馈<p>机汇网不是完美的，我们渴望您的建议</p>
          </div>
        </Col>
      </Row>
    </Card>
    <Feedback ref="feedback"/>
  </div>
</template>

<script>
import Feedback from '@/components/home/j-feedback'
export default {
  components: {
    Feedback
  },
  data () {
    return {
      display: false
    }
  },
  methods: {
    toggle () {
      this.display = !this.display
    },
    close () {
      this.display = false
    },
    open () {
      this.$refs.feedback.open()
    }
  }
}
</script>

<style lang="less">
.j_consult{
  overflow: hidden;
  .j_consult_btn{
    position: fixed;
    right: 0;
    bottom: 100px;
    width: 24px;
    height: 125px;
    background: #5bd1e7;
    color: #fff;    text-align: center;
    cursor: pointer;    line-height: 1.4;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    i{
      margin-top: 5px;    display: inline-block;
    }
    span{
      font-size: 18px;
    }
  }
  .j_consult_content{
    width:280px;
    transition: all .3s;
    position: fixed;
    right: 42px;
    bottom: 100px;
    z-index: 9;
    color: #707070;
    font-size: 14px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    .ivu-card-body{
      padding: 35px 15px 30px 15px;
    }
    .ivu-row{
      .iconfont{
        font-size: 30px;
        color: #373d40;
        text-align: center;    display: block;
      }
      p{
        font-size: 12px;
        color: #a0a0a0;
      }
    }
    .icon-x{
      cursor: pointer;
      font-size: 12px;position: absolute;
      right: 16px;top: 15px;color: #d0d0d0;
    }
  }
}
</style>
