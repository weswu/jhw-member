<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'shop_pay'"/>
    <Layout class="j_layout_content j_sort">
      <JHeader :title="'支付方式管理'"/>
      <Content class="sort">
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="url('/shop_pay/add')">添加支付方式</Button>
        </div>
        <DragableTable :list="list" :columns="columns" @on-update="tableUpdate"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import DragableTable from '@/components/group/j-dragable-table'
export default {
  components: {
    MenuBar,
    JHeader,
    DragableTable
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '名称', key: 'name' },
        { title: '移序', className: 'j_table_sort', key: 'sort', width: 130, render: this.editFilter },
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          description: null,
          name: '支付宝担保交易',
          sort: 2,
          enterpriseId: 'Enterp_0000000000000000000000039',
          paymentConfigType: 'offline',
          addTime: 1434361924805,
          paymentFee: 0.5,
          paymentId: 'ff8081814df4f05d014df6a20cc60010',
          updateTime: 1528425169198,
          paymentFeeType: 'fixed',
          configObject: null,
          edittingCell: {
            sort: false,
            api: 'paymentconfig',
            id: 'ff8081814df4f05d014df6a20cc60010'
          }
        }
      ]
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/paymentconfig/list?page=1&pageSize=16').then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item.edittingCell = {
              sort: false,
              api: 'paymentconfig',
              id: item.paymentId
            }
          })
          this.list = data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 上
    add () {
      this.$refs.detail.open()
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'paymentconfig', 'paymentId')
    },
    // 过滤
    editFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$router.push({path: '/shop_pay/' + params.row.paymentId})
            }
          }
        }, '修改'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', [
          h('Poptip', {
            props: {
              confirm: true,
              title: '确定要删除吗！',
              width: '170',
              placement: 'top-end'
            },
            on: {
              'on-ok': () => {
                this.$http.post('/rest/api/paymentconfig/detail/' + params.row.paymentId, qs.stringify({_method: 'DELETE'})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].paymentId === params.row.paymentId) {
                        ctx.list.splice(i, 1)
                      }
                    }
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
        ])
      ])
    }
  }
}
</script>

<style lang="less">
</style>
