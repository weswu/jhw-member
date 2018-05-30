<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'shop_pay'"/>
    <Layout class="j_layout_content j_sort">
      <JHeader :title="'支付方式管理'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="url('/shop_pay/add')">添加支付方式</Button>
        </div>
        <Table :columns="columns" :data="list" class="sort"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Sortable from 'sortablejs'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '名称', key: 'name' },
        { title: '移序', className: 'j_table_sort', width: 130, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate }
      ],
      list: []
    }
  },
  mounted () {
    var ctx = this
    setTimeout(function () {
      let el = document.getElementsByClassName('ivu-table-tbody')[0]
      Sortable.create(el, {
        group: {
          name: 'list',
          pull: true
        },
        animation: 120,
        onUpdate (e) {
          ctx.sortable(e.oldIndex, e.newIndex, 'paymentconfig', 'paymentId')
        }
      })
    }, 2000)
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/paymentconfig/list?page=1&pageSize=16').then((res) => {
        if (res.success) {
          this.list = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 上
    add () {
      this.$refs.detail.open()
    },
    // 过滤
    sortFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.sort),
        h('i', {
          class: {
            'none': true,
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Input', {
                    props: {
                      value: params.row.sort,
                      autofocus: true,
                      placeholder: '修改排序'
                    },
                    on: {
                      input: (val) => {
                        params.row.sort2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.paymentId,
                      sort: params.row.sort2,
                      editField: true
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/paymentconfig/detail/' + params.row.paymentId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].sort = params.row.sort2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        }),
        h('span', {
          class: {
            'j_sort': true
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-icon--': true
            },
            on: {
              click: () => {
                if (params.index > 0) {
                  this.sortable(params.index, params.index - 1, 'paymentconfig', 'paymentId')
                }
              }
            }
          }),
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-tuozhuai': true
            }
          }),
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-icon--1': true
            },
            on: {
              click: () => {
                if (params.index < this.searchData.pageSize - 1) {
                  this.sortable(params.index, params.index + 1, 'paymentconfig', 'paymentId')
                }
              }
            }
          })
        ])
      ])
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
