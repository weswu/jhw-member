<template>
  <Layout class="ivu-layout-has-sider">
    <MenuBar :data="'menuPoint'" :active="'point'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'积分列表'" :count="count"/>
      <PointTable @on-count="countInit"/>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import PointTable from '@/pages/point/PointTable'
export default {
  components: {
    MenuBar,
    JHeader,
    PointTable
  },
  data () {
    return {
      count: ''
    }
  },
  methods: {
    countInit (e) {
      this.count = e
    }
  }
}
</script>

<style lang="less">
</style>
