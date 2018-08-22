<template>
  <div class="j_seo_paid">
    <div class="j_search">
      <Button class="mormal" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{active: active === item.value}">{{item.text}}</Button>
    </div>
    <div v-if="active === '0'">
      <JTable :title="'付费SEO推广的套餐'">
        <tbody slot="tbody">
          <tr>
            <td>套餐类型</td>
            <td>普及版1年</td>
            <td>普及版2年</td>
            <td>普及版3年</td>
          </tr>
          <tr>
            <td>产品长尾词</td>
            <td>8+8</td>
            <td>8+8</td>
            <td>8+8</td>
          </tr>
          <tr>
            <td>流量统计</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <td>智能监控</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <td>主词个数</td>
            <td>10个</td>
            <td>10个</td>
            <td>10个</td>
          </tr>
          <tr>
            <td>综合指数</td>
            <td>150以内</td>
            <td>150以内</td>
            <td>150以内</td>
          </tr>
          <tr>
            <td>完成时间</td>
            <td>网站确认后3个月以内</td>
            <td>网站确认后3个月以内</td>
            <td>网站确认后3个月以内</td>
          </tr>
          <tr>
            <td>合同金额</td>
            <td>14800</td>
            <td>19800</td>
            <td>23800</td>
          </tr>
        </tbody>
      </JTable>
      <div class="j_tip">
        <div style="position: absolute;">达标方案：</div>
        <div style="padding-left: 65px;">1、百度+百度移动累计50个关键词首页，<br>
        2、百度+百度移动+搜狗+360累计100个关键词首页</div>
      </div>
      <div class="" style="color: #a7a7a7;margin-top: 25px;margin-bottom: 50px">
        温馨提醒：客户选择的关键词必须符合机汇网普及版服务包综合指数150以内，套餐有多种达标方案，只要满足其中任意一种达标方案即视为达标，客户享受机汇网提供的关键词达标365天的服务，域名，空间到期后客户自行交费，SEO未达标365天，机汇网继续提供服务。如果规定时间内未达标，客户也不愿意继续等待，客户可以申请退款，机汇网根据提供服务关键词的达标比例为客户退款。
      </div>
      <div style="position: relative;">
        <div style="position: absolute;">如有意向联系我们：</div>
        <div style="padding-left: 115px;">电话：400-7111-011<br>俞小姐：136-2679-9628</div>
      </div>
    </div>

    <div v-if="active === '1'"><br><br>
      登录网址：<a href="http://seo.jihui88.com/" target="_blank">seo.jihui88.com</a><br><br><br>
      <span style="color: #a6a6a6">
        温馨提示：登录账号和密码同机汇网后台
      </span>
    </div>
  </div>
</template>

<script>
import JTable from '@/components/group/j-table'
export default {
  components: {
    JTable
  },
  data () {
    return {
      btns: [
        { text: '什么是付费SEO推广', value: '0' },
        { text: '付费SEO推广登录', value: '1' }
      ],
      active: '0'
    }
  }
}
</script>

<style lang="css">
</style>
