<template>
  <Layout class="j_layout_content">
    <JHeader :title="'已购产品'"/>
    <Item/>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import Item from '@/pages/cost/PurchasedItem'
export default {
  components: {
    JHeader,
    Item
  }
}
</script>

<style lang="less">
</style>
