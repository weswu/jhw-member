<template>
  <Layout class="j_layout_content j_news">
    <JHeader :title="'新闻列表'" :lan="true" @on-change="lanChange"/>
    <Content>
      <div class="j_search">
        <Row type="flex" justify="space-between" class="j_news_search">
          <Col>
            <Button type="info" icon="plus" class="w130" @click="url('/news/add')">添加新闻</Button>
          </Col>
          <Col>
            <a :href="agent.vNews" class="a_underline" target="_blank" style="margin-right:20px;" v-if="agent.vNews">新闻视频教程</a>
            <Input v-model="title" class="w180" placeholder="请输入新闻标题" clearable @on-change="clearInput"></Input>
            <Button class="search" @click="search">搜索</Button>
            <Poptip placement="bottom-end" class="j_poptip_confirm_edit advancedSearch"
              confirm
              width="600"
              @on-ok="advancedSearch">
              <Button class="grey w130">高级搜索</Button>
              <div slot="title">
                <Form :model="searchData" :label-width="85">
                  <FormItem label="标题：" class="formitem_left">
                    <Input v-model="searchData.title" class="w180" placeholder="请输入新闻标题" clearable></Input>
                  </FormItem>
                  <FormItem label="分类：" :label-width="62" class="formitem_left">
                    <div style="width:203px">
                      <categorySelect :categoryId="searchData.category" :list="$store.state.newsCategory" :isDefalut="true" @on-change="categoryChange"/>
                    </div>
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
          <Button type="ghost" size="small" @click="displayAll('01')">显示</Button>
          <Button type="ghost" size="small" @click="displayAll('00')">隐藏</Button>
          <Button type="ghost" size="small" @click="categoryAll">转移分类</Button>
        </span>
      </JPagination>
    </Content>
    <SeoDetail ref="seoDetail"/>
    <TransferCategory ref="transferCategory" :data="categoryList" :ids="ids" :type="'news'" @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import DragableTable from '@/components/group/j-dragable-table'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
import categorySelect from '@/components/group/j-category-select'
export default {
  components: {
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
        { title: '新闻标题', className: 'text-color', sortable: true, key: 'title', minWidth: 120, render: this.titleFilter },
        { title: '新闻分类', className: 'j_table_category', sortable: true, key: 'category', minWidth: 160, render: this.categoryFilter },
        { title: '添加时间', sortable: true, key: 'addTime', minWidth: 105, render: this.dataFilter },
        { title: '显示／隐藏', sortable: true, key: 'display', minWidth: 113, render: this.displayFilter },
        { title: '是否置顶', minWidth: 90, key: 'topnews', render: this.topnewsFilter },
        { title: '排序', className: 'j_table_sort', sortable: true, key: 'sort', minWidth: 125, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate }
      ],
      list: [],
      listTest: [
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
          _checked: false,
          edittingCell: {
            title: false,
            sort: false,
            api: 'news'
          }
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
          _checked: false,
          edittingCell: {
            title: false,
            sort: false,
            api: 'news'
          }
        }
      ],
      title: '',
      searchData: {
        page: 1,
        pageSize: 10,
        category: ''
      },
      total: 0,
      toggle: false,
      ids: ''
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.newsCategory,
      agent: state => state.agent
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.meta.parent !== 'news') {
        vm.$cookie.set('newsPage', 1)
        vm.$cookie.set('newsIndex', '')
      } else {
        vm.searchData.page = parseInt(vm.$cookie.get('newsPage')) || 1
      }
      vm.get()
    })
  },
  created () {
    this.$store.dispatch('getCategory', 'news')
  },
  methods: {
    get () {
      this.ids = ''
      this.$http.get('/rest/api/news/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          let idx = parseInt(this.$cookie.get('newsIndex'))
          data.forEach((item, index) => {
            item._checked = false
            item.edittingCell = {
              title: false,
              sort: false,
              api: 'news',
              id: item.newsId
            }
            if (idx === index) {
              item._highlight = true
            }
          })
          this.list = data
        }
      })
    },
    // 功能
    lanChange () {
      this.$store.dispatch('getCategory', 'news')
      this.get()
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'news')
    },
    // 搜索
    clearInput () {
      if (this.title === '') {
        this.searchData.title = this.title
        this.get()
      }
    },
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        title: this.title
      }
      this.get()
    },
    categoryChange (e) {
      this.searchData.category = e
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
          this.$Message.success('删除成功')
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
          this.$Message.success(display === '01' ? '已显示' : '已隐藏')
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
      return this.cellEdit(this, h, params)
    },
    categoryFilter (h, params) {
      let category = ''
      if (params.row.category) {
        category = params.row.category.split(',')[0]
      }
      return h(categorySelect, {
        props: {
          list: this.categoryList,
          categoryId: category,
          type: 'news'
        },
        on: {
          'on-change': (val) => {
            params.row.category = val
            let data = {
              model: JSON.stringify({
                id: params.row.newsId,
                category: val
              }),
              _method: 'put'
            }
            this.$http.post('/rest/api/news/detail/' + params.row.newsId, qs.stringify(data)).then((res) => {
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
      return h('div', this.dateFormat(params.row.addTime))
    },
    displayFilter (h, params) {
      let option = ['01', '00', '显示', '隐藏']
      return this.cellRadio(this, h, params, option)
    },
    topnewsFilter (h, params) {
      let option = ['01', '00']
      return this.cellRadio(this, h, params, option)
    },
    sortFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$cookie.set('newsPage', this.searchData.page)
              this.$cookie.set('newsIndex', params.index)
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
                    ctx.list.splice(params.index, 1)
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
.j_news {
  .ivu-table{
    .ivu-table-tip,.ivu-table-body {
      height: calc(100vh - 293px);
      border-bottom: 1px solid #e9e9e9;
    }
    td{
      height: 70px
    }
  }
  .advancedSearch{
    .ivu-select-dropdown-list{
      width: 203px;
    }
  }
}

@media screen and (min-width: 1030px) {
  .j_news_search{
    height: 41px;
  }
}
</style>
