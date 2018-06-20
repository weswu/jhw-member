<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'shop_refund'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'商品退货管理'"/>
      <Content>
        <Table :columns="columns" :data="list" class="sort"/>
        <JPagination :total="total" :searchData='searchData' @on-change="get"/>
      </Content>
    </Layout>
    <Detail ref="detail" @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/components/shop/refund-detail.vue'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '手机号码', width: 105, key: 'mobile' },
        { title: '退货类型', width: 85, render: this.typeFilter },
        { title: '退货状态', width: 85, render: this.stateFilter },
        { title: '申请时间', width: 135, render: this.dataFilter },
        { title: '退货原因', render: this.buyerReasonFilter },
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      total: 0
    }
  },
  computed: {
    ...mapState({
      disputeType: state => state.status.disputeType,
      disputeState: state => state.status.disputeState
    })
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/orderDispute/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // search
    search () {
      this.searchData.page = 1
      this.get()
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    typeFilter (h, params) {
      let html = ''
      this.disputeType.forEach(item => {
        if (item.value === params.row.type) {
          html = item.text
        }
      })
      return h('div', {
        domProps: {
          innerHTML: html
        }
      })
    },
    stateFilter (h, params) {
      let html = ''
      this.disputeState.forEach(item => {
        if (item.value === params.row.state) {
          html = item.html
        }
      })
      return h('div', {
        domProps: {
          innerHTML: html
        }
      })
    },
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime || 'yyyy-MM-dd hh:mm')
      return h('div', format)
    },
    buyerReasonFilter (h, params) {
      return h('span', {
        attrs: {
          title: params.row.buyerReason
        }
      }, params.row.buyerReason)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.disputeId)
            }
          }
        }, '处理'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', [
          h('Poptip', {
            props: {
              confirm: true,
              title: '确定要删除吗！',
              width: '170',
              placement: 'top-end'
            },
            on: {
              'on-ok': () => {
                this.$http.post('/rest/api/orderDispute/detail/' + params.row.disputeId, qs.stringify({_method: 'DELETE'})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.list.splice(params.index, 1)
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
              },
              'on-cancel': () => {
                console.log('cancel')
              }
            }
          }, '删除')
        ])
      ])
    }
  }
}
</script>

<style lang="less">
</style>
