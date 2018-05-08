<template>
  <Modal class-name="j_cost_modal" :scrollable=false
    v-model="modal" width="800">
      <iframe :src="src" class="j_buy_iframe" scrolling="no" :style="{height:height+'px'}"/>
      <div slot="footer"></div>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      src: '',
      height: 500
    }
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.height) {
        ctx.height = data.height
      }
      if (data.error) {
        ctx.$Message.error(data.error)
      }
    }, false)
  },
  methods: {
    open (id) {
      this.modal = true
      this.src = 'http://buy.jihui88.com/#/member/' + id
    },
    cancel () {
      this.src = ''
    }
  }
}
</script>

<style lang="less">
.j_cost_modal{
  .j_buy_iframe{
    padding: 10px 20px 0 20px;
    min-height: 500px
  }
  .ivu-modal-footer{
    display: none
  }
}
</style>
