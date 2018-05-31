<template>
  <Layout class="ivu-layout-has-sider j_shop_detail">
    <MenuBar :data="'menu_shop_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text"/>
      <Content>
        <Form :model="detail" :label-width="130" ref="modalForm">
          <div :hidden="active !== '0'">
            <Detail :detail="detail"/>
            <div class="span12">
              <FormItem label="订单编号：">
                {{detail.orderSn}}
              </FormItem>
              <FormItem label="商品总金额：">
                <span class="red">￥{{detail.productTotalPrice || 0}}元</span>
              </FormItem>
              <FormItem label="积分抵扣：">
                <span class="red">￥{{detail.integralMoney || 0}}元</span>
              </FormItem>
              <FormItem label="配送方式：">
                {{detail.deliveryType.name}}
              </FormItem>
              <FormItem label="配送费用:">
                {{detail.deliveryFee}}
              </FormItem>
              <FormItem label="商品重量:">
                {{detail.productWeight}}{{detail.productWeightUnit}}
              </FormItem>
              <FormItem label="收货人姓名:">
                {{detail.shipName}}
              </FormItem>
              <FormItem label="收货地址:">
                {{detail.shipAddress}}
              </FormItem>
              <FormItem label="电话:">
                {{detail.shipPhone}}
              </FormItem>
              <FormItem label="用户名:">
                {{detail.shipName}}
              </FormItem>
              <FormItem label="预存款余额:">
                {{detail.memberObj.deposit}}
              </FormItem>
              <FormItem label="E-mail:">
                {{detail.memberObj.email}}
              </FormItem>
            </div>
            <div class="span12">
              <FormItem label="下单时间:">
                {{detail.addTime}}
              </FormItem>
              <FormItem label="订单总金额:">
                <span class="red">￥{{detail.totalAmount || 0}}元</span>
              </FormItem>
              <FormItem label="使用积分:">
                {{detail.memberPoint}}
              </FormItem>
              <FormItem label="支付方式:">
                {{detail.paymentConfig.name}}
              </FormItem>
              <FormItem label="支付手续费:">
                {{detail.paymentFee}}
              </FormItem>
              <FormItem label="附言:">
                {{detail.memo}}
              </FormItem>
              <FormItem label="收货地区:">
                {{detail.shipArea}}
              </FormItem>
              <FormItem label="邮编:">
                {{detail.shipZipCode}}
              </FormItem>
              <FormItem label="手机:">
                {{detail.shipMobile}}
              </FormItem>
              <FormItem label="会员等级:">
                {{detail.memberObj.memberRank.name}}
              </FormItem>
              <FormItem label="最后登录IP:">
                {{detail.memberObj.loginIp}}
              </FormItem>
              <FormItem label="积分:">
                {{detail.memberObj.memberRank.point}}
              </FormItem>
            </div>
          </div>
          <OrderItemSet :data="detail.orderItemSet" :hidden="active !== '1'"/>
          <div :hidden="active !== '2'">
            <div class="span12">
              <FormItem label="订单编号：">{{detail.orderSn}}</FormItem>
              <FormItem label="商品总金额：">{{detail.totalAmount}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="下单时间:">{{detail.addTime}}</FormItem>
              <FormItem label="已付金额:">{{detail.paidAmount}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="收款银行：">
                <Input v-model="payment.bankName"></Input>
              </FormItem>
              <FormItem label="支付类型：">
                <Select v-model="payment.paymentType" class="w144 border">
                  <Option :value="item.value" v-for="item in paymentType" :key="item.value">{{item.text}}</Option>
                </Select>
              </FormItem>
              <FormItem label="付款金额:">
                <Input v-model="payment.totalAmount"></Input>
              </FormItem>
              <FormItem label="收款单备注:">
                <Input v-model="payment.memo"></Input>
              </FormItem>
            </div>
            <div class="span12">
              <FormItem label="收款账号:">
                <Input v-model="payment.bankAccount"></Input>
              </FormItem>
              <FormItem label="支付方式:">
                <Select v-model="payment.paymentId" class="w144 border">
                  <Option :value="item.paymentId" v-for="item in paymentconfig" :key="item.paymentId">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="付款人:">
                <Input v-model="payment.payer"></Input>
              </FormItem>
            </div>
          </div>
          <div :hidden="active !== '3'">
            <div class="span12">
              <FormItem label="订单编号：">{{detail.orderSn}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="下单时间:">{{detail.addTime}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="配送方式：">
                <Select v-model="shippingSet.deliveryType.typeId" class="w144 border">
                  <Option :value="item.typeId" v-for="item in deliverytype" :key="item.typeId">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="物流公司：">
                <Select v-model="shippingSet.deliveryCorpName" class="w144 border">
                  <Option :value="item.name" v-for="item in deliverycorp" :key="item.corpId">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="物流费用:">
                <Input v-model="shippingSet.totalAmount"></Input>
              </FormItem>
              <FormItem label="收货人姓名:">
                <Input v-model="shippingSet.shipName"></Input>
              </FormItem>
              <FormItem label="收货地址:">
                <Input v-model="shippingSet.shipAddress"></Input>
              </FormItem>
              <FormItem label="电话:">
                <Input v-model="shippingSet.shipPhone"></Input>
              </FormItem>
            </div>
            <div class="span12">
              <FormItem label="配送费用:"> <span class="red">￥0元</span> </FormItem>
              <FormItem label="物流编号/图片:">
                <Input v-model="shippingSet.deliverySn"></Input>
              </FormItem>
              <FormItem label="收货地区:">
                <Cascader :data="areaList" v-model="address" style="width: 450px;"></Cascader>
              </FormItem>
              <FormItem label="邮编:">
                <Input v-model="shippingSet.shipZipCode"></Input>
              </FormItem>
              <FormItem label="手机:">
                <Input v-model="shippingSet.shipMobile"></Input>
              </FormItem>
              <FormItem label="发货备注:">
                <Input v-model="shippingSet.memo"></Input>
              </FormItem>
            </div>
            <Table :columns="columns" :data="shipping.orderItemSet"/>
          </div>
          <PaymentSet :data="detail.paymentSet" :hidden="active !== '4'"/>
          <ShippingSet :data="detail.shippingSet" :hidden="active !== '5'"/>
          <OrderLogSet :data="detail.orderLogSet" :hidden="active !== '6'"/>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" v-if="active === '0'">打印</Button>
        <Button type="primary" size="small" v-if="active === '0'">打印(小)</Button>
        <Button type="primary" size="small" @click="shippingSave" v-if="active === '2'">保存</Button>
        <Button type="primary" size="small" @click="printDelivery" v-if="active === '3'">打印物流单据</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/components/shopDetail/detail'
import OrderItemSet from '@/components/shopDetail/orderItemSet'
import PaymentSet from '@/components/shopDetail/paymentSet'
import ShippingSet from '@/components/shopDetail/shippingSet'
import OrderLogSet from '@/components/shopDetail/orderLogSet'
export default {
  components: {
    MenuBar,
    JHeader,
    Detail,
    OrderItemSet,
    PaymentSet,
    ShippingSet,
    OrderLogSet
  },
  data () {
    return {
      active: '2',
      detail: {
        deliveryType: {},
        memberObj: {
          memberRank: {}
        },
        paymentConfig: {}
      },
      // 订单支付
      shipping: {},
      payment: {},
      paymentconfig: [],
      // 发货
      shippingSet: {
        deliveryType: {}
      },
      deliverytype: [],
      deliverycorp: [],
      address: [],
      columns: [
        { title: '货号', key: 'productSn' },
        { title: '商品名称', ellipsis: true, key: 'productName' },
        {
          title: '商品规格',
          ellipsis: true,
          render: (h, params) => {
            return h('span', {
              attrs: {
                title: params.row.productAttr
              }
            }, params.row.productAttr)
          }
        },
        { title: '购买数量', key: 'productQuantity' },
        { title: '已发货数', key: 'totalDeliveryQuantity' },
        { title: '本次发货数', key: 'productQuantity' }
      ]
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_shop_detail,
      paymentType: state => state.status.paymentType,
      areaList: state => state.areaList
    })
  },
  created () {
    this.get()
    // 处理
    this.getShipping()
    this.getPaymentconfig()
    // 物流
    this.getDeliverytype()
    this.getDeliverycorp()
    if (this.areaList.length === 0) {
      this.$store.dispatch('getAreaList')
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/order/detail/' + this.$route.params.id).then(res => {
        if (res.success) {
          this.detail = res.attributes.data
        }
      })
    },
    getShipping () {
      this.$http.get('/rest/api/orderShipping/detail/' + this.$route.params.id).then(res => {
        if (res.success) {
          let data = res.attributes.data
          this.shipping = data
          // 处理数据
          this.payment.totalAmount = data.totalAmount
          this.payment = data.paymentSet[0]
          this.payment.paymentId = data.paymentConfig.paymentId
          this.shippingSet = data.shippingSet[0]
          this.address = this.shippingSet.shipAreaPath.split(',')
        }
      })
    },
    getPaymentconfig () {
      this.$http.get('/rest/api/paymentconfig/list').then(res => {
        if (res.success) {
          this.paymentconfig = res.attributes.data
        }
      })
    },
    getDeliverytype () {
      this.$http.get('/rest/api/deliverytype/list').then(res => {
        if (res.success) {
          this.deliverytype = res.attributes.data
        }
      })
    },
    getDeliverycorp () {
      this.$http.get('/rest/api/deliverycorp/list?pageSize=500').then(res => {
        if (res.success) {
          this.deliverycorp = res.attributes.data
        }
      })
    },
    // 功能
    activeChange (e) {
      this.active = e
    },
    // 保存订单支付
    shippingSave () {
      let ship = Object.assign(this.shipping, this.payment)
      let data = {
        model: JSON.stringify(ship),
        _method: 'put'
      }
      this.$http.post('/rest/api/orderPayment/detail/' + this.shipping.orderId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 保存物流
    deliverySnEdit () {
      let data = {
        model: JSON.stringify({
          id: this.detail.orderId, // orderId
          deliverySn: this.shippingSet.deliverySn, // 物流编号
          shipAreaPath: this.address.join(), // 收货地区
          shippingName: this.shippingSet.shipName, // 收货人姓名
          shippingAddress: this.shippingSet.shipAddress, // 收货人地址
          shippingZipCode: this.shippingSet.shipZipCode, // 收货人地址
          shippingMobile: this.shippingSet.shipMobile,
          shippingMemo: this.shippingSet.memo,
          shippingCrop: this.shippingSet.deliveryCorpName,
          deliveryCorpName: this.shippingSet.deliveryCorpName
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/orderShipping/deliverySnEdit', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 打印物流单据
    printDelivery () {
      if (!this.shippingSet.deliveryCorpName) {
        return this.$Message.info('请选择物流公司')
      }
      if (this.shippingSet.deliveryCorpName.indexOf('ff') > -1) {
        return this.$Message.info('该物流公司没有配置单据!<a href="#/shop_bill">设置</a>')
      }
      this.$http.get('/rest/api/deliverycorpSingle/detail/byCorpId/' + encodeURIComponent(this.shippingSet.deliveryCorpName)).then(res => {
        if (res.success) {
          if (res.attributes && res.attributes.data && res.attributes.data.length === 0) {
            return this.$Message.info(res.msg || '该物流公司没有配置当前物流公司的单据!<a href="#/shop/logistics_single">前往设置</a>')
          } else {
            this.$Message.info('更新中')
          }
        } else {
          this.$Message.error('该物流公司没有配置当前物流公司的单据!<a href="#/shop/logistics_single">前往设置</a>')
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_shop_detail{
  .span12{
    width: 470px;
    float: left;
  }
}
</style>
