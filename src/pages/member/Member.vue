<template>
  <Layout class="j_layout_content">
    <Content>
      <JHeader :title="'会员管理'"/>
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Button type="info" icon="plus" class="w130" @click="url('/member/add')">添加会员</Button>
          </Col>
          <Col>
            <Input v-model="name" class="w180" clearable placeholder="请输入用户名" @on-change="clearInput"></Input>
            <Button class="search" @click="search">搜索</Button>
            <Poptip placement="bottom-end" class="j_poptip_confirm_edit"
              confirm
              width="370"
              @on-ok="advancedSearch">
              <Button class="grey w130">高级搜索</Button>
              <div slot="title">
                <Form :model="searchData" :label-width="85">
                  <FormItem label="会员用户名：">
                    <Input v-model="searchData.name" class="w244" clearable></Input>
                  </FormItem>
                  <FormItem label="会员等级：">
                    <Select v-model="searchData.memberRankId" class="w244">
                      <Option value="">请选择</Option>
                      <Option :value="item.rankId" v-for="item in $store.state.memberRankList" :key="item.rankId">{{item.name}}</Option>
                    </Select>
                  </FormItem>
                </Form>
              </div>
            </Poptip>
          </Col>
        </Row>
      </div>
      <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"/>
      <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
        <span slot="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button type="ghost" size="small"  @click="delAll">删除</Button>
        </span>
      </JPagination>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JHeader,
    JPagination
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '用户名', key: 'name', className: 'text-color', ellipsis: true, render: this.nameFilter },
        { title: '会员等级', key: 'memberRank', render: this.rankFilter },
        { title: '邮箱', key: 'email' },
        { title: '注册时间', width: 148, key: 'addTime' },
        { title: '状态', key: 'isAccountEnabled', width: 70, render: this.typeFilter },
        { title: '来源：网站编号', key: 'layoutId' },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      name: '',
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      toggle: false,
      ids: ''
    }
  },
  created () {
    this.get()
    this.$store.dispatch('getMemberRank')
  },
  methods: {
    get () {
      this.ids = ''
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
    // 功能
    clearInput () {
      if (this.name === '') {
        this.searchData.name = this.name
        this.get()
      }
    },
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        name: this.name
      }
      this.get()
    },
    advancedSearch () {
      this.searchData.page = 1
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
      this.$http.post('/rest/api/member/butchDel?memberIds=' + this.ids).then((res) => {
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
              this.$router.push({path: '/member/' + params.row.memberId})
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
</style>
