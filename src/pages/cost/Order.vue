<template>
  <Layout class="j_layout_content">
    <JHeader :title="'订单记录'"/>
    <Item/>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import Item from '@/pages/cost/OrderItem'
export default {
  components: {
    JHeader,
    Item
  }
}
</script>

<style lang="less">
</style>
