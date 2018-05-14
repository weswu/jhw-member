<template>
  <Layout class="j_layout ivu-layout-has-sider j_product">
    <MenuBar :data="'menu_product'" :active="'product'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'产品列表'" :lan="true" @on-change="get"/>
        <div class="j_search">
          <Row :gutter="24">
            <Col span="6">
              <Button type="info" icon="plus" class="w130" @click="add">添加产品</Button>
            </Col>
            <Col span="18" style="text-align:right">
              <span class="a_underline" @click="myShow">我的显示</span>
              <Input v-model="model.title" placeholder="请输入产品名称" style="width:200px"></Input>
              <Button class="search" @click="search">搜索</Button>
              <Button class="grey w130" @click="update" style="margin-right: 0;">高级搜索</Button>
            </Col>
          </Row>
        </div>
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
      </Content>
      <JPagination :fixed="true" :checkbox="true" :total="total" :searchData='searchData' @on-change="pageChange">
        <span slot="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button size="small" @click="delAll">删除</Button>
          <Button size="small" @click="update">复制</Button>
          <Button size="small" @click="update">上架</Button>
          <Button size="small" @click="update">下架</Button>
          <Button size="small" @click="categoryAll">转移分类</Button>
        </span>
      </JPagination>
    </Layout>
    <SeoDetail ref="seoDetail"/>
    <TransferCategory ref="transferCategory" :data="categoryList" :ids="ids" :type="'product'" @on-change="get"/>
    <Modal class-name="j_modal" v-model="modalMyShow" width="430">
      <i class="iconfont icon-x" slot="close"></i>
      <JHeader :title="'我的显示'" style="border-bottom:none;margin-bottom:5px;"/>
      <div class="j_tip" style="margin: 0 0 20px 0">
        温馨提醒：勾选不要超过8个，以免列表显示不下。
      </div>
      <CheckboxGroup v-model="checkboxMyShow" class="j_checkout">
        <Checkbox label="序号">序号</Checkbox><Checkbox label="产品图片">产品图片</Checkbox>
        <Checkbox label="产品名称">产品名称</Checkbox><Checkbox label="产品型号">产品型号</Checkbox>
        <Checkbox label="产品价格">产品价格</Checkbox><Checkbox label="产品分类">产品分类</Checkbox>
        <Checkbox label="添加时间">添加时间</Checkbox><Checkbox label="是否上架">是否上架</Checkbox>
        <Checkbox label="排序">排序</Checkbox><Checkbox label="二维码">二维码</Checkbox>
      </CheckboxGroup>
      <Button type="primary" @click="save" style="margin-top: 10px">保存</Button>
    </Modal>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Sortable from 'sortablejs'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    SeoDetail,
    TransferCategory
  },
  data () {
    return {
      modalMyShow: false,
      checkboxMyShow: ['序号', '产品图片', '产品名称', '产品型号', '产品分类', '添加时间', '是否上架', '排序'],
      columns: [],
      list: [],
      categoryList: [],
      searchData: {
        page: 1,
        pageSize: 10
      },
      model: {},
      total: 0,
      toggle: false,
      ids: ''
    }
  },
  mounted () {
    var ctx = this
    setTimeout(function () {
      let el = document.getElementsByClassName('ivu-table-tbody')[0]
      Sortable.create(el, {
        group: {
          name: 'list',
          pull: true
        },
        animation: 120,
        onUpdate (e) {
          ctx.sortable(e.oldIndex, e.newIndex)
        }
      })
    }, 2000)
  },
  created () {
    this.get()
    this.getCate()
    this.save()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/product/list?' + qs.stringify(this.searchData)).then(res => {
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
    getCate () {
      this.$http.get('/rest/api/category/product?pageSize=1000').then(res => {
        if (res.success) {
          this.categoryList = res.attributes.data
        }
      })
    },
    // 功能
    lanRefresh () {
      this.searchData.page = 1
      this.get()
    },
    add () {
      this.$router.push({ path: '/product/add' })
    },
    myShow () {
      this.modalMyShow = true
    },
    save () {
      this.columns = [
        { type: 'selection', className: 'j_table_checkbox', width: 44 }
      ]
      this.checkboxMyShow.forEach(val => {
        if (val === '序号') {
          this.columns.push({ type: 'index2', className: 'j_table_index', title: '序号', align: 'center', width: 60, render: this.indexFilter })
        }
        if (val === '产品图片') {
          this.columns.push({ title: '产品图片', className: 'j_table_img', key: 'pic', width: 105, render: this.imgFilter })
        }
        if (val === '产品名称') {
          this.columns.push({ title: '产品名称', className: 'j_table_title', sortable: true, width: 150, render: this.nameFilter })
        }
        if (val === '产品型号') {
          this.columns.push({ title: '产品型号', className: 'j_table_title', sortable: true, width: 120, render: this.prodtypeFilter })
        }
        if (val === '产品分类') {
          this.columns.push({ title: '产品分类', className: 'j_table_category', sortable: true, width: 130, ellipsis: true, render: this.categoryFilter })
        }
        if (val === '添加时间') {
          this.columns.push({ title: '添加时间', sortable: true, width: 105, render: this.dataFilter })
        }
        if (val === '是否上架') {
          this.columns.push({ title: '是否上架', sortable: true, width: 105, render: this.isdisplayFilter })
        }
        if (val === '排序') {
          this.columns.push({ title: '排序', className: 'j_table_sort', sortable: true, minWidth: 80, render: this.sortFilter })
        }
      })
      this.columns.push({ title: '操作', className: 'j_table_operate', align: 'left', width: 160, render: this.renderOperate })
      this.modalMyShow = false
    },
    sortable (a, b) {
      let objA = this.list[a]
      let objB = this.list[b]
      let sortA = this.list[a].sort
      let sortB = this.list[b].sort
      this.sortPost(this.list[a].productId, sortB)
      this.sortPost(this.list[b].productId, sortA)
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
      this.$http.post('/rest/api/product/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          console.log(sort)
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    // 搜索
    search (e) {
      if (this.model.title) {
        this.searchData.model = JSON.stringify(this.model)
      }
      this.searchData.page = 1
      this.get()
    },
    // 分页
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids = item.productId
        } else {
          this.ids = this.ids + ',' + item.productId
        }
      })
    },
    handleSelectAll () {
      this.$refs.selection.selectAll(this.toggle)
    },
    update () {
      return this.$Message.info('更新中...')
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      var ctx = this
      this.$http.post('/rest/api/product/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.ids.split(',').forEach(id => {
            ctx.list.forEach((item, index) => {
              if (id === item.productId) {
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
    categoryAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$refs.transferCategory.open()
    },
    // 过滤
    indexFilter (h, params) {
      let index = 0
      let data = []
      if (params.row.isBest === '01') {
        index += 1
      }
      if (params.row.isNew === '01') {
        index += 1
      }
      if (params.row.isHot === '01') {
        index += 1
      }
      if (index > 1) {
        if (params.row.isBest === '01') {
          data.push(h('span', {
            style: {
              color: '#ff7e3e'
            }
          }, '精'))
        }
        if (params.row.isNew === '01') {
          data.push(h('span', {
            style: {
              color: '#417505'
            }
          }, '新'))
        }
        if (params.row.isHot === '01') {
          data.push(h('span', {
            style: {
              color: '#d0021b'
            }
          }, '热'))
        }
      } else {
        if (params.row.isBest === '01') {
          data.push(h('span', {
            style: {
              color: '#ff7e3e'
            },
            domProps: {
              innerHTML: '精<br/>品'
            }
          }))
        }
        if (params.row.isNew === '01') {
          data.push(h('span', {
            style: {
              color: '#417505'
            },
            domProps: {
              innerHTML: '新<br/>品'
            }
          }))
        }
        if (params.row.isHot === '01') {
          data.push(h('span', {
            style: {
              color: '#d0021b'
            },
            domProps: {
              innerHTML: '热<br/>销'
            }
          }))
        }
      }
      return h('div', [
        h('div', {
          class: {
            proType: true
          }
        }, [
          h('div', data),
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-bianji2': true
            },
            on: {
              click: () => {
                this.$Message.info('info')
              }
            }
          })
        ]),
        h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
      ])
    },
    imgFilter (h, params) {
      return h('div', {
        class: {
          'product-img': true
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
            display: !params.row.picPath ? 'block' : 'none'
          }
        }),
        h('img', {
          style: {
            display: params.row.picPath ? 'inline-block' : 'none'
          },
          attrs: {
            src: 'http://img.jihui88.com/' + params.row.picPath
          }
        })
      ])
    },
    nameFilter (h, params) {
      var ctx = this
      let data = [
        h('li', {
          style: {
            background: '#e9e9e9'
          }
        }, '请选择')
      ]
      data.push(h('li', [
        h('Poptip', {
          props: {
            placement: 'right',
            trigger: 'hover'
          },
          class: {
            'pro_name_pop': true
          }
        }, [
          h('span', '网站编号： 203'),
          h('img', {
            slot: 'content',
            attrs: {
              src: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w=210&text=http://pc.jihui88.com/rest/site/203/pd?itemId=' + params.row.productId2
            }
          })
        ])
      ]))
      data.push(h('li', [
        h('Poptip', {
          props: {
            placement: 'right',
            trigger: 'hover'
          },
          class: {
            'pro_name_pop': true
          }
        }, [
          h('span', '网站编号： 203'),
          h('img', {
            slot: 'content',
            attrs: {
              src: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w=210&text=http://pc.jihui88.com/rest/site/203/pd?itemId=' + params.row.productId2
            }
          })
        ])
      ]))
      return h('div', {
        class: {
          title: true
        }
      }, [
        h('div', [
          h('span', {
            style: {
              color: '#5b5b5b',
              height: '40px',
              display: 'block'
            }
          }, params.row.name || '产品名称'),
          h('p', [
            h('Poptip', {
              props: {
                placement: 'right'
              },
              class: {
                'pro_name_pop': true
              }
            }, [
              h('span', {
                style: {
                  color: '#fff',
                  background: '#ce3b28',
                  padding: '3px',
                  cursor: 'pointer'
                }
              }, '码'),
              h('i', {
                style: {
                  paddingLeft: '2px'
                },
                class: {
                  'iconfont': true,
                  'icon-tel': true
                }
              }),
              h('ul', {
                slot: 'content'
              }, data)
            ])
          ])
        ]),
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
                      value: params.row.name,
                      autofocus: true,
                      placeholder: '修改新闻标题'
                    },
                    on: {
                      input: (val) => {
                        params.row.name2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      name: params.row.name2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].name = params.row.name2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        })
      ])
    },
    prodtypeFilter (h, params) {
      var ctx = this
      return h('div', {
        class: {
          title: true
        }
      }, [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, params.row.prodtype),
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
                      value: params.row.prodtype,
                      autofocus: true,
                      placeholder: '修改新闻标题'
                    },
                    on: {
                      input: (val) => {
                        params.row.prodtype2 = val
                      }
                    }
                  })
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      prodtype: params.row.prodtype2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].prodtype = params.row.prodtype2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        })
      ])
    },
    categoryFilter (h, params) {
      var ctx = this
      let text = ''
      let option = []
      this.categoryList.forEach(item => {
        if (params.row.category === item.categoryId) {
          text = item.name
        }
        option.push(h('Option', {
          props: {
            value: item.categoryId
          }
        }, item.name))
      })
      return h('div', [
        h('span', {
          style: {
            color: '#5b5b5b'
          }
        }, text),
        h('i', {
          class: {
            'none': true,
            'iconfont': true,
            'icon-shangxiajiantou': true
          },
          style: {
            color: '#a3a3a3',
            fontSize: '12px'
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                render: (h) => {
                  return h('Select', {
                    props: {
                      value: params.row.category
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.category2 = val
                      }
                    }
                  }, option)
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      category: params.row.category2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].category = params.row.category2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        })
      ])
    },
    dataFilter (h, params) {
      let format = this.dataFormat(params.row.addTime)
      return h('div', format)
    },
    isdisplayFilter (h, params) {
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
              this.$Modal.confirm({
                render: (h) => {
                  return h('Select', {
                    props: {
                      value: params.row.isdisplay,
                      placeholder: '是否上架'
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.isdisplay2 = val
                      }
                    }
                  }, [
                    h('Option', {
                      props: {
                        value: '1'
                      }
                    }, '是'),
                    h('Option', {
                      props: {
                        value: '0'
                      }
                    }, '否')
                  ])
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      isdisplay: params.row.isdisplay2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].isdisplay = params.row.isdisplay2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        })
      ])
    },
    topproductFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.topproduct === '01' ? '是' : '否'),
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
                  return h('Select', {
                    props: {
                      value: params.row.topproduct,
                      placeholder: '是否置顶'
                    },
                    on: {
                      'on-change': (val) => {
                        params.row.topproduct2 = val
                      }
                    }
                  }, [
                    h('Option', {
                      props: {
                        value: '01'
                      }
                    }, '是'),
                    h('Option', {
                      props: {
                        value: '00'
                      }
                    }, '否')
                  ])
                },
                onOk: () => {
                  let data = {
                    model: JSON.stringify({
                      id: params.row.productId,
                      topproduct: params.row.topproduct2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                    if (res.success) {
                      ctx.$Message.success('修改成功')
                      ctx.list[params.index].topproduct = params.row.topproduct2
                    } else {
                      ctx.$Message.error(res.msg)
                    }
                  })
                }
              })
            }
          }
        })
      ])
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
                      id: params.row.productId,
                      sort: params.row.sort2
                    }),
                    _method: 'put'
                  }
                  ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
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
              this.$Message.success('更新中..')
            }
          }
        }, '修改'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$refs.seoDetail.open(params.row.productId, 'product')
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
                this.$http.delete('/rest/api/product/detail/' + params.row.productId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].productId === params.row.productId) {
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
.j_modal{
  .ivu-modal-body{
    padding: 22px 54px 45px 54px;
  }
  .ivu-modal-close{
    right: 25px;
    top: 25px;
  }
  .icon-x{
    color: #c7c7c7
  }
  .ivu-modal-footer{
    display: none
  }
}
.j_checkout{
  .ivu-checkbox-group-item{
    width: 45%;
    margin-bottom: 5px;
    .ivu-checkbox{
      margin-right: 5px;
    }
  }
  .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #e1e6eb;
    background-color: #fff;
    &::after{
      border: 1px solid #f5a623;
      border-top: 0;
      border-left: 0;
    }
  }
}
.j_product {
  .pro_name_pop{
    .ivu-poptip-arrow{
      border-right-color: '#e9e9e9'
    }
    .ivu-poptip-body{
      padding: 0;
      .ivu-poptip-body{
        padding: 5px;
      }
      li{
        padding: 8px 10px;
      }
    }
  }
  .a_underline{
    margin-right: 20px;
  }
  .ivu-table td{
    height: 98px
  }
  .ivu-table-body{
    .j_table_checkbox{
      vertical-align: top;
      .ivu-table-cell{
        padding-top: 16px;
      }
    }
  }
  .j_table_index{
    position: relative;
    .proType{
      position: absolute;
      left: -32px;
      display: flex;
      align-items: center;
      line-height: 1.4;
      div{
        display: flex;
        flex-direction: column;
      }
    }
  }
  .j_table_img{
    .product-img{
      width: 68px;
      height: 68px;
      line-height: 66px;
      text-align: center;
      background: #f5f6fa;
      border: 1px solid #d5d5d5;
      img{
        margin: 0px auto;
        display: inline-block;
        vertical-align: middle;
        max-height: 68px;
        max-width: 68px;
      }
    }
  }
  .j_table_category .ivu-table-cell div{
    span{
     width: 80%;
     display: inline-block;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
    }
    i{
      vertical-align: top !important;
    }
  }
}
</style>
