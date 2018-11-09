<template>
  <div class="j_product_attr">
    <FormItem
      :label="item.name+'：'"
      v-for="(item, index) in list"
      :key="index"
      v-if="item.isEnabled === '01'">
      <CheckboxGroup v-model="item.value" v-if="item.attributeType === 'checkbox'" @on-change="checkAllGroupChange" sort>
        <Checkbox :label="row" v-for="row in item.attributeOptionList" :key="row"></Checkbox>
      </CheckboxGroup>
    </FormItem>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    checkAllGroupChange (e) {
      this.$emit('on-change')
    }
  }
}
</script>

<style lang="css">
</style>
