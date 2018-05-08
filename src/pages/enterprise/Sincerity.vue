<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuEnter'" :active="'sincerity'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'诚信管理'"/>
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
