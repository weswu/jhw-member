<template>
  <Layout class="ivu-layout-has-sider j_company">
    <MenuBar :data="'menuEnter'" :active="'company'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'公司简介'" :lan="true"/>
      <Content>
        <UE :content='user.enterprise.edesc' ref='ue' style="z-index: 1;position: relative;"></UE>
      </Content>
      <Footer>
        <Button type="primary" @click="submit">保存</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import UE from '@/components/group/j-editor'
export default {
  components: {
    MenuBar,
    JHeader,
    UE
  },
  computed: {
    ...mapState({
      'user': state => state.user
    })
  },
  data () {
    return {}
  },
  methods: {
    submit () {
      this.user.enterprise.edesc = this.$refs.ue.getUEContent().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
      let data = {
        model: JSON.stringify(this.user.enterprise),
        _method: 'put'
      }
      this.$http.post('/rest/api/enterprise/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.$store.commit('serUser', this.user)
        } else {
          this.$Message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
