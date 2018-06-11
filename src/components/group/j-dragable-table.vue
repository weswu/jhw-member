<template>
  <Table
    ref="dragable"
    :row-class-name="rowClassName"
    :columns="columns"
    :data="list"
    @on-selection-change="selectChange"
  ></Table>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  props: {
    columns: Array,
    list: Array
  },
  mounted () {
    var el = this.$refs.dragable.$children[1].$el.children[1]
    let vm = this
    Sortable.create(el, {
      group: {
        name: 'list',
        pull: true
      },
      animation: 120,
      handle: '.icon-tuozhuai',
      onStart: vm.startFunc,
      onEnd: vm.endFunc,
      onChoose: vm.chooseFunc,
      onUpdate (e) {
        vm.$emit('on-update', e.oldIndex, e.newIndex)
      }
    })
  },
  methods: {
    rowClassName (row, index) {
      if (row.hidden) {
        return 'j-table-row-hidden'
      }
      return ''
    },
    startFunc (e) {
      this.$emit('on-start', e.oldIndex)
    },
    endFunc (e) {
      let movedRow = this.value[e.oldIndex]
      this.value.splice(e.oldIndex, 1)
      this.value.splice(e.newIndex, 0, movedRow)
      this.$emit('on-end', {
        value: this.value,
        from: e.oldIndex,
        to: e.newIndex
      })
    },
    chooseFunc (e) {
      this.$emit('on-choose', e.oldIndex)
    },
    selectChange (status) {
      this.$emit('on-selection-change', status)
    }
  }
}
</script>
