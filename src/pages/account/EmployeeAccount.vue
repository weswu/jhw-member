<template>
  <Layout class="ivu-layout-has-sider j_employee_account">
      <MenuBar :data="'menuAccount'" :active="'employee_account'"/>
      <Layout class="j_layout_content">
        <JHeader :title="'员工账号管理'">
          <div slot="btn">
            <Button type="primary" @click="add">新增员工</Button>
            <Button type="primary" @click="analysis">员工推广分析</Button>
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
        title="推广"
        cancelText="取消">
        <p style="padding-bottom:10px;">注：绑定域名后可用<a href="/bind" class="viewBind">(查看绑定)</a></p>
        <Tabs>
          <TabPane label="手机网站推广">
            <img :src="'http://wcd.jihui88.com/rest/comm/qrbar/create?w=130&text='+src"><br/>
            <a href="javascritp:;" class="downloadQr" target="_blank" @click="downloadQr" style="padding-left:31px;">下载二维码</a>
          </TabPane>
          <TabPane label="PC网站推广">
            <Input v-model="url" style="width:250px"></Input>
            <Button v-clipboard:copy="url" v-clipboard:success="copy" style="margin-left:10px;">复制</Button>
          </TabPane>
        </Tabs>
      </Modal>
      <Authority ref="auth"/>
      <Detail ref="detail"/>
    </Tabs>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/account/Detail'
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
        { title: '账号', key: 'username' },
        { title: '姓名', key: 'name' },
        { title: '职位', key: 'position' },
        { title: '手机号码', key: 'mobile' },
        { title: 'Email', key: 'email' },
        { title: '操作', className: 'j_table_operate', align: 'right', width: 202, render: this.renderOperate }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      modal1: false,
      src: 'http://m.baidu.com?memberId=1163',
      url: 'http://53happy.com?memberId=1163',
      memberId: '',
      ids: '',
      toggle: false
    }
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
    analysis () {
      this.$router.push({path: 'employee_account_analysis'})
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
      window.open('http://wcd.jihui88.com/rest/comm/qrbar/createAndDownload?w=300&text=' + this.src)
    },
    encodeId (target) {
      return target == null ? '' : target.replace(/^[^1-9]+/, '')
    },
    // 过滤
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
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
              this.src = encodeURIComponent(params.row.mobileBindUrl + '?memberId=' + ctx.encodeId(params.row.memberId))
              this.url = params.row.pcBindUrl + '?memberId=' + ctx.encodeId(params.row.memberId)
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
