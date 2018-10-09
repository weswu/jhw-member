<template>
  <Dropdown trigger="custom" :visible="visible" placement="bottom" class="j_category_select" @on-clickoutside="visible = false" >
    <div class="ivu-select ivu-select-single">
      <div class="ivu-select-selection" @click="visible = true">
        <input v-model="name"  type="hidden">
        <span class="ivu-select-placeholder" v-if="!name">请选择</span>
        <span class="ivu-select-selected-value" v-if="name">{{name}}</span>
        <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow" style="display: none;"></i>
        <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
      </div>
    </div>
    <ul class="ivu-select-dropdown-list" slot="list">
      <li class="ivu-select-item" @click="select({name: '请选择', categoryId: ''})" v-if="isDefalut">请选择</li>
      <li
        v-for="item in data"
        :key="item.categoryId"
        v-if="!item.hidden"
        :class="{'ivu-select-item-selected': item.bg, 'ivu-select-item': true, 'item1': item.grade == '1', 'item2': item.grade == '2', 'item3': item.grade == '3'}"
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
    categoryId: {},
    isDefalut: Boolean
  },
  data () {
    return {
      visible: false,
      data: [],
      name: ''
    }
  },
  watch: {
    categoryId: {
      handler () {
        this.initCate(this.categoryId)
      },
      deep: true
    },
    list: {
      handler () {
        this.init()
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    initCate (categoryId) {
      var ctx = this
      this.data.forEach(item => {
        if (item.categoryId === categoryId) {
          ctx.name = item.name
        }
      })
      if (!categoryId) this.name = ''
      this.initBg(categoryId)
    },
    init () {
      var ctx = this
      setTimeout(function () {
        let list = JSON.parse(JSON.stringify(ctx.list))
        list.forEach(item => {
          if (item.categoryId === ctx.categoryId) {
            ctx.name = item.name
          }
          if (item.grade === '1' || item.grade === '2') item.expand = true
          if (item.grade === '2' || item.grade === '3') item.hidden = false
        })
        ctx.data = list
        ctx.initBg(ctx.categoryId)
      }, 200)
    },
    select (item) {
      this.name = item.name
      if (this.$parent.$parent.name === 'j_category_multiple') {
        // 为什么多了个中间组件
        this.$parent.$parent.change(item.categoryId)
      } else {
        this.$emit('on-change', item.categoryId)
      }
      this.visible = false
    },
    initBg (categoryId) {
      var ctx = this
      this.data.forEach(item => {
        item.bg = false
      })
      this.data.forEach(item => {
        if (item.categoryId === categoryId) {
          item.bg = true
          ctx.data.forEach(row => {
            if (row.categoryId === item.belongId) {
              row.bg = true
              ctx.data.forEach(row2 => {
                if (row2.categoryId === row.belongId) {
                  row2.bg = true
                }
              })
            }
          })
        }
      })
    },
    changeCateList (data) {
      var ctx = this
      data.expand = !data.expand
      this.data.forEach(item => {
        if (item.belongId === data.categoryId) {
          item.hidden = !data.expand
          ctx.data.forEach(row => {
            if (row.belongId === item.categoryId) {
              if (!data.expand) {
                row.hidden = true
              } else {
                row.hidden = !item.expand
              }
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
  .ivu-input{
     background: none;
     position: relative;
     z-index: 99;
  }
  .ivu-select-dropdown{
    box-shadow: none;
    border: 1px solid #e9e9e9;
    margin: 0;
    padding: 0;
    .ivu-select-dropdown-list{
      max-height: 340px;
      overflow-y: auto;
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
      color: #fff !important;
    }
  }
}
</style>
