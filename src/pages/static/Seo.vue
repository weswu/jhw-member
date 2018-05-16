<template>
  <Layout class="j_layout ivu-layout-has-sider j_seo">
    <MenuBar :data="'menuStatic'" :active="'seo'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'SEO管理'">
        <div slot="btn">
          <Select v-model="staticId" class="primary" @on-change="change" style="width:167px">
            <Option v-for="item in staticList" :value="item.value" :key="item.value">{{ item.text }}</Option>
          </Select>
        </div>
      </JHeader>
      <div class="j_search">
        <Button class="grey" @click="search(item.value)" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
      </div>
      <Content>
        <div class="warpper">
          <SBase v-if="active === '0'"/>
          <div v-else>
            更新中
          </div>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import SBase from '@/components/seo/base'
export default {
  components: {
    MenuBar,
    JHeader,
    SBase
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
      staticId: ''
    }
  },
  computed: {
    ...mapState(['staticList'])
  },
  methods: {
    // 功能
    search (e) {
      this.active = e
    },
    change (e) {
      this.staticId = e
    }
  }
}
</script>

<style lang="less">
.j_seo{
  .ivu-layout-content{
    .warpper{
      height: calc(100vh - 216px);
      padding: 21px 19px;
      border: 1px solid #e9e9e9;
    }
  }
}
</style>
