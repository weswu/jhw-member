<template>
  <Dropdown trigger="custom" :visible="visible" placement="bottom" class="j_category_select" @on-clickoutside="visible = false" >
    <Input v-model="name" placeholder="请选择分类" icon="arrow-down-b" @on-focus="visible = true"></Input>
    <ul class="ivu-select-dropdown-list" slot="list">
      <li
        v-for="item in data"
        :key="item.categoryId"
        v-if="item.isdisplay === '1' && !item.hidden"
        :class="{'ivu-select-item-selected': item.categoryId === categoryId, 'ivu-select-item': true, 'item1': item.grade == '1', 'item2': item.grade == '2', 'item3': item.grade == '3'}"
        @click="select(item)">
        <span>{{item.name}}</span>
        <i class="iconfont icon-xialajiantou" v-if="item.isroot && !item.expand" @click.stop="changeCateList(item)"></i>
        <i class="iconfont icon-xialajiantou rotate" v-if="item.isroot && item.expand" @click.stop="changeCateList(item)"></i>
      </li>
    </ul>
  </Dropdown>
</template>

<script>
export default {
  name: 'categorySelect',
  props: {
    list: Array,
    categoryId: {}
  },
  data () {
    return {
      visible: false,
      data: [],
      name: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      var ctx = this
      setTimeout(function () {
        ctx.list.forEach(item => {
          if (item.categoryId === ctx.categoryId) {
            ctx.name = item.name
          }
        })
        ctx.data = ctx.list
      }, 200)
    },
    select (item) {
      this.name = item.name
      this.visible = false
      this.$emit('on-change', item.categoryId)
    },
    changeCateList (data) {
      var ctx = this
      data.expand = !data.expand
      this.data.forEach(item => {
        if (item.belongId === data.categoryId) {
          item.hidden = !item.hidden
          ctx.data.forEach(row => {
            if (row.belongId === item.categoryId) {
              row.hidden = !row.hidden
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
  position: relative;
  width: 100%;
  max-width: 450px;
  .ivu-select-dropdown{
    box-shadow: none;
    border: 1px solid #e9e9e9;
    margin: 0;
    padding: 0;
    .ivu-select-dropdown-list{
      max-height: 340px;
      overflow-y: scroll;
    }
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
