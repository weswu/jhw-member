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
    selectChange (status) {
      this.$emit('on-selection-change', status)
    }
  }
}
</script>
