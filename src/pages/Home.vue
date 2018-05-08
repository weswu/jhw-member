<template>
  <Layout class="j_home">
      <Content :style="{padding: '4px 32px 0 30px', minHeight: '280px'}">
        <Row :gutter="24">
          <Col :lg="16" :md="16" class="j_col">
            <JWebsite/>
          </Col>
          <Col :lg="8" :md="8" class="j_col">
            <JBanner/>
          </Col>
        </Row>
        <Row :gutter="24" style="padding-bottom: 30px;">
          <Col :lg="16" :md="16" class="j_col">
            <JOrder/>
          </Col>
          <Col :lg="8" :md="8" class="j_col">
            <JSubscribe/>
            <JMessage style="margin: 25px 0 23px 0px;"/>
            <JApp/>
          </Col>
        </Row>
        <JConsult/>
      </Content>
  </Layout>
</template>

<script>
import JWebsite from '@/components/home/j-website'
import JBanner from '@/components/home/j-banner'
import JOrder from '@/components/home/j-order'
import JSubscribe from '@/components/home/j-subscribe'
import JMessage from '@/components/home/j-message'
import JApp from '@/components/home/j-app'
import JConsult from '@/components/home/j-consult'
export default {
  components: {
    JWebsite,
    JBanner,
    JOrder,
    JSubscribe,
    JMessage,
    JApp,
    JConsult
  }
}
</script>
<style lang="less" scoped>
  .j_home{
    padding-bottom: 25px
  }
  .j_col{
    padding-top: 28px;
  }
  .ivu-layout {
    background: #e7eaef
  }
</style>
