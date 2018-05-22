<template>
  <table class="j_table">
    <thead>
      <tr>
        <th>{{title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <slot name="content"></slot>
        </td>
      </tr>
    </tbody>
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
