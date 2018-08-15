<template>
  <Modal class-name="j_buy_modal"
    v-model="modal" width="800">
      <iframe :src="src" class="j_buy_iframe" scrolling="no"/>
      <div slot="footer"></div>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      src: ''
    }
  },
  methods: {
    open (src) {
      this.modal = true
      this.src = 'http://buy.jihui88.com/#/qrcode' + src
    },
    cancel () {
      this.src = ''
    }
  }
}
</script>

<style lang="less">
.j_buy_modal{
  .j_buy_iframe{
    height: 420px;
  }
  .ivu-modal-footer{
    display: none
  }
}
</style>
