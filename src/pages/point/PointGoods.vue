<template>
  <Layout class="j_layout ivu-layout-has-sider j_category">
    <MenuBar :data="'menuPoint'" :active="'point_goods'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'积分兑换'" :count="count"/>
      <Content>
        <Table :columns="columns" :data="list"></Table>
        <JPagination :total="total" :searchData='searchData' @on-change="pageChange" :right="'24'"/>
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
        { title: '商品编号', key: 'integralProductSn' },
        { title: '商品图片', key: 'pic', render: this.imgFilter },
        { title: '商品名称', key: 'name' },
        { title: '剩余库存', key: 'store' },
        { title: '所需积分', key: 'point' },
        { title: '操作', className: 'j_table_operate', align: 'right', width: 150, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      count: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/integral_product/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
          this.count = res.attributes.totalPoint
        }
      })
    },
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    imgFilter (h, params) {
      return h('img', {
        'style': {
          height: '50px'
        },
        attrs: {
          src: 'http://img.jihui88.com/' + params.row.pic
        }
      })
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              ctx.$Modal.confirm({
                title: '积分兑换',
                content: '您确定要兑换该商品吗?',
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      integralProductId: params.row.integralProductId || 2,
                      id: params.row.integralProductId || 1
                    })
                  }
                  ctx.$http.get('/rest/api/integral_product/receive', qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('兑换成功')
                      params.row.store -= 1
                      ctx.count = res.attributes.totalPoint
                    } else {
                      ctx.$Message.success(res.msg)
                    }
                  })
                },
                onCancel: () => {}
              })
            }
          }
        }, '兑换')
      ])
    }
  }
}
</script>

<style lang="less">
.j_category .ivu-table-body{
  height: calc(100vh - 291px);
}
</style>
