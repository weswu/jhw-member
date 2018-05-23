<template>
  <div class="j_image" @click="open" :style="{width: width+'px', height: height+'px'}">
    <img :src="'http://img.jihui88.com/'+src" alt="" v-if="!isNull" @error="setErrorImg">
    <div class="null_pic" v-if="isNull" :style="{width: width+'px', height: width+'px', lineHeight: width+'px'}">
      上传
    </div>
    <JAblum :title="title" ref="ablum" @on-change="picChange"/>
  </div>
</template>

<script>
import JAblum from '@/components/group/j-ablum'
export default {
  props: {
    src: {
      type: String,
      default: 'upload/j/j2/jihui88/picture/2015/04/01/72041ac7-51fa-4163-906d-8b576955d29e.jpg'
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number
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
      e.target.src = 'http://img.jihui88.com/upload/j/j2/jihui88/picture/2015/04/01/72041ac7-51fa-4163-906d-8b576955d29e.jpg'
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
