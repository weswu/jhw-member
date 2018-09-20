<template>
  <Layout class="ivu-layout-has-sider">
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="title"/>
      <Content>
        <ItemDetail :type="type"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import ItemDetail from '@/pages/enterprise/ItemDetail'
export default {
  props: ['title'],
  components: {
    JHeader,
    ItemDetail
  },
  data () {
    return {
      type: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      let route = this.$route.path.split('/')[1]
      if (route === 'link') {
        this.title = '友情链接'
        this.type = '01'
      } else if (route === 'partner') {
        this.title = '合作伙伴'
        this.type = '02'
      } else if (route === 'team_intro') {
        this.title = '团队介绍'
        this.type = '03'
      }
    }
  }
}
</script>

<style lang="less">
</style>
