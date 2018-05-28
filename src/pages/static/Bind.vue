<template>
  <Layout class="j_layout ivu-layout-has-sider j_static">
    <MenuBar :data="'menuStatic'" :active="'bind'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'域名绑定'" :website="true"/>
      <Content>
        <div class="j_search">
          <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
        </div>
        更新中
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">提交</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      btns: [
        { text: '主域名绑定', value: '0' },
        { text: '二级域名绑定', value: '1' }
      ],
      active: '0'
    }
  }
}
</script>

<style lang="less">
</style>
