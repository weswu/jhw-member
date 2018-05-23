<template>
  <Layout class="ivu-layout-has-sider j_company">
    <MenuBar :data="'menuMember'" :active="'member_register'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'网站会员注册'"/>
      <Content>
        <Form :model="detail" :label-width="130">
          <FormItem label="PC网站注册：">
            <RadioGroup v-model="detail.memberRegisterPcDisplay">
              <Radio label="01">允许</Radio>
              <Radio label="00">不允许</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="手机网站注册：">
            <RadioGroup v-model="detail.memberRegisterMobileDisplay">
              <Radio label="01">允许</Radio>
              <Radio label="00">不允许</Radio>
            </RadioGroup>
          </FormItem>
      </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">保存</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      detail: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/webinfo/detail/id').then(res => {
        if (res.success) {
          this.detail = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    submit () {
      let data = {
        model: JSON.stringify({
          webinfoId: this.detail.webinfoId,
          enterpriseId: this.detail.enterpriseId,
          memberRegisterPcDisplay: this.detail.memberRegisterPcDisplay,
          memberRegisterMobileDisplay: this.detail.memberRegisterMobileDisplay
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/webinfo/detail/' + this.detail.webinfoId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
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
