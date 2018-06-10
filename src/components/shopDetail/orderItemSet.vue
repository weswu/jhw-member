<template>
  <Table :columns="columns" :data="data"/>
</template>

<script>
export default {
  props: {
    print: {},
    data: {}
  },
  data () {
    return {
      columns: [
        {
          title: '产品图片',
          render: (h, params) => {
            return h('img', {
              style: {
                height: '50px'
              },
              attrs: {
                src: this.$store.state.status.IMG_HOST + this.picUrl(params.row.product.picUrl5, 5)
              }
            })
          }
        },
        { title: '商品名称', ellipsis: true, key: 'productName' },
        { title: '产品型号', key: 'product.prodtype' },
        { title: '价格', key: 'product.price' },
        {
          title: '购买选项',
          ellipsis: true,
          render: (h, params) => {
            return h('span', {
              attrs: {
                title: params.row.productAttr
              }
            }, params.row.productAttr)
          }
        },
        { title: '购买数量', key: 'productQuantity' }
      ]
    }
  },
  created () {
    if (!this.print) {
      this.columns.splice(0, 0, { title: '货号', key: 'productSn' })
    }
  }
}
</script>

<style lang="css">
</style>
