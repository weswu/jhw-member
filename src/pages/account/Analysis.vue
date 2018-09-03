<template>
  <Layout class="ivu-layout-has-sider">
    <MenuBar :data="'menuAnalysis'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content">
      <JHeader :title="'员工推广分析'"/>
      <Content>
        <div id="employee_account_analysis" style="width:100%;"></div>
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
      data: [],
      height: 0
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
          this.data = res.attributes.data
          this.height = this.categories.length * 40
          this.init()
        }
      })
    },
    activeChange (e) {
      this.active = e
      this.get()
    },
    init () {
      let analysis = document.getElementById('employee_account_analysis')
      // 设置容器高宽
      analysis.style.height = this.height + 'px'
      let myChart = echarts.init(analysis)
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
      myChart.setOption(option)
      myChart.resize()
      // 自适应高度和宽度
      window.onresize = function () {
        myChart.resize()
      }
    }
  }
}
</script>

<style lang="less">
</style>
