<template>
  <Layout class="ivu-layout-has-sider j_shop_detail">
    <MenuBar :data="'menu_coupon_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'优惠券' + menuBarList.menu[active].text"/>
      <Content>
        <Form :model="detail" :label-width="130" :rules="rules" ref="modalForm">
          <div :hidden="active !== '0'">
            <FormItem label="优惠券名称：" prop="name">
              <Input v-model="detail.name" placeholder="请输入优惠券名称"></Input>
            </FormItem>
            <FormItem label="发放总量：" prop="count">
              <InputNumber v-model="detail.count"></InputNumber>
            </FormItem>
            <FormItem label="面值：" prop="amount">
              <InputNumber v-model="detail.amount"></InputNumber>
              <span style="padding: 0 5px;" v-if="israndom">至</span>
              <InputNumber v-model="detail.amountend" v-if="israndom"></InputNumber>
              <span class="j_unit">元&nbsp;&nbsp;&nbsp;<Checkbox v-model="israndom">随机</Checkbox></span>
            </FormItem>
            <FormItem label="使用门槛：">
              <RadioGroup v-model="detail.thresholdtype">
                <Radio label="01">不限制</Radio>
                <Radio label="00">满</Radio>
              </RadioGroup>
              <InputNumber v-model="detail.threshold"></InputNumber>
              <span class="j_unit">元可使用</span>
            </FormItem>
            <FormItem label="封面图片:">
              <JImage :src="detail.pic" @on-change="picChange" :width="40"/> <span class="a_underline j_unit" @click="clear">清除</span>
            </FormItem>
            <FormItem label="封面颜色:">
              <RadioGroup v-model="detail.theme" class="theme">
                <Radio label="1" style="background: #f30;color: #f30">1</Radio>
                <Radio label="2" style="background: #f90;color: #f90">2</Radio>
                <Radio label="3" style="background: #96f;color: #96f">3</Radio>
                <Radio label="4" style="background: #6c6;color: #6c6">4</Radio>
                <Radio label="5" style="background: #BCBCBC;color: #BCBCBC">5</Radio>
              </RadioGroup>
              <div class="j_tip" style="max-width:310px;">
                说明：当封面图片为空时，输出系统默认的封面颜色
              </div>
            </FormItem>
          </div>
          <div :hidden="active !== '1'">
            <FormItem label="会员等级：">
              <Select v-model="detail.memberrankId" class="w144 border">
                <Option value="0">
                  所有会员等级
                </Option>
                <Option v-for="item in memberRankList" :value="item.rankId" :key="item.rankId">
                  {{item.name}}
                </Option>
              </Select>
              <span class="j_unit">可领取</span>
            </FormItem>
            <FormItem label="每人限领：">
              <Select v-model="detail.quantity" class="w144 border" :label-in-value="true">
                <Option :value="item.value" v-for="item in items" :key="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
            <FormItem label="生效时间：">
              <DatePicker type="datetime" placeholder="生效时间" v-model="detail.beginTime" @on-change="detail.beginTime=$event"></DatePicker>
            </FormItem>
            <FormItem label="结束时间：">
              <DatePicker type="datetime" placeholder="结束时间" v-model="detail.endTime" @on-change="detail.endTime=$event"></DatePicker>
            </FormItem>
            <FormItem label="可使用商品:">
              <RadioGroup v-model="detail.scopeType" @on-change="typeChange">
                <Radio label="01">所有商品</Radio>
                <Radio label="02">指定产品</Radio>
                <Radio label="03">指定分类</Radio>
              </RadioGroup>
              <br/>
              <table class="j_table" style="width:300px" v-if="detail.scopeType === '02'">
                <thead>
                  <tr>
                    <th style=" line-height: 20px;">商品名称 <span style="float: right;">操作</span> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div v-for="(item, index) in detail.productList" :key="item.productId">
                        <span class="ellipsis" style="width: 90%;float:left;max-width: 290px">{{item.name}}</span>
                        <span class="a_normal" @click="del(index, item.productId)">删除</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span class="a_normal" @click="add" v-if="detail.scopeType === '02'">+添加商品</span>
              <!-- 优化分类 -->
              <Select v-model="detail.scope" class="product_category_list w180" v-if="detail.scopeType === '03'">
                <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId" v-if="item._checked" :class="'item' + item.grade">
                  <span>{{item.name}}</span>
                  <i class="iconfont icon-xialajiantou" v-if="item.isroot && !item._selected" @click.stop="changeCateList($event, item)"></i>
                  <i class="iconfont icon-xialajiantou rotate" v-if="item.isroot && item._selected" @click.stop="changeCateList($event, item)"></i>
                </Option>
              </Select>
            </FormItem>
          </div>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit('modalForm')">保存</Button>
      </Footer>
    </Layout>
    <SelectProduct ref="select" :title="'添加商品'" :ids="this.detail.scope" :type="'select'" @on-select="proChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JImage from '@/components/group/j-image'
