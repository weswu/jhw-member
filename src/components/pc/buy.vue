<template>
  <Modal class-name="j_buy_modal"
    title="企业建站选购"
    v-model="modal" width="800"
    @on-cancel="cancel">
      <div class="j_buy_iframe" v-if="showQrCode">
        <iframe :src="src" scrolling="no"/>
      </div>
      <Form ref="modal" :model="detail" :label-width="110" v-if="!showQrCode">
        <FormItem label="建站版本：">
          <RadioGroup v-model="detail.version" @on-change="priceChange">
            <Radio :label="item.value" v-for="item in versionType" :key="item.value">{{item.text}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="版本说明：">
          <div class="content">
            <span v-if="detail.version === '297e2669600191860160021b8fcc007f'">自选模板可以套选免费的模板（不包含付费模板），不包含域名</span>
            <span v-if="detail.version === '2c9080ce60f7b2650160f7c2e3910025'">设计师一对一定制设计；特有SEO模块，网站上线最快次日收录</span>
            <span v-if="detail.version === '2c9080ce60f7b2650160f7c40283002d'">众多外贸网站制作经验，高级设计师一对一定制设计</span>
            <span v-if="detail.version === '2c9080ce60f7b2650160f7c3327f0028'">策划师一对一梳理网站卖点，高级设计师一对一定制设计，网站做到满意为止</span>
            <span v-if="detail.version === '2c9080ce60f7b2650160f7c495fd0033'">功能丰富-积分换购、会员等级、限时秒杀、在线交易、多种支付方式等</span>
            <span v-if="detail.version === '2c9080ce60f7b2650160f7c448650030'">首席设计师一对一定制设计，网站做到满意为止</span>
          </div>
        </FormItem>
        <FormItem label="版本价格：">
          <RadioGroup v-model="detail.versionPrice">
            <Radio label="01"><span class="price">{{detail.price}}</span>元/<span v-if="detail.price !== 600">首</span>年
              <span v-if="detail.price !== 600">2580元/续费</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="使用年限：">
          <InputNumber v-model="detail.year" :min="1" placeholder="请输入使用年限" style="width: 80px"></InputNumber><span class="j_unit">年</span>
        </FormItem>
        <FormItem label="总金额：">
          <span class="totalPrice"><span>￥</span>{{totalPrice}}</span>
        </FormItem>
        <Button class="orange" size="large" @click="submit">立即购买</Button>
      </Form>
      <div slot="footer">
        <div class="footer" v-if="!showQrCode">
          <Form :label-width="110">
            <FormItem label="温馨提示：">
              <span class="content">
                购买任一建站版本，我们都将协助您办理域名备案手续。
              </span>
              <span class="content_right">
                <span>VIP</span>高端网站定制 <a :href="'http://buy.jihui88.com/#/?tab=tab1&layoutId=' + id" target="_blank" class="a_underline">详情></a>
              </span>
            </FormItem>
          </Form>
        </div>
      </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    verName: {}
  },
  data () {
    return {
      modal: false,
      src: '',
      showQrCode: false,
      id: '',
      detail: {
        version: '297e2669600191860160021b8fcc007f',
        versionPrice: '01',
        price: 600,
        year: 1
      }
    }
  },
  computed: {
    ...mapState({
      versionType: state => state.status.versionType
    }),
    totalPrice () {
      let price = 0
      let vm = this
      if (this.detail.version === '297e2669600191860160021b8fcc007f') {
        price = this.detail.price * this.detail.year
      } else {
        this.versionType.forEach(item => {
          if (vm.detail.version === item.value) {
            if (item.text === vm.verName) {
              price = 2580 * vm.detail.year
            } else {
              price = item.price + 2580 * (vm.detail.year - 1)
            }
          }
        })
      }
      return price
    }
  },
  mounted () {
    var vm = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.success) {
        if (data.outTradeNo) {
          vm.$Message.success('支付成功')
          vm.$emit('on-change')
          vm.modal = false
        }
        vm.cancel()
      } else {
        data.msg && vm.$Message.error(data.msg)
      }
    }, false)
  },
  methods: {
    open (id) {
      this.id = id
      this.modal = true
      this.showQrCode = false
      this.src = 'http://buy.jihui88.com/#/qrcode?layoutId=' + this.id
    },
    cancel () {
      if (this.showQrCode) {
        this.$root.$emit('eventBusName')
      }
      this.showQrCode = false
      this.modal = false
    },
    priceChange (e) {
      let vm = this
      this.detail.version = e
      this.versionType.forEach(item => {
        if (item.value === e) {
          vm.detail.price = item.price
        }
      })
    },
    submit () {
      this.showQrCode = true
      this.src = 'http://buy.jihui88.com/#/qrcode?back=1&ids=' + this.detail.version + '&layoutId=' + this.id + '&year=' + this.detail.year
    }
  }
}
</script>

<style lang="less">
.j_buy_modal{
  z-index: 1060 !important;
  .j_buy_iframe{
    height: 420px;
  }
  .ivu-modal-body form{
    padding: 25px 0 35px 0;
    .price{
      color: #ff6700;
      font-size: 16px;
      font-weight: bold;
      margin-left: 0;
      margin-right: 5px;
    }
    .ivu-radio-inner{
      font-family: "iconfont" !important;
      font-size: 9px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #fff;
      width: 17px;
      height: 17px;margin-right: 5px;
      &::after{
        content: "\e647";
        background-color: #34b34a;
        border-radius: 8px;
        width: 11px;
        height: 11px;
        padding: 2px 0 0 2px;
        transform: scale(0.75);
      }
    }
    .ivu-radio-checked .ivu-radio-inner{
      border-color: #34b34a;
      background: #34b34a;
    }
    button{
      margin: 15px auto 0 auto;
      display: block;
      width: 205px;
    }
    .totalPrice{
      font-size: 16px;
      color: #ff6700;
      font-weight: bold;
      span{
        font-size: 12px
      }
    }
  }
  .content{
    color: #a5a5a5;float: left;
  }
  .content_right{
    span{
      color: #ff6700
    }
    a{
      color: #afafaf;
      margin-left: 12px;
    }
  }
  .ivu-modal-content .ivu-modal-footer{
    padding: 0;
    .footer{
      background: #fff;
      border-top: 1px solid #e4e4e4;
      padding: 21px 18px;
    }
  }
}
</style>
