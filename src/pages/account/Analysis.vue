<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuAnalysis'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'员工推广分析'"/>
        <div id="employee_account_analysis" :style="{height: height + 'px'}"></div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import echarts from 'echarts'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      active: 'pc',
      categories: [],
      list: [],
      data: [],
      height: 100
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/submember/list_s?type=' + this.active).then(res => {
        if (res.success) {
          this.categories = res.attributes.categories
          this.height = this.categories.length * 40
          this.list = res.attributes.list
          this.data = res.attributes.data
          this.init()
        }
      })
    },
    activeChange (e) {
      this.active = e
    },
    init () {
      let visiteVolume = echarts.init(document.getElementById('employee_account_analysis'))

      let data = []
      for (var i = 0; i < this.categories.length; i++) {
        data.push({value: this.data[i], name: this.categories[i], itemStyle: {normal: {color: '#2d8cf0'}}})
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 0,
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.categories,
          nameTextStyle: {
            color: '#c3c3c3'
          }
        },
        series: [
          {
            name: '推广量',
            type: 'bar',
            data: data
          }
        ]
      }

      visiteVolume.setOption(option)
    }
  }
}
</script>

<style lang="less">
</style>
