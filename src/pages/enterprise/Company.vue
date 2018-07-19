<template>
  <Layout class="ivu-layout-has-sider j_company">
    <MenuBar :data="'menuEnter'" :active="'company'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'公司简介'" :lan="true" @on-enterprise="change"/>
      <Content>
        <UE :content='user.enterprise.edesc' ref='ue'></UE>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">保存</Button>
      </Footer>
    </Layout>
  </Layout>
</template>
<script>
// import Iconfont from 'http://at.alicdn.com/t/font_594793_25yayd6j51n.js'
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
    ...mapState(['user'])
  },
  methods: {
    change () {
      this.$refs.ue.setUEContent(this.user.enterprise.edesc)
    },
    submit () {
      this.user.enterprise.edesc = this.$refs.ue.getUEContent()
      let data = {
        model: JSON.stringify(this.user.enterprise),
        _method: 'put'
      }
      this.$http.post('/rest/api/enterprise/detail/' + this.user.enterprise.enterpriseId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.$store.commit('serUser', this.user)
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
