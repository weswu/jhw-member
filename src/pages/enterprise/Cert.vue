<template>
  <Layout class="ivu-layout-has-sider j_cert">
    <MenuBar :data="'menuEnter'" :active="'cert'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'荣誉证书'" :lan="true" @on-change="lanChange"/>
      <Content>
        <div class="j_search">
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="info" icon="plus" class="w130" @click="add">添加荣誉证书</Button>
            </Col>
            <Col>
              <Input v-model="searchData.name" class="w180" clearable placeholder="请输入证书名称" @on-change="clearInput"></Input>
              <Button class="search" @click="search">搜索</Button>
            </Col>
          </Row>
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
import Detail from '@/pages/enterprise/CertDetail2'
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
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '证书图片', className: 'j_table_img', key: 'serverPath', width: 90, render: this.imgFilter },
        { title: '证书名称', key: 'name', minWidth: 180, render: this.editFilter },
        { title: '排序', className: 'j_table_sort', key: 'sort', minWidth: 130, render: this.editFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          name: 'aaa',
          state: '01',
          type: '07',
          sort: 526,
          enterpriseId: 'Enterp_0000000000000000000000039',
          attList: null,
          certificateId: 'Certificate_00000000000000007799',
          addTime: 1501814881264,
          lanId: 1,
          serverPath: 'upload//g//g2//ggggfj//picture//2017//08//04/69521af9-edbf-4c83-b615-03d53f64c252.png',
          att: {
            serverPath: 'upload//g//g2//ggggfj//picture//2017//08//04/69521af9-edbf-4c83-b615-03d53f64c252.png'
          },
          organize: 'baa',
          attachmentId: 'Attach_0000000000000000001384336',
          edittingCell: {
            name: false,
            organize: false,
            api: 'cert',
            id: 'Certificate_00000000000000007799'
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
      this.$http.get('/rest/api/cert/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item.serverPath = item.att && item.att.serverPath
            item.edittingCell = {
              name: false,
              organize: false,
              sort: false,
              api: 'cert',
              id: item.certificateId
            }
          })
          this.list = data
        }
      })
    },
    lanChange () {
      this.searchData.page = 1
      this.get()
    },
    // 功能
    add () {
      this.$refs.detail.open()
    },
    clearInput () {
      if (this.searchData.name === '') {
        this.get()
      }
    },
    search () {
      this.searchData.page = 1
      this.get()
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'cert')
    },
    // 过滤
    editFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    imgFilter (h, params) {
      return this.cellImg(this, h, params)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.certificateId)
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
                this.$http.delete('/rest/api/cert/detail/' + params.row.certificateId).then((res) => {
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
.j_cert {
  .ivu-table{
    .ivu-table-tip,.ivu-table-body {
      height: calc(100vh - 254px);
      border-bottom: 1px solid #e9e9e9;
    }
    td{
      height: 70px
    }
  }
}
</style>
