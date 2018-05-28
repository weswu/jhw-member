<template>
  <div class="j_seo_tag">
    <div class="j_search">
      <Button class="mormal" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{active: active === item.value}">{{item.text}}</Button>
    </div>
    <div v-if="active === '0'">
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Button type="info" icon="plus" class="w130" @click="add">添加标签</Button>
          </Col>
          <Col>
            <Input v-model="searchData.name" placeholder="请输入标签名称" class="w144"></Input>
            <Button class="search" @click="search">搜索</Button>
          </Col>
        </Row>

      </div>
      <Table :columns="columns" :data="list"/>
      <JPagination :fixed="true" :borderTop="true" :total="total" :searchData='searchData' @on-change="pageChange" @on-pagesize="pageSizeChange" @refresh="get"/>
    </div>
    <div class="j_sort" :hidden="active !== '1'">
      <Table ref="dragable" :columns="columns2" :data="catelist"/>
    </div>
    <Detail ref="detail" :list="catelist" @on-change="get"/>
  </div>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/components/seo/tag-detail'
import Sortable from 'sortablejs'
export default {
  components: {
    JPagination,
    Detail
  },
  data () {
    return {
      btns: [
        { text: '标签', value: '0' },
        { text: '标签分类', value: '1' }
      ],
      active: '0',
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '标题名称', key: 'name' },
        { title: '所属分类', render: this.cateFilter },
        { title: '添加时间', render: this.dataFilter },
        { title: '操作', className: 'j_table_operate', align: 'center', width: 130, render: this.renderOperate }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10
      },
      // 标签分类
      columns2: [
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter2 },
        { title: '分类名称', className: 'j_table_title', minWidth: 200, render: this.nameFilter2 },
        { title: '移序', className: 'j_table_sort', width: 130, render: this.sortFilter2 },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 130, render: this.renderOperate2 }
      ],
      catelist: []
    }
  },
  mounted () {
    var ctx = this
    setTimeout(function () {
      var el = this.$refs.dragable.$children[1].$el.children[1]
      Sortable.create(el, {
        group: {
          name: 'list',
          pull: true
        },
        animation: 120,
        onUpdate (e) {
          ctx.sortable(e.oldIndex, e.newIndex, 'category', 'categoryId')
        }
      })
    }, 3000)
  },
  created () {
    this.getCate()
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/tag/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    getCate () {
      this.$http.get('/rest/api/category/tag?pageSize=1000').then(res => {
        if (res.success) {
          this.init(res.attributes.data)
        }
      })
    },
    init (data) {
      var ctx = this
      // 1级
      data.forEach(item => {
        if (!item.belongId) {
          item._checked = false
          item.grade = '1'
          this.catelist.push(item)
        }
      })
      // 2级
      data.forEach(row => {
        this.catelist.forEach((item, index) => {
          if (item.grade === '1' && (row.belongId === item.categoryId)) {
            row._checked = false
            row.grade = '2'
            ctx.catelist.splice(index + 1, 0, row)
          }
        })
      })
      // 3级
      data.forEach(row => {
        this.catelist.forEach((item, index) => {
          if (item.grade === '2' && (row.belongId === item.categoryId)) {
            row._checked = false
            row.grade = '3'
            ctx.catelist.splice(index + 1, 0, row)
          }
        })
      })
    },
    // 功能
    add () {
      this.$refs.detail.open()
    },
    search () {
      this.searchData.page = 1
      this.get()
    },
    pageChange (e) {
      this.searchData.page = e
      this.get()
    },
    pageSizeChange (e) {
      this.searchData.pageSize = e
      this.get()
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', this.index2(params.index, this.searchData))
    },
    cateFilter (h, params) {
      let text = ''
      this.catelist.forEach(item => {
        if (params.row.categoryId === item.categoryId) {
          text = item.name
        }
      })
      return h('div', text)
    },
    dataFilter (h, params) {
      let format = this.dataFormat(params.row.addTime, 'yyyy-MM-dd')
      return h('div', format)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.tagId)
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
    },
    // 分类过滤
    indexFilter2 (h, params) {
      let isroot = false
      if (this.catelist.length > (params.index + 1)) {
        isroot = params.row.grade === '1' && this.catelist[params.index + 1].grade !== '1'
      }
      return h('div', [
        h('i', {
          class: {
            iconfont: true,
            'icon-xialajiantou': isroot
          },
          style: {
            color: '#000',
            display: 'block'
          }
        })
      ])
    },
    nameFilter2 (h, params) {
      var ctx = this
      let isroot = false
      if (this.list.length > (params.index + 1)) {
        isroot = params.row.grade === '2' && this.list[params.index + 1].grade === '3'
      }
      return h('div', {
        class: {
          j_category_name: true
        }
      }, [
        h('span', {
          class: {
            iconfont: true,
            'icon-xialajiantou': isroot
          },
          style: {
            padding: '7px 10px',
            color: '#000',
            display: params.row.grade !== '1' ? 'inline-block' : 'none'
          }
        }),
        h('span', {
          style: {
            padding: '0 16px',
            display: params.row.grade === '3' ? 'inline-block' : 'none'
          }
        }),
        h('Input', {
          props: {
            value: params.row.name
          },
          on: {
            input: (val) => {
              params.row.name2 = val
            },
            'on-blur': () => {
              if (params.row.name2 !== '' && params.row.name2 !== params.row.name) {
                params.row.name = params.row.name2
                let data = {
                  model: JSON.stringify({
                    id: params.row.categoryId,
                    name: params.row.name
                  }),
                  _method: 'put'
                }
                this.$http.post('/rest/api/category/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('修改成功')
                  } else {
                    ctx.$Message.error(res.msg)
                  }
                })
              }
            }
          }
        }, [
          h('i', {
            class: {
              'iconfont': true,
              'icon-tupian': true
            }
          })
        ])
      ])
    },
    sortFilter2 (h, params) {
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
                      id: params.row.categoryId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/category/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
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
                  this.sortable(params.index, params.index - 1, 'category', 'categoryId')
                }
              }
            }
          }),
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-tuozhuai': true
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
                if (params.index < this.list.length - 1) {
                  this.sortable(params.index, params.index + 1, 'category', 'categoryId')
                }
              }
            }
          })
        ])
      ])
    },
    renderOperate2 (h, params) {
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
                this.$http.delete('/rest/api/category/detail/' + params.row.categoryId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].categoryId === params.row.categoryId) {
                        ctx.list.splice(i, 1)
                      }
                    }
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
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
.j_seo_tab .ivu-table-body{
  max-height: calc(100vh - 409px);
}
</style>
