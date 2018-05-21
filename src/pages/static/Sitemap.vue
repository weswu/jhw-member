<template>
  <Layout class="j_layout ivu-layout-has-sider j_static">
    <MenuBar :data="'menuStatic'" :active="'sitemap'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'Sitemap生成'" :website="true" @on-static="staticChange"/>
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
  methods: {
    staticChange () {}
  }
}
</script>

<style lang="less">
</style>
