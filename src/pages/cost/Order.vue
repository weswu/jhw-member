<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuCost'" :active="'cost_order'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'订单记录'"/>
      <Content>
        <div class="j_buy_loading" v-if="loading">
          加载中...
        </div>
        <iframe src="http://buy.jihui88.com/#/member/order" class="j_buy_iframe" style="height:600px;" v-show="!loading"/>
      </Content>
    </Layout>
    <JCostOrderDetail ref="order"/>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JCostOrderDetail from '@/components/group/j-cost-order-detail'
export default {
  components: {
    MenuBar,
    JHeader,
    JCostOrderDetail
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.page === 'order') {
        ctx.$refs.order.open('detail/' + data.id)
      }
      if (data.loading === '1') {
        ctx.loading = false
      }
    }, false)
  }
}
</script>

<style lang="less">
</style>
