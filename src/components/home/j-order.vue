<template>
  <div class="j_panel">
    <Tabs :value="tabActive">
      <TabPane label="消费记录" name="1">
        <div class="j_warpper">
          <OrderItem :searchData="{ page: 1, pageSize: 3 }"/>
        </div>
      </TabPane>
      <TabPane label="已购产品" name="2">
        <div class="j_warpper">
          <PurchasedItem :searchData="{ page: 1, pageSize: 3 }"/>
        </div>
      </TabPane>
      <TabPane label="我的积分" name="3">
        <div class="j_warpper">
          <PointTable :searchData="searchData"/>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import PointTable from '@/pages/point/PointTable'
import OrderItem from '@/pages/cost/OrderItem'
import PurchasedItem from '@/pages/cost/PurchasedItem'
export default {
  components: {
    PointTable,
    OrderItem,
    PurchasedItem
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
