  <template>
    <Layout class="j_layout_content j_product">
      <Content>
        <JHeader :title="'产品列表'" :lan="true" @on-change="lanChange"/>
        <div class="j_search">
          <Row type="flex" justify="space-between" class="j_product_search">
            <Col>
              <Button type="info" icon="plus" class="w130" @click="url('/product/add')">添加产品</Button>
            </Col>
            <Col>
              <a :href="agent.vProduct" class="a_underline" target="_blank" v-if="agent.vProduct">产品视频教程</a>
              <span class="a_underline" @click="myShow">我的显示</span>
              <Input v-model="name" clearable placeholder="请输入产品名称" class="w180" @on-change="clearInput"></Input>
              <Button class="search" @click="search">搜索</Button>
              <Poptip placement="bottom-end" class="j_poptip_confirm_edit advancedSearch"
                confirm
                width="630"
                @on-ok="advancedSearch">
                <Button class="grey w130">高级搜索</Button>
                <div slot="title">
                  <Form :model="searchData" :label-width="110">
                    <FormItem label="名称：" class="formitem_left">
                      <Input v-model="searchData.name" class="w180" placeholder="请输入产品名称" clearable></Input>
                    </FormItem>
                    <FormItem label="分类：" :label-width="62" class="formitem_left">
                      <div style="width:228px">
                        <categorySelect :categoryId="searchData.category" :list="$store.state.productCategory" :isDefalut="true" @on-change="categoryChange"/>
                      </div>
                    </FormItem>
                    <FormItem label="型号：" class="formitem_left">
                      <Input v-model="searchData.prodtype" class="w180" placeholder="请输入产品型号" clearable></Input>
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
          <JPagination :fixed="true" :checkbox="true" :total="total" :searchData='searchData' @on-change="get">
            <span slot="btn">
              <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
              <Button type="ghost" size="small" @click="delAll">删除</Button>
              <Button type="ghost" size="small" @click="copyAll">复制</Button>
              <Button type="ghost" size="small" @click="displayAll('On')">显示</Button>
              <Button type="ghost" size="small" @click="displayAll('Off')">隐藏</Button>
              <Button type="ghost" size="small" @click="marketableAll('01')">上架</Button>
              <Button type="ghost" size="small" @click="marketableAll('00')">下架</Button>
              <Button type="ghost" size="small" @click="categoryAll">转移分类</Button>
            </span>
          </JPagination>
      </Content>
      <SeoDetail ref="seoDetail"/>
      <TransferCategory ref="transferCategory" :data="categoryList" :ids="ids" :type="'product'" @on-change="get"/>
      <JDialog ref="dialog" :title="'我的显示'" :tip="'温馨提醒：勾选不要超过9个，以免列表显示不下。'" @on-ok="initCol('ok')">
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
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import JDialog from '@/components/group/j-dialog'
import DragableTable from '@/components/group/j-dragable-table'
import SeoDetail from '@/pages/static/SeoDetail'
import TransferCategory from '@/components/group/transfer-category'
import categorySelect from '@/components/group/j-category-select'
export default {
  components: {
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
      myShowList: ['序号', '产品图片', '产品名称', '产品型号', '产品价格', '产品分类', '添加时间', '显示／隐藏', '是否上架', '排序', '二维码'],
      columns: [],
      columns2: [
        { type: 'index2', className: 'j_table_index', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '产品图片', className: 'j_table_img', key: 'pic', width: 105, render: this.imgFilter },
        { title: '产品名称', className: 'j_table_title', sortable: true, key: 'name', minWidth: 150, render: this.nameFilter },
        { title: '产品型号', className: 'j_table_title', sortable: true, key: 'prodtype', minWidth: 130, render: this.prodtypeFilter },
        { title: '产品价格', minWidth: 90, render: this.priceFilter },
        { title: '产品分类', className: 'j_table_category', sortable: true, key: 'category', width: 160, render: this.categoryFilter },
        { title: '添加时间', sortable: true, key: 'addTime', minWidth: 105 },
        { title: '显示／隐藏', sortable: true, key: 'isdisplay', width: 113, render: this.isdisplayFilter },
        { title: '是否上架', sortable: true, key: 'isMarketable', width: 102, render: this.isMarketableFilter },
        { title: '排序', className: 'j_table_sort', sortable: true, key: 'sort', minWidth: 125, render: this.sortFilter }
      ],
      list: [],
      listTest: [
        {
          productId: '555',
          name: 'ccc',
          prodtype: '555',
          isBest: '00',
          isNew: '00',
          isHot: '00',
          _checked: false,
          edittingCell: {
            name: false,
            prodtype: false,
            sort: false,
            api: 'product',
            id: '666'
          }
        },
        {
          productId: '555',
          name: 'ccc',
          prodtype: '555',
          isBest: '01',
          isNew: '01',
          isHot: '01',
          _checked: false,
          edittingCell: {
            name: false,
            prodtype: false,
            sort: false,
            api: 'product',
            id: '666'
          }
        }
      ],
      name: '',
      searchData: {
        page: 1,
        pageSize: 10,
        category: ''
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
      staticList: state => state.staticList,
      agent: state => state.agent
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.meta.parent !== 'product') {
        vm.$cookie.set('productPage', 1)
        vm.$cookie.set('productIndex', '')
      } else {
        vm.searchData.page = parseInt(vm.$cookie.get('productPage')) || 1
      }
      vm.get()
    })
  },
  created () {
    this.$store.dispatch('getCategory', 'product')
    this.initCol()
  },
  methods: {
    get () {
      this.ids = ''
      this.$http.get('/rest/api/product/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          let idx = parseInt(this.$cookie.get('productIndex'))
          data.forEach((item, index) => {
            item._checked = false
            item.edittingCell = {
              name: false,
              prodtype: false,
              sort: false,
              qrShow: false,
              api: 'product',
              id: item.productId
            }
            if (!item.isBest) { item.isBest = '00' }
            if (!item.isNew) { item.isNew = '00' }
            if (!item.isHot) { item.isHot = '00' }
            if (idx === index) {
              item._highlight = true
            }
          })
          this.list = data || []
        }
      })
    },
    // 功能
    tableUpdate (a, b) {
      this.sortable(a, b, 'product')
    },
    lanChange () {
      this.$store.dispatch('getCategory', 'product')
      this.get()
    },
    myShow () {
      this.$refs.dialog.open()
    },
    initCol (e) {
      var ctx = this
      this.columns = [
        { type: 'selection', className: 'j_table_checkbox', width: 44 },
        { className: 'j_table_san_pin', width: 1, render: this.checkboxFilter }
      ]
      this.columns2.forEach(col => {
        this.myShowSelect.forEach(item => {
          if (item === col.title) {
            ctx.columns.push(col)
          }
        })
      })
      this.columns.push({ title: '操作', className: 'j_table_operate', width: 156, render: this.renderOperate })
      if (this.$store.state.customData.productShow.indexOf('是否上架') === -1 && this.myShowSelect.indexOf('是否上架') > -1) {
        this.$Notice.open({
          title: '是否上架',
          desc: '只针对电商版使用'
        })
      }
      this.$store.state.customData.productShow = this.myShowSelect
      if (e === 'ok') this.$store.dispatch('SAVE_CUSTOM_DATA')
    },
    // 搜索
    clearInput () {
      if (this.name === '') {
        this.searchData.name = this.name
        this.get()
      }
    },
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        name: this.name
      }
      this.get()
    },
    categoryChange (e) {
      this.searchData.category = e
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
      this.$http.post('/rest/api/product/batch/del', qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
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
      this.$http.post('/rest/api/product/batch/display' + e, qs.stringify({ids: this.ids})).then((res) => {
        if (res.success) {
          this.$Message.success(e === 'On' ? '显示成功' : '隐藏成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    marketableAll (e) {
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
    checkboxFilter  (h, params) {
      var ctx = this
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
      return h('Row', {
        props: {
          type: 'flex',
          align: 'middle',
          justify: 'center'
        }
      }, [
        h('Col', {
          props: {
            span: '16'
          }
        }, data),
        h('Col', {
          props: {
            span: '8'
          }
        }, [
          h('i', {
            class: {
              'none': true,
              'iconfont': true,
              'icon-bianji2': true
            },
            on: {
              click: () => {
                this.$Modal.confirm({
                  width: 250,
                  render: (h) => {
                    return h('div', [
                      h('div', [
                        h('span', {
                          class: {
                            proThreeType: true
                          }
                        }, '精品：'),
                        h('RadioGroup', {
                          props: {
                            value: params.row.isBest
                          },
                          on: {
                            input: (val) => {
                              params.row.isBest = val
                              let data = {
                                model: JSON.stringify({
                                  id: params.row.productId,
                                  isBest: params.row.isBest,
                                  editField: true
                                }),
                                _method: 'put'
                              }
                              ctx.fixedSubmit(data, params.row.productId)
                            }
                          }
                        }, [
                          h('Radio', {
                            props: {
                              label: '01'
                            }
                          }, '是'),
                          h('Radio', {
                            props: {
                              label: '00'
                            }
                          }, '否')
                        ])
                      ]),
                      h('div', [
                        h('span', {
                          class: {
                            proThreeType: true
                          }
                        }, '新品：'),
                        h('RadioGroup', {
                          props: {
                            value: params.row.isNew
                          },
                          on: {
                            input: (val) => {
                              params.row.isNew = val
                              let data = {
                                model: JSON.stringify({
                                  id: params.row.productId,
                                  isNew: params.row.isNew,
                                  editField: true
                                }),
                                _method: 'put'
                              }
                              ctx.fixedSubmit(data, params.row.productId)
                            }
                          }
                        }, [
                          h('Radio', {
                            props: {
                              label: '01'
                            }
                          }, '是'),
                          h('Radio', {
                            props: {
                              label: '00'
                            }
                          }, '否')
                        ])
                      ]),
                      h('div', [
                        h('span', {
                          class: {
                            proThreeType: true
                          }
                        }, '热销：'),
                        h('RadioGroup', {
                          props: {
                            value: params.row.isHot
                          },
                          on: {
                            input: (val) => {
                              params.row.isHot = val
                              let data = {
                                model: JSON.stringify({
                                  id: params.row.productId,
                                  isHot: params.row.isHot,
                                  editField: true
                                }),
                                _method: 'put'
                              }
                              ctx.fixedSubmit(data, params.row.productId)
                            }
                          }
                        }, [
                          h('Radio', {
                            props: {
                              label: '01'
                            }
                          }, '是'),
                          h('Radio', {
                            props: {
                              label: '00'
                            }
                          }, '否')
                        ])
                      ])
                    ])
                  }
                })
              }
            }
          })
        ])
      ])
    },
    indexFilter (h, params) {
      return this.index2(this, h, params)
    },
    fixedSubmit (data, id) {
      this.$http.post('/rest/api/product/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
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
              },
              on: {
                'on-popper-show': () => {
                  params.row.edittingCell.qrShow = true
                }
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
              }, params.row.edittingCell.qrShow ? data : '')
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
      let category = ''
      if (params.row.category) {
        category = params.row.category.split(',')[0]
      }
      return h(categorySelect, {
        props: {
          list: this.categoryList,
          categoryId: category
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
      return h('div', this.dateFormat(params.row.addTime))
    },
    isMarketableFilter (h, params) {
      let option = [true, false]
      return this.cellRadio(this, h, params, option)
    },
    isdisplayFilter (h, params) {
      let option = ['1', '0', '显示', '隐藏']
      return this.cellRadio(this, h, params, option)
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
              this.$cookie.set('productIndex', params.index)
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
  .ivu-table-body{
    .j_table_san_pin{
      .ivu-table-cell{
        position: relative;overflow: visible;
      }
      .ivu-row-flex{
        position: absolute;
        left: -33px;
        margin-top: -10px;
        .ivu-col-span-16{
          width: 20px
        }
        .ivu-col-span-8{
          width: 20px;
        }
      }
    }
  }
}
.j_product {
  .j_poptip_ul .ivu-poptip-popper{
    width: 135px;
    .ivu-poptip-popper{
      width: 223px;
    }
    .ivu-poptip-arrow{
      margin-top: 0;
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
  .advancedSearch{
    .ivu-select-dropdown-list{
      width: 226px;
    }
  }
}
.proThreeType{
  display: inline-block;
  width: 80px;
  text-align: right;
  padding-right: 10px;
  margin-top: 10px;
}

@media screen and (min-width: 1100px) {
  .j_product_search{
    height: 41px;
  }
}
</style>
