<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuShop'" :active="'shop_delivery'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'物流公司管理'"/>
      <Content>
        <div class="j_search">
          <Input v-model="searchData.name" class="w180" placeholder="请输入配送名称"></Input>
          <Button class="search" @click="search">搜索</Button>
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
        { title: '配送名称', key: 'name' }
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
      this.$http.get('/rest/api/deliverycorp/list?' + qs.stringify(this.searchData)).then((res) => {
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
    }
  }
}
</script>

<style lang="less">
</style>
