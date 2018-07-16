<template>
  <Layout class="ivu-layout-has-sider j_static">
    <MenuBar :data="'menuStatic'" :active="'storage_service'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'附件存储服务'" :type="true" :tip="tip" :website="true"/>
      <Content>
        <Form :model="detail" :label-width="75">
          <FormItem label="可选方案：">
            <RadioGroup v-model="detail.state">
              <Radio label="00">无</Radio>
              <Radio label="01">阿里云</Radio>
              <Radio label="02">七牛云</Radio>
            </RadioGroup>
          </FormItem>
          <div class="j_panel_box" v-if="detail.state === '01'">
            <div>
              阿里云简介：&nbsp;&nbsp;无免费套餐，适合对性能和速度有要求的客户（数据访问频繁，且有性能需要），可选方案较多
            </div>
            <a href="https://www.aliyun.com/price/product?spm=5176.7933691.744462.c1.79cf6a56BmItn3#/oss/detail" target="_blank"><Button type="primary">查看价格</Button></a>
            <div>
              <a href="https://help.aliyun.com/document_detail/31818.html?spm=a2c4g.11186623.6.540.t7rl9n" class="a_underline" target="_blank">详细介绍</a>
            </div>
          </div>
          <div class="j_panel_box" v-if="detail.state === '02'">
            <div>
              七牛云简介：&nbsp;&nbsp;有免费套餐，适合对性能和速度要求不高的客户，可选方案较少
            </div>
            <a href="https://www.qiniu.com/prices?source=kodo" target="_blank"><Button type="primary">查看价格</Button></a>
            <div>
              <a href="https://www.qiniu.com/products/kodo" class="a_underline" target="_blank">详细介绍</a>
            </div>
          </div>
        </Form>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Website from '@/components/static/website'
import Xiaochengxu from '@/components/static/xiaochengxu'
export default {
  components: {
    MenuBar,
    JHeader,
    Website,
    Xiaochengxu
  },
  data () {
    return {
      tip: '<span style="margin-bottom: 15px;display: block;">附件存储服务由第三方提供，您需要另行采购</span>采用专业存储方案的好处：<br/>- 数据自动多重备份，不会因为硬件问题造成数据丢失；<br/>- 存储空间不受限制，根据业务需求自行扩展；',
      detail: {
        state: '00'
      }
    }
  }
}
</script>

<style lang="less">
.j_static .static_info{
  height: calc(100vh - 347px);
  overflow-y: auto;
}
</style>
