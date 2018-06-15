<template>
  <div class="j_product_attr">
    <FormItem
      :label="item.name+'：'"
      v-for="(item, index) in list"
      :key="index"
      v-if="item.isEnabled === '01'">
      <CheckboxGroup v-model="item.value" v-if="item.attributeType === 'checkbox'">
        <Checkbox :label="row" v-for="(row, rowIndex) in item.attributeOptionList" :key="rowIndex"></Checkbox>
      </CheckboxGroup>
    </FormItem>
  </div>
</template>

<script>
export default {
  props: {
    list: {}
  }
}
</script>

<style lang="css">
</style>
