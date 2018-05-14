<template>
  <Layout class="j_layout ivu-layout-has-sider j_category">
    <MenuBar :data="'menu_' + $route.params.id" :active="'category/' + $route.params.id"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'分类管理'" :lan="true" @on-change="get"/>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加{{$route.params.id === 'product' ?'产品':'新闻'}}分类</Button>
        </div>
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange">
        </Table>
      </Content>
      <div class="j_pagination fixed border">
        <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
        <Button size="small" @click="delAll">删除</Button>
        <Button size="small" @click="update">显示</Button>
        <Button size="small" @click="update">隐藏</Button>
        <Button size="small" @click="categoryAll">转换分类</Button>
        <Button size="small">展开</Button>
        <Button size="small">折叠</Button>
      </div>
    </Layout>
    <SeoDetail ref="seoDetail"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Sortable from 'sortablejs'
import SeoDetail from '@/pages/static/SeoDetail'
export default {
  components: {
    MenuBar,
    JHeader,
    SeoDetail
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '分类名称', className: 'j_table_title', minWidth: 200, render: this.nameFilter },
        { title: '是否显示', width: 105, render: this.displayFilter },
        { title: '移序', className: 'j_table_sort', width: 130, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate }
      ],
      list: [],
      ids: '',
      toggle: false
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
          ctx.sortable(e.oldIndex, e.newIndex)
        }
      })
    }, 2000)
  },
  created () {
    this.get()
    if (this.$route.params.id === 'product') {
      let col1 = { title: '分类图片', width: 105, render: this.imgFilter }
      let col2 = { title: '分类描述', width: 105, render: this.descFilter }
      this.columns.splice(3, 0, col2)
      this.columns.splice(3, 0, col1)
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/category/' + this.$route.params.id + '?pageSize=1000').then(res => {
        if (res.success) {
          this.init(res.attributes.data)
        }
      })
    },
    init (data) {
      // 1级
      data.forEach(item => {
        if (!item.belongId) {
          item._checked = false
          item.sonCate = []
          item.grade = '1'
          this.list.push(item)
        }
      })
      // 2级
      this.list.forEach(item => {
        data.forEach(row => {
          if (row.belongId === item.categoryId) {
            row._checked = false
            row.sonCate = []
            row.grade = '2'
            item.sonCate.push(row)
          }
        })
      })
      // 3级
      this.list.forEach(item => {
        item.sonCate.forEach(son => {
          data.forEach(row => {
            if (row.belongId === son.categoryId) {
              row._checked = false
              row.sonCate = []
              row.grade = '3'
              son.sonCate.push(row)
            }
          })
        })
      })
      // ok
      var ctx = this
      this.list.forEach((item, index) => {
        item.sonCate && item.sonCate.forEach(son => {
          ctx.list.splice(index + 1, 0, son)
        })
      })
    },
    // 功能
    add () {
      this.$router.push({ path: '/news/add' })
    },
    update () {
      this.$Message.info('update')
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].sort
      let sortB = this.list[b].sort
      this.sortPost(this.list[a].categoryId, sortB)
      this.sortPost(this.list[b].categoryId, sortA)
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
      this.$http.post('/rest/api/category/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          console.log(sort)
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.categoryId
        } else {
          this.ids = this.ids + ',' + item.categoryId
        }
      })
    },
    handleSelectAll () {
      this.$refs.selection.selectAll(this.toggle)
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      var ctx = this
      this.$http.post('/rest/api/news/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.ids.split(',').forEach(id => {
            ctx.list.forEach((item, index) => {
              if (id === item.newsId) {
                ctx.list.splice(index, 1)
              }
            })
          })
          this.ids = ''
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    categoryAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$refs.transferCategory.open()
    },
    // 过滤
    indexFilter (h, params) {
      return h('div', [
        h('i', {
          class: {
            iconfont: true,
            'icon-xialajiantou': !params.row.belongId && params.row.sonCate.length > 0
          },
          style: {
            color: '#000',
            display: 'block'
          }
        })
      ])
    },
    nameFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          class: {
            iconfont: true,
            'icon-xialajiantou': params.row.sonCate.length > 0
          },
          style: {
            padding: '0 10px',
            display: params.row.grade !== '1' ? 'block' : 'none'
          }
        }),
        h('span', {
          style: {
            padding: '0 16px',
            display: params.row.grade === '3' ? 'block' : 'none'
          }
        }),
        h('Input', {
          props: {
            value: params.row.name
          },
          on: {
            input: (val) => {
              params.row.name2 = val
            },
            'on-blur': () => {
              if (params.row.name2 !== '' && params.row.name2 !== params.row.name) {
                params.row.name = params.row.name2
                let data = {
                  model: JSON.stringify({
                    id: params.row.categoryId,
                    name: params.row.name
                  }),
                  _method: 'put'
                }
                this.$http.post('/rest/api/category/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('修改成功')
                  } else {
                    ctx.$Message.error(res.msg)
                  }
                })
              }
            }
          }
        }, [
          h('i', {
            class: {
              'iconfont': true,
              'icon-tupian': true
            }
          })
        ])
      ])
    },
    imgFilter (h, params) {
      return h('div', {
        style: {
          width: '32px',
          height: '32px',
          lineHeight: '32px',
          textAlign: 'center',
          background: '#f5f6fa',
          border: '1px solid #d5d5d5'
        },
        on: {
          click: () => {
            this.$Message.info('更新中')
          }
        }
      }, [
        h('i', {
          class: {
            'iconfont': true,
            'icon-tupian': true
          },
          style: {
            padding: '0',
            display: 'block'
          }
        })
      ])
    },
    descFilter (h, params) {
      return h('i', {
        class: {
          'iconfont': true,
          'icon-bianji2': true
        },
        style: {
          display: 'block'
        },
        on: {
          click: () => {
            this.$Message.info('更新中')
          }
        }
      })
    },
    displayFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.isdisplay === '1' ? '是' : '否'),
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
                  return h('Select', {
                    props: {
                      value: params.row.isdisplay,
                      placeholder: '是否上架'
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.isdisplay2 = val
                      }
                    }
                  }, [
                    h('Option', {
                      props: {
                        value: '1'
                      }
                    }, '是'),
                    h('Option', {
                      props: {
                        value: '0'
                      }
                    }, '否')
                  ])
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.categoryId,
                      display: params.row.isdisplay2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/news/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].display = params.row.isdisplay2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        })
      ])
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
                      id: params.row.categoryId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/category/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
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
                if (params.index < this.list.length - 1) {
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
              this.$Message.success('更新中..')
            }
          }
        }, '修改'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.seoDetail.open(params.row.categoryId, 'cate_' + this.$route.params.id)
            }
          }
        }, 'SEO'),
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
                this.$http.delete('/rest/api/category/detail/' + params.row.categoryId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].categoryId === params.row.categoryId) {
                        ctx.list.splice(i, 1)
                      }
                    }
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
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
.j_category .ivu-table-body{
  height: calc(100vh - 251px);
}
.j_category .ivu-table-wrapper .ivu-table .ivu-table-body .ivu-table-row .ivu-table-cell .iconfont{
  font-size: 8px
}
.j_category .ivu-table td{
   height: 50px
 }
</style>
