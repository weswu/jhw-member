<template>
  <div class="j_consult">
    <div class="j_consult_btn yd_zixun" @click="toggle" :style="agent.agentId ? 'height:70px' : ''">
      <i class="iconfont icon-paimaizixun"></i>
      咨<br/>询<br/> <span v-if="!agent.agentId"><span class="dian">.</span><br/>建<br/>议</span>
    </div>
    <Card class="j_consult_content" v-if="display">
      <i class="iconfont icon-x" @click="close"></i>
      <Row>
        <a :href="'http://wpa.qq.com/msgrd?v=3&uin='+agent.user.qq+'&site=qq&menu=yes'" target="_blank" style="color: #595959">
          <Col span="4"> <i class="iconfont icon-shezhizaixianzixun"></i> </Col>
          <Col span="20"> <span>智能顾问</span> <p>智能诊断，秒级解答</p></Col>
        </a>
      </Row>
      <Row v-if="!agent.agentId">
        <Col span="4"> <i class="iconfont icon-dkw_tianxie"></i> </Col>
        <Col span="20" style="cursor: pointer">
          <div @click="open">
            <span>聆听.建议反馈</span> <p>{{agent.user.enterprise.name}}不是完美的，我们渴望您的建议</p>
          </div>
        </Col>
      </Row>
    </Card>
    <Feedback ref="feedback"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Feedback from '@/components/home/j-feedback'
export default {
  components: {
    Feedback
  },
  computed: {
    ...mapState(['agent'])
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
    bottom: 170px;
    width: 24px;
    height: 125px;
    background: #5bd1e7;
    color: #fff;    text-align: center;
    cursor: pointer;    line-height: 1.4;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    i{
      margin-top: 5px;    display: inline-block;
    }
    .dian{
      font-size: 18px;
    }
  }
  .shipin{
    position: fixed;
    right: 0;
    bottom: 100px;
    width: 24px;
    background: #5bd1e7;
    color: #fff;
    text-align: center;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    padding: 5px 0;cursor: pointer;
  }
  .j_consult_content{
    width:280px;
    transition: none;
    position: fixed;
    right: 42px;
    bottom: 170px;
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
      span{
        font-size: 14px;
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
  .j_consult_content2{
    width:280px;
    bottom: 100px;
    .ivu-card-body {
      padding: 30px 0 40px 25px;
      line-height: 1.6;
      .item{
        color: #595959;
        margin-bottom: 4px;
        cursor: pointer;
        span{
          font-size: 14px;
        }
      }
    }
  }
}
</style>
