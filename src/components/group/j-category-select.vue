<template>
  <Dropdown trigger="custom" :visible="visible" placement="bottom" class="j_category_select" @on-clickoutside="visible = false">
    <Input v-model="name" placeholder="请选择分类" icon="arrow-down-b" @on-focus="visible = true"></Input>
    <ul class="ivu-select-dropdown-list" slot="list">
      <li
        v-for="item in $store.state[type]"
        :key="item.categoryId"
        v-if="item._checked"
        :class="{'ivu-select-item-selected': item.categoryId === categoryId, 'ivu-select-item': true, 'item1': item.grade == '1', 'item2': item.grade == '2', 'item3': item.grade == '3'}"
        @click="select(item)">
        <span>{{item.name}}</span>
        <i class="iconfont icon-xialajiantou" v-if="item.isroot && !item._open" @click.stop="changeCateList(item)"></i>
        <i class="iconfont icon-xialajiantou rotate" v-if="item.isroot && item._open" @click.stop="changeCateList(item)"></i>
      </li>
    </ul>
  </Dropdown>
</template>

<script>
export default {
  props: {
    categoryId: {},
    type: {}
  },
  data () {
    return {
      visible: false,
      name: ''
    }
  },
  created () {
    this.$store.state[this.type].forEach(item => {
      if (item.categoryId === this.categoryId) {
        this.name = item.name
      }
    })
  },
  methods: {
    select (item) {
      this.name = item.name
      this.$emit('on-change', item.categoryId)
    },
    changeCateList (data) {
      var ctx = this
      data._open = !data._open
      this.$store.state[this.type].forEach(item => {
        if (item.belongId === data.categoryId) {
          item._checked = !item._checked
          ctx.categoryList.forEach(row => {
            if (row.belongId === item.categoryId) {
              row._checked = !row._checked
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_category_select{
  width: 450px;
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
