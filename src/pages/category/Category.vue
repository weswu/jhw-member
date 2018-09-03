<template>
  <Layout class="ivu-layout-has-sider j_category">
    <MenuBar :data="'menu_' + $route.params.id" :active="'category/' + $route.params.id"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'分类管理'" :lan="true" @on-change="get"/>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加{{$route.params.id === 'product' ?'产品':'新闻'}}分类</Button>
          <a href="https://v.qq.com/x/page/e0753kcg4xb.html" class="a_underline" target="_blank" style="margin-left:10px;" v-if="$route.params.id === 'product'">产品分类视频教程</a>
          <a href="https://v.qq.com/x/page/g075303kosj.html" class="a_underline" target="_blank" style="margin-left:10px;" v-if="$route.params.id === 'news'">新闻分类视频教程</a>
        </div>
        <Table
          ref="selection"
          :row-class-name="rowClassName"
          :columns="columns"
          :data="this.type === 'product' ? this.$store.state.productCategory : this.$store.state.newsCategory"
          @on-selection-change="handleSelectChange"
        ></Table>
      </Content>
      <div class="j_pagination fixed border">
        <div class="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button type="ghost" size="small" @click="delAll">删除</Button>
          <Button type="ghost" size="small" @click="displayAll('1')">显示</Button>
          <Button type="ghost" size="small" @click="displayAll('0')">隐藏</Button>
          <Button type="ghost" size="small" @click="categoryAll">转移分类</Button>
          <Button type="ghost" size="small" @click="hiddenAll(false)">展开</Button>
          <Button type="ghost" size="small" @click="hiddenAll(true)">折叠</Button>
        </div>
      </div>
    </Layout>
    <SeoDetail ref="seoDetail"/>
    <Detail ref="detail" @on-change="get"/>
    <TransferCategory
      ref="transferCategory"
      :data="$store.state[$route.params.id+'Category']"
      :ids="ids"
      :type="'category/'+$route.params.id"
      @on-change="get"/>
    <JAlbum ref="album" @on-change="picChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import SeoDetail from '@/pages/static/SeoDetail'
