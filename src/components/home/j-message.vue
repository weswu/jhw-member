<template>
  <div class="j_panel">
    <Tabs :value="tabActive">
        <TabPane label="公告" name="0">
          <div style="padding: 0 18px;">
            公告
          </div>
        </TabPane>
        <TabPane label="网站询盘" name="1">
          <ul>
            <li v-for="item in list" :key="item">
                <a :href="item.url" target="_blank">{{ item.name }}</a>
                <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
            </li>
          </ul>
          <span class="j_empty">暂无数据</span>
          <a href="#/message" class="j_more">查看更多</a>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabActive: '1',
      list: []
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
.j_empty{
  color: #9b9b9b;
  text-align: center;
  display: block;
  padding: 35px 0 43px 0;
  width: 100%;
}
</style>
