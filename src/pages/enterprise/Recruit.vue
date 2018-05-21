<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuEnter'" :active="'recruit'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'招聘管理'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加招聘</Button>
        </div>
        <Table :columns="columns" :data="list"></Table>
        <JPagination :total="total" :searchData='searchData' @on-change="pageChange" :right="'24'"/>
      </Content>
    </Layout>
    <Detail ref='detail'/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/pages/enterprise/RecruitDetail'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题', render: this.titleFilter },
        { title: '职务', render: this.dutyFilter },
        { title: '招聘人数', render: this.sumFilter },
        { title: '添加时间', key: 'addTime', width: 100, render: this.dataFilter },
        { title: '状态', width: 100, render: this.stateFilter },
        { title: '排序', className: 'j_table_sort', width: 100, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
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
    add () {
      this.$refs.detail.open()
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].sort
      let sortB = this.list[b].sort
      this.sortPost(this.list[a].jobId, sortB)
      this.sortPost(this.list[b].jobId, sortA)
      objA.sort = sortB
      objB.sort = sortA
      this.list[a] = objB
      this.list[b] = objA
    },
    sortPost (id, sort) {
      let data = {
        model: JSON.stringify({
          id: id,
          sort: sort
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/job/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          console.log(sort)
        } else {
          this.$Message.error(res.msg)
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
              placeholder: '修改标题'
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
              placeholder: '修改职务'
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
    sumFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.sum),
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
                  sum: params.row.sum2
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/job/detail/' + params.row.jobId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  ctx.$Message.success('修改成功')
                  params.row.sum = params.row.sum2
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
              value: params.row.sum,
              autofocus: true,
              placeholder: '修改招聘人数'
            },
            on: {
              input: (val) => {
                params.row.sum2 = val
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
    sortFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.sort),
        h('i', {
          class: {
            'none': true,
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Input', {
                    props: {
                      value: params.row.sort,
                      autofocus: true,
                      placeholder: '修改排序'
                    },
                    on: {
                      input: (val) => {
                        params.row.sort2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.newsId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/job/detail/' + params.row.jobId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].sort = params.row.sort2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        }),
        h('span', {
          class: {
            'j_sort': true
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-icon--': true
            },
            on: {
              click: () => {
                if (params.index > 0) {
                  this.sortable(params.index, params.index - 1)
                }
              }
            }
          }),
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-icon--1': true
            },
            on: {
              click: () => {
                if (params.index < this.searchData.pageSize - 1) {
                  this.sortable(params.index, params.index + 1)
                }
              }
            }
          })
        ])
      ])
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
