<template>
  <Layout class="ivu-layout-has-sider j_employee_account">
    <MenuBar :data="'menuAccount'" :active="'employee_account'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'员工账号管理'">
        <div slot="btn">
          <Button type="primary" @click="add">新增员工</Button>
        </div>
      </JHeader>
      <Content>
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
        <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
          <span slot="btn">
            <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
            <Button type="ghost" size="small" @click="delAll">删除</Button>
          </span>
        </JPagination>
      </Content>
    </Layout>
    <Modal
      v-model="modal1"
      title="员工推广"
      width="500"
      cancelText="取消">
      <div class="j_tip" style="margin: 0 0 10px 0;">
        注：请选择站点后再推广二维码
        <Select v-model="$store.state.layoutId" class="small" @on-change="layoutChange" style="float: right;width: 130px;">
          <Option v-for="item in staticList" :value="item.layoutId" :key="item.layoutId">网站编号：{{ item.layoutId }}</Option>
        </Select>
      </div>
      <Tabs style="clear:both">
        <TabPane label="手机网站推广">
          <img :src="'http://wcd.jihui88.com/rest/comm/qrbar/create?w=130&text='+posterUrl"><br/>
          <a href="javascritp:;" class="downloadQr" target="_blank" @click="downloadQr" style="padding-left:31px;">下载二维码</a>
        </TabPane>
        <TabPane label="PC网站推广">
          <Input v-model="posterUrl" style="width:250px"></Input>
          <Button v-clipboard:copy="posterUrl" v-clipboard:success="copy" style="margin-left:10px;">复制</Button>
        </TabPane>
      </Tabs>
    </Modal>
    <Authority ref="auth"/>
    <Detail ref="detail" @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/account/EmployeeDetail'
import Authority from '@/pages/account/Authority'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    Detail,
    Authority
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '账号', minWidth: 80, key: 'username' },
        { title: '姓名', minWidth: 80, key: 'name' },
        { title: '职位', minWidth: 80, key: 'position' },
        { title: '站点', width: 160, key: 'layoutId', render: this.staticFilter },
        { title: '手机号码', minWidth: 85, key: 'mobile' },
        { title: 'Email', minWidth: 100, key: 'email' },
        { title: '操作', className: 'j_table_operate', align: 'right', width: 250, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      ids: '',
      toggle: false,
      // 推广
      modal1: false,
      posterUrl: '',
      posterId: ''
    }
  },
  computed: {
    ...mapState(['staticList'])
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.ids = ''
      this.$http.get('/rest/api/submember/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 功能
    add () {
      this.$refs.detail.open('新增员工')
    },
    layoutChange () {
      var vm = this
      let layoutId = this.$store.state.layoutId
      this.posterUrl = 'http://pc.jihui88.com/rest/site/' + layoutId + '/index?posterId=' + this.posterId
      if (this.staticList.length === 0) return this.$Message.info('未生成站点或者刷新页面')
      this.staticList.forEach(item => {
        if (layoutId === item.id && item.bind.address) {
          vm.posterUrl = item.bind.address + '?posterId=' + this.posterId
        }
      })
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.memberId
        } else {
          this.ids = this.ids + ',' + item.memberId
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
      this.$http.post('/rest/api/submember/delete?ids=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 推广
    copy () {
      this.$Message.success('复制成功')
    },
    downloadQr () {
      window.open('http://wcd.jihui88.com/rest/comm/qrbar/createAndDownload?w=300&text=' + this.posterUrl)
    },
    encodeId (target) {
      return target == null ? '' : target.replace(/^[^1-9]+/, '')
    },
    // 过滤
    staticFilter (h, params) {
      if (params.row.layoutId !== null) {
        let option = [
          h('Option', {
            props: {
              value: null
            }
          }, '请选择')
        ]
        this.staticList.forEach(item => {
          option.push(h('Option', {
            props: {
              value: item.id
            }
          }, '网站编号：' + item.id))
        })
        return h('Select', {
          props: {
            value: params.row.layoutId
          },
          on: {
            'on-change': (val) => {
              params.row.layoutId = val
              let data = {
                memberId: params.row.memberId,
                layoutId: val
              }
              this.$http.post('/rest/api/submember/changeLayoutId', qs.stringify(data)).then((res) => {
                if (res.success) {
                  this.$Message.success('修改成功')
                }
              })
            }
          }
        }, option)
      } else {
        return h('span', {
          on: {
            click: () => {
              params.row.layoutId = ''
            }
          }
        }, '选择推广站点')
      }
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$router.push({path: '/message', query: {posterId: this.encodeId(params.row.memberId)}})
            }
          }
        }, '留言'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.auth.open(params.row.memberId)
            }
          }
        }, '权限'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open('修改员工', params.row.memberId)
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
              title: '您确定要删除该账号吗！',
              width: '185',
              placement: 'top-end'
            },
            on: {
              'on-ok': () => {
                this.$http.delete('/rest/api/submember/detail/' + params.row.memberId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.list.splice(params.index, 1)
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
              }
            }
          }, '删除')
        ]),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.posterId = ctx.encodeId(params.row.memberId)
              this.layoutChange()
              this.modal1 = true
            }
          }
        }, '推广')
      ])
    }
  }
}
</script>

<style lang="less">
</style>
