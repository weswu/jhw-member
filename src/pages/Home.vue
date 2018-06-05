<template>
  <Layout class="j_home">
    <Content :style="{padding: '32px 32px 0 30px'}">
      <Row :gutter="24">
        <Col :lg="16" :md="16" class="j_col">
          <JWebsite style="margin-bottom: 25px;"/>
          <div id="HomeSortable">
            <div v-for="item in $store.state.customData.homeSort" :key="item.value" v-if="item.status === '01'">
              <JStatic style="margin-bottom: 25px;" v-if="item.value === 'static'"/>
              <JLink style="margin-bottom: 25px;" v-if="item.value === 'link'"/>
              <JOrder style="margin-bottom: 25px;" v-if="item.value === 'order'"/>
            </div>
          </div>
        </Col>
        <Col :lg="8" :md="8" class="j_col" style="padding-left:17px;">
          <JBanner/>
          <JSubscribe/>
          <JApp/>
        </Col>
      </Row>
      <JConsult/>
    </Content>
  </Layout>
</template>

<script>
import JWebsite from '@/components/home/j-website'
import JStatic from '@/components/home/j-static'
import JLink from '@/components/home/j-link'
import JOrder from '@/components/home/j-order'
import JBanner from '@/components/home/j-banner'
import JSubscribe from '@/components/home/j-subscribe'
import JApp from '@/components/home/j-app'
import JConsult from '@/components/home/j-consult'
import Sortable from 'sortablejs'
export default {
  components: {
    JWebsite,
    JStatic,
    JLink,
    JOrder,
    JBanner,
    JSubscribe,
    JApp,
    JConsult
  },
  mounted () {
    setTimeout(function () {
      let el = document.getElementById('HomeSortable')
      Sortable.create(el, {
        group: {
          name: 'list',
          pull: true
        },
        animation: 120,
        handle: '.ivu-tabs-bar',
        onUpdate (a, b) {
          console.log('aa')
        }
      })
    }, 2000)
  }
}
</script>
<style lang="less" scoped>
  .j_home{
    padding-bottom: 25px;
  }
  .ivu-layout {
    background: #e7eaef
  }
</style>
