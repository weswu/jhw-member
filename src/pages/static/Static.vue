<template>
  <Layout class="j_layout_content j_static">
    <JHeader :title="'站点数据管理'"/>
    <Content>
      <div class="j_search">
        <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}" v-if="index === 0">{{item.text}}</Button>
      </div>
      <Website v-if="active === '0'"/>
      <Xiaochengxu v-if="active === '1'"/>
    </Content>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import Website from '@/components/pc/website'
import Xiaochengxu from '@/components/static/xiaochengxu'
export default {
  components: {
    JHeader,
    Website,
    Xiaochengxu
  },
  data () {
    return {
      btns: [
        { text: '我的网站', value: '0' },
        { text: '我的小程序', value: '1' }
      ],
      active: '0'
    }
  }
}
</script>

<style lang="less">
.j_static .static_info{
  height: calc(100vh - 347px);
  overflow-y: auto;
}
</style>
