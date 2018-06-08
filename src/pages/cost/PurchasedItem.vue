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
        { title: '网站编号', key: 'layoutId', width: 85 },
        { title: '产品名称', key: 'name', ellipsis: true },
        { title: '原价', render: this.totalPriceFilter, width: 85 },
        { title: '应付金额', render: this.paidPriceFilter, width: 85 },
        { title: '数量', render: this.numberFilter, width: 60 },
        { title: '使用年限', key: 'year', width: 85 },
        { title: '购买时间', render: this.dateFilter, width: 135 },
        { title: '到期时间', render: this.endFilter, width: 135 },
        { title: '操作', className: 'j_table_operate', width: 110, render: this.renderOperate }
      ],
      list: [
        {
          orderId: '8a9e457e614c6de3016153d2dd46001a'
        }
      ],
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
      this.$http.get('/rest/buy/api/order/listPaid?' + qs.stringify(data), {
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
    numberFilter (h, params) {
      return h('span', 1)
    },
    dateFilter (h, params) {
      return h('span', this.dateFormat(params.row.addTime))
    },
    endFilter (h, params) {
      return h('span', this.dateFormat(params.row.endTime))
    },
    renderOperate (h, params) {
      return h('span', [
        h('a', {
          style: {
            color: '#2467C5'
          },
          on: {
            click: () => {
              this.$refs.detail.open(params.row.orderId)
            }
          }
        }, '详情'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          style: {
            color: '#ff8938'
          },
          on: {
            click: () => {
              this.$refs.detail.open(params.row.orderId, 'buy')
            }
          }
        }, '续费')
      ])
    }
  }
}
</script>

<style lang="css">
</style>
