<template>
  <Modal class-name="j_static_add" width="576"
    v-model="modal"
    title="创建网站"
    @on-cancel="cancel">
    <Create v-if="show" @on-change="change"/>
  </Modal>
</template>

<script>
import Create from '@/components/pc/create'
export default {
  components: {
    Create
  },
  data () {
    return {
      modal: false,
      show: false
    }
  },
  methods: {
    open () {
      this.modal = true
      if (!this.show) this.show = true
    },
    cancel () {
      this.modal = false
    },
    change (e) {
      this.$emit('on-change', e)
      this.modal = false
    }
  }
}
</script>
