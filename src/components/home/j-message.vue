<template>
  <div class="j_home_message j_panel">
    <Tabs :value="tabActive">
        <TabPane label="公告" name="0">
          <div class="j_warpper">
            <div class="j_null">暂无公告</div>
          </div>
        </TabPane>
        <TabPane label="客户消息" name="1">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <div class="title">
                {{item.title}}
              </div>
              <p>
                {{item.addTime | time('yyyy-MM-dd hh:mm')}}
              </p>
            </li>
          </ul>
          <div class="j_null j_warpper" v-if="list.length===0">暂无数据</div>
          <a href="#/message?type=03" class="j_more">查看更多</a>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Website from '@/components/pc/website'
import Xiaochengxu from '@/components/static/xiaochengxu'
export default {
  components: {
    Website,
    Xiaochengxu
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
      this.$http.get('/rest/api/message/list?pageSize=3&type=03').then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_home_message ul{
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
