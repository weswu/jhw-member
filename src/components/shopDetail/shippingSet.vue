<template>
  <Table :columns="columns" :data="data"/>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: {}
  },
  computed: {
    ...mapState({
      paymentStatus: state => state.status.paymentStatus,
      paymentType: state => state.status.paymentType
    })
  },
  data () {
    return {
      columns: [
        { title: '支付编号', key: 'tradeNo' },
        {
          title: '支付类型',
          render: (h, params) => {
            let text = ''
            this.paymentType.forEach(item => {
              if (item.value === params.row.paymentType) {
                text = item.text
              }
            })
            return h('span', text)
          }
        },
        { title: '支付方式', key: 'paymentConfigName' },
        {
          title: '支付金额',
          render: (h, params) => {
            return h('span', '￥' + params.row.totalAmount + '元')
          }
        },
        {
          title: '支付手续费',
          render: (h, params) => {
            return h('span', '￥' + params.row.paymentFee + '元')
          }
        },
        { title: '付款人', key: 'payer' },
        {
          title: '支付状态',
          render: (h, params) => {
            let text = ''
            this.paymentStatus.forEach(item => {
              if (item.value === params.row.paymentStatus) {
                text = item.text
              }
            })
            if (params.row.paymentStatus === 'success') {
              text = '已完成'
            }
            return h('span', text)
          }
        },
        {
          title: '支付时间',
          render: (h, params) => {
            return h('span', this.dateFormat(params.row.addTime))
          }
        }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
