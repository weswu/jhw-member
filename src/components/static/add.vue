<template>
  <Modal class-name="j_static_add" width="576"
    v-model="modal"
    title="创建网站"
    @on-cancel="cancel">
    <Create/>
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
