<template>
  <Modal class-name="j_dialog" v-model="modal" :width="width || 430">
    <i class="iconfont icon-x" slot="close"></i>
    <JHeader :title="title" :tip="tip"/>
    <slot name="content"></slot>
    <Button type="primary" @click="ok" style="margin-top: 30px">{{okText || '保存'}}</Button>
  </Modal>
</template>

<script>
import JHeader from '@/components/group/j-header'
export default {
  props: ['title', 'tip', 'okText', 'width'],
  components: {
    JHeader
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    open () {
      this.modal = true
    },
    ok () {
      this.modal = false
      this.$emit('on-ok')
    }
  }
}
</script>

<style lang="less">
.j_dialog{
  z-index: 1060;
  .ivu-modal-body{
    padding: 22px 54px 45px 54px;
  }
  .ivu-modal-close{
    right: 25px;
    top: 25px;
  }
  .icon-x{
    color: #c7c7c7
  }
  .ivu-modal-footer{
    display: none
  }
}
</style>
