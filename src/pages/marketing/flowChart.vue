<template>
  <Layout class="j_layout_content j_flow_chart">
    <JHeader :title="$route.meta.title"></JHeader>
    <Content>
      <Row type="flex" justify="start">
       <Col style="width:256px">
         <Carousel v-model="value1" :height="333" dots="none" loop>
          <CarouselItem>
            <div class="content">
              轮播的广告图片<br/>
              （设计中）
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="content">
              轮播的广告图片<br/>
              （设计中）
            </div>
          </CarouselItem>
        </Carousel>
       </Col>
       <Col class="info">
         <div>
           <p>
             线上引流：<a href="#/seo">智能SEO</a>、搜索推广、社群营销、<a href="http://cps.jihui88.com/" target="_blank">微分销</a>、<a href="#/basis">小程序</a>、朋友圈营销、DSP付费推广、公众号、<a href="https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA" target="_blank">自媒体</a><br/>
             线下引流：<a>手机子站配合样本</a>、经销商、代理商、社会化业务员、展会营销、门店等
           </p>
           <p>
             访问量（200）：<a href="#/pc">网站</a>、微网站、手机站、小程序、H5微传单、商城、微商城、视频、营销工具、粉丝管理
           </p>
           <p>
             询盘量（20）：注册、留言、在线咨询、电话咨询、购买、参与促销
           </p>
           <p>
             客户量（7）：客户管理、客户跟踪、售前服务、老客户促销
           </p>
           <p>
             成交量（0）：订单管理、支付管理、交付管理、售后服务、供应链
           </p>
           <p>
             数据分析：推广分析、转化诊断、询盘分析、成交路径调整、客户分析、成交分析
           </p>
         </div>
       </Col>
     </Row>
    </Content>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      value1: 0
    }
  }
}
</script>

<style lang="less">
.j_flow_chart{
  .ivu-row-flex{
    position: relative;
    overflow: hidden;
  }
  .ivu-carousel{
    border: 1px solid #dedede;
    .ivu-carousel-item{
      background: #eee;
      text-align: center;
      line-height: 20px;
      .content{
        padding: 140px 0 0 0;
        color: #b4b4b4
      }
    }
  }
  .info{
    position: absolute;
    padding-left: 256px;
    width: 100%;
    border-top: 1px solid #dedede;
    border-right: 1px solid #dedede;
    p{
      padding: 8px 0 8px 21px;
      border-bottom: 1px solid #dedede;
      line-height: 33px;
      min-width: 600px;
      a{
        text-decoration: underline;
        color: #595959;
      }
    }
  }
}
</style>
