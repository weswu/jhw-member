<template>
  <ul class="j_picture">
    <li v-if="!list">
      <i class="iconfont icon-plus-add" v-if="!src"></i>
      <img :src="'http://img.jihui88.com/'+src" @click="open" v-if="src">
      <div class="bom">上传</div>
    </li>
    <li v-for="(item, index) in list" :key="index" v-if="list">
      <i class="iconfont icon-plus-add" v-if="!item.src"></i>
      <img :src="'http://img.jihui88.com/'+item.src" @click="open" v-if="item.src">
      <div class="top" v-if="type === 'product' && index === 0">产品主图</div>
      <div class="bom">
        <i class="iconfont icon-zuojiantou" @click="prev"></i>
        <i class="iconfont icon-youjiantou" @click="next"></i>
        <i class="iconfont icon-x" @click="del"></i>
      </div>
    </li>
    <li class="add" v-if="list">
      <i class="iconfont icon-plus-add"></i>
    </li>
  </ul>
</template>

<script>
import JAblum from '@/components/group/j-ablum'
export default {
  props: {
    src: {},
    list: {},
    type: {},
    multiple: {
      type: Boolean,
      default: false
    }
  },
  components: {
    JAblum
  },
  data () {
    return {}
  },
  methods: {
    open () {
      this.$emit('on-change')
    },
    prev () {

    },
    next () {

    },
    del () {

    }
  }
}
</script>

<style lang="less">
.j_picture{
  li{
    width: 104px;
    height: 104px;
    line-height: 104px;
    border: 1px solid #c9c9c9;
    float: left;
    cursor: pointer;
    display: table-cell;
    text-align: center;
    margin-right: 11px;
    position: relative;
    background: #f5f6fa;
    &:hover{
      .bom{
         opacity: 1
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
    .top{
      position: absolute;
      left: -1px;
      top: -1px;
      background: #3e3e3e;
      width: 104px;
      color: #fff;height: 21px;
      line-height: 21px
    }
    .bom{
      position: absolute;
      left: 0px;
      bottom: 0px;
      background: #f5f6fa;
      border-top: 1px solid #c9c9c9;
      width: 102px;
      height: 20px;
      color: #999;
      line-height: 20px;
      opacity: 0;
      transition: 0.3s ease;
      i{
        color: #437708;
        font-size: 22px;
        float: left;
        width: 30%;
      }
      .icon-x{
        color: #d0021b;
        font-size: 14px;
      }
    }
  }
  .icon-plus-add{
    font-size: 38px;
    color: #c9c9c9;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 104px;
  }
}
</style>
