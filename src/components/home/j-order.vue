<template>
  <div class="j_panel">
    <Tabs :value="tabActive">
        <TabPane label="消费记录" name="1">
          <div class="j_warpper">
            <iframe src="http://buy.jihui88.com/#/member/order?size=5" class="j_buy_iframe"/>
          </div>
        </TabPane>
        <TabPane label="已购产品" name="2">
          <div style="padding: 0 28px;">
            已购产品
          </div>
        </TabPane>
        <TabPane label="我的积分和权益" name="3">
          <div style="padding: 0 28px;">
            我的积分和权益
          </div>
        </TabPane>
    </Tabs>
    <JCostOrderDetail ref="order"/>
  </div>
</template>

<script>
import JCostOrderDetail from '@/components/group/j-cost-order-detail'
export default {
  components: {
    JCostOrderDetail
  },
  data () {
    return {
      tabActive: '1'
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
.j_warpper{
  padding: 12px 28px 0 28px;
  height: 376px;
}
</style>
