<template>
  <Content>
    <Table :columns="columns" :data="list"/>
    <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    <Detail ref="detail"/>
  </Content>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/cost/OrderDetail'
export default {
  props: {
    searchData: {
      type: Object,
      default () {
        return {
          page: 1,
          pageSize: 10
        }
      }
    }
  },
  components: {
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { title: '订单编号', key: 'outTradeNo' },
        { title: '订单摘要', key: 'name' },
        { title: '原价', render: this.totalPriceFilter },
        { title: '应付金额', render: this.paidPriceFilter },
        { title: '订单创建时间', render: this.dateFilter },
        { title: '操作', className: 'j_table_operate', width: 90, render: this.renderOperate }
      ],
      list: [
        {}
      ],
      total: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/buy/api/order/orderHistory?' + qs.stringify(this.searchData), {
        headers: {
          'X-CSRF-Token': this.$store.state.user.token
        }
      }).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    totalPriceFilter (h, params) {
      return h('span', {
        class: {
          price: true
        }
      }, '￥' + params.row.totalElements)
    },
    paidPriceFilter (h, params) {
      return h('span', {
        class: {
          price: true
        }
      }, '￥' + params.row.paidPrice)
    },
    dateFilter (h, params) {
      return h('span', this.dateFormat(params.row.addTime))
    },
    renderOperate (h, params) {
      return h('a', {
        style: {
          color: '#2467C5'
        },
        on: {
          click: () => {
            this.$refs.detail.open(params.row.orderId)
          }
        }
      }, '查看')
    }
  }
}
</script>

<style lang="css">
</style>
