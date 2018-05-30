<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'shop_bill'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'物流单据管理'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="url('/shop_bill/add')">添加物流单据</Button>
        </div>
        <Table :columns="columns" :data="list" class="sort"/>
        <JPagination :total="total" :searchData='searchData' @on-change="get"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '图片', render: this.imgFilter },
        { title: '物流公司名称', key: 'name' },
        { title: '宽度', key: 'singleWidth' },
        { title: '高度', key: 'singleHeight' },
        { title: '创建时间', render: this.dataFilter },
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      total: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/deliverycorpSingle/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // search
    search () {
      this.searchData.page = 1
      this.get()
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    imgFilter (h, params) {
      return h('img', {
        style: {
          height: '50px'
        },
        attrs: {
          src: this.$store.state.status.IMG_HOST + this.picUrl(params.row.img, 5)
        }
      })
    },
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime || 'yyyy-MM-dd')
      return h('div', format)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$router.push({path: '/shop_bill/' + params.row.singleId})
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
                this.$http.post('/rest/api/deliverycorpSingle/detail/' + params.row.singleId, qs.stringify({_method: 'DELETE'})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].singleId === params.row.singleId) {
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
</style>
