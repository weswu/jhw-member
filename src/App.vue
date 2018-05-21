<template>
  <div id="JHW"  class="layout">
    <Layout>
        <Header/>
        <Layout class="j_layout ivu-layout-has-sider">
            <Sider/>
            <router-view/>
        </Layout>
    </Layout>
    <iframe src="http://pc.jihui88.com/pc/index.html" style="width:0;height:0;display: none;"></iframe>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import Sider from '@/components/common/sider'
export default {
  components: {
    Header,
    Sider
  },
  name: 'App',
  created () {
    try {
      document.body.removeChild(document.getElementById('app-loading'))
      setTimeout(function () {
        document.getElementById('JHW').style.display = 'block'
      }, 500)
    } catch (e) {}
  }
}
</script>
