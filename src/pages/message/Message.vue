<template>
  <Layout class="j_layout ivu-layout-has-sider j_message">
    <MenuBar :data="'menuMessage'" :active="'message'+(pageName?('/'+pageName):'')"/>
    <Content :style="{padding: '20px'}">
      <div class="j_header">
        <span class="title" v-if="!pageName">全部消息</span>
        <span class="title" v-if="pageName === '00'">未读消息</span>
        <span class="title" v-if="pageName === '01'">已读消息</span>
      </div>
      <div class="j_search">
        <Button class="j_btn" @click="search(item.value)" v-for="(item, index) in btns" :key="index" :class="{primary: searchData.type === item.value}">{{item.text}}</Button>
      </div>
      <div class="j_search" v-if="searchData.type === '05'" style="margint-top: 12px;">
        <Row :gutter="24">
          <Col span="16">
            <Input v-model="searchData.title" style="width:140px;margin-right:5px;" placeholder="请输入标题内容"></Input>
            <button type="button" name="button" class="j_buttom" @click="search">搜索</button>
          </Col>
          <Col span="8" style="text-align:right">
            <Button class="j_buttom_info" @click="blacklist" style="width:94px;">黑名单</Button>
          </Col>
        </Row>
      </div>
      <Table :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
      <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="pageChange" :left="'10'" :right="'14'">
        <span slot="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button class="j_buttom" @click="delAll">删除</Button>
          <Button class="j_buttom" @click="readState">标记已读</Button>
          <Button class="j_buttom" @click="readStateAll" style="color:#333">全部已读</Button>
        </span>
      </JPagination>
    </Content>
    <Detail ref="detail"/>
    <Add ref="add"/>
    <BlackList ref="blacklist"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/message/Detail'
import Add from '@/pages/message/Add'
import BlackList from '@/pages/message/BlackList'
export default {
  components: {
    MenuBar,
    JPagination,
    Detail,
    Add,
    BlackList
  },
  data () {
    return {
      btns: [
        { text: '全部类型消息', value: '' },
        { text: '客户消息', value: '05' },
        { text: '产品消息', value: '10' },
        { text: '安全消息', value: '11' },
        { text: '服务消息', value: '12' },
        { text: '活动消息', value: '13' }
      ],
      columns: [],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10,
        recvState: '',
        type: ''
      },
      total: 0,
      pageName: '',
      ids: '',
      toggle: false
    }
  },
  created () {
    this.pageName = this.$route.params.id
    this.searchData.recvState = this.pageName || ''
    this.searchData.page = 1
    this.get()
    this.changeTableColumns()
  },
  watch: {
    '$route' (to, from) {
      this.pageName = to.params.id
      this.searchData.recvState = this.pageName || ''
      this.searchData.page = 1
      this.get()
      this.changeTableColumns()
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/list?' + qs.stringify(this.searchData)).then(res => {
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
    search (e) {
      this.searchData.type = e
      this.searchData.page = 1
      this.get()
      this.changeTableColumns()
    },
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    changeTableColumns () {
      this.columns = [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题内容', key: 'title', ellipsis: true, render: this.titleFilter },
        { title: '提交时间', key: 'addTime', width: 150, render: this.dataFilter },
        { title: '类型', key: 'type', width: 150, render: this.typeFilter }
      ]
      if (this.searchData.type === '05') {
        let columns2 = [
          { title: '发送人', key: 'fromName' },
          { title: '来源ip', key: 'ip' },
          { title: '操作', width: 155, render: this.renderOperate }
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
      // params.row.recvState
      return h('div', [
        h('span', {
          'class': {
            'state-unread': true,
            foo: params.row.recvState === '00'
          },
          domProps: {
            innerHTML: params.row.recvState === '00' ? '●' : ''
          }
        }),
        h('a', {
          'style': {
            color: params.row.recvState === '01' ? '#999' : ''
          },
          domProps: {
            innerHTML: params.row.title
          }
        })
      ])
    },
    dataFilter (h, params) {
      let format = this.dataFormat(params.row.addTime)
      return h('div', format)
    },
    typeFilter (h, params) {
      let text = ''
      if (params.row.type === '03') { text = '客户消息' }
      if (params.row.type === '04') { text = '服务消息' }
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
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.messageId)
            }
          }
        }, '查看'),
        h('span', {
          style: {
            paddingLeft: '10px',
            paddingRight: '10px',
            color: '#e6e1db'
          }
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
          style: {
            paddingLeft: '10px',
            paddingRight: '10px',
            color: '#e6e1db'
          }
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
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].messageId === params.row.messageId) {
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
.j_message{
  .state-unread{
    width: 20px;
    display: inline-block;
    &.foo{
      font-size: 16px;
      color: #428bca;
    }
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
