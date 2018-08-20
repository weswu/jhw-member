<template>
  <Content>
    <Table :columns="columns" :data="list"/>
    <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    <Detail ref="detail"/>
    <Modal
      title="支付"
      v-model="modal" width="800">
        <iframe class="j_buy_iframe" :src="src" scrolling="no" style="height:420px"/>
    </Modal>
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
      modal: false,
      src: '',
      columns: [
        { title: '产品名称', key: 'name', ellipsis: true, minWidth: 180 },
        { title: '应付金额', render: this.totalPriceFilter, width: 85 },
        { title: '数量', render: this.numberFilter, width: 60 },
        { title: '使用年限', key: 'year', width: 85 },
        { title: '订单创建时间', render: this.dateFilter, width: 135 },
        { title: '操作', className: 'j_table_operate', width: 110, render: this.renderOperate }
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
        page: this.searchData.page - 1,
        sort: 'addTime,desc'
      }
      this.$http.get('/rest/buy/api/order/listUnPaid?' + qs.stringify(data)).then(res => {
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
      }, '￥' + (params.row.totalPrice || '-'))
    },
    numberFilter (h, params) {
      return h('span', 1)
    },
    dateFilter (h, params) {
      return h('span', this.dateFormat(params.row.addTime))
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
              this.modal = true
              this.src = 'http://buy.jihui88.com/#/qrcode?orderId=' + params.row.orderId
            }
          }
        }, '支付')
      ])
    }
  }
}
</script>

<style lang="css">
</style>
