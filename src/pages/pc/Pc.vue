<template>
  <Layout class="j_layout_content j_pc">
    <JHeader :title="'我的网站'"></JHeader>
    <Content>
      <Website/>
    </Content>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import Website from '@/components/pc/website'
export default {
  components: {
    JHeader,
    Website
  },
  data () {
    return {
      searchData: {
        page: 1,
        pageSize: 5
      }
    }
  }
}
</script>

<style lang="less">
.j_pc .static_info{
  height: calc(100vh - 306px);
  overflow-y: auto;
}
</style>
