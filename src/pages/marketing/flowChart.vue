<template>
  <Layout class="j_layout_content j_flow_chart">
    <JHeader :title="$route.meta.title"></JHeader>
    <Content>
      <div class="j_row item">
        <div class="j_col middle center title">
          <img src="platform/img/flow_chart.jpg"></img>
        </div>
        <div class="j_col content">
          <div class="desc">
            <div class="p">
              <span>1</span>
              <div class="j_row">
                <div class="j_col">
                  <div class="">
                    <i>线上引流：</i><a href="#/flow_chart/1">智能SEO</a>、<a href="#/flow_chart/2">搜索推广</a>、<a href="#/flow_chart/3">社群营销</a>、<a href="#/flow_chart/4">微分销</a>、<a href="#/flow_chart/5">小程序</a>、<a href="#/flow_chart/6">朋友圈营销</a>、<a href="#/flow_chart/7">DSP付费推广</a>、<a href="#/flow_chart/8">公众号</a>、<a href="#/flow_chart/9">自媒体</a>
                  </div>
                </div>
                <div class="j_col">
                  <div class="">
                    <i>线下引流：</i><a href="#/flow_chart/10">手机子站配合样本</a>、<a href="#/flow_chart/11">经销商</a>、<a href="#/flow_chart/12">代理商</a>、<a href="#/flow_chart/13">社会化业务员</a>、<a href="#/flow_chart/14">展会营销</a>、<a href="#/flow_chart/15">门店</a>等
                  </div>
                </div>
              </div>
            </div>
            <div class="p">
              <span>2</span>
              访问量：<a href="#/pc">网站</a>、微网站、手机站、小程序、H5微传单、商城、微商城、视频、营销工具、粉丝管理
            </div>
            <div class="p">
              <span>3</span>
              询盘量：注册、留言、在线咨询、电话咨询、购买、参与促销
            </div>
            <div class="p">
              <span>4</span>
              客户量：客户管理、客户跟踪、售前服务、老客户促销
            </div>
            <div class="p">
              <span>5</span>
              成交量：订单管理、支付管理、交付管理、售后服务、供应链
            </div>
            <div class="p">
              <span>6</span>
              数据分析：推广分析、转化诊断、询盘分析、成交路径调整、客户分析、成交分析
            </div>
          </div>
        </div>
      </div>
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
.j_row.item{
  border: 1px solid #dedede;
  .title{
    flex: 0 0 256px;
    background: #eee;
    text-align: center;
  }
  .content{
    .desc{
      width: 100%;overflow: hidden;
    }
    span{
      display: block;
      width: 55px;
      float: left;
      background: #eee;
      text-align: center;
      height: 100%;
      line-height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      border-left: 1px solid #dedede;
      border-right: 1px solid #dedede;
    }
    .p{
      position: relative;
      padding: 8px 0 8px 76px;
      border-bottom: 1px solid #dedede;
      line-height: 33px;
      white-space: nowrap;
      a{
        text-decoration: underline;
        color: #595959;
        &:hover{
          color: #12bedb
        }
      }
      &:last-child{
        border-bottom: none
      }
      &:first-child{
        padding: 0 0 0 55px;
        span{
          line-height: 83px;
        }
        .j_col{
          width: 100%;
          overflow: hidden;
          div{
            padding:8px 0 8px 82px;
            width: 365px;
            height: 83px;
          }
          &:first-child{
            border-right: 1px solid #dedede;
          }
        }
        white-space: normal;
        i{
          font-style: normal;
          position: absolute;
          left: 21px;
        }
      }
    }
  }
}
</style>
