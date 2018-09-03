<template>
  <Layout class="ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'shop_config'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'商品相关配置'"/>
      <Content>
        <Form :model="detail" :label-width="130">
          <!-- 1 -->
          <div class="j_form_title" style="padding-top: 20px;">产品价格登录后可见：</div>
          <FormItem label="PC网站：">
            <RadioGroup v-model="detail.priceDisplayAfterLoginPc">
              <Radio label="01">启用</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="手机网站：">
            <RadioGroup v-model="detail.priceDisplayAfterLoginMobile">
              <Radio label="01">启用</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <!-- 2 -->
          <div class="j_form_title">产品价格登隐藏：</div>
          <FormItem label="PC网站：">
            <RadioGroup v-model="detail.priceDisplayPc">
              <Radio label="01">显示</Radio>
              <Radio label="00">隐藏</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="手机网站：">
            <RadioGroup v-model="detail.priceDisplayMobile">
              <Radio label="01">显示</Radio>
              <Radio label="00">隐藏</Radio>
            </RadioGroup>
          </FormItem>
          <!-- 3 -->
          <div class="j_form_title">市场价格登隐藏：</div>
          <FormItem label="PC网站：">
            <RadioGroup v-model="detail.marketPriceDisplayPc">
              <Radio label="01">显示</Radio>
              <Radio label="00">隐藏</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="手机网站：">
            <RadioGroup v-model="detail.marketPriceDisplayMobile">
              <Radio label="01">显示</Radio>
              <Radio label="00">隐藏</Radio>
            </RadioGroup>
          </FormItem>
          <!-- 4 -->
          <div class="j_form_title">产品隐藏：</div>
          <FormItem label="PC网站：">
            已选择{{pcCont}}件商品 <span class="a_underline" @click="selectProduct('1')">选择商品</span>
          </FormItem>
          <FormItem label="手机网站：">
            已选择{{mobileCont}}件商品 <span class="a_underline" @click="selectProduct('2')">选择商品</span>
          </FormItem>
          <!-- 5 -->
          <div class="j_form_title">开具发票：</div>
          <FormItem label="PC网站：">
            <RadioGroup v-model="detail.billState">
              <Radio label="01">显示</Radio>
              <Radio label="00">隐藏</Radio>
            </RadioGroup>
            <FormItem label="最低金额：" v-if="detail.billState === '01'">
              <InputNumber v-model="detail.billRate"></InputNumber><span class="j_unit">%</span>
            </FormItem>
          </FormItem>
          <!-- 6 -->
          <div class="j_form_title">满多少包邮：</div>
          <FormItem label="是否启用：">
            <RadioGroup v-model="detail.pinkageState">
              <Radio label="01">开启</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="最低金额：" v-if="detail.pinkageState === '01'">
            <InputNumber v-model="detail.pinkageMoney"></InputNumber><span class="j_unit">元</span>
          </FormItem>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">保存</Button>
      </Footer>
    </Layout>
    <SelectProduct ref="select" @on-change="idsChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import SelectProduct from '@/components/product/select-product'
export default {
  components: {
    MenuBar,
    JHeader,
    SelectProduct
  },
  data () {
    return {
      detail: {
        productHidePc: 'Product_000000000000000000581124'
      },
      type: '',
      pcCont: '',
      mobileCont: ''
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
          this.count()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    count () {
      this.pcCont = !this.detail.productHidePc ? 0 : this.detail.productHidePc.split(',').length
      this.mobileCont = !this.detail.productHideMobile ? 0 : this.detail.productHideMobile.split(',').length
    },
    selectProduct (type) {
      this.type = type
      let ids = ''
      if (type === '1') {
        ids = this.detail.productHidePc
      } else {
        ids = this.detail.productHideMobile
      }
      this.$refs.select.open(ids)
    },
    idsChange (ids) {
      if (this.type === '1') {
        this.detail.productHidePc = ids
      } else {
        this.detail.productHideMobile = ids
      }
      this.count()
    },
    submit () {
      let data = {
        model: JSON.stringify(this.detail),
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
