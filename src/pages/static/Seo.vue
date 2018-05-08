<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuStatic'" :active="'seo'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'SEO管理'" :lan="true" @on-change="lanRefresh"/>
        <div class="j_search">
          <Row :gutter="24">
            <Col span="13">
              <Button class="j_btn" @click="search(item.value)" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
            </Col>
            <Col span="11" style="text-align:right">
              <Button class="j_buttom_info" @click="update">SEO模板配置</Button>
              <Button class="j_buttom_info" @click="update">关键词管理</Button>
              <Button class="j_buttom_info" @click="update">Tag标签管理</Button>
              <Button class="j_buttom_info" @click="update" style="margin-right:0px;">付费SEO推广</Button>
            </Col>
          </Row>
        </div>
        <Table :columns="columns" :data="list"/>
      </Content>
      <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="pageChange" v-if="active !== 'navigator/list'"/>
    </Layout>
    <Detail ref="detail"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/static/SeoDetail'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    Detail
  },
  data () {
    return {
      btns: [
        { text: '导航', value: 'navigator/list' },
        { text: '产品分类', value: 'category/product' },
        { text: '产品', value: 'product/list' },
        { text: '新闻分类', value: 'category/news' },
        { text: '新闻', value: 'news/list' }
      ],
      active: 'navigator/list',
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '导航名称', key: 'name', render: this.nameFilter },
        { title: '页面地址', key: 'page', render: this.pageFilter },
        { title: '操作', align: 'center', width: 100, render: this.renderOperate }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10
      },
      number: '',
      page: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/' + this.active + '?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 功能
    lanRefresh () {
      this.searchData.page = 1
      this.get()
    },
    search (e) {
      this.active = e
      this.searchData.page = 1
      this.get()
    },
    pageChange (page) {
      this.searchData.page = page || '1'
      this.page = ''
      this.get()
    },
    pageSizeChange () {
      this.searchData.page = 1
      this.get()
    },
    update () {
      this.$Message.info('更新中...')
    },
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    nameFilter (h, params) {
      return h('span', this.active === 'news/list' ? params.row.title : params.row.name)
    },
    pageFilter (h, params) {
      let href = params.row.page
      let page = params.row.page
      if (this.active === 'category/product') {
        href = 'product-' + params.row.categoryId2 + '-1.html'
        page = 'product-' + params.row.categoryId2 + '-1'
      }
      if (this.active === 'category/news') {
        href = 'news-' + params.row.categoryId2 + '-1.html'
        page = 'news-' + params.row.categoryId2 + '-1'
      }
      if (this.active === 'product/list') {
        href = 'product-detail-' + params.row.productId2 + '.html'
        page = 'product-detail-' + params.row.productId2
      }
      if (this.active === 'news/list') {
        href = 'news-detail-' + params.row.newsId2 + '.html'
        page = 'news-detail-' + params.row.newsId2
      }
      return h('a', {
        attrs: {
          href: 'http://' + this.$store.state.user.username + '.jihui88.com/' + href,
          target: '_blank'
        },
        style: {
          color: '#9b9b9b'
        }
      }, page)
    },
    renderOperate (h, params) {
      return h('a', {
        on: {
          click: () => {
            if (this.active === 'category/product') {
              this.$refs.detail.open(params.row.categoryId, 'cate_product')
            } else if (this.active === 'category/news') {
              this.$refs.detail.open(params.row.categoryId, 'cate_news')
            } else if (this.active === 'product/list') {
              this.$refs.detail.open(params.row.productId, 'product')
            } else if (this.active === 'news/list') {
              this.$refs.detail.open(params.row.newsId, 'news')
            } else {
              this.$refs.detail.open(params.row.page, 'page')
            }
          }
        }
      }, 'SEO')
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-table-body{
  height: calc(100vh - 252px);
}
</style>
