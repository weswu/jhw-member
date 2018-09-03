<template>
  <ul class="j_picture">
    <li class="j_picture_item" v-if="!list" @click="open">
      <i class="iconfont icon-plus-add" v-if="!src"></i>
      <img :src="$store.state.status.IMG_HOST+src" v-if="src">
      <div class="bom"><span v-if="src">重新</span>上传</div>
    </li>
    <li class="j_picture_item" v-for="(item, index) in list" :key="index" v-if="list">
      <i class="iconfont icon-plus-add" v-if="!item.src"></i>
      <img :src="$store.state.status.IMG_HOST+item.src" v-if="item.src">
      <div class="top" v-if="type === 'product' && index === 0">产品主图</div>
      <div class="bom">
        <i class="iconfont icon-zuojiantou" @click="prev(index)"></i>
        <i class="iconfont icon-youjiantou" @click="next(index)"></i>
        <i class="iconfont icon-x" @click="del(index)"></i>
      </div>
      <div class="update" v-if="item.src" @click="open($event, index)">
        重新上传
      </div>
    </li>
    <li class="j_picture_item add" v-if="list && list.length < 20">
      <i class="iconfont icon-plus-add" @click="open($event, 'add')"></i>
    </li>
    <JAlbum ref="ablum" :type="type === 'product' ? 'many' : type" @on-change="picChange" v-if="toggle"/>
  </ul>
</template>

<script>
import JAlbum from '@/components/group/j-album'
export default {
  props: {
    src: {},
    list: {},
    type: {}
  },
  components: {
    JAlbum
  },
  data () {
    return {
      index: 0,
      toggle: false
    }
  },
  methods: {
    open (e, index) {
      this.index = index || 0
      this.toggle = true
      var ctx = this
      setTimeout(function () {
        ctx.$refs.ablum.open()
      }, 100)
    },
    prev (index) {
      if (index !== 0) this.$emit('on-prev', index)
    },
    next (index) {
      if (index !== this.list.length) this.$emit('on-next', index)
    },
    del (index) {
      this.$emit('on-del', index)
    },
    picChange (e) {
      console.log(e[0])
      this.$emit('on-change', e, this.index)
    }
  }
}
</script>

<style lang="less">
.j_picture{
  .j_picture_item{
    width: 104px;
    height: 104px;
    line-height: 104px;
    border: 1px solid #c9c9c9;
    float: left;
    cursor: pointer;
    display: table-cell;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    background: #f5f6fa;
    overflow: hidden;
    &:hover{
      .bom{
         opacity: 1
      }
      .update{
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
      z-index: 10;
      background: #3e3e3e;
      width: 104px;
      color: #fff;height: 21px;
      line-height: 21px
    }
    .bom{
      position: absolute;
      left: 0px;
      bottom: 0px;
      z-index: 10;
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
    .update{
      opacity: 0;
      background: rgba(0,0,0,0.5);
      color: #fff;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 9;
      transition: 0.3s ease;
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
