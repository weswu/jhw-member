<template>
  <Modal class-name="j_dialog j_cost_detail" v-model="modal" width="800">
    <i class="iconfont icon-x" slot="close"></i>
    <JHeader :title="title" :tip="tip"/>
    <div v-if="type === 'order' || type === 'buy'">
      <Row class="bg f14">
        <Col span="24">订单摘要</Col>
      </Row>
      <Row>
        <Col span="12">订单编号：{{detail.outTradeNo}}</Col>
        <Col span="12">标记：
          <span v-if="!detail.agentId">
            <span v-if="detail.paymentType === 'UN_PAY'">待付款</span>
            <span v-else>线上订单</span>
          </span>
          <span v-if="detail.agentId">线下订单</span>
        </Col>
      </Row>
      <Row>
        <Col span="12">订单创建时间：{{detail.addTime | time}}</Col>
        <Col span="12">使用年限：{{detail.year}}年</Col>
      </Row>
      <Row>
        <Col span="12">到期时间：{{detail.endTime | time}}</Col>
        <Col span="12">支付来源：
          <span v-if="detail.payType === 'WX'">微信支付</span>
          <span v-else-if="detail.payType === 'ALI'">支付宝支付</span>
          <span v-else-if="detail.payType === 'BANK'">银行卡支付</span>
          <span v-else-if="detail.payType === 'PFA'">代付</span>
          <span v-else-if="detail.payType === 'OFFLINE'">线下支付</span>
          <span v-else>-</span>
        </Col>
      </Row>
      <Row>
        <Col span="12">总计：￥{{detail.totalPrice}}</Col>
        <Col span="12">客户应付金额：<span class="price">￥{{detail.paidPrice || '-'}}</span></Col>
      </Row>
    </div>
    <div v-else>
      <Row class="bg f14">
        <Col span="24">产品摘要</Col>
      </Row>
      <Row>
        <Col span="12">原价：<span class="price">￥{{detail.totalPrice}}</span></Col>
        <Col span="12">应付金额：<span class="price">￥{{detail.paidPrice || '-'}}</span></Col>
      </Row>
      <Row>
        <Col span="12">数量：1</Col>
        <Col span="12">使用年限：{{detail.year}}年</Col>
      </Row>
      <Row>
        <Col span="12">购买时间：{{detail.addTime | time}}</Col>
        <Col span="12">到期时间：{{detail.endTime | time}}</Col>
      </Row>
      <Row>
      </Row>
    </div>
    <Row class="bg">
      <Col span="24"><span v-if="type === 'order'">订单</span><span v-if="type !== 'order'">产品</span>明细</Col>
    </Row>
    <div v-for="(item, index) in detail.orderItemList" :key="index" :class="{li: index>0}">
      <Row>
        <Col span="12" class="overflow">{{item.name}}</Col>
        <Col span="12">数量：1个</Col>
      </Row>
      <Row>
        <Col span="12">使用年限：{{item.year}}年</Col>
        <Col span="12">原价：￥{{item.price}}x{{item.year}}</Col>
      </Row>
      <Row>
        <Col span="12">网站编号：{{detail.layoutId || '-'}}</Col>
        <Col span="12">小计：￥{{item.totalPrice}}</Col>
      </Row>
    </div>
    <Row type="flex" justify="space-between" v-if="type === 'buy'" style="margin-top:24px;">
      <Col>
        客户应付金额：<span class="price" style="font-size: 24px;">￥{{detail.paidPrice}}</span>
      </Col>
      <Col>
        <a :href="'http://buy.jihui88.com/#/alipay?title=续费&orderId=' + this.detail.orderId" target="_blank">
          <Button type="primary" style="margin-right: 0;">确认支付</Button>
        </a>
      </Col>
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
      detail: {},
      detailText: {
        'orderId': '8a9e457e614c6de3016153d2dd46001a',
        'outTradeNo': '1000932859421',
        'paymentType': 'PAID',
        'name': '自选模板--',
        'addTime': 1517529783000,
        'agentId': null,
        'totalPrice': 600,
        'paidPrice': 0.01,
        'username': 'ggggfj',
        'userEntName': '455256',
        'userLegalPre': 'fhffhhhvv',
        'userCellphone': '13868184604',
        'agentPrice': null,
        'agentEntName': null,
        'agentName': null,
        'agentCellphone': null,
        'year': 1,
        'endTime': 1548964774846,
        'payType': 'WX',
        'comment': null,
        'auditId': null,
        'orderItemList': [
          {
            'name': '自选模板--',
            'price': 600,
            'year': 1,
            'totalPrice': 600
          }
        ],
        'layoutId': '96\n'
      },
      title: '',
      tip: '',
      type: ''
    }
  },
  methods: {
    open (id, type) {
      this.modal = true
      this.type = type
      this.$http.get('/rest/buy/api/order/detail/user?orderId=' + id).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
          if (this.detail.paymentType === 'UN_PAY') { this.tip = '<span class="red">未支付</span>' }
          if (this.detail.paymentType === 'PAID') { this.tip = '<span class="green">已支付</span>' }
          if (this.detail.paymentType === 'PART_PAY') { this.tip = '部分支付' }
          if (type === 'order') {
            this.title = '订单编号：' + this.detail.outTradeNo
            this.tip = '订单状态：' + this.tip
          } else if (type === 'buy') {
            this.title = '产品续费'
            this.tip = '订单状态：' + this.tip
          } else {
            this.title = '产品详情'
            this.tip = '状态：' + this.tip
          }
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
.j_cost_detail{
  .ivu-modal{
    top: 100px;
  }
  .ivu-modal-footer{
    display: none
  }
  .li{
    border-top: 1px solid #e1e6eb;
  }
  .ivu-row{
    border-right: 1px solid #e1e6eb;
    &.bg{
      border-left: 2px solid #778;
    }
    &.f14{
      border-top: 1px solid #e1e6eb;
      font-size: 14px;
    }
    .ivu-col{
      padding: 10px 15px;
      color: #666;
      border-left: 1px solid #e1e6eb;
      border-bottom: 1px solid #e1e6eb;
    }
    .overflow {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #4a90e2;
    }
  }
}
</style>
