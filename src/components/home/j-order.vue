<template>
  <div class="j_panel">
    <Tabs :value="tabActive" @on-click="tabChange">
      <TabPane label="消费记录" name="1">
        <div class="j_warpper">
          <OrderItem :searchData="{ page: 1, pageSize: 3 }"/>
        </div>
      </TabPane>
      <TabPane label="已购产品" name="2">
        <div class="j_warpper" v-if="tab2">
          <PurchasedItem :searchData="{ page: 1, pageSize: 3 }"/>
        </div>
      </TabPane>
      <TabPane label="我的积分" name="3">
        <div class="j_warpper" v-if="tab3">
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
      },
      tab2: false,
      tab3: false
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
    tabChange (name) {
      if (!this.tab2 && name === '2') this.tab2 = true
      if (!this.tab3 && name === '3') this.tab3 = true
    }
  }
}
</script>

<style lang="less">
</style>
