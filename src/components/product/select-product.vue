<template>
  <Modal
    v-model="modal"
    width="700"
    :title="title">
    <div class="j_search">
      <Input v-model="searchData.name" placeholder="请输入产品名称" clearable class="w144" @on-change="clearInput('name')"></Input>
      <Input v-model="searchData.prodtype" placeholder="请输入产品型号" clearable class="w144" style="margin-left:3px" @on-change="clearInput('prodtype')"></Input>
      <Button class="search" @click="search">搜索</Button>
    </div>
    <Table :columns="columns" :data="list" @on-select="selected" @on-select-cancel="selectCancel" @on-select-all="selectAll"></Table>
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
      columns: [],
      list: [],
      searchData: {
        page: 1,
        pageSize: 5
      },
      total: 0,
      ids: ''
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
          this.list = data
        }
      })
    },
    open (ids) {
      this.modal = true
      this.columns = [
        { title: '产品图片', className: 'j_table_img', width: 100, render: this.imgFilter },
        { title: '产品名称【型号】', render: this.nameFilter },
        { title: '创建时间', key: 'addTime', width: 160, render: this.dataFilter }
      ]
      if (this.type === 'select') {
        this.columns.push({ title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate })
      } else {
        this.columns.splice(0, 0, { type: 'selection', className: 'j_table_checkbox', width: 44 })
      }
      this.ids = ids
      this.get()
    },
    cancel () {
      this.modal = false
    },
    ok () {
      this.$emit('on-change', this.ids)
      this.cancel()
    },
    // 搜索
    clearInput (e) {
      if (this.searchData[e] === '') {
        this.get()
      }
    },
    search (e) {
      this.searchData.page = 1
      this.get()
    },
    // 批量操作
    selectAll (status) {
      status.forEach(row => {
        this.addIds(row)
      })
    },
    selected (status, row) {
      this.addIds(row)
    },
    addIds (row) {
      if (this.ids) {
        if (this.ids.indexOf(row.productId) === -1) {
          this.ids += ',' + row.productId
        }
      } else {
        this.ids = row.productId
      }
    },
    selectCancel (status, row) {
      let idsList = this.ids.split(',')
      idsList.forEach((id, index) => {
        if (id === row.productId) {
          idsList.splice(index, 1)
        }
      })
      this.ids = idsList.join()
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
