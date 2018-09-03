<template>
  <Layout class="j_layout ivu-layout-has-sider j_pc">
    <MenuBar :data="'menuPc'" :active="'pc_create'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'创建网站'" ></JHeader>
      <Content>
        <Create style="max-width:880px;"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Create from '@/components/pc/create'
export default {
  components: {
    MenuBar,
    JHeader,
    Create
  },
  data () {
    return {
      searchData: {
        page: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    staticChange (e) {
      // this.layoutId = e
    }
  }
}
</script>

<style lang="less">
</style>
