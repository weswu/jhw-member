<template>
  <Layout class="j_layout_content j_mini_program">
    <JHeader :title="'高级版'"/>
    <Content>
      <div class="j_search">
        <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
        <div class="j_tip" v-if="active === '0'">
          1、独立后台，数据与电脑网站机汇网不同步<br/>
          2、套模板：标准模板<br/>
          3、备注：模板颜色可改部分——底栏和标题栏可自定义
        </div>
      </div>
      <Form :model="detail" :label-width="75" v-if="active === '0'">
        <FormItem label="可选方案：">
          <RadioGroup v-model="detail.state">
            <Radio label="00">无</Radio>
            <Radio label="01">微信小程序（高级功能版）</Radio>
          </RadioGroup>
        </FormItem>
        <div class="j_panel_box" v-if="detail.state !== '00'">
          <div>
            微信小程序（高级功能版）简介：独立后台，数据与电脑网站机汇网不同步<br/>
            功能清单：优惠券、分销中心、整点秒杀、拼团、线下预约核销、裂变拆“红包”、积分商城<br/>
            案例：永康快购、机汇网科技
          </div>
          <a href="http://buy.jihui88.com/#/?ids=8a9e457e647f4260016492ed6c1c003a" target="_blank"><Button type="primary" v-if="detail.state === '01'">点击购买</Button></a>
          <div>
            <a href="http://anli.jihui88.com/case.html" class="a_underline" target="_blank" style="margin-right:15px;">查看更多案例</a>
            <Tooltip :content="agent.user.cellphone" placement="top" v-if="agent.user.cellphone">
              <a :href="'tel:'+agent.user.cellphone" class="a_underline">人工客服</a>
            </Tooltip>
          </div>
        </div>
      </Form>
      <div class="login" v-if="active === '1'">
        独立后台登录网址： <a href="https://wxapp.jihui88.com/" target="_blank">https://wxapp.jihui88.com/</a>
      </div>
    </Content>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  computed: {
    ...mapState(['agent'])
  },
  data () {
    return {
      detail: {
        state: '00'
      },
      btns: [
        { text: '基本介绍', value: '0' },
        { text: '登录独立后台', value: '1' }
      ],
      active: '0'
    }
  }
}
</script>

<style lang="less">
.j_mini_program{
  .login{
    margin-top: 9px;
    a{
      color: #585858;
      text-decoration: underline;
    }
  }
}
</style>
