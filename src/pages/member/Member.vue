<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuMember'" :active="'member'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'会员管理'"/>
        <div class="j_search">
          <Row :gutter="24">
            <Col span="13">
              <Button type="info" icon="plus" class="w130" @click="add">添加会员</Button>
            </Col>
            <Col span="11" style="text-align:right">
              <Input v-model="searchData.name" style="width:140px;padding-right:5px;" placeholder="请输入用户名"></Input>
              <Button class="search" @click="search">搜索</Button>
              <Button class="grey w130" @click="update($Message)" style="margin-right: 0;">高级搜索</Button>
            </Col>
          </Row>
        </div>
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"/>
        <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="pageChange">
          <span slot="btn">
            <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
            <Button type="ghost" size="small"  @click="delAll">删除</Button>
          </span>
        </JPagination>
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
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '用户名', key: 'name', render: this.nameFilter },
        { title: '会员等级', key: 'memberRank', render: this.rankFilter },
        { title: '邮箱', key: 'email' },
        { title: '注册时间', key: 'addTime' },
        { title: '状态', key: 'isAccountEnabled', render: this.typeFilter },
        { title: '来源（网站编号）', key: '' },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      total: 0,
      toggle: false,
      ids: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/member/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.list = data || []
        }
      })
    },
    // 上
    add () {
      this.$Message.success('更新中...')
    },
    search () {
      this.searchData.page = 1
      this.get()
    },
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    // 批量操作
    handleSelectAll () {
      this.$refs.selection.selectAll(this.toggle)
    },
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.memberId
        } else {
          this.ids = this.ids + ',' + item.memberId
        }
      })
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      var ctx = this
      this.$http.post('/rest/api/member/delete?ids=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.ids.split(',').forEach(id => {
            ctx.list.forEach((item, index) => {
              if (id === item.memberId) {
                ctx.list.splice(index, 1)
              }
            })
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    nameFilter (h, params) {
      return h('span', params.row.name || params.row.username)
    },
    rankFilter (h, params) {
      return h('span', params.row.memberRank.name)
    },
    typeFilter (h, params) {
      return h('span', params.row.isAccountEnabled === '01' ? '不正常' : '正常')
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$Message.success('更新中..')
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
                this.$http.delete('/rest/api/member/detail/' + params.row.memberId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].memberId === params.row.memberId) {
                        ctx.list.splice(i, 1)
                      }
                    }
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
</style>
