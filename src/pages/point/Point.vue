<template>
  <Layout class="j_layout_content">
    <JHeader :title="'积分列表'" :count="count"/>
    <PointTable @on-count="countInit"/>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import PointTable from '@/pages/point/PointTable'
export default {
  components: {
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
