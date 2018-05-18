<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuEnter'" :active="'recruit'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'招聘管理'"/>
      <Content>
        <Table :columns="columns" :data="list"></Table>
        <JPagination :total="total" :searchData='searchData' @on-change="pageChange" :right="'24'"/>
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
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题', render: this.titleFilter },
        { title: '职务', render: this.dutyFilter },
        { title: '招聘人数', key: 'sum' },
        { title: '添加时间', key: 'addTime', width: 100, render: this.dataFilter },
        { title: '状态', width: 100, render: this.stateFilter },
        { title: '排序', key: 'sort', width: 100 },
        { title: '操作', className: 'j_table_operate', width: 120, align: 'right', render: this.renderOperate }
      ],
      list: [],
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
          this.list = res.attributes.data
        }
      })
    },
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    titleFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.title),
        h('Poptip', {
          props: {
            confirm: true,
            width: '200',
            placement: 'right'
          },
          class: {
            j_poptip_confirm_edit: true
          },
          on: {
            'on-ok': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.jobId,
                  title: params.row.title2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/job/detail/' + params.row.jobId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                  params.row.title = params.row.title2
                } else {
                  ctx.$Message.success(res.msg)
                }
              })
            },
            'on-cancel': () => {
              console.log('cancel')
            }
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-bianji2': true
            }
          }),
          h('Input', {
            slot: 'title',
            props: {
              value: params.row.title,
              autofocus: true,
              placeholder: '修改新闻标题'
            },
            on: {
              input: (val) => {
                params.row.title2 = val
              }
            }
          })
        ])
      ])
    },
    dutyFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.duty),
        h('Poptip', {
          props: {
            confirm: true,
            width: '200',
            placement: 'right'
          },
          class: {
            j_poptip_confirm_edit: true
          },
          on: {
            'on-ok': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.jobId,
                  duty: params.row.duty2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/job/detail/' + params.row.jobId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                  params.row.duty = params.row.duty2
                } else {
                  ctx.$Message.success(res.msg)
                }
              })
            },
            'on-cancel': () => {
              console.log('cancel')
            }
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-bianji2': true
            }
          }),
          h('Input', {
            slot: 'title',
            props: {
              value: params.row.duty,
              autofocus: true,
              placeholder: '修改新闻标题'
            },
            on: {
              input: (val) => {
                params.row.duty2 = val
              }
            }
          })
        ])
      ])
    },
    dataFilter (h, params) {
      let format = this.dataFormat(params.row.addTime, 'yyyy-MM-dd')
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
              this.$Message.info('更新中')
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
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].jobId === params.row.jobId) {
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
