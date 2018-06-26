<template>
  <Layout class="j_layout ivu-layout-has-sider j_seo">
    <MenuBar :data="'menuStatic'" :active="'seo'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'SEO管理'" :website="!header && active === '0'" :lan="active === '1' || (header && active === '0')"></JHeader>
      <Content>
        <div class="j_search">
          <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
        </div>
        <div class="warpper j_scroll">
          <SBase @on-change="headerChange" v-if="active === '0'"/>
          <STemplate @on-change="active = '0'" v-if="active === '1'"/>
          <KeywordStore v-if="active === '2'"/>
          <LongTailKeyword v-if="active === '3'"/>
          <InnerLink v-if="active === '4'"/>
          <JTab v-if="active === '5'"/>
          <Paid v-if="active === '6'"/>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import SBase from '@/components/seo/base'
import STemplate from '@/components/seo/template'
import KeywordStore from '@/components/seo/keyword_store'
import LongTailKeyword from '@/components/seo/long-tail-keyword'
import InnerLink from '@/components/seo/inner-link'
import JTab from '@/components/seo/tag'
import Paid from '@/components/seo/paid'
export default {
  components: {
    MenuBar,
    JHeader,
    SBase,
    STemplate,
    KeywordStore,
    LongTailKeyword,
    InnerLink,
    JTab,
    Paid
  },
  data () {
    return {
      btns: [
        { text: 'SEO基础设置', value: '0' },
        { text: 'SEO模板配置', value: '1' },
        { text: '关键词管理', value: '2' },
        { text: '长尾关键词', value: '3' },
        { text: '内部链接设置', value: '4' },
        { text: 'Tag标签管理', value: '5' },
        { text: '付费SEO推广', value: '6' }
      ],
      active: '0',
      header: false
    }
  },
  methods: {
    headerChange (e) {
      this.header = e
    }
  }
}
</script>

<style lang="less">
.j_seo{
  .ivu-layout-content{
    .warpper{
      height: calc(100vh - 215px);
      padding: 21px 19px;
      border: 1px solid #e9e9e9;
    }
  }
}
</style>
