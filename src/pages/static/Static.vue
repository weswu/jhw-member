<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuStatic'" :active="'static'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'站点数据管理'"/>
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
  },
  methods: {}
}
</script>

<style lang="less">
</style>
