<template>
  <Modal
    v-model="modal"
    width="700"
    :title="title">
    <div class="j_search">
      <Input v-model="searchData.name" placeholder="请输入产品名称" style="width: 144px;"></Input>
      <Input v-model="searchData.prodtype" placeholder="请输入产品型号" style="width: 144px;"></Input>
      <Button class="search" @click="search">搜索</Button>
    </div>
    <Table ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
    <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok" v-if="type !== 'select'">确定</Button>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
export default {
  props: {
    ids: {},
    title: {
      type: String,
      default: '选择产品'
    },
    type: {}
  },
  components: {
    JPagination
  },
  data () {
    return {
      modal: false,
      columns: [
        { title: '产品图片', className: 'j_table_img', width: 100, render: this.imgFilter },
        { title: '产品名称【型号】', render: this.nameFilter },
        { title: '创建时间', key: 'addTime', width: 160, render: this.dataFilter }
      ],
      list: [],
      searchData: {
        page: 1,
        pageSize: 5
      },
      total: 0,
      ids2: ''
    }
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/rest/api/product/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
            ctx.ids && ctx.ids.split(',').forEach(id => {
              if (item.productId === id) {
                item._checked = true
              }
            })
          })
          this.list = data || []
        }
      })
    },
    open () {
      this.modal = true
      if (this.type === 'select') {
        this.columns.push({ title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate })
      } else {
        this.columns.splice(0, 0, { type: 'selection', className: 'j_table_checkbox', width: 44 })
      }
      this.get()
    },
    cancel () {
      this.modal = false
    },
    ok () {
      if (this.ids) {
        var ctx = this
        let ids = this.ids
        this.list.forEach(item => {
          if (item._checked) {
            if (ctx.ids.match(item.productId).length === 0) {
              ctx.$emit('on-change', this.ids + ',' + item.productId)
            }
          } else {
            if (ctx.ids.match(item.productId) > 0) {
              if (ids) {
                let idsList = ids.split(',')
                idsList.forEach((id, index) => {
                  if (id === item.productId) {
                    idsList.splice(index, 1)
                  }
                })
                ids = idsList.join()
                ctx.$emit('on-change', ids)
              }
            }
          }
        })
      } else {
        this.$emit('on-change', this.ids2)
      }
      this.cancel()
    },
    // 搜索
    search (e) {
      this.searchData.page = 1
      this.get()
    },
    // 批量操作
    handleSelectChange (status) {
      status.forEach((item, index) => {
        if (index === 0) {
          this.ids2 = item.productId
        } else {
          this.ids2 += ',' + item.productId
        }
      })
    },
    // 过滤
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
      return h('div', params.row.name + (params.row.prodtype ? '[' + params.row.prodtype + ']' : ''))
    },
    dataFilter (h, params) {
      let format = this.dateFormat(params.row.addTime)
      return h('div', format)
    },
    renderOperate (h, params) {
      return h('a', {
        on: {
          click: () => {
            this.$emit('on-select', params.row)
          }
        }
      }, '选取')
    }
  }
}
</script>

<style lang="less">
</style>
