<template>
  <Modal
    v-model="modal"
    title="黑名单"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
    </div>
    <iframe src="http://www.jihui88.com/user/blacklist/view" style="width:100%;" v-if="modal"></iframe>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false
    }
  },
  methods: {
    open () {
      this.modal = true
    },
    cancel () {
      this.modal = false
    }
  }
}
</script>

<style lang="less">
</style>
