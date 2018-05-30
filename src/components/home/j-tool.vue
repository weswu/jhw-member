<template>
  <Modal class-name="j_homt_tools"
    v-model="modal"
    title="常用工具">

    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  props: {
    list: Array
  },
  data () {
    return {
      modal: false,
      detail: {}
    }
  },
  computed: {
    ...mapState({
      disputeType: state => state.status.disputeType,
      disputeState: state => state.status.disputeState
    })
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$http.get('/rest/api/orderDispute/detail/' + id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
          }
        })
      }
    },
    cancel () {
      this.modal = false
    },
    ok () {
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.disputeId) {
        url = '/' + this.detail.disputeId
        data._method = 'put'
      }
      this.$http.post('/rest/api/orderDispute/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.$emit('on-change')
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
