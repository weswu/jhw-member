<template>
  <Select v-model="model" class="j_category_select">
    <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId" v-if="item._checked" :class="'item' + item.grade">
      <span>{{item.name}}</span>
      <i class="iconfont icon-xialajiantou" v-if="item.isroot && !item._selected" @click.stop="changeCateList($event, item)"></i>
      <i class="iconfont icon-xialajiantou rotate" v-if="item.isroot && item._selected" @click.stop="changeCateList($event, item)"></i>
    </Option>
  </Select>
</template>

<script>
export default {
  props: {
    model: {},
    type: {},
    categoryList: {}
  },
  data () {
    return {}
  },
  methods: {
    changeCateList (e, data) {
      var ctx = this
      data._selected = !data._selected
      this.categoryList.forEach(item => {
        if (item.belongId === data.categoryId) {
          item._checked = !item._checked
          ctx.categoryList.forEach(row => {
            if (row.belongId === item.categoryId) {
              row._checked = !row._checked
            }
          })
        }
      })
      e.stopPropagation()
    }
  }
}
</script>

<style lang="less">
.j_category_select{
  .ivu-select-dropdown{
    max-height: 340px;
  }
  .icon-xialajiantou{
    float: right;
    color: #797979;
    font-size: 14px;
    padding: 0px 5px;
    &.rotate{
      transform: rotate(180deg);
    }
  }
  .item2{
    padding: 7px 16px 7px 36px;
  }
  .item3{
    padding: 7px 16px 7px 66px;
  }
  .ivu-select-item-selected{
    &.item1{
      background: #14a4ff;
    }
    &.item2{
      background: #4ebbff;
    }
    &.item3{
      background: #9dd9ff;
    }
    .icon-xialajiantou{
      color: #fff;
    }
  }
}
</style>
