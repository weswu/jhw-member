<template>
  <Table :columns="columns" :data="data"/>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: {}
  },
  computed: {
    ...mapState({
      orderLogType: state => state.status.orderLogType
    })
  },
  data () {
    return {
      columns: [
        {
          title: '日志类型',
          render: (h, params) => {
            let text = ''
            this.orderLogType.forEach(item => {
              if (item.value === params.row.orderLogType) {
                text = item.text
              }
            })
            return h('span', text)
          }
        },
        {
          title: '操作员',
          key: 'operator',
          render: (h, params) => {
            return h('span', params.row.operator || '无')
          }
        },
        { title: '日志信息', key: 'info' },
        { title: '操作日间', key: 'addTime', width: 150 }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
