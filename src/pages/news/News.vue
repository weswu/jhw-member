<template>
  <Layout class="ivu-layout-has-sider j_news">
    <MenuBar :data="'menu_news'" :active="'news'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'新闻列表'" :lan="true" @on-change="lanRefresh"/>
      <Content>
        <div class="j_search">
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="info" icon="plus" class="w130" @click="url('/news/add')">添加新闻</Button>
            </Col>
            <Col>
              <Input v-model="model.title" placeholder="请输入新闻标题" style="width:200px"></Input>
              <Button class="search" @click="search">搜索</Button>
              <Button class="grey w130" @click="update($Message)" style="margin-right: 0;">高级搜索</Button>
            </Col>
          </Row>
        </div>
        <DragableTable
          ref="selection"
          :list="list"
          :columns="columns"
          @on-update="tableUpdate"
          @on-selection-change="handleSelectChange"/>
        <JPagination :fixed="true" :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
          <span slot="btn">
            <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
            <Button type="ghost" size="small" @click="delAll">删除</Button>
            <Button type="ghost" size="small" @click="update($Message)">复制</Button>
            <Button type="ghost" size="small" @click="update($Message)">上架</Button>
            <Button type="ghost" size="small" @click="update($Message)">下架</Button>
            <Button type="ghost" size="small" @click="categoryAll">转移分类</Button>
          </span>
        </JPagination>
      </Content>
    </Layout>
    <SeoDetail ref="seoDetail"/>
    <TransferCategory ref="transferCategory" :data="categoryList" :ids="ids" :type="'news'" @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import DragableTable from '@/components/group/j-dragable-table'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    DragableTable,
    SeoDetail,
    TransferCategory
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '新闻标题', className: 'j_table_title', sortable: true, width: 120, render: this.titleFilter },
        { title: '新闻分类', sortable: true, width: 105, ellipsis: true, render: this.categoryFilter },
        { title: '添加时间', sortable: true, width: 105, render: this.dataFilter },
        { title: '是否上架', sortable: true, width: 105, render: this.displayFilter },
        { title: '是否置顶', width: 90, render: this.topnewsFilter },
        { title: '排序', className: 'j_table_sort', sortable: true, minWidth: 80, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate }
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
  created () {
    this.searchData.page = this.$cookie.get('newsPage') || 1
    this.get()
    this.getCate()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/news/list?' + qs.stringify(this.searchData)).then(res => {
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
      this.$http.get('/rest/api/category/news?pageSize=1000').then(res => {
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
      this.$router.push({ path: '/news/add' })
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'news', 'newsId')
    },
    // 搜索
    search (e) {
      if (this.model.title) {
        this.searchData.model = JSON.stringify(this.model)
      }
      this.searchData.page = 1
      this.get()
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.newsId
        } else {
          this.ids = this.ids + ',' + item.newsId
        }
      })
    },
    handleSelectAll () {
      this.$refs.selection.$refs.dragable.selectAll(this.toggle)
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
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    titleFilter (h, params) {
      var ctx = this
      return h('div', {
        class: {
          title: true
        }
      }, [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.title),
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
                      value: params.row.title,
                      autofocus: true,
                      placeholder: '修改新闻标题'
                    },
                    on: {
                      input: (val) => {
                        params.row.title2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.newsId,
                      title: params.row.title2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].title = params.row.title2
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
            'none': true,
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
                      id: params.row.newsId,
                      category: params.row.category2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
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
      let format = this.dateFormat(params.row.addTime)
      return h('div', format)
    },
    displayFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.display === '01' ? '是' : '否'),
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
                      value: params.row.display,
                      placeholder: '是否上架'
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.display2 = val
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
                      id: params.row.newsId,
                      display: params.row.display2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].display = params.row.display2
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
    topnewsFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.topnews === '01' ? '是' : '否'),
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
                      value: params.row.topnews,
                      placeholder: '是否置顶'
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.topnews2 = val
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
                      id: params.row.newsId,
                      topnews: params.row.topnews2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].topnews = params.row.topnews2
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
                      id: params.row.newsId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
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
                  this.sortable(params.index, params.index - 1, 'news', 'newsId')
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
                  this.sortable(params.index, params.index + 1, 'news', 'newsId')
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
              this.$cookie.set('newsPage', this.searchData.page)
              this.$router.push({path: '/news/' + params.row.newsId2})
            }
          }
        }, '修改'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.seoDetail.open(params.row.newsId, 'news')
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
                this.$http.delete('/rest/api/news/detail/' + params.row.newsId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].newsId === params.row.newsId) {
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
.j_news .ivu-table td{
   height: 70px
 }
</style>
