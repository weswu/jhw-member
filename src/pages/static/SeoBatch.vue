<template>
  <Layout class="j_layout_content j_static_batch">
    <JHeader :title="'批量提交'" :type="true" :tip="tip"/>
    <Content>
      <div class="j_search" style="padding-bottom: 17px;">
        <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
      </div>
      <Baidu v-if="active === '0'"/>
      <Haoso v-if="active === '1'"/>
      <Sogou v-if="active === '2'"/>
      <a href="https://www.bing.com/toolbox/submit-site-url" target="_blank" class="a_underline" v-if="active === '3'">必应Bing管理员</a>
    </Content>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Baidu from '@/components/static/batch/baidu'
import Haoso from '@/components/static/batch/360'
import Sogou from '@/components/static/batch/sogou'
export default {
  components: {
    MenuBar,
    JHeader,
    Baidu,
    Haoso,
    Sogou
  },
  computed: {
    ...mapState(['agent'])
  },
  data () {
    return {
      tip: '温馨提醒：向各大搜索引擎提交网址，可以加快网站被搜索引擎收录。 一个网站只需提交一次（首页），搜索引擎会自动收录网页。 不保证一定能收录您提交的网站。 ',
      btns: [
        { text: '百度', value: '0' },
        { text: '好搜', value: '1' },
        { text: '搜搜 / 搜狗', value: '2' },
        { text: '必应', value: '3' }
      ],
      active: '0'
    }
  },
  watch: {
    agent () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.agent.vSeoBatch) {
        this.tip = this.tip + '<a href="' + this.agent.vSeoBatch + '" class="a_underline" target="_blank">批量提交视频教程</a>'
      }
    }
  }
}
</script>

<style lang="less">
.j_static_batch{
  .grey{
    width: 114px;    margin-right: 6px;
  }
  .ivu-form{
    padding-bottom: 27px;
    .ivu-input-wrapper {
      max-width: 313px;
    }
  }
}
</style>
