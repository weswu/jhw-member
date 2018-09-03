<template>
  <Layout class="ivu-layout-has-sider j_news_detail">
    <MenuBar :data="'menu_shop_pay_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text"/>
      <Content>
        <Form :model="detail" :label-width="130" :rules="rules" ref="modalForm" :hidden="active !== '0'">
          <FormItem label="支付方式名称：" prop="name">
            <Input v-model="detail.name" placeholder="请输入支付方式名称"></Input>
          </FormItem>
          <FormItem label="支付类型：">
            <Select v-model="detail.paymentConfigType" class="w144 border">
              <Option :value="item.value" v-for="item in payType" :key="item.value">{{item.text}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付手续费设置：" v-if="detail.paymentConfigType !== 'custom'">
            <RadioGroup v-model="detail.paymentFeeType">
              <Radio label="scale">按比例收费</Radio>
              <Radio label="fixed">固定手续费</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="费率/费用：" v-if="detail.paymentConfigType !== 'custom'">
            <InputNumber v-model="detail.paymentFee"></InputNumber>
          </FormItem>

          <div v-if="detail.paymentConfigType === 'alipay'">
            <hr/>
            <FormItem label="支付宝类型：" >
              <RadioGroup v-model="detail.configObject.tenpayType">
                <Radio label="direct">即时交易</Radio>
                <Radio label="partnerMaterial">担保交易</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="支付宝账号：">
              <Input v-model="detail.configObject.account" placeholder="请输入支付宝账号"></Input>
            </FormItem>
            <FormItem label="支付宝商户号：">
              <Input v-model="detail.configObject.bargainorId" placeholder="请输入支付宝商户号"></Input>
            </FormItem>
            <FormItem label="支付宝密钥：">
              <Input v-model="detail.configObject.key" placeholder="请输入支付宝密钥"></Input>
            </FormItem>
            <div class="j_form_title">手机网站支付 - RSA(SHA1) ：
              <a href="https://openhome.alipay.com/platform/home.htm" target="_blank" class="a_underline">点击设置</a>
            </div>
            <FormItem label="应用APPID：">
              <Input v-model="detail.configObject.mAppId" placeholder="请输入应用APPID"></Input>
            </FormItem>
            <FormItem label="应用密钥：">
              <Input v-model="detail.configObject.mSecretKey" :maxlength="250" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入应用密钥"></Input>
            </FormItem>
          </div>
          <div v-if="detail.paymentConfigType === 'wxpay'">
            <hr/>
            <FormItem label="微信appid：">
              <Input v-model="detail.configObject.appid" placeholder="请输入微信appid"></Input>
            </FormItem>
            <FormItem label="应用密钥：">
              <Input v-model="detail.configObject.key" placeholder="请输入应用密钥"></Input>
            </FormItem>
            <FormItem label="微信商户号：">
              <Input v-model="detail.configObject.bargainorId" placeholder="请输入微信商户号"></Input>
            </FormItem>
            <FormItem label="api密钥：">
              <Input v-model="detail.configObject.appsecret" placeholder="请输入api密钥"></Input>
            </FormItem>
            <FormItem label="扫码支付回调链接：">
              <Input v-model="detail.configObject.qrcodeUrl" placeholder="请输入回调链接"></Input><br/>
              设置指引：进入商户平台-->产品中心-->开发配置， 设置扫码支付回调链接：http://www.jihui88.com/rest/pay/qrcode_notify_wx
            </FormItem>
          </div>

          <FormItem label="排序：">
            <InputNumber v-model="detail.author"></InputNumber>
          </FormItem>
        </Form>
        <UE :content='detail.description' ref='ue' :hidden="active !== '1'"></UE>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit('modalForm')">保存</Button>
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
  data () {
    return {
      active: '0',
      detail: {},
      rules: {
        name: [
          { required: true, message: '支付方式名称不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '新闻分类不能为空', trigger: 'blur' }
        ]
      },
      payType: [
        { text: '预存款', value: 'deposit' },
        { text: '线下支付', value: 'offline' },
        { text: '支付宝', value: 'alipay' },
        { text: '微信支付', value: 'wxpay' },
        { text: '自定义支付', value: 'custom' }
      ]
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_shop_pay_detail
    })
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      if (this.$route.params.id === 'add') {
        this.detail = {
          paymentConfigType: 'deposit',
          paymentFeeType: 'scale',
          configObject: {}
        }
      } else {
        this.$http.get('/rest/api/paymentconfig/detail/' + this.$route.params.id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
          }
        })
      }
    },
    // 功能
    activeChange (e) {
      this.active = e
    },
    // 提交
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.detail.description = this.$refs.ue.getUEContent()
          let data = {
            model: JSON.stringify(Object.assign(this.detail, this.detail.configObject))
          }
          let url = ''
          if (this.detail.paymentId) {
            url = '/' + this.detail.paymentId
            data._method = 'put'
          }
          this.$http.post('/rest/api/paymentconfig/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
