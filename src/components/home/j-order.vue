<template>
  <div class="j_panel j_home_cost">
    <Tabs :value="tabActive" @on-click="tabChange">
      <TabPane label="待缴费" name="1">
        <div class="j_warpper">
          <PaidItem :searchData="searchData"/>
        </div>
      </TabPane>
      <TabPane label="消费记录" name="2">
        <div class="j_warpper" v-if="tab2">
          <OrderItem :searchData="searchData"/>
        </div>
      </TabPane>
      <TabPane label="已购产品" name="3">
        <div class="j_warpper" v-if="tab3">
          <PurchasedItem :searchData="searchData"/>
        </div>
      </TabPane>
      <TabPane label="我的积分" name="4">
        <div class="j_warpper" v-if="tab4">
          <PointTable :searchData="searchData"/>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import OrderItem from '@/pages/cost/OrderItem'
import PurchasedItem from '@/pages/cost/PurchasedItem'
import PaidItem from '@/pages/cost/PaidItem'
import PointTable from '@/pages/point/PointTable'
export default {
  components: {
    OrderItem,
    PurchasedItem,
    PaidItem,
    PointTable
  },
  data () {
    return {
      tabActive: '1',
      searchData: {
        page: 1,
        pageSize: 3
      },
      tab2: false,
      tab3: false,
      tab4: false
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
      if (!this.tab4 && name === '4') this.tab4 = true
    }
  }
}
</script>

<style lang="less">
</style>
