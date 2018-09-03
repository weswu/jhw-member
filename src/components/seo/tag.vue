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
      <JPagination :fixed="true" :borderTop="true" :total="total" :searchData='searchData' @on-change="get"/>
    </div>
    <div class="j_sort" :hidden="active !== '1'">
      <Button type="info" icon="plus" class="w130" @click="addTagCate" style="margin-bottom: 9px;">添加标签分类</Button>
      <Table ref="dragable" :columns="columns2" :data="catelist"/>
    </div>
    <Detail ref="detail" :list="catelist" @on-change="get"/>
    <CateDetail ref="cateDetail" :list="catelist" @on-change="getCate"/>
  </div>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/components/seo/tag-detail'
import CateDetail from '@/pages/category/Detail'
export default {
  components: {
    JPagination,
    Detail,
    CateDetail
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
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10
      },
      // 标签分类
      columns2: [
        { type: 'index', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60 },
        { title: '分类名称', className: 'j_table_title', minWidth: 200, render: this.nameFilter2 },
        { title: '移序', className: 'j_table_sort', key: 'sort', width: 130, render: this.sortFilter2 },
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate2 }
      ],
      catelist: []
    }
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
      let list = []
      // 1级
      data.forEach(item => {
        if (!item.belongId) {
          item.isroot = false // 根目录和三角
          item._checked = false
          item.expand = false // 三角图标展开-关闭
          item.bg = false // 层级背景颜色
          item.grade = '1'
          item.edittingCell = {
            sort: false,
            api: 'category',
            id: item.categoryId
          }
          list.push(item)
        }
      })
      // 2级
      data.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '1' && (row.belongId === item.categoryId)) {
            item.isroot = true
            row.isroot = false
            row._checked = false
            row.hidden = true // 显示隐藏
            row.expand = false
            row.bg = false
            row.grade = '2'
            row.edittingCell = {
              sort: false,
              api: 'category',
              id: row.categoryId
            }
            list.splice(index + 1, 0, row)
          }
        })
      })
      // 3级
      data.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '2' && (row.belongId === item.categoryId)) {
            item.isroot = true
            row.isroot = false
            row._checked = false
            row.hidden = true
            row.bg = false
            row.grade = '3'
            row.edittingCell = {
              sort: false,
              api: 'category',
              id: row.categoryId
            }
            list.splice(index + 1, 0, row)
          }
        })
      })
      this.catelist = list
    },
    // 功能
    add () {
      this.$refs.detail.open()
    },
    addTagCate () {
      this.$refs.cateDetail.open()
    },
    search () {
      this.searchData.page = 1
      this.get()
    },
    // 过滤
    indexFilter (h, params) {
      return this.index2(this, h, params)
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
      let format = this.dateFormat(params.row.addTime, 'yyyy-MM-dd')
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
                this.$http.delete('/rest/api/tag/detail/' + params.row.tagId).then((res) => {
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
      return h('div', {
        style: {
          display: 'flex'
        }
      }, [
        h('span', {
          style: {
            width: '37px',
            display: params.row.grade === '2' ? 'inline-block' : 'none'
          }
        }),
        h('span', {
          style: {
            width: '60px',
            display: params.row.grade === '3' ? 'inline-block' : 'none'
          }
        }),
        h('Input', {
          props: {
            value: params.row.name
          },
          on: {
            input: (val) => {
              params.row.name = val
            },
            'on-blur': () => {
              let data = {
                model: JSON.stringify({
                  id: params.row.categoryId,
                  name: params.row.name
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/category/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  // ctx.$Message.success('修改成功')
                } else {
                  ctx.$Message.error(res.msg)
                }
              })
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
    initList (idx, endIdx, grade) {
      var ctx = this
      let list = JSON.parse(JSON.stringify(this.catelist))
      list.forEach((item, index) => {
        if (index === endIdx) {
          ctx.catelist.splice(index - endIdx + idx, 0, item)
          ctx.catelist.splice(index + 1, 1)
          console.log('1-' + index)
        }
        if (index > endIdx) {
          if (parseInt(item.grade) < grade || parseInt(item.grade) === grade) {
            endIdx = 10000
          } else {
            console.log('2-' + index)
            ctx.catelist.splice(index - endIdx + idx, 0, item)
            ctx.catelist.splice(index + 1, 1)
          }
        }
      })
    },
    sortFilter2 (h, params) {
      var ctx = this
      let sort = h('div', [
        h('i', {
          class: {
            'none': true,
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              params.row.edittingCell[params.column.key] = true
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
                // 向上-最近子级orgGrade
                if (params.index > 0) {
                  let grade = parseInt(params.row.grade)
                  for (var i = 0; i < params.index; i++) {
                    let org = ctx.catelist[params.index - i - 1]
                    let orgGrade = parseInt(org.grade)
                    if (orgGrade < grade) return false
                    if (orgGrade === grade) {
                      this.sortPost(params.row.categoryId, org.sort, 'category')
                      this.sortPost(org.categoryId, params.row.sort, 'category')
                      const sort = params.row.sort
                      ctx.catelist[params.index].sort = org.sort
                      org.sort = sort
                      ctx.initList(params.index - i - 1, params.index, grade)
                      return false
                    }
                  }
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
                if (params.index < this.catelist.length - 1) {
                  let grade = parseInt(params.row.grade)
                  for (var i = 0; i < this.catelist.length - params.index; i++) {
                    let org = ctx.catelist[params.index + i + 1]
                    let orgGrade = parseInt(org.grade)
                    if (orgGrade < grade) return false
                    if (orgGrade === grade) {
                      this.sortPost(params.row.categoryId, org.sort, 'category')
                      this.sortPost(org.categoryId, params.row.sort, 'category')
                      const sort = params.row.sort
                      ctx.catelist[params.index].sort = org.sort
                      org.sort = sort
                      ctx.initList(params.index, params.index + i + 1, grade)
                      return false
                    }
                  }
                }
              }
            }
          })
        ])
      ])
      return h('Row', {
        props: {
          type: 'flex',
          align: 'middle',
          justify: 'center'
        }
      }, [
        h('Col', {
          props: {
            span: '14'
          }
        }, [
          !params.row.edittingCell[params.column.key] ? h('span', params.row[params.column.key]) : this.cellInput(this, h, params)
        ]),
        h('Col', {
          props: {
            span: '10'
          }
        }, [
          params.row.edittingCell[params.column.key] ? this.saveIncellEditBtn(this, h, params) : sort
        ])
      ])
    },
    renderOperate2 (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.cateDetail.open(params.row.categoryId)
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
                    ctx.list.splice(params.index, 1)
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
