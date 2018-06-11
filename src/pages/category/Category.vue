<template>
  <Layout class="j_layout ivu-layout-has-sider j_category">
    <MenuBar :data="'menu_' + $route.params.id" :active="'category/' + $route.params.id"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'分类管理'" :lan="true" @on-change="get"/>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加{{$route.params.id === 'product' ?'产品':'新闻'}}分类</Button>
          <Upload ref="upload" :action="'/commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=00&attId=&id=all'" style="display:none"
            name="Filedata"
            :max-size="2048"
            :on-success="handleSuccess">
            <div id="upload">上传</div>
          </Upload>
        </div>
        <DragableTable
          ref="selection"
          :list="$route.params.id === 'product' ? $store.state.productCategory : $store.state.newsCategory"
          :columns="columns"
          @on-update="tableUpdate"
          @on-selection-change="handleSelectChange"/>
      </Content>
      <div class="j_pagination fixed border">
        <div class="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button type="ghost" size="small" @click="delAll">删除</Button>
          <Button type="ghost" size="small" @click="displayAll('1')">显示</Button>
          <Button type="ghost" size="small" @click="displayAll('0')">隐藏</Button>
          <Button type="ghost" size="small" @click="categoryAll">转换分类</Button>
          <Button type="ghost" size="small" @click="hiddenAll(false)">展开</Button>
          <Button type="ghost" size="small" @click="hiddenAll(true)">折叠</Button>
        </div>
      </div>
    </Layout>
    <SeoDetail ref="seoDetail"/>
    <Detail ref="detail"/>
    <TransferCategory
      ref="transferCategory"
      :data="$store.state[$route.params.id+'Category']"
      :ids="ids"
      :type="'category/'+$route.params.id"
      @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import DragableTable from '@/components/group/j-dragable-table'
import SeoDetail from '@/pages/static/SeoDetail'
import Detail from '@/pages/category/Detail'
import TransferCategory from '@/components/group/transfer-category'
export default {
  components: {
    MenuBar,
    JHeader,
    DragableTable,
    SeoDetail,
    Detail,
    TransferCategory
  },
  data () {
    return {
      columns: [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { type: 'index2', className: 'j_table_checkbox', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '分类名称', className: 'j_table_title', minWidth: 200, render: this.nameFilter },
        { title: '是否显示', width: 105, render: this.displayFilter },
        { title: '移序', className: 'j_table_sort', width: 130, render: this.sortFilter },
        { title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate }
      ],
      ids: '',
      type: 'product',
      list: this.$route.params.id === 'product' ? this.$store.state.productCategory : this.$store.state.newsCategory,
      item: {},
      toggle: false
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.newsCategory
    })
  },
  created () {
    this.get()
    if (this.$route.params.id === 'product') {
      let col1 = { title: '分类图片', width: 105, render: this.imgFilter }
      let col2 = { title: '分类描述', width: 105, render: this.descFilter }
      this.columns.splice(3, 0, col2)
      this.columns.splice(3, 0, col1)
    }
  },
  methods: {
    get () {
      this.$store.dispatch('getCategory', this.$route.params.id)
    },
    // 功能
    add () {
      this.$refs.detail.open()
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'category', 'categoryId')
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
      this.$refs.selection.$refs.dragable.selectAll(this.toggle)
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/news/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success(res.msg || '删除成功')
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
      this.list.forEach(item => {
        item.children.forEach(item1 => {
          item1.hidden = bool
          item1.children.forEach(item2 => {
            item2.hidden = bool
          })
        })
      })
      if (this.$route.params.id === 'product') this.$store.commit('setProductCategory', this.list)
      if (this.$route.params.id === 'news') this.$store.commit('setNewsCategory', this.list)
    },
    handleSuccess (res, file) {
      var ctx = this
      let data = {
        model: JSON.stringify({
          id: this.item.categoryId,
          image: file.src,
          editField: true
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/category/detail/' + this.item.categoryId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
      setTimeout(function () {
        ctx.$refs.upload.clearFiles()
      }, 1000)
    },
    // 过滤
    indexFilter (h, params) {
      let isroot = false
      if (this.list.length > (params.index + 1)) {
        isroot = params.row.grade === '1' && this.list[params.index + 1].grade !== '1'
      }
      return h('div', [
        h('i', {
          class: {
            iconfont: true,
            'icon-xialajiantou': isroot
          },
          style: {
            color: '#000',
            display: 'block',
            transform: params.row.expand ? 'rotate(0deg)' : 'rotate(-90deg)'
          },
          on: {
            click: () => {
              // params.row.expand = !params.row.expand
            }
          }
        })
      ])
    },
    nameFilter (h, params) {
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
              params.row.name = val
            },
            'on-change': () => {
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
            document.getElementById('upload').click()
          }
        }
      }, [
        h('i', {
          class: {
            'iconfont': true,
            'icon-tupian': true
          },
          style: {
            padding: '0',
            display: 'block'
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
    sortFilter (h, params) {
      var ctx = this
      let list = this.$route.params.id === 'product' ? this.$store.state.productCategory : this.$store.state.newsCategory
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
            style: {
              fontSize: '8px'
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
              'icon-tuozhuai': true
            },
            style: {
              fontSize: '8px'
            }
          }),
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-icon--1': true
            },
            style: {
              fontSize: '8px'
            },
            on: {
              click: () => {
                if (params.index < list.length - 1) {
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
