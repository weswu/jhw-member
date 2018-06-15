  <template>
  <Layout class="j_layout ivu-layout-has-sider j_product">
    <MenuBar :data="'menu_product'" :active="'product'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'产品列表'" :lan="true" @on-change="get"/>
        <div class="j_search">
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="info" icon="plus" class="w130" @click="url('/product/add')">添加产品</Button>
            </Col>
            <Col>
              <span class="a_underline" @click="myShow">我的显示</span>
              <Input v-model="searchData.name" clearable placeholder="请输入产品名称" class="w180" @on-change="clearInput"></Input>
              <Button class="search" @click="search">搜索</Button>
              <Poptip placement="bottom-end" class="j_poptip_confirm_edit"
                confirm
                width="630"
                @on-ok="advancedSearch">
                <Button class="grey w130">高级搜索</Button>
                <div slot="title">
                  <Form :model="searchData" :label-width="110">
                    <FormItem label="名称：" class="formitem_left">
                      <Input v-model="searchData.name" class="w180" clearable></Input>
                    </FormItem>
                    <FormItem label="型号：" class="formitem_left">
                      <Input v-model="searchData.prodtype" class="w180" clearable></Input>
                    </FormItem>
                    <FormItem label="分类：" class="formitem_left">
                      <Select v-model="searchData.category" class="w180">
                        <Option value="">请选择</Option>
                        <Option :value="item.categoryId" v-for="item in categoryList" :key="item.categoryId">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="产品属性：" class="formitem_left">
                      <Select v-model="searchData.productType" class="w180" placeholder="请选择">
                        <Option value="">请选择</Option>
                        <Option value="NW">新品</Option>
                        <Option value="CP">精品</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="是否登录可见：" class="formitem_left">
                      <Select v-model="searchData.loginView" class="w180" placeholder="访问者可见">
                        <Option value="0">访问者可见</Option>
                        <Option value="1">登录后可见</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="是否广告产品：" class="formitem_left">
                      <Select v-model="searchData.ads" class="w180" placeholder="是否广告产品">
                        <Option value="">是否广告产品?</Option>
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                      </Select>
                    </FormItem>
                  </Form>
                </div>
              </Poptip>
            </Col>
          </Row>
        </div>
        <DragableTable
          ref="selection"
          :list="list"
          :columns="columns"
          @on-update="tableUpdate"
          @on-selection-change="handleSelectChange"/>
      </Content>
      <JPagination :fixed="true" :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
        <span slot="btn">
          <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
          <Button type="ghost" size="small" @click="delAll">删除</Button>
          <Button type="ghost" size="small" @click="copyAll">复制</Button>
          <Button type="ghost" size="small" @click="displayAll('01')">上架</Button>
          <Button type="ghost" size="small" @click="displayAll('00')">下架</Button>
          <Button type="ghost" size="small" @click="categoryAll">转移分类</Button>
        </span>
      </JPagination>
    </Layout>
    <SeoDetail ref="seoDetail"/>
    <TransferCategory ref="transferCategory" :data="categoryList" :ids="ids" :type="'product'" @on-change="get"/>
    <JDialog ref="dialog" :title="'我的显示'" :tip="'温馨提醒：勾选不要超过9个，以免列表显示不下。'" @on-ok="initCol">
      <div slot="content">
        <CheckboxGroup v-model="myShowSelect" class="j_checkout">
          <Checkbox :label="item" v-for="(item, index) in myShowList" :key="index">{{item}}</Checkbox>
        </CheckboxGroup>
      </div>
    </JDialog>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import JDialog from '@/components/group/j-dialog'
