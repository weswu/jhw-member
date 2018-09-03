<template>
  <div class="j_image" @click="open" :style="{width: width+'px', height: width+'px', lineHeight: width+'px'}">
    <img :src="$store.state.status.IMG_HOST+src" alt="" v-if="src">
    <div class="null_pic" v-if="!src">
      上传
    </div>
    <JAlbum :title="title" ref="ablum" @on-change="picChange"/>
  </div>
</template>

<script>
import JAlbum from '@/components/group/j-album'
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
    JAlbum
  },
  methods: {
    open () {
      this.$refs.ablum.open()
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
  display: inline-block;
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
