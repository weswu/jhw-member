<template>
  <Layout class="ivu-layout-has-sider j_message">
    <MenuBar :data="'menuMessage'" :active="'message'+(pageName?('/'+pageName):'')"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="pageName === '00' ? '未读消息' : (pageName === '01' ? '已读消息' : '全部消息')"/>
        <div class="j_search">
          <Button class="grey" @click="search(item.value)"
            v-for="(item, index) in btns" :key="index" :class="{primary: searchData.type === item.value}"
            v-if="!agent.agentId || index === 0 || index === 1">{{item.text}}<span v-if="item.count !== ''">({{item.count}})</span></Button>
        </div>
        <div class="j_search" v-if="searchData.type === '03'" style="margint-top: 12px;">
          <Row type="flex" justify="space-between">
            <Col>
              <Input v-model="searchData.title" style="width:178px;margin-right:5px;" placeholder="请输入标题内容"></Input>
              <Button class="search" @click="search">搜索</Button>
            </Col>
            <Col>
              <Button class="info" @click="blacklist" style="width:94px;margin-right:0px;">黑名单</Button>
            </Col>
          </Row>
        </div>
        <Table :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
        <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
          <span slot="btn">
            <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
            <Button type="ghost" size="small" @click="delAll">删除</Button>
            <Button type="ghost" size="small" @click="readState">标记已读</Button>
            <Button type="ghost" size="small" @click="readStateAll">全部已读</Button>
          </span>
        </JPagination>
      </Content>
    </Layout>
    <Detail ref="detail"/>
    <Add ref="add"/>
    <BlackList ref="blacklist"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/message/Detail'
