<template>
  <Layout class="ivu-layout-has-sider j_pc">
    <MenuBar :data="'menuWord'" :active="'update'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'更新日志'" ></JHeader>
      <Content>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Website from '@/components/pc/website'
export default {
  components: {
    MenuBar,
    JHeader,
    Website
  },
  data () {
    return {
      list: [
        {
          pic: 'https://ccdn.goodq.top/caches/2d2bd038d43e773a454cbb4ae76768fb/aHR0cHM6Ly93d3cucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE4LzA4L2JjZWNmOWRkZGRhZDZhMTFjODAzMGIwZDg4OTI2M2VlLTI0MHgxNjAuanBn.jpg',
          title: '系统升级日志: V4.92',
          time: '2018.08.30',
          desc: 'V4.92功能改进介绍'
        }
      ],
      searchData: {
        page: 1,
        pageSize: 5
      }
    }
  }
}
</script>

<style lang="less">

</style>