import Detail from '@/pages/category/Detail'
import TransferCategory from '@/components/group/transfer-category'
import JAlbum from '@/components/group/j-album'
export default {
  components: {
    MenuBar,
    JHeader,
    SeoDetail,
    Detail,
    TransferCategory,
    JAlbum
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '分类名称', className: 'j_table_title', minWidth: 200, render: this.nameFilter },
        { title: '是否显示', width: 105, render: this.displayFilter },
        { title: '移序', className: 'j_table_sort', key: 'sort', width: 130, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate }
      ],
      ids: '',
      type: this.$route.params.id,
      list: [],
      item: {},
      toggle: false
    }
  },
  computed: {
    ...mapState(['productCategory', 'newsCategory'])
  },
  created () {
    this.get()
    if (this.type === 'product') {
      let col1 = { title: '分类图片', width: 105, render: this.imgFilter }
      let col2 = { title: '分类描述', width: 105, render: this.descFilter }
      this.columns.splice(3, 0, col2)
      this.columns.splice(3, 0, col1)
    }
  },
  methods: {
    get () {
      this.ids = ''
      this.$store.dispatch('getCategory', this.type).then(res => {
        if (this.type === 'product') {
          this.list = this.$store.state.productCategory
        } else {
          this.list = this.$store.state.newsCategory
        }
      })
    },
    rowClassName (row, index) {
      if (row.hidden) {
        return 'j-table-row-hidden'
      }
      return ''
    },
    // 功能
    add () {
      this.$refs.detail.open()
    },
    picChange (e) {
      let data = {
        model: JSON.stringify({
          id: this.item.categoryId,
          image: e.src,
          editField: true
        }),
        _method: 'put'
      }
      this.item.image = e.src
      this.$http.post('/rest/api/category/detail/' + this.item.categoryId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('图片修改成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.categoryId
        } else {
          this.ids = this.ids + ',' + item.categoryId
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
      this.$http.post('/rest/api/category/batchDel', qs.stringify({categoryIds: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
          this.ids = ''
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    displayAll (display) {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/category/display', qs.stringify({categoryIds: this.ids, isdisplay: display})).then((res) => {
        if (res.success) {
          this.$Message.success(display === '1' ? '显示成功' : '隐藏成功')
          this.get()
          this.ids = ''
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    categoryAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$refs.transferCategory.open()
    },
    hiddenAll (bool) {
      if (this.type === 'product') {
        this.productCategory.forEach(item => {
          if (item.grade !== '1') {
            item.hidden = bool
          }
          item.expand = !bool
        })
      } else {
        this.newsCategory.forEach(item => {
          if (item.grade !== '1') {
            item.hidden = bool
          }
          item.expand = !bool
        })
      }
    },
    // 过滤
    indexFilter (h, params) {
      var ctx = this
      return h('div', [
        h('i', {
          class: {
            iconfont: true,
            'icon-xialajiantou': params.row.isroot && params.row.grade === '1'
          },
          style: {
            color: '#808080',
            display: 'block',
            transform: params.row.expand ? 'rotate(0deg)' : 'rotate(-90deg)'
          },
          on: {
            click: () => {
              ctx.list.forEach(item => {
                if (item.categoryId === params.row.categoryId) {
                  item.expand = !params.row.expand
                }
                if (item.belongId === params.row.categoryId) {
                  item.hidden = params.row.expand
                  ctx.list.forEach(row => {
                    if (row.belongId === item.categoryId) {
                      if (params.row.expand) {
                        row.hidden = true
                      } else {
                        row.hidden = !item.expand
                      }
                    }
                  })
                }
              })
              // if (this.type === 'product') this.$store.commit('setProductCategory', this.list)
              // if (this.type === 'news') this.$store.commit('setNewsCategory', this.list)
            }
          }
        })
      ])
    },
    nameFilter (h, params) {
      var ctx = this
      return h('div', {
        class: {
          j_category_name: true
        }
      }, [
        h('span', {
          class: {
            iconfont: true,
            'icon-xialajiantou': params.row.isroot && params.row.grade === '2'
          },
          style: {
            padding: '7px 10px',
            width: '37px',
            color: '#666',
            display: params.row.grade !== '1' ? 'inline-block' : 'none',
            transform: params.row.expand ? 'rotate(0deg)' : 'rotate(-90deg)'
          },
          on: {
            click: () => {
              this.list.forEach(item => {
                if (item.categoryId === params.row.categoryId) {
                  item.expand = !params.row.expand
                }
                if (item.belongId === params.row.categoryId) {
                  item.hidden = params.row.expand
                }
              })
              // if (this.type === 'product') this.$store.commit('setProductCategory', this.list)
              // if (this.type === 'news') this.$store.commit('setNewsCategory', this.list)
            }
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
    imgFilter (h, params) {
      return h('div', {
        style: {
          width: '32px',
          height: '32px',
          lineHeight: '32px',
          textAlign: 'center',
          background: '#f5f6fa',
          border: '1px solid #d5d5d5'
        },
        on: {
          click: () => {
            this.item = params.row
            this.$refs.album.open()
          }
        }
      }, [
        h('i', {
          class: {
            'iconfont': true,
            'icon-tupian': true
          },
          style: {
            fontSize: '24px',
            padding: '0',
            display: !params.row.image ? 'block' : 'none'
          }
        }),
        h('img', {
          style: {
            display: params.row.image ? 'inline-block' : 'none',
            maxWidth: '32px'
          },
          attrs: {
            src: this.$store.state.status.IMG_HOST + this.picUrl(params.row.image, 4)
          }
        })
      ])
    },
    descFilter (h, params) {
      var ctx = this
      return h('i', {
        class: {
          'iconfont': true,
          'icon-bianji2': true
        },
        style: {
          display: 'block'
        },
        on: {
          click: () => {
            this.$Modal.confirm({
              render: (h) => {
                return h('Input', {
                  props: {
                    value: params.row.cdesc,
                    type: 'textarea',
                    autofocus: true,
                    placeholder: '描述'
                  },
                  on: {
                    input: (val) => {
                      params.row.cdesc = val
                    }
                  }
                })
              },
              onOk: () => {
                let data = {
                  model: JSON.stringify({
                    id: params.row.categoryId,
                    cdesc: params.row.cdesc,
                    editField: true
                  }),
                  _method: 'put'
                }
                ctx.$http.post('/rest/api/category/detail/' + params.row.categoryId, qs.stringify(data)).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('修改成功')
                  } else {
                    ctx.$Message.error(res.msg)
                  }
                })
              }
            })
          }
        }
      })
    },
    displayFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.isdisplay === '1' ? '是' : '否'),
        h('i', {
          class: {
            'none': true,
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              params.row.isdisplay = params.row.isdisplay === '1' ? '0' : '1'
              let data = {
                model: JSON.stringify({
                  id: params.row.categoryId,
                  isdisplay: params.row.isdisplay,
                  editField: true
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
        })
      ])
    },
    initList (idx, endIdx, grade) {
      var ctx = this
      let list = JSON.parse(JSON.stringify(this.list))
      list.forEach((item, index) => {
        if (index === endIdx) {
          item.expand = false
          ctx.list.splice(index - endIdx + idx, 0, item)
          ctx.list.splice(index + 1, 1)
          console.log('1-' + index)
        }
        if (index > endIdx) {
          if (parseInt(item.grade) < grade || parseInt(item.grade) === grade) {
            endIdx = 10000
          } else {
            console.log('2-' + index)
            item.hidden = true
            ctx.list.splice(index - endIdx + idx, 0, item)
            ctx.list.splice(index + 1, 1)
          }
        }
      })
      // if (this.type === 'product') this.$store.commit('setProductCategory', this.list)
      // if (this.type === 'news') this.$store.commit('setNewsCategory', this.list)
    },
    sortFilter (h, params) {
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
                    let org = ctx.list[params.index - i - 1]
                    let orgGrade = parseInt(org.grade)
                    if (orgGrade < grade) return false
                    if (orgGrade > grade) org.hidden = true
                    if (orgGrade === grade) {
                      this.sortPost(params.row.categoryId, org.sort, 'category')
                      this.sortPost(org.categoryId, params.row.sort, 'category')
                      const sort = params.row.sort
                      ctx.list[params.index].sort = org.sort
                      org.expand = false
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
                if (params.index < this.list.length - 1) {
                  let grade = parseInt(params.row.grade)
                  for (var i = 0; i < this.list.length - params.index; i++) {
                    let org = ctx.list[params.index + i + 1]
                    let orgGrade = parseInt(org.grade)
                    if (orgGrade < grade) return false
                    if (orgGrade > grade) org.hidden = true
                    if (orgGrade === grade) {
                      this.sortPost(params.row.categoryId, org.sort, 'category')
                      this.sortPost(org.categoryId, params.row.sort, 'category')
                      const sort = params.row.sort
                      ctx.list[params.index].sort = org.sort
                      ctx.list[params.index].expand = false
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
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.categoryId)
            }
          }
        }, '修改'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.seoDetail.open(params.row.categoryId, 'cate_' + this.$route.params.id)
            }
          }
        }, 'SEO'),
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
.j_category .ivu-table{
  .ivu-table-tip,.ivu-table-body {
    height: calc(100vh - 251px);
    border-bottom: 1px solid #e9e9e9;
    .iconfont{
      font-size: 8px
    }
  }
  td{
    height: 55px
  }
  .j_category_name{
    display: flex;
    i{
      line-height: 32px;
    }
  }
  .j-table-row-hidden{
    display: none;
  }
}
</style>
