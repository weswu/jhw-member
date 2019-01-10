<template>
  <Layout class="j_layout_content">
    <JHeader :title="'网络分布'" :lan="true" @on-change="lanChange"/>
    <Content>
      <div class="j_search">
        <Button type="info" icon="plus" class="w130" @click="add">添加分布点</Button>
      </div>
      <Table :columns="columns" :data="list"/>
      <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    </Content>
    <Detail ref='detail' :cityList="cityList" @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/enterprise/DistributionDetail'
export default {
  components: {
    JHeader,
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '详细地址', key: 'address' },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      cityList: []
    }
  },
  created () {
    this.get()
    this.getArea()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/distribution/distributionList?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    getArea () {
      this.$http.get('/rest/api/area/list').then(res => {
        if (res.success) {
          this.cityList = res.attributes.data
        }
      })
    },
    add () {
      this.$refs.detail.open()
    },
    lanChange () {
      this.searchData.page = 1
      this.get()
    },
    // 过滤
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.distributionId)
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
                let data = {
                  distributionId: params.row.distributionId
                }
                this.$http.post('/rest/api/distribution/distributionDelete?' + qs.stringify(data)).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.list.splice(params.index, 1)
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
