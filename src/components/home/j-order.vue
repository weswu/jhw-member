<template>
  <div class="j_panel">
    <Tabs :value="tabActive">
      <TabPane label="消费记录" name="1">
        <div class="j_warpper">
          <iframe src="http://buy.jihui88.com/#/member/order?size=5" class="j_buy_iframe"/>
        </div>
      </TabPane>
      <TabPane label="已购产品" name="2">
        <div class="j_warpper">
          <iframe src="http://buy.jihui88.com/#/member/purchased?size=5" class="j_buy_iframe"/>
        </div>
      </TabPane>
      <TabPane label="我的积分" name="3">
        <div class="j_warpper">
          <PointTable :searchData="searchData"/>
        </div>
      </TabPane>
    </Tabs>
    <JCostOrderDetail ref="order"/>
  </div>
</template>

<script>
import JCostOrderDetail from '@/components/group/j-cost-order-detail'
import PointTable from '@/pages/point/PointTable'
export default {
  components: {
    JCostOrderDetail,
    PointTable
  },
  data () {
    return {
      tabActive: '1',
      searchData: {
        page: 1,
        pageSize: 3
      }
    }
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.page === 'order') {
        ctx.$refs.order.open('detail/' + data.id)
      }
    }, false)
  },
  methods: {
    handleTabRemove (name) {
      this['tabActive'] = name
    }
  }
}
</script>

<style lang="less">
</style>
