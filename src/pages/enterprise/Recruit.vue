<template>
  <Layout class="j_layout ivu-layout-has-sider j_recruit">
    <MenuBar :data="'menuEnter'" :active="'recruit'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'招聘管理'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加招聘</Button>
        </div>
        <DragableTable
          :list="list"
          :columns="columns"
          @on-update="tableUpdate"/>
        <JPagination :total="total" :searchData='searchData' @on-change="get"/>
      </Content>
    </Layout>
    <Detail ref='detail' @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import DragableTable from '@/components/group/j-dragable-table'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/enterprise/RecruitDetail'
export default {
  components: {
    MenuBar,
    JHeader,
    DragableTable,
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题', key: 'title', minWidth: 100, render: this.editFilter },
        { title: '职务', key: 'duty', minWidth: 100, render: this.editFilter },
        { title: '招聘人数', key: 'sum', minWidth: 100, render: this.editFilter },
        { title: '添加时间', key: 'addTime', minWidth: 100, render: this.dataFilter },
        { title: '状态', minWidth: 100, render: this.stateFilter },
        { title: '排序', className: 'j_table_sort', key: 'sort', minWidth: 125, render: this.editFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          domain: 'www.easthardware.com',
          address: null,
          state: '01',
          type: null,
          content: '3434',
          endTime: 1411885199957,
          category: null,
          sort: 182,
          title: '11',
          addTime: 1411885199950,
          jobId: 'Job_0000000000000000000000000349',
          auditTime: null,
          addUser: '王进21',
          auditAdmin: null,
          industory: null,
          sum: '3',
          duty: '22',
          edittingCell: {
            title: false,
            duty: false,
            sum: false,
            sort: false,
            api: 'job',
            id: 'Job_0000000000000000000000000349'
          }
        }
      ],
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/job/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item.edittingCell = {
              title: false,
              duty: false,
              sum: false,
              sort: false,
              api: 'job',
              id: item.jobId
            }
          })
          this.list = data
        }
      })
    },
    add () {
      this.$refs.detail.open()
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'job', 'jobId')
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    editFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime, 'yyyy-MM-dd')
      return h('div', format)
    },
    stateFilter (h, params) {
      return h('div', params.row.state === '01' ? '通过审核' : '未审核')
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.jobId)
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
                this.$http.delete('/rest/api/job/detail/' + params.row.jobId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.list.splice(params.index, 1)
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
.j_recruit .ivu-table{
  td{
    height: 70px
  }
}
</style>
