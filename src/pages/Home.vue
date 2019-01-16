<template>
  <Layout class="j_home" style="background: #e7eaef">
    <Content :style="{padding: '32px 32px 0 30px'}">
      <Row :gutter="24">
        <Col :lg="!agent.miniprogramcode && list.length === 0 ? 24 : 16" :md="!agent.miniprogramcode && list.length === 0 > 0 ? 24 : 16" class="j_col">
          <JWebsite style="margin-bottom: 25px;"/>
          <div ref="HomeSortable">
            <div v-for="item in $store.state.customData.homeSort" :key="item.value" v-if="item.status === '01'">
              <JStatic style="margin-bottom: 25px;" v-if="item.value === 'static'"/>
              <JLink style="margin-bottom: 25px;" v-if="item.value === 'link' && !isSubEmp"/>
              <JOrder style="margin-bottom: 25px;" v-if="item.value === 'order' && !isSubEmp && !agent.agentId"/>
            </div>
          </div>
        </Col>
        <Col :lg="8" :md="8" class="j_col" style="padding-left:17px;">
          <JBanner :list="list" v-if="list.length>0"/>
          <JSubscribe v-if="!isSubEmp && !agent.agentId"/>
          <div v-for="item in $store.state.customData.homeSort" :key="item.value" v-if="item.status === '01' && !agent.agentId">
            <JMessage style="margin-bottom: 25px;" v-if="item.value === 'message'"/>
            <JService style="margin-bottom: 25px;" v-if="item.value === 'service'"/>
          </div>
          <JApp v-if="agent.miniprogramcode || !agent.agentId"/>
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
      isSubEmp: false,
      list: []
    }
  },
  computed: {
    ...mapState(['customData', 'userInfo', 'agent'])
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
    },
    agent: {
      handler () {
        this.init()
      }
    }
  },
  created () {
    if (location.port === '8080' || location.host === 'www.jihui88.com') {
      this.init()
    }
  },
  methods: {
    init () {
      this.$http.get('/rest/api/comm/album/wxappbanner?enterpriseId=' + this.agent.user.enterpriseId).then(res => {
        let data = res.attributes.data
        let list = []
        for (var i = 0; i < data.length; i++) {
          var item = data[data.length - 1 - i]
          item.serverPath = 'http://img.jihui88.com/' + item.serverPath
          item.linkUrl = (item.linkUrl || 'javascript:;')
          list.push(item)
        }
        this.list = list
      })
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
