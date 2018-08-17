<template>
  <Layout class="j_home" style="background: #e7eaef">
    <Content :style="{padding: '32px 32px 0 30px'}">
      <Row :gutter="24">
        <Col :lg="16" :md="16" class="j_col">
          <JWebsite style="margin-bottom: 25px;"/>
          <div ref="HomeSortable">
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
          <div v-for="item in $store.state.customData.homeSort" :key="item.value" v-if="item.status === '01'">
            <JMessage style="margin-bottom: 25px;" v-if="item.value === 'message'"/>
            <JService style="margin-bottom: 25px;" v-if="item.value === 'service'"/>
          </div>
          <JApp/>
        </Col>
      </Row>
      <JConsult/>
      <a href="http://v.qq.com/vplus/4aa13bffe0e2662991069f1800862a96/foldervideos/gr2002901enccnk" class="shipin" target="_blank" title="视频教程"><i class="iconfont icon-shipin"></i></a>
    </Content>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import JWebsite from '@/components/home/j-website'
import JStatic from '@/components/home/j-static'
import JLink from '@/components/home/j-link'
import JOrder from '@/components/home/j-order'
import JMessage from '@/components/home/j-message'
import JService from '@/components/home/j-service'
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
    JMessage,
    JService,
    JBanner,
    JSubscribe,
    JApp,
    JConsult
  },
  computed: {
    ...mapState(['customData'])
  },
  mounted () {
    var ctx = this
    let el = this.$refs.HomeSortable
    Sortable.create(el, {
      group: {
        name: 'list',
        pull: true
      },
      animation: 120,
      handle: '.ivu-tabs-bar',
      onUpdate (e) {
        let newIndex = ctx.customData.homeSort[e.newIndex]
        let oldIndex = ctx.customData.homeSort[e.oldIndex]
        ctx.customData.homeSort.splice(e.newIndex, 1, oldIndex)
        ctx.customData.homeSort.splice(e.oldIndex, 1, newIndex)
        ctx.$store.dispatch('SAVE_CUSTOM_DATA')
      }
    })
  }
}
</script>
<style lang="less">
  .j_home{
    padding-bottom: 25px;
    .j_warpper{
      padding: 0px 28px 28px;
    }
    .shipin{
      position: fixed;
      right: 0;
      bottom: 52px;
      width: 24px;
      background: #5bd1e7;
      color: #fff;
      text-align: center;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    }
  }
</style>
