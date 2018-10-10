<template>
  <Layout class="j_home" style="background: #e7eaef">
    <Content :style="{padding: '32px 32px 0 30px'}">
      <Row :gutter="24">
        <Col :lg="16" :md="16" class="j_col">
          <JWebsite style="margin-bottom: 25px;"/>
          <div ref="HomeSortable" v-if="!isSubEmp">
            <div v-for="item in $store.state.customData.homeSort" :key="item.value" v-if="item.status === '01'">
              <JStatic style="margin-bottom: 25px;" v-if="item.value === 'static'"/>
              <JLink style="margin-bottom: 25px;" v-if="item.value === 'link'"/>
              <JOrder style="margin-bottom: 25px;" v-if="item.value === 'order'"/>
            </div>
          </div>
        </Col>
        <Col :lg="8" :md="8" class="j_col" style="padding-left:17px;">
          <JBanner/>
          <JSubscribe v-if="!isSubEmp"/>
          <div v-for="item in $store.state.customData.homeSort" :key="item.value" v-if="item.status === '01'">
            <JMessage style="margin-bottom: 25px;" v-if="item.value === 'message'"/>
            <JService style="margin-bottom: 25px;" v-if="item.value === 'service'"/>
          </div>
          <JApp/>
        </Col>
      </Row>
      <JConsult/>
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
  data () {
    return {
      isSubEmp: false
    }
  },
  computed: {
    ...mapState(['customData', 'userInfo'])
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
  },
  watch: {
    userInfo: {
      handler () {
        let pris = this.userInfo.privilege
        if (pris) this.isSubEmp = true
      }
    }
  }
}
</script>
<style lang="less">
  .j_home{
    padding-bottom: 25px;
    .j_warpper{
      padding: 0px 28px 28px;
    }
  }
</style>