import SelectProduct from '@/components/product/select-product'
export default {
  components: {
    MenuBar,
    JHeader,
    JImage,
    SelectProduct
  },
  data () {
    return {
      active: '0',
      detail: {},
      israndom: false,
      rules: {
        name: [
          { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
        ],
        count: [
          { required: true, type: 'number', message: '发放总量不能为空', trigger: 'blur' }
        ],
        amount: [
          { required: true, type: 'number', message: '面值不能为空', trigger: 'blur' }
        ]
      },
      items: [
        {value: 0, text: '不限张'},
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'},
        {value: 4, text: '4'},
        {value: 5, text: '5'},
        {value: 10, text: '10'}
      ]
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_coupon_detail,
      memberRankList: state => state.memberRankList,
      categoryList: state => state.productCategory
    })
  },
  created () {
    this.get()
    if (this.memberRankList.length === 0) {
      this.$store.dispatch('getMemberRank')
    }
  },
  methods: {
    get () {
      if (this.$route.params.id === 'add') {
        this.detail = {
          name: '优惠券',
          count: 1,
          amount: 1,
          israndom: '02', // 不随机
          thresholdtype: '01', // 不限制
          theme: '2', // orange色
          quantity: 0, // 不限张
          scopeType: '01', // 全部产品
          memberrankId: '0',
          beginTime: new Date(),
          endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
        }
      } else {
        let id = this.decodeId(this.$route.params.id, 'Coupon_', 32)
        this.$http.get('/rest/api/coupon/detail/' + id).then(res => {
          if (res.success) {
            let data = res.attributes.data
            if (data.israndom !== '02') {
              this.israndom = true
            }
            data.beginTime = new Date(data.beginTime)
            data.endTime = new Date(data.endTime)
            this.detail = data
            if (data.scopeType === '03' || this.categoryList.length === 0) {
              this.$store.dispatch('getCategory', 'product')
            }
          }
        })
      }
    },
    // 功能
    activeChange (e) {
      this.active = e
    },
    picChange (e) {
      this.detail.pic = e.src
    },
    clear () {
      this.detail.pic = null
    },
    // 商品规格
    del (index, id) {
      this.detail.productList.splice(index, 1)
      let ids = this.detail.scope.split(',')
      this.detail.scope = ids.splice(index, 1).join()
    },
    add () {
      this.$refs.select.open()
    },
    proChange (item) {
      if (!this.detail.productList) {
        this.detail.productList = []
      }
      this.detail.productList.push(item)
      if (this.detail.scope.split('Category_').length === 2 || !this.detail.scope) {
        this.detail.scope = item.productId
      } else {
        this.detail.scope = this.detail.scope + ',' + item.productId
      }
    },
    typeChange (e) {
      if (e === '03') {
        if (this.categoryList.length === 0) {
          this.$store.dispatch('getCategory', 'product')
        }
      }
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 属性
          let detail = this.detail
          this.israndom ? detail.israndom = '01' : detail.israndom = '02'
          let data = {
            model: JSON.stringify(detail)
          }
          let url = ''
          if (this.detail.couponId) {
            url = '/' + this.detail.couponId
            data._method = 'put'
          }
          this.$http.post('/rest/api/coupon/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success(res.msg || '保存成功')
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
.theme {
  .ivu-radio-wrapper{
    width: 32px;height: 32px;
    &.ivu-radio-wrapper-checked{
      border: 2px solid rgba(0, 0, 0, 0.3)
    }
  }
  .ivu-radio-inner{
    display: none;
  }
}
</style>
