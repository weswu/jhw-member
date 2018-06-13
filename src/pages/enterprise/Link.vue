<template>
  <Layout class="j_layout ivu-layout-has-sider j_link">
    <MenuBar :data="'menuEnter'" :active="'link'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'友情链接'" :lan="true" @on-change="get"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加友情链接</Button>
        </div>
        <Table :columns="columns" :data="list"></Table>
      </Content>
    </Layout>
    <Detail ref='detail' @on-change="detailChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/pages/enterprise/LinkDetail'
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
        { title: '链接名称', key: 'name', minWidth: 90, render: this.editFilter },
        { title: '链接地址', key: 'url', minWidth: 90, render: this.editFilter },
        { title: '链接图片', className: 'j_table_img', minWidth: 90, render: this.imgFilter },
        { title: '排序', className: 'j_table_sort', width: 100, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          name: '李五2',
          state: null,
          url: 'g.cn',
          userId: 'User_000000000000000000000000082',
          linkId: 'Link_000000000000000000000000102',
          lorder: 2,
          lanId: 1,
          image: null,
          edittingCell: {
            name: false,
            url: false,
            api: 'link',
            id: 'Link_000000000000000000000000102'
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
      this.$http.get('/rest/api/link/list?page=1&pageSize=200').then(res => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item.edittingCell = {
              name: false,
              url: false,
              api: 'link',
              id: item.jobId
            }
          })
          this.list = data
        }
      })
    },
    add () {
      this.$refs.detail.open()
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].lorder
      let sortB = this.list[b].lorder
      this.sortPost(this.list[a].linkId, sortB)
      this.sortPost(this.list[b].linkId, sortA)
      objA.lorder = sortB
      objB.lorder = sortA
      this.list[a] = objB
      this.list[b] = objA
    },
    sortPost (id, sort) {
      let data = {
        model: JSON.stringify({
          id: id,
          lorder: sort
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/link/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.get()
          console.log(sort)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    detailChange (a, b) {
      if (b === 'add') {
        this.list.push(a)
      } else {
        this.list.forEach(item => {
          if (item.linkId === a.linkId) {
            item = a
          }
        })
      }
    },
    // 过滤
    editFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    imgFilter (h, params) {
      return h('div', {
        class: {
          'product-img': true
        }
      }, [
        h('i', {
          class: {
            'iconfont': true,
            'icon-tupian': true
          },
          style: {
            fontSize: '24px',
            padding: '0',
            display: !params.row.image ? 'block' : 'none'
          }
        }),
        h('img', {
          style: {
            display: params.row.image ? 'inline-block' : 'none'
          },
          attrs: {
            src: this.$store.state.status.IMG_HOST + this.picUrl(params.row.image, 4)
          }
        })
      ])
    },
    sortFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.lorder),
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
                      value: params.row.lorder,
                      autofocus: true,
                      placeholder: '修改排序'
                    },
                    on: {
                      input: (val) => {
                        params.row.lorder2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.newsId,
                      lorder: params.row.lorder2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/link/detail/' + params.row.linkId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].lorder = params.row.lorder2
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
              this.$refs.detail.open(params.row.linkId)
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
                this.$http.delete('/rest/api/link/detail/' + params.row.linkId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].linkId === params.row.linkId) {
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
.j_link .j_table_img{
  img{
    width: 32px;
  }
}
</style>
