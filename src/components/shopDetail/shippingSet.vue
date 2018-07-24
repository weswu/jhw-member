<template>
  <Table :columns="columns" :data="data"/>
</template>

<script>
export default {
  props: {
    data: {}
  },
  data () {
    return {
      columns: [
        { title: '发货编号', key: 'shippingSn' },
        { title: '配送方式名称', key: 'deliveryTypeName' },
        { title: '物流公司名称', key: 'deliveryCorpName' },
        { title: '物流编号', render: this.comFilter },
        { title: '物流费用', key: 'deliveryFee' },
        { title: '收货人姓名', key: 'shipName' },
        { title: '收货地区', key: 'shipArea' },
        { title: '发货时间', key: 'addTime' }
      ]
    }
  },
  methods: {
    comFilter (h, params) {
      return h('a', {
        on: {
          click: () => {
            if (!params.row.com) return this.$Message.info('未选择物流公司')
            if (!params.row.deliverySn && params.row.deliverySn.indexOf('upload') > -1) {
              this.$Modal.confirm({
                title: '物流信息',
                width: 500,
                render: (h) => {
                  return h('div', {
                    domProps: {
                      innerHTML: '<img width="450" src="http://img.jihui88.com/' + params.row.deliverySn + '" alt="" />'
                    }
                  })
                }
              })
            } else {
              this.$http.get('/rest/api/comm/shop/avatardata?com=' + params.row.com + '&nuId=' + params.row.deliverySn).then((res) => {
                if (res.success) {
                  let data = res.attributes.data
                  let li = []
                  data.forEach(item => {
                    li.push(h('li', [
                      h('span', item.context),
                      h('span', item.time || '')
                    ]))
                  })
                  this.$Modal.confirm({
                    title: '物流编号：' + params.row.deliverySn,
                    width: 450,
                    render: (h) => {
                      return h('ul', {
                        style: {
                          paddingTop: '20px'
                        }
                      }, li)
                    }
                  })
                } else {
                  this.$Message.error(res.msg)
                }
              })
            }
          }
        }
      }, '[查看物流信息]')
    }
  }
}
</script>

<style lang="css">
</style>
