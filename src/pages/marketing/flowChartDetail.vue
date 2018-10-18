<template>
  <Layout class="j_layout_content j_flow_chart">
    <JHeader :title="list[current].name"></JHeader>
    <Content>
      <div v-for="(item, index) in list" :key="index" v-if="index === current">
        <div class="j_row">
          <div class="j_col middle center title">
            <div v-html="item.title"></div>
          </div>
          <div class="j_col content">
            <div class="desc" v-html="item.desc"></div>
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
      list: [
        {
          name: '智能SEO',
          title: '线上引流：智能SEO',
          desc: '<p>1、<a href="#/seo">SEO基础设置</a>、<a href="#/seo?active=1">SEO模板配置</a>、<a href="#/seo?active=2">关键词管理</a>、<a href="#/seo?active=3">长尾关键词</a>、<a href="#/seo?active=4">内部链接设置</a>、<a href="#/seo?active=5">Tag标签管理</a>、<a href="#/seo?active=6">付费SEO推广</a></p><p>2、<a href="#/sitemap">Sitemap生成</a></p><p>3、<a href="#/seo_batch">批量提交</a></p><p>4、SEO成果查询：站长工具、SEO综合查询、关键词排名、反链查询、权重查询、收录查询、收录率查询、关键词优化分析、Meta信息挖掘</p><p>5、付费SEO推广</p>'
        },
        {
          name: '搜索推广',
          title: '搜索推广',
          desc: '<p>搜索引擎竞价排名</p>'
        },
        {
          name: '社群营销',
          title: '社群营销<p>欢迎大家联系<br/>QQ：1550676880<br/>获取PPT</p>',
          desc: '<p>1、社群定位</p><p>2、价值主张</p><p>3、社群角色</p><p>4、社群运营维护</p><p>5、保持粘性</p><p>6、社群传播和工具</p>'
        },
        {
          name: '微分销',
          title: '微分销',
          desc: '<p>1、微商城三级分销，<a href="http://cps.jihui88.com" target="_blank">http://cps.jihui88.com/</a></p><p>2、小程序1级、2级、3级、自定义微分销，<a href="https://wxapp.jihui88.com" target="_blank">https://wxapp.jihui88.com</a></p><p>3、子站微分销、员工推广分析</p>'
        },
        {
          name: '小程序',
          title: '小程序',
          desc: '<p>最新50个小程序入口，你还觉得小程序不重要吗？ </p><p>1、小程序分销</p><p>2、卡券整理</p><p>3、整点秒杀</p><p>4、拼团管理</p><p>5、预约管理</p><p>6、裂变拆红包</p><p>7、积分商城</p>'
        },
        {
          name: '朋友圈营销',
          title: '朋友圈营销',
          desc: '<p>欢迎大家联系QQ：1550676880，获取PPT</p>'
        },
        {
          name: 'DSP付费推广',
          title: 'DSP付费推广',
          desc: '<p>&nbsp;</p>'
        },
        {
          name: '公众号',
          title: '公众号',
          desc: '<p>1、二次开发</p><p>2、微托管，<a href="https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA" target="_blank">https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA</a></p>'
        },
        {
          name: '自媒体',
          title: '自媒体',
          desc: '<p>微托管，<a href="https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA" target="_blank">https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA</a></p>'
        }
      ],
      current: 1
    }
  },
  created () {
    let ctx = this
    this.list.forEach((item, index) => {
      if (item.type === ctx.$route.params.id) {
        // this.current = index
        // this.$parent.$parent.list[0].text = item.name
      }
    })
    this.current = this.$route.params.id - 1
    this.$parent.$parent.list[0].text = this.list[this.current].name
  }
}
</script>

<style lang="less">
.j_row{
  position: relative;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  .j_col {
    position: relative;
    min-width: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex: 1;
    flex: 1;
  }
  .j_col.middle {
    -webkit-align-items: center;
    align-items: center;
  }
  .j_col.center {
    -webkit-justify-content: center;
    justify-content: center
  }

  border: 1px solid #dedede;
  .title{
    flex: 0 0 256px;
    border-right: 1px solid #dedede;
    color: #000;
    background: #eee;
    text-align: center;
    p{
      color: #b4b4b4;
      padding-top: 20px;
    }
  }
  .content{
    .desc{
      width: 100%;
    }
    p{
      padding: 8px 0 8px 21px;
      border-bottom: 1px solid #dedede;
      line-height: 33px;
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
    }
  }
}
</style>
