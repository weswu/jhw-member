<template>
  <Layout class="j_layout ivu-layout-has-sider j_static">
    <MenuBar :data="'menuStatic'" :active="'third_party_statistics'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'第三方统计'" :tip="aaaaa"/>
      <Content>
        内容
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
