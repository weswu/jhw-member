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
              <Input v-model="searchData.title" clearable placeholder="请输入新闻标题" class="w180"></Input>
              <Button class="search" @click="search">搜索</Button>
              <Poptip placement="bottom-end" class="j_poptip_confirm_edit"
                confirm
                width="600"
                @on-ok="advancedSearch">
                <Button class="grey w130">高级搜索</Button>
                <div slot="title">
                  <Form :model="searchData" :label-width="85">
                    <FormItem label="名称：" class="formitem_left">
                      <Input v-model="searchData.title" class="w180" clearable></Input>
                    </FormItem>
                    <FormItem label="分类：" class="formitem_left">
                      <Select v-model="searchData.category" class="w180">
                        <Option value="">请选择</Option>
                        <Option :value="item.categoryId" v-for="item in categoryList" :key="item.categoryId">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="图片新闻：" class="formitem_left">
                      <Select v-model="searchData.imagenews" class="w180" placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="01">是</Option>
                        <Option value="00">否</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="滚动新闻：" class="formitem_left">
                      <Select v-model="searchData.rollingnews" class="w180" placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="01">是</Option>
                        <Option value="00">否</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="置顶新闻：" class="formitem_left">
                      <Select v-model="searchData.topnews" class="w180" placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="01">是</Option>
                        <Option value="00">否</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="显示/隐藏：" class="formitem_left">
                      <Select v-model="searchData.display" class="w180" placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="01">显示</Option>
                        <Option value="00">隐藏</Option>
                      </Select>
                    </FormItem>
                  </Form>
                </div>
              </Poptip>
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
            <Button type="ghost" size="small" @click="copyAll">复制</Button>
            <Button type="ghost" size="small" @click="displayAll('01')">上架</Button>
            <Button type="ghost" size="small" @click="displayAll('00')">下架</Button>
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
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import DragableTable from '@/components/group/j-dragable-table'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
import categorySelect from '@/components/group/j-category-select'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    DragableTable,
    SeoDetail,
    TransferCategory,
    categorySelect
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '新闻标题', className: 'j_table_title', sortable: true, key: 'title', width: 120, render: this.titleFilter },
        { title: '新闻分类', className: 'j_table_category', sortable: true, key: 'category', width: 160, render: this.categoryFilter },
        { title: '添加时间', sortable: true, key: 'addTime', width: 105, render: this.dataFilter },
        { title: '是否上架', sortable: true, key: 'display', width: 105, render: this.displayFilter },
        { title: '是否置顶', width: 90, render: this.topnewsFilter },
        { title: '排序', className: 'j_table_sort', sortable: true, key: 'sort', minWidth: 80, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate }
      ],
      list: [],
      list2: [
        {
          state: '01',
          content: null,
          domain: null,
          origin: null,
          category: 'Category_00000000000000000314414',
          sort: 21,
          enterpriseId: 'Enterp_0000000000000000000000039',
          title: '大师傅',
          adduserId: null,
          newsId: 'News_000000000000000000000101939',
          addTime: 1489718280218,
          newsType: '11',
          imagenews: '00',
          rollingnews: null,
          topnews: '01',
          staticed: null,
          staticpath: null,
          pageKey: null,
          tarurl: null,
          display: '00',
          picPath: null,
          lanId: null,
          auditTime: null,
          seoDescription: null,
          viewsum: null,
          seoTitle: null,
          tagMapStore: null,
          c_url: null,
          auditId: null,
          author: null,
          newsId2: '101939',
          nkey: null,
          _checked: false
        },
        {
          state: '01',
          content: null,
          domain: null,
          origin: null,
          category: 'Category_00000000000000000335347',
          sort: 19,
          enterpriseId: 'Enterp_0000000000000000000000039',
          title: 'aa中客户',
          adduserId: null,
          newsId: 'News_000000000000000000000109030',
          addTime: 1501750591038,
          newsType: '11',
          imagenews: '01',
          rollingnews: null,
          topnews: '01',
          staticed: null,
          staticpath: null,
          pageKey: null,
          tarurl: null,
          display: '01',
          picPath: '',
          lanId: null,
          auditTime: null,
          seoDescription: null,
          viewsum: null,
          seoTitle: null,
          tagMapStore: null,
          c_url: null,
          auditId: null,
          author: null,
          newsId2: '109030',
          nkey: null,
          _checked: false
        }
      ],
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      toggle: false,
      ids: ''
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.newsCategory
    })
  },
  created () {
    this.searchData.page = this.$cookie.get('newsPage') || 1
    this.get()
    this.$store.dispatch('getCategory', 'news')
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
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        title: this.searchData.title
      }
      this.get()
    },
    advancedSearch () {
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
      this.$http.post('/rest/api/news/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success(res.msg || '删除成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    copyAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/news/copy', qs.stringify({newsIds: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success(res.msg || '复制成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    displayAll (display) {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/news/display', qs.stringify({newsIds: this.ids, display: display})).then((res) => {
        if (res.success) {
          this.$Message.success(display === '01' ? '上架成功' : '下架成功')
          this.get()
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
      return h(categorySelect, {
        props: {
          list: this.categoryList,
          categoryId: params.row.category
        },
        on: {
          'on-change': (val) => {
            params.row.category = val
            let data = {
              model: JSON.stringify({
                id: params.row.productId,
                category: val
              }),
              _method: 'put'
            }
            this.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
              if (res.success) {
                this.$Message.success('修改成功')
              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        }
      })
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
              params.row.display = params.row.display === '01' ? '00' : '01'
              let data = {
                model: JSON.stringify({
                  id: params.row.newsId,
                  display: params.row.display
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                } else {
                  ctx.$Message.error(res.msg)
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
              params.row.topnews = params.row.topnews === '01' ? '00' : '01'
              let data = {
                model: JSON.stringify({
                  id: params.row.newsId,
                  topnews: params.row.topnews
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                } else {
                  ctx.$Message.error(res.msg)
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
.j_news .ivu-table{
  .ivu-table-tip,.ivu-table-body {
    height: calc(100vh - 293px);
    border-bottom: 1px solid #e9e9e9;
  }
  td{
    height: 70px
  }
}
</style>
