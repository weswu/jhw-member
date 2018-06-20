<template>
  <ul class="j_nav_link j_panel ivu-tabs-bar">
    <li v-for="item in customData.linkList" :key="item.value">
      <a href="javascript:;" @click="nav(item.value)"><i :class="'iconfont ' + item.icon"></i>{{item.text}}</a>
    </li>
    <li class="add" @click="add"><i class="iconfont icon--jia"></i></li>
    <Tool ref="tool" :selected="customData.linkList"/>
    <JAlbum ref="album" :multiple="true"/>
    <addAlbum ref="addAlbum"/>
    <Recycle ref="recycle"/>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import Tool from '@/components/home/j-tool'
import JAlbum from '@/components/group/j-album'
import addAlbum from '@/pages/album/Add'
import Recycle from '@/pages/album/Recycle'
export default {
  components: {
    Tool,
    JAlbum,
    addAlbum,
    Recycle
  },
  computed: {
    ...mapState(['customData'])
  },
  methods: {
    add () {
      this.$refs.tool.open()
    },
    nav (name) {
      if (name === 'shangchuanPic') {
        this.$refs.album.open()
      } else if (name === 'addAlbum') {
        this.$refs.addAlbum.open()
      } else if (name === 'recycle') {
        this.$refs.recycle.open('all')
      } else {
        this.$router.push({path: '/' + name})
      }
    }
  }
}
</script>

<style lang="less">
.j_nav_link{
  overflow: hidden;
  background: #fff;
  padding: 23px;
  li{
    float: left;
    text-align: center;
    list-style-type: none;
    color: #9c9c9c;
    width: 80px;
    height: 70px;
    margin: 14px 28px 14px 0;
    a{
      color: #9c9c9c;
    }
    i{
      display: block;
      font-size: 28px;
      color: #12bedb;
      cursor: pointer;
    }
  }
  .add{
    border: 1px solid #e9e9e9;
    margin-top: 17px;
    width: 61px;
    height: 61px;
    i{
      font-size: 28px;
      line-height: 61px;
      color: #bfcace;
    }
  }
  .ivu-badge-count{
    height: 19px;line-height: 19px;
  }
}
</style>
