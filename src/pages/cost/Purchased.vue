<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuCost'" :active="'cost_purchased'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'已购产品'"/>
      <Item/>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Item from '@/pages/cost/PurchasedItem'
export default {
  components: {
    MenuBar,
    JHeader,
    Item
  }
}
</script>

<style lang="less">
</style>
