<template>
  <div class="j_home_service j_panel">
    <Tabs :value="tabActive">
        <TabPane label="正在服务" name="0">
          <ul>
            <li v-for="(item, index) in list" :key="index" v-if="index<5">
              <div class="title" v-html="item.fdbk_subject64"></div>
              <p>
                {{item.create_time}}
              </p>
            </li>
          </ul>
          <div class="j_null" style="padding: 0 28px 28px 28px;" v-if="list.length>0">暂无数据</div>
        </TabPane>
        <TabPane label="服务结束" name="1">
          <div style="padding: 0 28px 28px 28px;">
            <div class="j_null">暂无数据</div>
          </div>
          <span class="j_more" @click="open">我要服务反馈</span>
        </TabPane>
    </Tabs>
    <Feedback ref="feedback"/>
  </div>
</template>

<script>
import Feedback from '@/components/home/j-feedback'
export default {
  components: {
    Feedback
  },
  data () {
    return {
      tabActive: '1',
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/crm/crm_list?pageSize=3').then(res => {
        if (res.success) {
          this.list = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open () {
      this.$refs.feedback.open()
    }
  }
}
</script>

<style lang="less">
.j_home_service ul{
  padding: 0 1px;
  li{
    border-bottom: 1px solid #eaedf1;
    padding: 9px 15px;
    line-height: 1.6;
    .title{
      color: #72dced;
      cursor: pointer;
    }
    p{
      color: #595959;
    }
  }
}
</style>
