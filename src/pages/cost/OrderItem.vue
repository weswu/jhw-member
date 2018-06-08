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
import Detail from '@/pages/cost/Detail'
export default {
  props: {
    searchData: {
      type: Object,
      default () {
        return {
          page: 1,
          pageSize: 10,
          sort: 'addTime,desc'
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
        { title: '订单编号', key: 'outTradeNo', width: 130 },
        { title: '订单摘要', key: 'name', ellipsis: true },
        { title: '原价', render: this.totalPriceFilter, width: 85 },
        { title: '应付金额', render: this.paidPriceFilter, width: 85 },
        { title: '订单创建时间', render: this.dateFilter, width: 135 },
        { title: '操作', className: 'j_table_operate', width: 70, render: this.renderOperate }
      ],
      list: [],
      total: 0
    }
  },
  created () {
    var ctx = this
    setTimeout(function () {
      ctx.get()
    }, 500)
  },
  methods: {
    get () {
      let data = {
        size: this.searchData.pageSize,
        page: this.searchData.page - 1
      }
      this.$http.get('/rest/buy/api/order/orderHistory?' + qs.stringify(data), {
        headers: {
          'X-CSRF-Token': this.$store.state.user.token
        }
      }).then(res => {
        if (res.code === 0) {
          this.total = res.data.totalElements
          this.list = res.data.content
        }
      })
    },
    totalPriceFilter (h, params) {
      return h('span', {
        class: {
          price: true
        }
      }, '￥' + params.row.totalPrice)
    },
    paidPriceFilter (h, params) {
      return h('span', {
        class: {
          price: true
        }
      }, '￥' + (params.row.paidPrice || '-'))
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
            this.$refs.detail.open(params.row.orderId, 'order')
          }
        }
      }, '查看')
    }
  }
}
</script>

<style lang="css">
</style>
