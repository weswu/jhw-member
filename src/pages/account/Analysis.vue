<template>
  <Layout class="j_layout_content">
    <JHeader :title="'员工推广分析'"/>
    <Content>
      <div class="j_search">
        <DatePicker type="daterange" :options="options" split-panels placeholder="选择搜索时间段" @on-change="search" style="width: 200px"></DatePicker>
      </div>
      <Table :columns="columns" :data="list"></Table>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '分站编号', minWidth: 85, key: 'layoutId' },
        { title: '运营人员', minWidth: 85, key: 'name' },
        { title: '新增浏量', minWidth: 102, sortable: true, key: 'viewCount' },
        { title: '新增询盘', minWidth: 102, sortable: true, key: 'messageCount' },
        { title: '新增成交', minWidth: 102, sortable: true, key: 'orderCount' },
        { title: '新增注册', minWidth: 102, sortable: true, key: 'registerCount' },
        { title: '转发量', minWidth: 102, sortable: true, key: 'shareCount' }
      ],
      list: [],
      searchData: {
        startDate: '',
        endDate: ''
      },
      options: {
        shortcuts: [
          {
            text: '7天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '15天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              return [start, end]
            }
          },
          {
            text: '30天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          }
        ]
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/submember/statistical?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    search (e) {
      this.searchData.startDate = e[0]
      this.searchData.endDate = e[1]
      this.get()
    }
  }
}
</script>

<style lang="less">
</style>
