<template>
  <Layout class="ivu-layout-has-sider j_point_origin">
    <MenuBar :data="'menuPoint'" :active="'point_origin'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'积分来源'" :count="count"/>
      <Content>
        <div class="j_search">
          <Button class="grey" @click="search(item.value)" v-for="(item, index) in btns" :key="index" :class="{primary: searchData.listType === item.value}">{{item.text}}</Button>
        </div>
        <Table :columns="columns" :data="list"></Table>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      btns: [
        { text: '全部', value: '0' },
        { text: '常规任务', value: '1' },
        { text: '每日任务', value: '2' },
        { text: '资料完善', value: '3' },
        { text: '注册推广', value: '4' },
        { text: '微传单', value: '5' },
        { text: '其它', value: '6' }
      ],
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '任务名称', key: 'name', width: 120 },
        { type: 'html', title: '任务流程', key: 'desc' },
        { title: '奖励', key: 'point', width: 100, render: this.pointFilter },
        { title: '任务进度', key: 'condition', width: 100 },
        { title: '状态', key: 'state', width: 100, render: this.stateFilter }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 999,
        listType: '0'
      },
      total: 0,
      pageVal: '',
      count: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/integral_rule/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
          this.count = res.attributes.totalPoint
        }
      })
    },
    search (e) {
      this.searchData.listType = e
      this.searchData.page = 1
      this.get()
    },
    pointFilter (h, params) {
      return h('div', params.row.point + '积分')
    },
    stateFilter (h, params) {
      return h('span', {
        'style': {
          color: params.row.state === 2 ? 'red' : ''
        }
      }, params.row.state === 2 ? '未完成' : '')
    }
  }
}
</script>

<style lang="less">
.j_point_origin {
  .j_layout_content .ivu-layout-content .ivu-table-body{
    max-height: calc(100vh - 218px);
  }
}
</style>
