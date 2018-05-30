<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuEvaluate'" :detail="true" :active="'0'"  @on-change="activeChange"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'商品评价'"/>
        <Table :columns="columns" :data="list"/>
        <JPagination :fixed="true" :borderTop="true" :total="total" :searchData='searchData' @on-change="get"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '用户', key: 'name' },
        { title: '评价', ellipsis: true, render: this.contentFilter },
        { title: '回复', ellipsis: true, render: this.firstreplyFilter },
        { title: '追评', ellipsis: true, render: this.secondcontentFilter },
        { title: '追评回复', ellipsis: true, render: this.secondreplyFilter },
        { title: '评分', render: this.pointFilter },
        { title: '评价时间', width: 100, render: this.dataFilter },
        { title: '操作', className: 'j_table_operate', width: 100, render: this.renderOperate }
      ],
      active: '0',
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10,
        productId: this.$route.params.id
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/review/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    activeChange (e) {
      this.active = e
      if (e === '1') {
        this.$router.push({path: '/evaluate'})
      }
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    contentFilter (h, params) {
      return h('Poptip', {
        props: {
          placement: 'right',
          trigger: 'hover'
        }
      }, [
        h('span', params.row.content),
        h('div', {
          slot: 'content'
        }, params.row.content)
      ])
    },
    secondcontentFilter (h, params) {
      return h('Poptip', {
        props: {
          placement: 'right',
          trigger: 'hover'
        }
      }, [
        h('span', params.row.secondcontent),
        h('div', {
          slot: 'content'
        }, params.row.secondcontent)
      ])
    },
    firstreplyFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.firstreply),
        h('Poptip', {
          props: {
            confirm: true,
            width: '400',
            placement: 'right'
          },
          class: {
            j_poptip_confirm_edit: true
          },
          on: {
            'on-ok': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.reviewId,
                  firstreply: params.row.firstreply2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/review/detail/' + params.row.reviewId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('回复成功')
                  params.row.firstreply = params.row.firstreply2
                } else {
                  ctx.$Message.success(res.msg)
                }
              })
            },
            'on-cancel': () => {
              console.log('cancel')
            }
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-bianji2': true
            }
          }),
          h('Input', {
            slot: 'title',
            props: {
              value: params.row.firstreply,
              autofocus: true,
              type: 'textarea',
              placeholder: '回复'
            },
            on: {
              input: (val) => {
                params.row.firstreply2 = val
              }
            }
          })
        ])
      ])
    },
    secondreplyFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.secondreply),
        h('Poptip', {
          props: {
            confirm: true,
            width: '400',
            placement: 'right'
          },
          class: {
            j_poptip_confirm_edit: true
          },
          on: {
            'on-ok': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.reviewId,
                  secondreply: params.row.secondreply2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/review/detail/' + params.row.reviewId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('回复成功')
                  params.row.secondreply = params.row.secondreply2
                } else {
                  ctx.$Message.success(res.msg)
                }
              })
            },
            'on-cancel': () => {
              console.log('cancel')
            }
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-bianji2': true
            }
          }),
          h('Input', {
            slot: 'title',
            props: {
              value: params.row.secondreply,
              autofocus: true,
              type: 'textarea',
              placeholder: '回复'
            },
            on: {
              input: (val) => {
                params.row.secondreply2 = val
              }
            }
          })
        ])
      ])
    },
    pointFilter (h, params) {
      return h('span', params.row.point + '分')
    },
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime)
      return h('div', format)
    },
    renderOperate (h, params) {
      return h('a', {
        on: {
          click: () => {
            this.active = '0'
            this.$router.push({path: '/evaluate/' + params.row.productId})
          }
        }
      }, parseInt(params.row.productId.split('Product_')[1]))
    }
  }
}
</script>

<style lang="less">
</style>
