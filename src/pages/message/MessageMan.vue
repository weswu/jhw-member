<template>
  <Layout class="j_layout ivu-layout-has-sider j_messageMan">
    <MenuBar :data="'menuMessage'" :active="'messageMan'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'消息接收人管理'">
          <div slot="btn">
            <Button type="primary" icon="plus" @click="add">新建消息接收人</Button>
          </div>
        </JHeader>
        <div class="j_tip">
          提醒：以下联系人都可以设置为消息接收人，机汇网不会将这些信息对外披露或向第三方提供。
        </div>
        <Table :columns="columns" :data="list"></Table>
      </Content>
    </Layout>
    <Detail ref="detail" @on-add="onAdd" @on-edit="onEdit"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/pages/message/messageManDetail'
export default {
  components: {
    MenuBar,
    JHeader,
    Detail
  },
  computed: {
    ...mapState(['user', 'userInfo'])
  },
  data () {
    return {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '邮箱', key: 'key', render: this.emailFilter },
        { title: '手机', key: 'cellphone', render: this.phoneFilter },
        { title: '职位', key: 'position' },
        { title: '操作', className: 'j_table_operate', align: 'right', width: 150, render: this.renderOperate }
      ],
      list: [
        {
          name: '会员账号联系人'
        }
      ]
    }
  },
  created () {
    this.list[0].key = this.user.email
    this.list[0].cellphone = this.user.cellphone
    this.list[0].position = this.user.position
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/bind/list').then(res => {
        if (res.success) {
          res.attributes.data.forEach(item => {
            this.list.push(item)
          })
        }
      })
    },
    add () {
      this.$refs.detail.open('新建消息接收人')
    },
    onAdd (item) {
      this.list.push(item)
    },
    onEdit (data) {
      this.list.forEach(item => {
        if (item.customizeId === data.id) {
          item.name = data.name
          item.key = data.email
          item.position = data.position
          item.cellphone = data.cellphone
          item.state = data.state
        }
      })
    },
    submit () {
      let data = {
        model: JSON.stringify(this.user.enterprise),
        _method: 'put'
      }
      this.$http.post('/rest/api/enterprise/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.$store.commit('serUser', this.user)
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    renderOperate (h, params) {
      var ctx = this
      if (params.index === 0) {
        return false
      }
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open('修改消息接收人', params.row)
            }
          }
        }, '详情'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              ctx.$Modal.confirm({
                title: '账号删除',
                content: '您确定要删除该联系人吗?',
                onOk: () => {
                  ctx.$http.post('/rest/api/message/bind/del?id=' + params.row.customizeId).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('删除成功')
                      for (let i = 0; i < ctx.list.length; i++) {
                        if (ctx.list[i].customizeId === params.row.customizeId) {
                          ctx.list.splice(i, 1)
                        }
                      }
                    } else {
                      ctx.$Message.success(res.msg)
                    }
                  })
                },
                onCancel: () => {}
              })
            }
          }
        }, '删除')
      ])
    },
    emailFilter (h, params) {
      var ctx = this
      let reg = /(.{2}).+(@.+)/g
      let phone = params.row.key && params.row.key.replace(reg, '$1****$2')
      if (params.index === 0) {
        return h('div', [
          h('span', phone),
          h('a', {
            style: {
              paddingLeft: '5px'
            },
            on: {
              click: () => {
                ctx.$Modal.confirm({
                  render: (h) => {
                    return h('Input', {
                      props: {
                        value: '',
                        autofocus: true,
                        placeholder: '修改邮箱'
                      },
                      on: {
                        input: (val) => {
                          params.row.key = val
                          ctx.user.email = val
                        }
                      }
                    })
                  },
                  onOk: () => {
                    let data = {
                      model: JSON.stringify(ctx.user),
                      _method: 'put'
                    }
                    ctx.$http.post('/rest/api/user/detail/' + ctx.user.userId, qs.stringify(data)).then((res) => {
                      if (res.success) {
                        ctx.$Message.success('修改成功')
                        ctx.$store.commit('setUser', ctx.user)
                      } else {
                        ctx.$Message.error(res.msg)
                      }
                    })
                  }
                })
              }
            }
          }, '修改')
        ])
      } else {
        return h('div', [
          h('span', phone),
          h('i', {
            'class': {
              'iconfont': true,
              'icon-dagou': params.row.key,
              'icon-gantanhao': !params.row.key
            },
            style: {
              paddingLeft: '5px',
              color: params.row.key ? '#43952a' : '#f29c39'
            }
          })
        ])
      }
    },
    phoneFilter (h, params) {
      var ctx = this
      let reg = /(\d{3})(\d{4})(\d{4})/
      let phone = params.row.cellphone && params.row.cellphone.replace(reg, '$1****$3')
      if (params.index === 0) {
        return h('div', [
          h('span', phone),
          h('a', {
            style: {
              paddingLeft: '5px'
            },
            on: {
              click: () => {
                ctx.$Modal.confirm({
                  render: (h) => {
                    return h('Input', {
                      props: {
                        value: '',
                        autofocus: true,
                        placeholder: '修改手机'
                      },
                      on: {
                        input: (val) => {
                          params.row.cellphone = val
                          ctx.user.cellphone = val
                        }
                      }
                    })
                  },
                  onOk: () => {
                    let data = {
                      model: JSON.stringify(ctx.user),
                      _method: 'put'
                    }
                    ctx.$http.post('/rest/api/user/detail/' + ctx.user.userId, qs.stringify(data)).then((res) => {
                      if (res.success) {
                        ctx.$Message.success('修改成功')
                        ctx.$store.commit('setUser', ctx.user)
                      } else {
                        ctx.$Message.error(res.msg)
                      }
                    })
                  }
                })
              }
            }
          }, '修改')
        ])
      } else {
        return h('div', [
          h('span', phone),
          h('i', {
            'class': {
              'iconfont': true,
              'icon-dagou': params.row.cellphone,
              'icon-gantanhao': !params.row.cellphone
            },
            style: {
              paddingLeft: '5px',
              color: params.row.cellphone ? '#43952a' : '#f29c39'
            }
          })
        ])
      }
    }
  }
}
</script>

<style lang="less">
.j_messageMan{
  .ivu-table-row:nth-child(1) td:nth-child(1) .ivu-table-cell span{
    padding-left: 17px;
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    &:after{
      content: '\e625';
      position: absolute;
      left: 0;
      top: -6px;
      font-size: 16px;
    }
  }
}

</style>
