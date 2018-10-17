<template>
  <Layout class="j_layout_content">
    <JHeader :title="'待缴费'"/>
    <Item/>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import Item from '@/pages/cost/PaidItem'
export default {
  components: {
    JHeader,
    Item
  }
}
</script>

<style lang="less">
</style>
