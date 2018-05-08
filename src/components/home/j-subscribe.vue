<template>
  <div class="j_subscribe">
    <a href="#" class="subscribe" @click="modal1 = true">+订阅</a>
    <Modal
      v-model="modal1"
      title="订阅"
      okText="确定"
      cancelText="取消"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>更新中</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal1: false,
      list: [
        {}
      ]
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

<style lang="less">
  .j_subscribe{
    .subscribe{
      display: block;
      text-align: center;
      padding: 13px 0;
      border: 1px solid #c0c0c0;
      font-size: 14px;
      color: #707070
    }
  }
</style>
