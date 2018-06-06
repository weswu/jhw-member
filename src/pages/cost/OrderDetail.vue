<template>
  <Modal class-name="j_dialog j_cost_modal" v-model="modal" width="800">
    <i class="iconfont icon-x" slot="close"></i>
    <JHeader :title="'订单编辑：' + detail.outTradeNo" :tip="'订单状态' + detail.paymentType"/>
    <Row>
      <Col span="24">标题：{{detail.title}}</Col>
    </Row>
    <Row>
      <Col span="12">发件人:{{detail.fromName}}</Col>
      <Col span="12">时间：{{detail.addTime | time}}</Col>
    </Row>
    <Row>
      <Col span="12">联系电话:{{detail.fromPhone}}</Col>
      <Col span="12">电子邮箱：{{detail.fromEmail}}</Col>
    </Row>
    <Row>
      <Col span="24">留言内容：<span v-html="detail.content"></span> </Col>
    </Row>
  </Modal>
</template>

<script>
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      modal: false,
      detail: {}
    }
  },
  methods: {
    open (id) {
      this.modal = true
      this.$http.get('/rest/buy/api/order/orderHistory/detail?orderId=' + id, {
        headers: {
          'X-CSRF-Token': this.$store.state.user.token
        }
      }).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          if (this.detail.paymentType === 'UN_PAY') { this.detail.paymentType = '<span class="green">未支付</span>' }
          if (this.detail.paymentType === 'PAID') { this.detail.paymentType = '<span class="red">未支付</span>' }
          if (this.detail.paymentType === 'PART_PAY') { this.detail.paymentType = '部分支付' }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    cancel () {
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_cost_modal{
  .ivu-modal{
    top: 100px;
  }
  .ivu-modal-footer{
    display: none
  }
}
</style>
