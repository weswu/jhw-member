<template>
  <Layout class="j_layout ivu-layout-has-sider j_static">
    <MenuBar :data="'menuStatic'" :active="'convenient'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'便捷登录配置'"
        :type="true" :tip="'开放平台设置：以下为开放平台申请时需所填写的数据'"
        :website="true" @on-layout="get"/>
      <Content>
        <Form :model="detail" :label-width="75">
          <FormItem label="网站地址：">
            http://pc.jihui88.com/rest/site/{{$store.state.layoutId}}/index
          </FormItem>
          <FormItem label="回调地址：">
            http://www.jihui88.com/rest/api/comm/site_oauth/oauth
          </FormItem>
          <br/>
          <div class="j_tip">
            我的网站设置：以下为填写开放平台申请后返回的AppId与密钥。
          </div>
          <FormItem label="微信登录：">
            使用条件：1.需绑定过域名<a href="#/bind">[点击查看]</a> 。2.需在微信开放平台申请一个登录应用<a href="https://open.weixin.qq.com/cgi-bin/applist" target="_blank">[前往申请]</a>
          </FormItem>
          <FormItem label="是否开启：">
            <RadioGroup v-model="detail.oauthWeixinState">
              <Radio label="01">是</Radio>
              <Radio label="00">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="微信登录应用AppId：" :label-width="130" v-if="detail.oauthWeixinState === '01'">
            <Input v-model="detail.oauthWeixinAppId" class="w244"></Input>
          </FormItem>
          <FormItem label="微信登录应用密钥：" :label-width="130" v-if="detail.oauthWeixinState === '01'">
            <Input v-model="detail.oauthWeixinSecret" class="w244"></Input>
          </FormItem>
          <br/>
          <FormItem label="QQ登录：">
            使用条件：1.需绑定过域名<a href="#/bind">[点击查看]</a> 。2.需在微信开放平台申请一个登录应用<a href="https://connect.qq.com/manage.html" target="_blank">[前往申请]</a>
          </FormItem>
          <FormItem label="是否开启：">
            <RadioGroup v-model="detail.oauthQQState">
              <Radio label="01">是</Radio>
              <Radio label="00">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="微信登录应用AppId：" :label-width="130" v-if="detail.oauthQQState === '01'">
            <Input v-model="detail.oauthQQAppId" class="w244"></Input>
          </FormItem>
          <FormItem label="微信登录应用密钥：" :label-width="130" v-if="detail.oauthQQState === '01'">
            <Input v-model="detail.oauthQQSecret" class="w244"></Input>
          </FormItem>
          <FormItem class="submit" :label-width="1">
            <Button type="primary" @click="submit">保存</Button>
          </FormItem>
        </Form>
      </Content>
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
      detail: {
        oauthWeixinState: '00',
        oauthQQState: '00'
      }
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
          oauthWeixinState: this.detail.oauthWeixinState,
          oauthWeixinAppId: this.detail.oauthWeixinAppId,
          oauthWeixinSecret: this.detail.oauthWeixinSecret,
          oauthQQState: this.detail.oauthQQState,
          oauthQQAppId: this.detail.oauthQQAppId,
          oauthQQSecret: this.detail.oauthQQSecret
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
