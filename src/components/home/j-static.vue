<template>
  <div class="j_home_static j_panel">
    <Tabs :value="tabActive">
      <TabPane label="我的网站" name="0">
        <div style="padding: 0 28px 28px 28px;">
          <Website :searchData="searchData"/>
        </div>
      </TabPane>
      <TabPane label="我的小程序" name="1" v-if="false">
        <div style="padding: 0 28px 28px 28px;">
          <Xiaochengxu/>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Website from '@/components/pc/website'
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
        pageSize: 2,
        sortType: 'desc'
      },
      isSubEmp: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'agent'])
  },
  methods: {
    handleTabRemove (name) {
      this['tabActive'] = name
    }
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
.j_home_static{
  .static_info {
    overflow: hidden;
  }
}
</style>
