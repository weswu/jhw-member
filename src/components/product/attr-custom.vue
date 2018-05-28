<template>
  <div class="j_product_attr_custom">
    <div v-for="item in list" :key="item.madeName">
      名称<Input v-model="item.madeName" placeholder="请输入购买数量"></Input>
    </div>
    aaa
  </div>
</template>

<script>
export default {
  props: {
    list: {}
  }
}
</script>

<style lang="less">
.j_product_attr_custom{
  .ivu-input-wrapper{
    width: 100px;
  }
}
</style>
