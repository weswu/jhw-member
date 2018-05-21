<template>
  <div class="j_seo_base">
    <div class="j_search">
      <Button class="mormal" @click="search(item.value)" v-for="(item, index) in btns" :key="index" :class="{active: active === item.value}">{{item.text}}</Button>
    </div>
    <Table :columns="columns" :data="list"/>
    <JPagination :fixed="true" :borderTop="true" :total="total" :searchData='searchData' @on-change="pageChange"/>
    <Detail ref="detail"/>
  </div>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/static/SeoDetail'
export default {
  components: {
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题名称', key: 'name', render: this.nameFilter },
        { title: '所属分类', key: 'page', render: this.pageFilter },
        { title: '添加时间', render: this.addTime },
        { title: '操作', className: 'j_table_operate', align: 'center', width: 100, render: this.renderOperate }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/tag/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 功能
    search (e) {
      this.active = e
      this.searchData.page = 1
      this.get()
    },
    pageChange (e) {
      this.searchData.page = e
      this.get()
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', this.index2(params.index, this.searchData))
    },
    dataFilter (h, params) {
      let format = this.dataFormat(params.row.addTime, 'yyyy-MM-dd')
      return h('div', format)
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
                this.$http.delete('/rest/api/member/detail/' + params.row.memberId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].memberId === params.row.memberId) {
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
.j_seo {
  .j_layout_content .ivu-layout-content .j_seo_base .ivu-table-body{
    max-height: calc(100vh - 368px);
  }
}
</style>
