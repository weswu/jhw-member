<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuEvaluate'" :detail="true" :active="'evaluate'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'商品评价'"/>
        <Table :columns="columns" :data="list"/>
        <JPagination :fixed="true" :borderTop="true" :total="total" :searchData='searchData' @on-change="pageChange" v-if="active !== 'navigator/list'"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
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
        { title: '用户', key: 'name', render: this.nameFilter },
        { title: '评价', key: 'page', render: this.pageFilter },
        { title: '回复', className: 'j_table_operate', align: 'center', width: 100, render: this.renderOperate }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  methods: {}
}
</script>

<style lang="less">
</style>
