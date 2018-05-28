<template>
  <Layout class="j_layout ivu-layout-has-sider j_member_attr">
    <MenuBar :data="'menuMember'" :active="'member_attr'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'会员属性配置'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加会员属性</Button>
        </div>
        <Table :columns="columns" :data="list"/>
      </Content>
    </Layout>
    <Detail ref='detail' @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/pages/member/AttrDetail'
import Sortable from 'sortablejs'
export default {
  components: {
    MenuBar,
    JHeader,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '名称', key: 'name' },
        { title: '类型', render: this.typeFilter },
        { title: '是否必填', render: this.isRequiredFilter },
        { title: '是否启用', render: this.isEnabledFilter },
        { title: '移序', className: 'j_table_sort', render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: this.$store.state.memberAttrList
    }
  },
  computed: {
    ...mapState({
      memberAttrList: state => state.status.memberAttrList
    })
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
          ctx.sortable(e.oldIndex, e.newIndex)
        }
      })
    }, 2000)
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('getMemberAttr')
    },
    // 上
    add () {
      this.$refs.detail.open()
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].sort
      let sortB = this.list[b].sort
      this.sortPost(this.list[a].attId, sortB)
      this.sortPost(this.list[b].attId, sortA)
      objA.sort = sortB
      objB.sort = sortA
      this.list[a] = objB
      this.list[b] = objA
    },
    sortPost (id, sort) {
      let data = {
        model: JSON.stringify({
          id: id,
          sort: sort
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/member/attr/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          console.log(sort)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 过滤
    typeFilter (h, params) {
      let text = '文本'
      this.memberAttrList.forEach(item => {
        if (item.value === params.row.attributeType) {
          text = item.text
        }
      })
      return h('span', text)
    },
    isRequiredFilter (h, params) {
      return h('span', {
        class: {
          whether: true,
          iconfont: true,
          'icon-x': params.row.isRequired === '00',
          'icon-gou': params.row.isRequired === '01'
        }
      })
    },
    isEnabledFilter (h, params) {
      return h('span', {
        class: {
          whether: true,
          iconfont: true,
          'icon-x': params.row.isEnabled === '00',
          'icon-gou': params.row.isEnabled === '01'
        }
      })
    },
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
                      id: params.row.attId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/member/attr/detail/' + params.row.attId, qs.stringify(data)).then((res) => {
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
                  this.sortable(params.index, params.index - 1)
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
                  this.sortable(params.index, params.index + 1)
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
              this.$refs.detail.open(params.row.attId)
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
                this.$http.post('/rest/api/member/attr/detail/' + params.row.attId, qs.stringify({_method: 'DELETE'})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].attId === params.row.attId) {
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
.j_member_attr .ivu-table td{
   height: 64px
 }
</style>
