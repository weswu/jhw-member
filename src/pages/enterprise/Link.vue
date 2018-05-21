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
        { title: '链接名称', render: this.nameFilter },
        { title: '链接地址', render: this.urlFilter },
        { title: '链接图片', className: 'j_table_img', render: this.imgFilter },
        { title: '排序', className: 'j_table_sort', width: 100, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/link/list?page=1&pageSize=200').then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    add () {
      this.$refs.detail.open()
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].sort
      let sortB = this.list[b].sort
      this.sortPost(this.list[a].linkId, sortB)
      this.sortPost(this.list[b].linkId, sortA)
      objA.sort = sortB
      objB.sort = sortA
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
    nameFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.name),
        h('Poptip', {
          props: {
            confirm: true,
            width: '200',
            placement: 'right'
          },
          class: {
            j_poptip_confirm_edit: true
          },
          on: {
            'on-ok': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.linkId,
                  name: params.row.name2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/link/detail/' + params.row.linkId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                  params.row.name = params.row.name2
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
              value: params.row.name,
              autofocus: true,
              placeholder: '修改标题'
            },
            on: {
              input: (val) => {
                params.row.name2 = val
              }
            }
          })
        ])
      ])
    },
    urlFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.url),
        h('Poptip', {
          props: {
            confirm: true,
            width: '200',
            placement: 'right'
          },
          class: {
            j_poptip_confirm_edit: true
          },
          on: {
            'on-ok': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.linkId,
                  url: params.row.url2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/link/detail/' + params.row.linkId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                  params.row.url = params.row.url2
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
              value: params.row.url,
              autofocus: true,
              placeholder: '修改链接地址'
            },
            on: {
              input: (val) => {
                params.row.url2 = val
              }
            }
          })
        ])
      ])
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
            src: 'http://img.jihui88.com/' + this.picUrl(params.row.image, 4)
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
