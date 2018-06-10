<template>
  <div class="j_product_attr_custom">
    <div ref="list">
      <div v-for="(item, index) in list" :key="index" style="margin-bottom: 10px;">
        <span>名称：</span><Input v-model="item.madeName" style="margin-right:20px;"></Input>
        <span v-if="!item.unitBol">单位：</span><span v-if="item.unitBol">数值：</span>
        <Input v-model="item.madeUnit" class="unitVal"></Input>
        <Checkbox v-model="item.unitBol">固定值</Checkbox>
        <i class="iconfont icon-tuozhuai"></i>
        <Button type="ghost" size="small" style="margin-left: 10px;" @click="del(index)">删除</Button>
      </div>
    </div>
    <div style="position: relative;">
      <Button type="ghost" size="small" @click="add">添加</Button>
      <a class="a_underline" href="http://sj.jihui88.com/rest/site/59//formula" target="_blank">查看使用说明</a>
      <div class="j_tip j_tip_category" style="left: 140px;">
        总价格 = （如:长度*宽度*商品价格）<br>
        说明：固定值对买家不可见，只参与表达式的计算。<br>
        商品价格可移到表达式中，如：总价格 = （长度*宽度*商品价格+开启价格*开启扇数）
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  props: {
    data: Array
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    var el = this.$refs.list
    var vm = this
    Sortable.create(el, {
      group: {
        name: 'list',
        pull: true
      },
      handle: '.icon-tuozhuai',
      onEnd (e) {
        let movedRow = vm.list[e.oldIndex]
        vm.list.splice(e.oldIndex, 1)
        vm.list.splice(e.newIndex, 0, movedRow)
      }
    })
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.data.forEach(item => {
        item.unitBol = true
        if (item.madeType === '01') {
          item.unitBol = false
        }
        this.list.push(item)
      })
    },
    add () {
      this.list.push({
        madeType: '01',
        unitBol: false
      })
      this.$emit('on-change')
    },
    del (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
.j_product_attr_custom{
  .ivu-input-wrapper{
    width: 100px !important;
  }
  .unitVal.ivu-input-wrapper{
    width: 80px !important;
  }
  .ivu-checkbox-wrapper{
    margin-left: 20px;
  }
  .iconfont{
    cursor: pointer;
  }
}
</style>
