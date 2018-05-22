<template>
  <div class="j_home_static j_panel">
    <Tabs :value="tabActive">
        <TabPane label="我的网站" name="0">
          <div style="padding: 0 28px 28px 28px;">
            <Website :searchData="searchData"/>
          </div>
        </TabPane>
        <TabPane label="我的小程序" name="1">
          <div style="padding: 0 28px 28px 28px;">
            <Xiaochengxu/>
          </div>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Website from '@/components/static/website'
import Xiaochengxu from '@/components/static/xiaochengxu'
export default {
  components: {
    Website,
    Xiaochengxu
  },
  data () {
    return {
      tabActive: '0',
      searchData: {
        page: 1,
        pageSize: 2
      }
    }
  },
  methods: {
    handleTabRemove (name) {
      this['tabActive'] = name
    }
  }
}
</script>

<style lang="less">
.j_home_static{
  .static_info {
    overflow: hidden;
  }
}
</style>
