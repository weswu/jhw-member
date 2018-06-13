<template>
  <Layout class="j_layout ivu-layout-has-sider j_shop">
    <MenuBar :data="'menuShop'" :active="'shop'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'订单列表'"/>
      <Content>
        <div class="j_search">
          <Input v-model="searchData.orderSn" class="w180" clearable placeholder="请输入订单编号" @on-change="clearInput"></Input>
          <Button class="search" @click="search">搜索</Button>
          <Poptip placement="bottom" class="j_poptip_confirm_edit"
            confirm
            width="600"
            @on-ok="advancedSearch">
            <Button class="grey w130">高级搜索</Button>
            <div slot="title">
              <Form :model="searchData" :label-width="90">
                <FormItem label="订单编号：" class="formitem_left">
                  <Input v-model="searchData.orderSn" class="w180" clearable></Input>
                </FormItem>
                <FormItem label="用户名：" class="formitem_left">
                  <Input v-model="searchData.name" class="w180" clearable></Input>
                </FormItem>
                <FormItem label="收货人：" class="formitem_left">
                  <Input v-model="searchData.shipName" class="w180" clearable></Input>
                </FormItem>
                <FormItem label="手机号码：" class="formitem_left">
                  <Input v-model="searchData.shipMobile" class="w180" clearable></Input>
                </FormItem>
                <FormItem label="收货地址：" class="formitem_left">
                  <Input v-model="searchData.shipArea" class="w180" clearable></Input>
                </FormItem>
                <FormItem label="配送状态：" class="formitem_left">
                  <Select v-model="searchData.shippingStatus" class="w180">
                    <Option value="">请选择</Option>
                    <Option :value="item.value" v-for="item in shippingStatus" :key="item.value">{{item.text}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="付款状态：" class="formitem_left">
                  <Select v-model="searchData.paymentStatus" class="w180">
                    <Option value="">请选择</Option>
                    <Option :value="item.value" v-for="item in paymentStatus" :key="item.value">{{item.text}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="订单状态：" class="formitem_left">
                  <Select v-model="searchData.orderStatus" class="w180">
                    <Option value="">请选择</Option>
                    <Option :value="item.value" v-for="item in orderStatus" :key="item.value">{{item.text}}</Option>
                  </Select>
                </FormItem>
              </Form>
            </div>
          </Poptip>
          <span class="a_underline" style="margin-left: 20px;" @click="myShow">我的显示</span>
        </div>
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"/>
        <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
          <span slot="btn">
            <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
            <Button type="ghost" size="small" @click="delAll">删除</Button>
          </span>
        </JPagination>
      </Content>
    </Layout>
    <JDialog ref="dialog" :title="'我的显示'" :tip="'温馨提醒：勾选不要超过10个，以免列表显示不下。'" @on-ok="initCol">
      <div slot="content">
        <CheckboxGroup v-model="myShowSelect" class="j_checkout">
          <Checkbox :label="item" v-for="(item, index) in myShowList" :key="index">{{item}}</Checkbox>
        </CheckboxGroup>
      </div>
    </JDialog>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import JDialog from '@/components/group/j-dialog'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    JDialog
  },
  data () {
    return {
      // 我的显示
      myShowSelect: this.$store.state.customData.shopShow,
      myShowList: ['序号', '订单编号', '用户名', '订单总额', '订单状态', '付款状态', '配送状态', '支付方式', '配送方式', '下单时间', '来源（网站编号）'],
      columns: [],
      columns2: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '订单编号', key: 'orderSn', ellipsis: true, width: 100 },
        { title: '用户名', ellipsis: true, render: this.nameFilter },
        { title: '订单总额', render: this.totalFilter },
        { title: '订单状态', render: this.orderStatusFilter },
        { title: '付款状态', render: this.paymentStatusFilter },
        { title: '配送状态', render: this.shippingStatusFilter },
        { title: '支付方式', key: 'paymentConfigName' },
        { title: '配送方式', render: this.deliveryFilter },
        { title: '下单时间', key: 'addTime', ellipsis: true, width: 150 },
        { title: '来源（网站编号）', key: 'layoutId' }
      ],
      list: [
        {}
      ],
      searchData: {
        page: 1,
        pageSize: 10,
        orderSn: ''
      },
      total: 0,
      // 批量
      toggle: false,
      ids: ''
    }
  },
  computed: {
    ...mapState({
      paymentStatus: state => state.status.paymentStatus,
      shippingStatus: state => state.status.shippingStatus,
      orderStatus: state => state.status.orderStatus
    })
  },
  created () {
    this.get()
    this.initCol()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/order/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.list = data || []
        }
      })
    },
    // 功能
    clearInput () {
      if (this.searchData.orderSn === '') {
        this.get()
      }
    },
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        orderSn: this.searchData.orderSn
      }
      this.get()
    },
    advancedSearch () {
      this.searchData.page = 1
      this.get()
    },
    myShow () {
      this.$refs.dialog.open()
    },
    initCol () {
      var ctx = this
      this.columns = [
        { type: 'selection', className: 'j_table_checkbox', width: 44 }
      ]
      this.columns2.forEach(col => {
        this.myShowSelect.forEach(item => {
          if (item === col.title) {
            ctx.columns.push(col)
          }
        })
      })
      this.columns.push({ title: '操作', className: 'j_table_operate', width: 135, render: this.renderOperate })
      this.$store.state.customData.shopShow = this.myShowSelect
      this.$store.dispatch('SAVE_CUSTOM_DATA')
    },
    // 批量操作
    handleSelectAll () {
      this.$refs.selection.selectAll(this.toggle)
    },
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.orderId
        } else {
          this.ids = this.ids + ',' + item.orderId
        }
      })
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      var ctx = this
      this.$http.post('/rest/api/order/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.ids.split(',').forEach(id => {
            ctx.list.forEach((item, index) => {
              if (id === item.orderId) {
                ctx.list.splice(index, 1)
              }
            })
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    nameFilter (h, params) {
      return h('span', (params.row.memberObj && params.row.memberObj.name) || params.row.shipName)
    },
    totalFilter (h, params) {
      return h('span', {
        style: {
          color: '#ff7e3e'
        }
      }, '￥' + params.row.totalAmount || 0)
    },
    orderStatusFilter (h, params) {
      let html = ''
      this.orderStatus.forEach(item => {
        if (item.value === params.row.orderStatus) {
          html = item.html
        }
      })
      return h('div', {
        domProps: {
          innerHTML: html
        }
      })
    },
    paymentStatusFilter (h, params) {
      let html = ''
      this.paymentStatus.forEach(item => {
        if (item.value === params.row.paymentStatus) {
          html = item.html
        }
      })
      return h('div', {
        domProps: {
          innerHTML: html
        }
      })
    },
    shippingStatusFilter (h, params) {
      let html = ''
      this.shippingStatus.forEach(item => {
        if (item.value === params.row.shippingStatus) {
          html = item.html
        }
      })
      return h('div', {
        domProps: {
          innerHTML: html
        }
      })
    },
    deliveryFilter (h, params) {
      return h('span', params.row.shippingSet && params.row.shippingSet[0].deliveryTypeName)
    },
    renderOperate (h, params) {
      var ctx = this
      let data = [
        h('a', {
          on: {
            click: () => {
              this.$router.push({path: '/shop/' + params.row.orderId})
            }
          }
        }, params.row.orderStatus !== 'completed' && params.row.orderStatus !== 'invalid' && params.row.paymentStatus === 'unpaid' && params.row.shippingStatus === 'unshipped' ? '修改' : '查看')
      ]
      // 删除
      if (params.row.orderStatus === 'invalid' || params.row.orderStatus === 'cancel') {
        data.push(h('span', {
          class: { delimiter: true }
        }, '|'))
        data.push(h('a', [
          h('Poptip', {
            props: {
              confirm: true,
              title: '删除后不能恢复，是否删除？',
              width: '170',
              placement: 'top-end'
            },
            on: {
              'on-ok': () => {
                this.$http.post('/rest/api/order/batch/del', qs.stringify({ids: params.row.orderId})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].orderId === params.row.orderId) {
                        ctx.list.splice(i, 1)
                      }
                    }
                    ctx.total -= 1
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
              },
              'on-cancel': () => {
                console.log('cancel')
              }
            }
          }, '删除')
        ]))
      }
      // 取消订单
      if (params.row.orderStatus !== 'cancel' && params.row.orderStatus !== 'invalid' && params.row.orderStatus !== 'completed') {
        data.push(h('span', {
          class: { delimiter: true }
        }, '|'))
        data.push(h('a', {
          on: {
            click: () => {
              this.$http.post('/rest/api/order/cancel/' + params.row.orderId).then((res) => {
                if (res.success) {
                  params.row.orderStatus = 'cancel'
                } else {
                  ctx.$Message.success(res.msg)
                }
              })
            }
          }
        }, '取消订单'))
      }
      return h('div', data)
    }
  }
}
</script>

<style lang="less">
.j_shop{
  .ivu-table-body td{
    color: #5b5b5b
  }
}
</style>
