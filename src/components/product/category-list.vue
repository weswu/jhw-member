<template>
  <div class="j_category_multiple">
    <FormItem
      :label="(type === 'product' ? '产品' : '新闻') + '分类' + (index !== 0 ? index : '') + '：'"
      :key="index"
      v-for="(item, index) in list">
      <CategorySelect :categoryId="item" :list="categorySelect" @on-change="change(item, e)" @click="itemClick(index)"/>
      <span v-if="index === 0">
        <span class="a_normal" style="padding-left:10px;" @click="add">新增分类</span>
        <div class="j_tip j_tip_category" v-if="type === 'product'">
          <div style="position: absolute;">注意: </div>
          <div style="padding-left: 35px;">产品分类修改后商城属性规格将会相应改变，建议先选择好分类后再设置商城属性规格。</div>
        </div>
      </span>
      <span v-if="index > 0" class="a_normal" style="padding-left:10px;" @click="del(index)">删除分类</span>
    </FormItem>
  </div>
</template>

<script>
import CategorySelect from '@/components/group/j-category-select'
export default {
  components: {
    CategorySelect
  },
  props: {
    categorySelect: Array,
    category: {},
    type: {
      type: String,
      default: 'product'
    }
  },
  data () {
    return {
      list: [
        {}
      ],
      index: ''
    }
  },
  created () {
    if (this.category) {
      this.list = this.category.split(',')
    }
  },
  methods: {
    itemClick (e) {
      this.index = e
    },
    change (e) {
      this.list[this.index] = e
    },
    add () {
      this.list.push({})
    },
    del (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
</style>
