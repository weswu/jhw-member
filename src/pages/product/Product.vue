<template>
  <Layout class="j_layout ivu-layout-has-sider j_product">
    <MenuBar :data="'menu_product'" :active="'product'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'产品列表'" :lan="true" @on-change="get"/>
        <div class="j_search">
          <Row :gutter="24">
            <Col span="6">
              <Button type="info" icon="plus" @click="update">添加产品</Button>
            </Col>
            <Col span="18" style="text-align:right">
              <a href="#" class="myShow">我的显示</a>
              <Input v-model="model.title" placeholder="请输入新闻标题" style="width:200px"></Input>
              <Button class="j_buttom" @click="search">搜索</Button>
              <Button class="j_btn" @click="update" style="margin-right: 0;">高级搜索</Button>
            </Col>
          </Row>
        </div>
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
      </Content>
      <JPagination :fixed="true" :checkbox="true" :total="total" :searchData='searchData' @on-change="pageChange">
        <span slot="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button class="j_buttom" @click="delAll">删除</Button>
          <Button class="j_buttom" @click="update">复制</Button>
          <Button class="j_buttom" @click="update">上架</Button>
          <Button class="j_buttom" @click="update">下架</Button>
          <Button class="j_buttom" @click="categoryAll">转移分类</Button>
        </span>
      </JPagination>
    </Layout>
    <SeoDetail ref="seoDetail"/>
    <TransferCategory ref="transferCategory" :data="categoryList" :ids="ids" :type="'product'" @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Sortable from 'sortablejs'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    SeoDetail,
    TransferCategory
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '产品图片', key: 'pic', render: this.imgFilter },
        { title: '产品名称', className: 'j_table_title', sortable: true, width: 120, render: this.nameFilter },
        { title: '产品型号', className: 'j_table_title', sortable: true, width: 120, render: this.prodtypeFilter },
        { title: '产品分类', sortable: true, width: 105, ellipsis: true, render: this.categoryFilter },
        { title: '添加时间', sortable: true, width: 105, render: this.dataFilter },
        { title: '是否上架', sortable: true, width: 105, render: this.isdisplayFilter },
        { title: '排序', className: 'j_table_sort', sortable: true, minWidth: 80, render: this.sortFilter },
        { title: '操作', align: 'left', width: 160, render: this.renderOperate }
      ],
      list: [],
      categoryList: [],
      searchData: {
        page: 1,
        pageSize: 10
      },
      model: {},
      total: 0,
      toggle: false,
      ids: ''
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
    this.getCate()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/product/list?' + qs.stringify(this.searchData)).then(res => {
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
    getCate () {
      this.$http.get('/rest/api/category/product?pageSize=1000').then(res => {
        if (res.success) {
          this.categoryList = res.attributes.data
        }
      })
    },
    // 功能
    lanRefresh () {
      this.searchData.page = 1
      this.get()
    },
    add () {
      this.$router.push({ path: '/product/add' })
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].sort
      let sortB = this.list[b].sort
      this.sortPost(this.list[a].productId, sortB)
      this.sortPost(this.list[b].productId, sortA)
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
      this.$http.post('/rest/api/product/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          console.log(sort)
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    // 搜索
    search (e) {
      if (this.model.title) {
        this.searchData.model = JSON.stringify(this.model)
      }
      this.searchData.page = 1
      this.get()
    },
    // 分页
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.productId
        } else {
          this.ids = this.ids + ',' + item.productId
        }
      })
    },
    handleSelectAll () {
      this.$refs.selection.selectAll(this.toggle)
    },
    update () {
      return this.$Message.info('更新中...')
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      var ctx = this
      this.$http.post('/rest/api/product/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.ids.split(',').forEach(id => {
            ctx.list.forEach((item, index) => {
              if (id === item.productId) {
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
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    imgFilter (h, params) {
      return h('div', {
        style: {
          width: '68px',
          height: '68px',
          lineHeight: '68px',
          textAlign: 'center',
          background: '#f5f6fa',
          border: '1px solid #d5d5d5'
        },
        on: {
          click: () => {
            this.$Message.info('ok')
          }
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
            display: !params.row.picPath ? 'block' : 'none'
          }
        }),
        h('img', {
          style: {
            maxHeight: '100%',
            margin: '0 auto',
            display: params.row.picPath ? 'block' : 'none'
          },
          attrs: {
            src: 'http://img.jihui88.com/' + params.row.picPath
          }
        })
      ])
    },
    nameFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.name),
        h('i', {
          class: {
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Input', {
                    props: {
                      value: params.row.name,
                      autofocus: true,
                      placeholder: '修改新闻标题'
                    },
                    on: {
                      input: (val) => {
                        params.row.name2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      name: params.row.name2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].name = params.row.name2
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
    prodtypeFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.prodtype),
        h('i', {
          class: {
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Input', {
                    props: {
                      value: params.row.prodtype,
                      autofocus: true,
                      placeholder: '修改新闻标题'
                    },
                    on: {
                      input: (val) => {
                        params.row.prodtype2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      prodtype: params.row.prodtype2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].prodtype = params.row.prodtype2
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
    categoryFilter (h, params) {
      var ctx = this
      let text = ''
      let option = []
      this.categoryList.forEach(item => {
        if (params.row.category === item.categoryId) {
          text = item.name
        }
        option.push(h('Option', {
          props: {
            value: item.categoryId
          }
        }, item.name))
      })
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, text),
        h('i', {
          class: {
            'iconfont': true,
            'icon-shangxiajiantou': true
          },
          style: {
            color: '#a3a3a3',
            fontSize: '12px'
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Select', {
                    props: {
                      value: params.row.category
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.category2 = val
                      }
                    }
                  }, option)
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      category: params.row.category2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].category = params.row.category2
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
    // 时间格式化
    dataFilter (h, params) {
      let format = this.dataFormat(params.row.addTime)
      return h('div', format)
    },
    isdisplayFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.isdisplay === '1' ? '是' : '否'),
        h('i', {
          class: {
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
                      id: params.row.productId,
                      isdisplay: params.row.isdisplay2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].isdisplay = params.row.isdisplay2
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
    topproductFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.topproduct === '01' ? '是' : '否'),
        h('i', {
          class: {
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Select', {
                    props: {
                      value: params.row.topproduct,
                      placeholder: '是否置顶'
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.topproduct2 = val
                      }
                    }
                  }, [
                    h('Option', {
                      props: {
                        value: '01'
                      }
                    }, '是'),
                    h('Option', {
                      props: {
                        value: '00'
                      }
                    }, '否')
                  ])
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      topproduct: params.row.topproduct2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].topproduct = params.row.topproduct2
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
                      id: params.row.productId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
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
              'iconfont': true,
              'icon-tuozhuai': true
            }
          }),
          h('i', {
            class: {
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
              this.$Message.success('更新中..')
            }
          }
        }, '修改'),
        h('span', {
          style: {
            paddingLeft: '10px',
            paddingRight: '10px',
            color: '#e6e1db'
          }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.seoDetail.open(params.row.productId, 'product')
            }
          }
        }, 'SEO'),
        h('span', {
          style: {
            paddingLeft: '10px',
            paddingRight: '10px',
            color: '#e6e1db'
          }
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
                this.$http.delete('/rest/api/product/detail/' + params.row.productId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].productId === params.row.productId) {
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
        ])
      ])
    }
  }
}
</script>

<style lang="less">
.myShow{
    text-decoration: underline;
    margin-right: 20px;
}
.j_product .ivu-table td{
   height: 98px
 }
</style>
