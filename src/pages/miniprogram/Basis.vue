<template>
  <Layout class="j_layout_content">
    <JHeader :title="'基础版'" :type="true" :tip="tip"/>
    <Content>
      <Form :model="detail" :label-width="75">
        <FormItem label="可选方案：">
          <RadioGroup v-model="detail.state">
            <Radio label="00">无</Radio>
            <Radio label="01">微信小程序（展示版）</Radio>
            <Radio label="02">微信小程序（电商版）</Radio>
          </RadioGroup>
        </FormItem>
        <div class="j_panel_box" v-if="detail.state !== '00'">
          <div v-if="detail.state === '01'">
            微信小程序（展示版）简介：更好的宣传您的品牌和产品<br/>
            案例：步阳智能锁、玩美者净醛木墙饰、美人到家
          </div>
          <div v-if="detail.state === '02'">
            微信小程序（电商版）简介：品牌和产品宣传并有简单基础的购买功能<br/>
            案例：烤肉锅、烧烤炉工具厂家、康怡乐不粘锅礼品锅、涛涛集团有限公司
          </div>
          <a href="http://buy.jihui88.com/#/?ids=297e2669613f7026016140f7276b0017" target="_blank"><Button type="primary" v-if="detail.state === '01'">点击购买</Button></a>
          <a href="http://buy.jihui88.com/#/?ids=297e2669613f7026016140f7719b001a" target="_blank"><Button type="primary" v-if="detail.state === '02'">点击购买</Button></a>
          <div>
            <a href="http://anli.jihui88.com/case.html" class="a_underline" target="_blank" style="margin-right:15px;">查看更多案例</a>
            <Tooltip :content="agent.user.cellphone" placement="top" v-if="agent.user.cellphone">
              <a :href="'tel:'+agent.user.cellphone" class="a_underline">人工客服</a>
            </Tooltip>
          </div>
        </div>
      </Form>
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
      tip: '1、数据（产品、新闻、相册、公司信息）和电脑网站机汇网同步，同一个数据后台<br/>2、套模板：我们会提供基础模板<br/>3、备注：模板颜色可改部分——底栏和标题栏可自定义',
      detail: {
        state: '00'
      }
    }
  }
}
</script>

<style lang="less">
</style>
