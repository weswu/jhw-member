<template>
  <div id="JHW"  class="layout">
    <Layout>
        <Header v-show="win !== 'small'"/>
        <Layout class="j_layout ivu-layout-has-sider">
            <Sider v-show="win !== 'small'"/>
            <router-view/>
        </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/common/header'
import Sider from '@/components/common/sider'
export default {
  components: {
    Header,
    Sider
  },
  name: 'App',
  computed: {
    ...mapState(['win'])
  },
  created () {
    let params = window.location.search.substr(1).split('&')
    params.forEach(item => {
      let arr = item.split('=')
      if (arr[0] === 'win') {
        this.$store.commit('setWin', arr[1])
      }
      if (arr[0] === 'layoutId') {
        window.localStorage.setItem('layoutId', arr[1])
      }
      if (arr[0] === 'lanId') {
        window.localStorage.setItem('lanId', arr[1])
      }
    })
    try {
      document.body.removeChild(document.getElementById('app-loading'))
      setTimeout(function () {
        document.getElementById('JHW').style.display = 'block'
      }, 500)
    } catch (e) {}
  }
}
</script>
