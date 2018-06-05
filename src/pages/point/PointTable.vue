<template>
  <Content>
    <Table :columns="columns" :data="list"></Table>
    <JPagination :total="total" :searchData='searchData' @on-change="get"/>
  </Content>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
export default {
  props: {
    searchData: {
      type: Object,
      default () {
        return {
          page: 1,
          pageSize: 10
        }
      }
    }
  },
  components: {
    JPagination
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '详细说明', key: 'desc' },
        { title: '积分收入', key: 'income', render: this.incomeFilter },
        { title: '积分支出', key: 'out', render: this.outFilter },
        { title: '获取时间', key: 'addTime', width: 150, render: this.dataFilter }
      ],
      list: [],
      total: 0,
      count: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/integral_record/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
          if (this.searchData.page === 1 && this.list.length > 0) {
            this.count = this.list[0].useable
            this.$emit('on-count', this.count)
          }
        }
      })
    },
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    incomeFilter (h, params) {
      let text = params.row.income
      return h('div', {
        'style': {
          color: text > 0 ? 'green' : ''
        }
      }, (text > 0 ? '+' : '') + text)
    },
    outFilter (h, params) {
      let text = params.row.out
      return h('div', {
        'style': {
          color: text > 0 ? 'red' : ''
        }
      }, (text > 0 ? '-' : '') + text)
    },
    // 时间格式化
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime)
      return h('div', format)
    }
  }
}
</script>

<style lang="less">
</style>
