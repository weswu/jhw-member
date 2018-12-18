<template>
  <div id="JHW" :class="(win === 'small' ? 'small' : win === 'mobile' ? 'webapp' : '') + ' ' + className">
    <Layout style="height: 100%;">
      <Header v-show="win !== 'small'"/>
      <Layout class="j_layout ivu-layout-has-sider" :class="{detail: detail}">
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
    ...mapState(['win', 'agent'])
  },
  data () {
    return {
      detail: false,
      winDefault: '',
      className: ''
    }
  },
  watch: {
    agent: {
      handler () {
        this.initIco()
      }
    }
  },
  beforeCreate () {
    if (location.host === 'www.jihui88.com') {
      document.getElementsByTagName('title')[0].innerText = '机汇网后台'
    }
  },
  created () {
    // 经销商
    if (location.host !== 'www.jihui88.com' && location.host !== 'm2.jihui88.com') {
      this.agent.manageLogo1 = '666'
      this.$store.commit('setAgent', this.agent)
      this.$store.dispatch('getAgent')
    } else {
      this.agent.manageLogo1 = 'upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png'
      this.$store.commit('setAgent', this.agent)
    }
    // 界面编辑用
    let params = window.location.search.substr(1).split('&')
    params.forEach(item => {
      let arr = item.split('=')
      if (arr[0] === 'win') {
        this.winDefault = 'small'
        this.$store.commit('setWin', arr[1])
      }
      if (arr[0] === 'layoutId') {
        window.localStorage.setItem('layoutId', arr[1])
      }
      if (arr[0] === 'lanId') {
        window.localStorage.setItem('lanId', arr[1])
      }
      if (arr[0] === 'class') {
        this.className = decodeURIComponent(arr[1])
      }
    })
    if (this.$route.path.indexOf('/product/') > -1 || this.$route.path.indexOf('/news/') > -1) {
      this.detail = true
    }
    // web版本
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.$store.commit('setWin', 'mobile')
    } else {
      window.onresize = () => {
        return (() => {
          if (document.body.clientWidth < 700) {
            this.$store.commit('setWin', 'mobile')
          } else {
            this.$store.commit('setWin', this.winDefault)
          }
        })()
      }
    }
    try {
      document.body.removeChild(document.getElementById('app-loading'))
      setTimeout(function () {
        document.getElementById('JHW').style.display = 'block'
      }, 500)
    } catch (e) {}
    this.initIco()
  },
  methods: {
    initIco () {
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = this.agent.ico ? ('http://img.jihui88.com/' + this.agent.ico) : 'http://cps.jihui88.com/static/img/favicon.ico'
      document.getElementsByTagName('head')[0].appendChild(link)
      document.getElementsByTagName('title')[0].innerText = this.agent.user.enterprise.name + '后台'
    }
  }
}
</script>
