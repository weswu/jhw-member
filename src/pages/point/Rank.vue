<template>
  <Modal
    v-model="modal"
    width="700"
    title="我推广的会员">
    <Table :columns="columns" :data="list"></Table>
    <div slot="footer">
      <Button type="text" size="large" @click="modal = false">取消</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: true,
      columns: [
        { title: '用户名', render: this.incomeFilter },
        { title: '手机号码', key: 'cellphone' },
        { title: '时间', render: this.dataFilter }
      ],
      list: []
    }
  },
  created () {
    this.modal = true
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/comm/poster/userlist?username=' + this.$store.state.user.username).then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    open () {
      this.modal = true
    },
    incomeFilter (h, params) {
      let text = params.row.name || params.row.nickName
      return h('div', text || '匿名')
    },
    // 时间格式化
    dataFilter (h, params) {
      return h('div', this.dateFormat(params.row.addTime))
    }
  }
}
</script>

<style lang="less">
</style>