import DragableTable from '@/components/group/j-dragable-table'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
import categorySelect from '@/components/group/j-category-select'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination,
    JDialog,
    DragableTable,
    SeoDetail,
    TransferCategory,
    categorySelect
  },
  data () {
    return {
      myShowSelect: this.$store.state.customData.productShow,
      myShowList: ['序号', '产品图片', '产品名称', '产品型号', '产品价格', '产品分类', '添加时间', '是否上架', '排序', '二维码'],
      columns: [],
      columns2: [
        { type: 'index2', className: 'j_table_index', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '产品图片', className: 'j_table_img', key: 'pic', width: 105, render: this.imgFilter },
        { title: '产品名称', className: 'j_table_title', sortable: true, key: 'name', minWidth: 150, render: this.nameFilter },
        { title: '产品型号', className: 'j_table_title', sortable: true, key: 'prodtype', minWidth: 130, render: this.prodtypeFilter },
        { title: '产品价格', render: this.priceFilter },
        { title: '产品分类', className: 'j_table_category', sortable: true, key: 'category', width: 160, render: this.categoryFilter },
        { title: '添加时间', sortable: true, key: 'addTime', minWidth: 105, render: this.dataFilter },
        { title: '是否上架', sortable: true, key: 'isMarketable', width: 102, render: this.isMarketableFilter },
        { title: '排序', className: 'j_table_sort', sortable: true, key: 'sort', minWidth: 125, render: this.sortFilter }
      ],
      list: [],
      listTest: [
        {
          id: '555',
          name: 'ccc',
          prodtype: '555',
          edittingCell: {
            name: false,
            prodtype: false,
            sort: false,
            api: 'product',
            id: '666'
          }
        }
      ],
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
  computed: {
    ...mapState({
      categoryList: state => state.productCategory,
      staticList: state => state.staticList
    })
  },
  created () {
    this.searchData.page = parseInt(this.$cookie.get('productPage')) || 1
    this.get()
    this.$store.dispatch('getCategory', 'product')
    this.initCol()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/product/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
            item.edittingCell = {
              name: false,
              prodtype: false,
              sort: false,
              api: 'product',
              id: item.productId
            }
          })
          this.list = data || []
        }
      })
    },
    // 功能
    tableUpdate (a, b) {
      this.sortable(a, b, 'product', 'productId')
    },
    lanRefresh () {
      this.searchData.page = 1
      this.get()
    },
    myShow () {
      this.$refs.dialog.open()
    },
    initCol () {
      var ctx = this
      this.columns = [
        { type: 'selection', className: 'j_table_checkbox', width: 44 }
      ]
      this.columns2.forEach(col => {
        this.myShowSelect.forEach(item => {
          if (item === col.title) {
            ctx.columns.push(col)
          }
        })
      })
      this.columns.push({ title: '操作', className: 'j_table_operate', width: 156, render: this.renderOperate })
      this.$store.state.customData.productShow = this.myShowSelect
      this.$store.dispatch('SAVE_CUSTOM_DATA')
    },
    // 搜索
    clearInput () {
      if (this.searchData.name === '') {
        this.get()
      }
    },
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        name: this.searchData.name
      }
      this.get()
    },
    advancedSearch () {
      this.searchData.page = 1
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
      this.$refs.selection.$refs.dragable.selectAll(this.toggle)
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
    copyAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/product/copyProductByIds', qs.stringify({productIds: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('复制成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    displayAll (e) {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      let url = 'batchShelves'
      if (e === '00') {
        url = 'unBatchShelves'
      }
      this.$http.post('/rest/api/product/' + url, qs.stringify({productIds: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success(e === '01' ? '上架成功' : '下架成功')
          this.get()
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
            src: this.$store.state.status.IMG_HOST + params.row.picPath
          }
        })
      ])
    },
    nameFilter (h, params) {
      let data = [
        h('li', {
          style: {
            background: '#e9e9e9'
          }
        }, '请选择')
      ]
      this.staticList.forEach(item => {
        data.push(h('li', [
          h('Poptip', {
            props: {
              placement: 'right',
              trigger: 'hover'
            }
          }, [
            h('span', '网站编号： ' + item.layoutId),
            h('img', {
              slot: 'content',
              attrs: {
                src: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w=210&text=http://pc.jihui88.com/rest/site/' + item.layoutId + '/pd?itemId=' + params.row.productId2
              }
            })
          ])
        ]))
      })
      let input = h('Input', {
        props: {
          type: 'textarea',
          value: params.row[params.column.key]
        },
        on: {
          input: (val) => {
            params.row[params.column.key] = val
          }
        }
      })
      let div = [
        h('Row', {
          props: {
            type: 'flex',
            align: 'middle',
            justify: 'center'
          }
        }, [
          h('Col', {
            props: {
              span: '22'
            }
          }, [
            !params.row.edittingCell[params.column.key] ? h('span', {
              style: {
                color: '#5b5b5b',
                height: '55px',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }
            }, params.row[params.column.key]) : input
          ]),
          h('Col', {
            props: {
              span: '2'
            }
          }, [
            params.row.edittingCell[params.column.key] ? this.saveIncellEditBtn(this, h, params) : this.incellEditBtn(this, h, params)
          ])
        ])
      ]
      this.myShowSelect.forEach(item => {
        if (item === '二维码') {
          div.push(h('p', {
            style: {
              marginTop: '3px'
            }
          }, [
            h('Poptip', {
              props: {
                placement: 'right'
              },
              class: {
                'j_poptip_ul': true
              },
              style: {
                width: '120px'
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
                slot: 'content',
                style: {
                  maxHeight: '250px'
                }
              }, data)
            ])
          ]))
        }
      })
      return h('div', div)
    },
    prodtypeFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    priceFilter (h, params) {
      return h('span', {
        style: {
          color: '#ff7e3e'
        }
      }, '￥' + params.row.price || 0)
    },
    categoryFilter (h, params) {
      return h(categorySelect, {
        props: {
          list: this.categoryList,
          categoryId: params.row.category
        },
        on: {
          'on-change': (val) => {
            params.row.category = val
            let data = {
              model: JSON.stringify({
                id: params.row.productId,
                category: val,
                editField: true
              }),
              _method: 'put'
            }
            this.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
              if (res.success) {
                this.$Message.success('修改成功')
              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        }
      })
    },
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime)
      return h('div', format)
    },
    isMarketableFilter (h, params) {
      var ctx = this
      return h('div', [
        h('span', params.row.isMarketable ? '是' : '否'),
        h('i', {
          class: {
            'none': true,
            'iconfont': true,
            'icon-bianji2': true
          },
          on: {
            click: () => {
              params.row.isMarketable = !params.row.isMarketable
              let data = {
                model: JSON.stringify({
                  id: params.row.productId,
                  isMarketable: params.row.isMarketable,
                  editField: true
                }),
                _method: 'put'
              }
              ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                if (res.success) {
                } else {
                  ctx.$Message.error(res.msg)
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
              params.row.topproduct = params.row.topproduct === '01' ? '00' : '01'
              let data = {
                model: JSON.stringify({
                  id: params.row.productId,
                  topproduct: params.row.topproduct,
                  editField: true
                }),
                _method: 'put'
              }
              ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
                if (res.success) {
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
      return this.cellEdit(this, h, params)
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$cookie.set('productPage', this.searchData.page)
              this.$router.push({path: '/product/' + params.row.productId2})
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
.j_product .ivu-table{
  .ivu-table-tip,.ivu-table-body {
    height: calc(100vh - 293px);
    border-bottom: 1px solid #e9e9e9;
  }
  td{
    height: 98px
  }
}
.j_product {
  .j_poptip_ul .ivu-poptip-popper{
    width: 135px;
    .ivu-poptip-popper{
      width: 223px;
    }
  }
  .a_underline{
    margin-right: 20px;
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
}
</style>
