<template>
  <table class="j_table">
    <thead>
      <tr>
        <th colspan="10">{{title}}</th>
      </tr>
    </thead>
    <slot name="tbody"></slot>
  </table>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '表格内容：'
    }
  }
}
</script>
