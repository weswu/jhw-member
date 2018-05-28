<template>
  <div class="j_product_attr">
    <FormItem
      :label="item.name+'：'"
      :key="item.attId"
      v-if="item.isEnabled === '01'"
      v-for="item in list">
      <CheckboxGroup v-model="item.value" v-if="item.attributeType === 'checkbox'">
        <Checkbox :label="row" v-for="row in item.attributeOptionList" :key="row"></Checkbox>
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
