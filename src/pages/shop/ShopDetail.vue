<template>
  <Layout class="ivu-layout-has-sider j_shop_detail">
    <MenuBar :data="'menu_shop_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text"/>
      <Content>
        <div id="delivery" hidden>
          <div class="express_board" style="position: relative;">
            <div
              v-for="(item, index) in billList" :key="index"
              :style="'position: absolute; left: '+ item.left+ '; top: '+ item.top +'; height: 27px;line-height: 27px;padding: 0 10px;'">{{item.text}}</div>
          </div>
        </div>
        <div id="print_shopping" hidden>
          <div class="shopping_receipt" style="width: 200px;line-height: 2;font-size: 13px;color: #000;font-family:'微软雅黑','宋体';">
            <div style="overflow:hidden;">
              <span style="font-size: 14px;">商品清单:</span>
              <div style="border-bottom: 1px dashed #666;height: 0;width: 100%;"></div>
              <div class="item-list" style="overflow:hidden;">
                <div style="overflow:hidden;width: 100%">
                  <div style="width:48%;display:inline-block;float:left;">商品名称</div>
                  <div style="width:32%;display:inline-block;float:left;">单价*数量</div>
                  <div style="width:20%;display:inline-block;float:left;">价格</div>
                </div>
                <div style="overflow:hidden;width: 100%" v-for="item in detail.orderItemSet" :key="item.itemId">
                  <div style="width:48%;display:inline-block;float:left;">{{item.productName}}</div>
                  <div style="width:32%;display:inline-block;float:left;">{{item.product.price*item.productQuantity}}</div>
                  <div style="width:20%;display:inline-block;float:left;">{{item.productPrice}}</div>
                </div>
              </div>
              <div style="border-bottom: 1px dashed #666;height: 0;width: 100%;"></div>
              <div style="overflow:hidden;">
                <Form :model="detail" :label-width="82">
                  <Detail :detail="detail"/>
                </Form>
                <span style="float: left;padding-right: 5px">订单编号：{{detail.orderSn}}</span><br/>
                <span style="float: left;padding-right: 5px">下单时间：{{detail.addTime}}</span><br/>
                <span style="float: left;padding-right: 5px">订单总金额：<span class="red">￥{{detail.productTotalPrice || 0}}元</span></span>
              </div>
              <div class="customer-info" style="overflow:hidden;">
                <span class="shipName">客户：{{detail.shipName}}<br/></span>
                <span class="email">E-mail：{{detail.memberObj.email}}<br/></span>
                <span class="shipPhone">电话：{{detail.shipPhone}}<br/></span>
                <span class="shipMobile">手机：{{detail.shipMobile}}<br/></span>
                <span class="shipArea">收货地区：{{detail.shipArea}}<br/></span>
                <span class="shipAddress">地址：{{detail.shipAddress}}</span>
              </div>
              <div style="border-bottom: 1px dashed #666;height: 0;width: 100%;"></div>
              <div style="overflow:hidden;">
                打印时间：{{time}}
                <div style="overflow:hidden;">
                  <span style="float: left">商品数：{{count}}</span>
                  <span style="float: right;">总数：{{detail.productTotalQuantity}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="print" hidden>
          <Form :model="detail" :label-width="75" style="width:590px;">
            <Detail :detail="detail"/>
            <div class="span12" style="width:290px;float: left;">
              <FormItem label="订单编号：">
                {{detail.orderSn}}
              </FormItem>
              <FormItem label="配送方式：">
                {{detail.deliveryType.name}}
              </FormItem>
              <FormItem label="商品重量：">
                {{detail.productWeight}}{{detail.productWeightUnit}}
              </FormItem>
              <FormItem label="收货人：">
                {{detail.shipName}}
              </FormItem>
              <FormItem label="E-mail：">
                {{detail.memberObj.email}}
              </FormItem>
              <FormItem label="收货地址：">
                {{detail.shipAddress}}
              </FormItem>
            </div>
            <div class="span12" style="width:290px;float: left;">
              <FormItem label="商品金额：">
                <span class="red">￥{{detail.productTotalPrice || 0}}元</span>
              </FormItem>
              <FormItem label="配送费用：">
                {{detail.deliveryFee}}
              </FormItem>
              <FormItem label="下单时间：">
                {{detail.addTime}}
              </FormItem>
              <FormItem label="联系电话：">
                {{detail.shipPhone}}
              </FormItem>
              <FormItem label="收货地区：">
                {{detail.shipArea}}
              </FormItem>
            </div>
            <OrderItemSet :print="true" :data="detail.orderItemSet" class="clear"/>
          </Form>
        </div>
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
              <FormItem label="配送费用：">
                {{detail.deliveryFee}}
              </FormItem>
              <FormItem label="商品重量：">
                {{detail.productWeight}}{{detail.productWeightUnit}}
              </FormItem>
              <FormItem label="收货人姓名：">
                {{detail.shipName}}
              </FormItem>
              <FormItem label="收货地址：">
                {{detail.shipAddress}}
              </FormItem>
              <FormItem label="电话：">
                {{detail.shipPhone}}
              </FormItem>
              <FormItem label="用户名：">
                {{detail.shipName}}
              </FormItem>
              <FormItem label="预存款余额：">
                {{detail.memberObj.deposit}}
              </FormItem>
              <FormItem label="E-mail：">
                {{detail.memberObj.email}}
              </FormItem>
            </div>
            <div class="span12">
              <FormItem label="下单时间：">
                {{detail.addTime}}
              </FormItem>
              <FormItem label="订单总金额：">
                <span class="red">￥{{detail.totalAmount || 0}}元</span>
              </FormItem>
              <FormItem label="使用积分：">
                {{detail.memberPoint}}
              </FormItem>
              <FormItem label="支付方式：">
                {{detail.paymentConfig.name}}
              </FormItem>
              <FormItem label="支付手续费：">
                {{detail.paymentFee}}
              </FormItem>
              <FormItem label="附言：">
                {{detail.memo}}
              </FormItem>
              <FormItem label="收货地区：">
                {{detail.shipArea}}
              </FormItem>
              <FormItem label="邮编：">
                {{detail.shipZipCode}}
              </FormItem>
              <FormItem label="手机：">
                {{detail.shipMobile}}
              </FormItem>
              <FormItem label="会员等级：">
                {{detail.memberObj.memberRank.name}}
              </FormItem>
              <FormItem label="最后登录IP：">
                {{detail.memberObj.loginIp}}
              </FormItem>
              <FormItem label="积分：">
                {{detail.memberObj.memberRank.point}}
              </FormItem>
            </div>
          </div>
          <OrderItemSet :data="detail.orderItemSet" :hidden="active !== '1'"/>
          <div :hidden="active !== '2'" style="max-width: 1000px;">
            <div class="span12">
              <FormItem label="订单编号：">{{detail.orderSn}}</FormItem>
              <FormItem label="商品总金额：">{{detail.totalAmount}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="下单时间：">{{detail.addTime}}</FormItem>
              <FormItem label="已付金额：">{{detail.paidAmount}}</FormItem>
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
              <FormItem label="付款金额：">
                <Input v-model="payment.totalAmount"></Input>
              </FormItem>
              <FormItem label="收款单备注：">
                <Input v-model="payment.memo"></Input>
              </FormItem>
            </div>
            <div class="span12">
              <FormItem label="收款账号：">
                <Input v-model="payment.bankAccount"></Input>
              </FormItem>
              <FormItem label="支付方式：">
                <Select v-model="payment.paymentId" class="w144 border">
                  <Option :value="item.paymentId" v-for="item in paymentconfig" :key="item.paymentId">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="付款人：">
                <Input v-model="payment.payer"></Input>
              </FormItem>
            </div>
          </div>
          <!-- 订单支付 -->
          <div :hidden="active !== '3'" style="max-width: 1000px;">
            <div class="span12">
              <FormItem label="订单编号：">{{detail.orderSn}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="下单时间：">{{detail.addTime}}</FormItem>
            </div>
            <div class="span12">
              <FormItem label="配送方式：">
                <Select v-model="shippingSet.deliveryType.typeId" class="w144 border">
                  <Option :value="item.typeId" v-for="item in deliverytype" :key="item.typeId">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="物流公司：">
                <Select v-model="shippingSet.deliveryCorpName" class="w144 border" filterable>
                  <Option :value="item.name" v-for="item in deliverycorp" :key="item.corpId">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="物流费用：">
                <Input v-model="shippingSet.totalAmount"></Input>
              </FormItem>
              <FormItem label="收货人姓名：">
                <Input v-model="shippingSet.shipName"></Input>
              </FormItem>
              <FormItem label="收货地址：">
                <Input v-model="shippingSet.shipAddress"></Input>
              </FormItem>
              <FormItem label="电话：">
                <Input v-model="shippingSet.shipPhone"></Input>
              </FormItem>
            </div>
            <div class="span12">
              <FormItem label="配送费用："> <span class="red">￥0元</span> </FormItem>
              <FormItem label="物流编号/图片：">
                <Input v-model="shippingSet.deliverySn" style="max-width:262px;"></Input>
                <JUpload :multiple="false" @on-success="handleSuccess" style="display: inline-block;">
                  <span slot="content">
                    <a class="a_underline j_unit">上传图片</a>
                  </span>
                </JUpload>
              </FormItem>
              <FormItem label="收货地区：">
                <Cascader :data="areaList" v-model="address"></Cascader>
              </FormItem>
              <FormItem label="邮编：">
                <Input v-model="shippingSet.shipZipCode"></Input>
              </FormItem>
              <FormItem label="手机：">
                <Input v-model="shippingSet.shipMobile"></Input>
              </FormItem>
              <FormItem label="发货备注：">
                <Input v-model="shippingSet.memo"></Input>
              </FormItem>
            </div>
            <Table :columns="columns" :data="shipping.orderItemSet" class="clear"/>
          </div>
          <PaymentSet :data="detail.paymentSet" :hidden="active !== '4'"/>
          <ShippingSet :data="detail.shippingSet" :hidden="active !== '5'"/>
          <OrderLogSet :data="detail.orderLogSet" :hidden="active !== '6'"/>
        </Form>
      </Content>
      <Footer v-if="active === '0'||active === '2'||active === '3'">
        <Button type="primary" size="small" @click="print('print')" v-if="active === '0'">打印</Button>
        <Button type="primary" size="small" @click="print('print_shopping')" v-if="active === '0'">打印(小)</Button>
        <Button type="primary" size="small" @click="shippingSave" v-if="active === '2'"
          :disabled="detail.orderStatus === 'completed' || detail.orderStatus === 'invalid' || detail.paymentStatus === 'paid' ||
           detail.paymentStatus === 'partRefund' || detail.paymentStatus === 'refunded'">保存</Button>
        <!-- 订单发货 -->
        <div v-if="active === '3'">
          <Button type="primary" size="small" @click="deliverySnEdit"
            v-if="detail.orderStatus !== 'completed' && detail.orderStatus !== 'invalid' && detail.shippingStatus !== 'shipped'">发货</Button>
          <Button type="primary" size="small" @click="deliverySnEdit"
            v-if="detail.orderStatus !== 'completed' && detail.orderStatus !== 'invalid' && detail.shippingStatus === 'shipped'">修改</Button>
          <Button type="primary" size="small" @click="deliveryCompleted"
            v-if="detail.orderStatus === 'processed' && detail.shippingStatus === 'shipped'">订单完成</Button>
          <Button type="primary" size="small" @click="printDelivery">打印物流单据</Button>
        </div>
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
import JUpload from '@/components/group/j-upload'
import OrderItemSet from '@/components/shopDetail/orderItemSet'
import PaymentSet from '@/components/shopDetail/paymentSet'
import ShippingSet from '@/components/shopDetail/shippingSet'
import OrderLogSet from '@/components/shopDetail/orderLogSet'
export default {
  components: {
    MenuBar,
    JHeader,
    Detail,
    JUpload,
    OrderItemSet,
    PaymentSet,
    ShippingSet,
    OrderLogSet
  },
  data () {
    return {
      detail: {
        deliveryType: {},
        memberObj: {
          memberRank: {}
        },
        paymentConfig: {}
      },
      // 1.订单支付
      shipping: {},
      payment: {},
      // 支付方式-列表
      paymentconfig: [],
      // 2.发货
      shippingSet: {
        deliveryType: {}
      },
      // 配送方式和物流公司-列表
      deliverytype: [],
      deliverycorp: [],
      address: [],
      billList: {},
      // 常用数据
      active: '0',
      count: '1',
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
        { title: '已发货数', key: 'deliveryQuantity' },
        { title: '本次发货数', key: 'totalDeliveryQuantity' }
      ]
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_shop_detail,
      paymentType: state => state.status.paymentType,
      areaList: state => state.areaList,
      user: state => state.user
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
      this.time = this.dateFormat(new Date())
      this.$http.get('/rest/api/orderShipping/detail/' + this.$route.params.id).then(res => {
        if (res.success) {
          let data = res.attributes.data
          this.shipping = data
          // 订单支付-数据
          this.payment = data.paymentSet[0] || {}
          if (!this.payment.totalAmount) {
            this.payment.totalAmount = data.totalAmount
          }
          this.payment.paymentId = data.paymentConfig.paymentId
          // 物流-数据
          this.shippingSet = data.shippingSet[0] || {deliveryType: {}}
          if (this.shippingSet.deliveryType === null) {
            this.shippingSet.deliveryType = {
              typeId: data.deliveryType ? data.deliveryType.typeId : ''
            }
          }
          this.address = this.shippingSet.shipAreaPath ? this.shippingSet.shipAreaPath.split(',') : []
          this.count = data.orderItemSet.length || 0
        }
      })
    },
    // 支付方式-列表
    getPaymentconfig () {
      this.$http.get('/rest/api/paymentconfig/list').then(res => {
        if (res.success) {
          this.paymentconfig = res.attributes.data
        }
      })
    },
    // 配送方式和物流公司-列表
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
    handleSuccess (res) {
      this.shippingSet.deliverySn = res.src
    },
    print (e) {
      let print = document.getElementById(e)
      let newContent = print.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
    },
    // 订单支付-保存
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
    // ------------------- 订单发货 -----------------
    // 物流-保存
    deliverySnEdit () {
      let data = {
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
      }
      this.$http.post('/rest/api/orderShipping/deliverySnEdit', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    deliveryCompleted () {
      this.$http.post('/rest/api/order/completed/' + this.id).then(res => {
        if (res.success) {
          this.$Message.success(res.msg || '订单完成')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 打印物流单据
    printDelivery () {
      var ctx = this
      if (!this.shippingSet.deliveryCorpName) {
        return this.$Message.info('请选择物流公司')
      }
      if (this.shippingSet.deliveryCorpName.indexOf('ff') > -1) {
        return this.$Notice.error({
          title: '该物流公司没有配置单据!',
          desc: '<a href="#/shop_bill">前往设置</a>'
        })
      }
      this.$http.get('/rest/api/deliverycorpSingle/detail/byCorpId/' + encodeURIComponent(this.shippingSet.deliveryCorpName)).then(res => {
        if (res.success) {
          if (res.attributes && res.attributes.data && res.attributes.data.length === 0) {
            if (!res.msg) {
              this.$Notice.error({
                title: '该物流公司没有配置物流单据!',
                desc: '<a href="#/shop_bill">前往设置</a>'
              })
            } else {
              this.$Message.info(res.msg)
            }
            return false
          }
          // 打印
          this.billList = JSON.parse(res.attributes.data[0].dcontent)
          let shipAddressList = ''
          let shipAreaPath = this.detail.shipAreaPath.split(',')
          shipAreaPath.forEach(area => {
            ctx.areaList.forEach(item => {
              if (area === item.areaId) {
                shipAddressList += (item.name + ',')
              }
            })
          })
          let productNameList = ''
          this.detail.orderItemSet.forEach((item, index) => {
            if (index !== 0) { productNameList += '、' }
            productNameList += item.productName
          })
          this.billList.forEach(item => {
            if (item.value === 'fname') { item.text = ctx.user.enterprise.name }
            if (item.value === 'fphone') { item.text = !ctx.user.phone ? this.user.cellphone : this.user.phone }
            if (item.value === 'faddress') { item.text = ctx.user.address }
            if (item.value === 'rname') { item.text = ctx.detail.shipName }
            if (item.value === 'rmobile') { item.text = ctx.detail.shipMobile }
            if (item.value === 'rphone') { item.text = ctx.detail.shipPhone }
            if (item.value === 'raddressCategory1') { item.text = shipAddressList.split(',')[0] }
            if (item.value === 'raddressCategory2') { item.text = shipAddressList.split(',')[1] }
            if (item.value === 'raddressCategory3') { item.text = !shipAddressList.split(',')[2] ? '' : shipAddressList.split(',')[2] }
            if (item.value === 'raddress') { item.text = ctx.detail.shipAddress }
            if (item.value === 'rcode') { item.text = ctx.detail.shipZipCode }
            if (item.value === 'productName') { item.text = productNameList }
          })
          setTimeout(function () {
            ctx.print('delivery')
          }, 100)
        } else {
          this.$Notice.error({
            title: '该物流公司没有配置物流单据!',
            desc: '<a href="#/shop_bill">前往设置</a>'
          })
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
  .shopping_receipt .ivu-form{
    .ivu-form-item{
      margin-bottom: 0
    }
    .ivu-form-item-label{
      font-size: 14px;
      color: #000;padding: 10px 12px 0 0;
    }
  }
}
</style>
