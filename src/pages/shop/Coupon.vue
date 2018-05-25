<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'coupon'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'营销管理'"/>
      <Content>
        更新中..
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">

</style>
