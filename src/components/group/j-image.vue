<template>
  <div class="j_image" @click="open" :style="{width: width+'px', height: width+'px', lineHeight: width+'px'}">
    <img :src="'http://img.jihui88.com/'+src" alt="" v-if="!isNull" @error="setErrorImg">
    <div class="null_pic" v-if="isNull">
      上传
    </div>
    <JAblum :title="title" ref="ablum" @on-change="picChange"/>
  </div>
</template>

<script>
import JAblum from '@/components/group/j-ablum'
export default {
  props: {
    src: {},
    width: {
      type: Number,
      default: 100
    },
    title: {
      type: String,
      default: '相册'
    }
  },
  components: {
    JAblum
  },
  data () {
    return {
      isNull: false
    }
  },
  methods: {
    open () {
      this.$refs.ablum.open()
    },
    setErrorImg (e) {
      this.isNull = true
    },
    picChange (e) {
      this.$emit('on-change', e)
    }
  }
}
</script>

<style lang="less">
.j_image{
  cursor: pointer;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  img {
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }
  .null_pic{
    background: #f5f6fa;
    text-align: center;
    color: #9b9b9b;
  }
}
</style>