import Add from '@/pages/message/Add'
import BlackList from '@/pages/message/BlackList'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    Detail,
    Add,
    BlackList
  },
  data () {
    return {
      btns: [
        { text: '全部类型消息', value: '', status: true, count: '' },
        { text: '客户留言', value: '03', status: true, count: '' },
        // { text: '系统消息', value: '04', status: false },
        // { text: '浏览者消息', value: '05', status: false },
        // { text: '用户反馈', value: '06', status: false },
        // { text: '用户消息', value: '07', status: false },
        // { text: '开具发票', value: '08', status: false },
        // { text: '朋友介绍', value: '09', status: false },
        { text: '产品消息', value: '10', status: true, count: '' },
        { text: '安全消息', value: '11', status: true, count: '' },
        { text: '服务消息', value: '12', status: true, count: '' },
        { text: '活动消息', value: '13', status: true, count: '' }
        // { text: '机汇网留言', value: '21', status: false },
        // { text: '东方五金网留言', value: '22', status: false }
      ],
      columns: [],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10,
        recvState: '',
        type: '',
        posterId: ''
      },
      total: 0,
      pageName: '',
      ids: '',
      toggle: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'status', 'agent'])
  },
  watch: {
    '$route' (to, from) {
      this.pageName = to.params.id
      this.searchData.recvState = this.pageName || ''
      this.searchData.page = 1
      this.get()
      this.changeTableColumns()
    },
    userInfo (to, from) {
      this.status['menuMessage'].menu[1].count = this.userInfo.noReaderMsg
    }
  },
  created () {
    this.pageName = this.$route.params.id
    this.searchData.recvState = this.pageName || ''
    this.searchData.page = 1
    this.searchData.type = this.$route.query.type || ''
    this.searchData.posterId = this.$route.query.posterId || ''
    this.get()
    this.changeTableColumns()
  },
  methods: {
    get () {
      this.ids = ''
      this.$http.get('/rest/api/message/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.btns.forEach(item => {
            if (item.value === '') { item.count = res.attributes.count }
            if (item.value === '03') { item.count = res.attributes.count03 }
            if (item.value === '10') { item.count = res.attributes.count10 }
            if (item.value === '11') { item.count = res.attributes.count11 }
            if (item.value === '12') { item.count = res.attributes.count12 }
            if (item.value === '13') { item.count = res.attributes.count13 }
          })
          this.list = data || []
        }
      })
    },
    search (e) {
      this.searchData.type = e
      this.searchData.page = 1
      this.get()
      this.changeTableColumns()
    },
    changeTableColumns () {
      this.columns = [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题内容', key: 'title', ellipsis: true, render: this.titleFilter },
        { title: '提交时间', key: 'addTime', width: 135, render: this.dataFilter },
        { title: '类型', key: 'type', width: 90, render: this.typeFilter }
      ]
      if (this.searchData.type === '03') {
        this.columns.splice(3, 0, { title: '来源（网站编号）', key: 'layoutId', width: 100, render: this.layoutFilter })
        let columns2 = [
          { title: '发送人', key: 'fromName', ellipsis: true },
          { title: '来源ip', key: 'ip', ellipsis: true },
          { title: '操作', className: 'j_table_operate', width: 155, render: this.renderOperate }
        ]
        columns2.forEach(item => {
          this.columns.push(item)
        })
      }
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.messageId
        } else {
          this.ids = this.ids + ',' + item.messageId
        }
      })
    },
    handleSelectAll () {
      this.$refs.selection.selectAll(this.toggle)
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      var ctx = this
      this.$http.post('/rest/api/message/delete?ids=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.ids.split(',').forEach(id => {
            ctx.list.forEach((item, index) => {
              if (id === item.messageId) {
                ctx.list.splice(index, 1)
              }
            })
          })
          this.ids = ''
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    readState () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/message/readState?ids=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('操作成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    readStateAll () {
      this.$http.post('/rest/api/message/readStateAll').then((res) => {
        if (res.success) {
          this.$Message.success('操作成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 功能
    blacklist () {
      this.$refs.blacklist.open()
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    titleFilter (h, params) {
      // 00：未读  其它已读
      return h('div', [
        h('span', {
          class: {
            'state-unread': true
          },
          style: {
            background: params.row.recvState === '00' ? '#418bca' : ''
          }
        }, ''),
        h('a', {
          style: {
            color: params.row.recvState === '00' ? '#5b5b5b' : '#a0a0a0'
          },
          domProps: {
            innerHTML: params.row.title
          },
          on: {
            click: () => {
              if (params.row.recvState === '00') {
                params.row.recvState = '01'
                if (this.userInfo.noReaderMsg > 0) {
                  this.userInfo.noReaderMsg -= 1
                  this.status['menuMessage'].menu[1].count = this.userInfo.noReaderMsg
                }
              }
              this.$refs.detail.open(params.row.messageId)
            }
          }
        })
      ])
    },
    dataFilter (h, params) {
      return h('div', this.dateFormat(params.row.addTime))
    },
    typeFilter (h, params) {
      let text = ''
      this.btns.forEach(item => {
        if (params.row.type === item.value) {
          text = item.text
        }
      })
      return h('div', text)
    },
    ipFilter (h, params) {
      return h('div', [
        h('span', params.row.ip),
        h('a', {
          style: {
            'paddingLeft': '3px'
          },
          on: {
            click: () => {
              this.$http.post('/user/message/messageaddIpToBlacklist', qs.stringify({ip: params.row.ip})).then((res) => {
                this.$Message.success(res)
              })
            }
          }
        }, params.row.ip && '加入黑名单')
      ])
    },
    layoutFilter (h, params) {
      return h('span', params.row.layoutId || '-')
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              if (params.row.recvState === '00') {
                params.row.recvState = '01'
                if (this.userInfo.noReaderMsg > 0) {
                  this.userInfo.noReaderMsg -= 1
                  this.status['menuMessage'].menu[1].count = this.userInfo.noReaderMsg
                }
              }
              this.$refs.detail.open(params.row.messageId)
            }
          }
        }, '查看'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              if (!params.row.addUser) {
                this.$Message.info('收信人不存在')
              } else {
                this.$refs.add.open()
              }
            }
          }
        }, '回复'),
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
                this.$http.delete('/rest/api/message/detail/' + params.row.messageId).then((res) => {
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
.j_message{
  .state-unread{
    margin-right: 10px;
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #a0a0a0;
    border-radius: 50%;
  }
  .ivu-table-row td:nth-child(2) .ivu-table-cell{
    padding-left: 0;
    a{
      color: #5f5f5f;
      &:hover{
        text-decoration: underline;
        color: #14a4ff;
      }
    }
  }
}

</style>
