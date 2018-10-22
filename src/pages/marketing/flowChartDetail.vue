<template>
  <Layout class="j_layout_content j_flow_chart">
    <JHeader :title="list[current].name"></JHeader>
    <Content>
      <div v-for="(item, index) in list" :key="index" v-if="index === current">
        <div class="j_row j_flow_chart_item">
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
          desc: '<p>1、<a href="#/seo">SEO智能设置</a>、<a href="#/seo?active=1">SEO模板配置</a>、<a href="#/seo?active=2">关键词管理</a>、<a href="#/seo?active=3">长尾关键词</a>、<a href="#/seo?active=4">内部链接设置</a>、<a href="#/seo?active=5">Tag标签管理</a>、<a href="#/seo?active=6">付费SEO推广</a></p><p>2、<a href="#/sitemap">Sitemap生成</a></p><p>3、<a href="#/seo_batch">批量提交</a></p><p>4、SEO成果查询：<a href="http://tool.chinaz.com/" target="_blank">站长工具</a> > <a href="http://seo.chinaz.com/" target="_blank">SEO综合查询</a>、<a href="http://tool.chinaz.com/keywords" target="_blank">关键词排名</a>、<a href="http://s.tool.chinaz.com/baidu/words.aspx" target="_blank">关键词挖掘</a>、<a href="http://outlink.chinaz.com/" target="_blank">反链查询</a>、<a href="http://rank.chinaz.com/" target="_blank">权重查询</a>、<a href="http://tool.chinaz.com/baidu/" target="_blank">收录查询</a>、<a href="http://tool.chinaz.com/baidu/entry" target="_blank">收录率查询</a>、<a href="http://tool.chinaz.com/kwevaluate" target="_blank">关键词优化分析</a>、<a href="http://tool.chinaz.com/baidu/metadig.aspx" target="_blank">Meta信息挖掘</a></p><p>5、<a href="#/seo?active=6">付费SEO推广</a></p>'
        },
        {
          name: '搜索推广',
          desc: '<p>搜索引擎竞价排名</p>'
        },
        {
          name: '社群营销',
          title: '社群营销<p>欢迎大家联系<br/>QQ：1550676880<br/>获取PPT</p>',
          desc: '<p>社群营销6步：</p><p>1、社群定位</p><p>2、价值主张</p><p>3、社群角色</p><p>4、社群运营维护</p><p>5、保持粘性</p><p>6、社群传播和工具</p><p>欢迎大家联系 QQ：1550676880  &nbsp;&nbsp;&nbsp;&nbsp;获取PPT</p>'
        },
        {
          name: '微分销',
          desc: '<p>1、微商城三级分销，<a href="http://cps.jihui88.com" target="_blank">http://cps.jihui88.com/</a></p><p>2、小程序1级、2级、3级、自定义微分销，<a href="https://wxapp.jihui88.com" target="_blank">https://wxapp.jihui88.com</a></p><p>3、子站微分销、员工推广分析</p>'
        },
        {
          name: '小程序',
          desc: '<p><a href="#/flow_chart/16">最新50个小程序入口</a>，你还觉得小程序不重要吗？ </p><p>1、小程序分销</p><p>2、卡券整理</p><p>3、整点秒杀</p><p>4、拼团管理</p><p>5、预约管理</p><p>6、裂变拆红包</p><p>7、积分商城</p>'
        },
        {
          name: '朋友圈营销',
          desc: '<p>欢迎大家联系QQ：1550676880，获取PPT</p>'
        },
        {
          name: 'DSP付费推广',
          desc: '<p>&nbsp;</p>'
        },
        {
          name: '公众号',
          desc: '<p>1、二次开发</p><p>2、<a href="https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA" target="_blank">微托管</a></p>'
        },
        {
          name: '自媒体',
          desc: '<p><a href="https://mp.weixin.qq.com/s/uTmohqA5GbXMD0hEV9lOBA" target="_blank">微托管</a></p>'
        },
        {
          name: '手机子站配合样本',
          desc: '<p><img src="platform/img/mobile.jpg"></img></p>'
        },
        {
          name: '经销商',
          desc: '<p><img src="platform/img/mobile.jpg"></img></p>'
        },
        {
          name: '代理商',
          desc: '<p><img src="platform/img/mobile.jpg"></img></p>'
        },
        {
          name: '社会化业务员',
          desc: '<p><img src="platform/img/mobile.jpg"></img></p>'
        },
        {
          name: '展会营销',
          desc: '<p><img src="platform/img/mobile.jpg"></img></p>'
        },
        {
          name: '门店',
          desc: '<p><img src="platform/img/mobile.jpg"></img></p>'
        },
        {
          name: '最新50个小程序入口',
          desc: '<p>1、微信【发现】栏小程序主入口</p><p>2、微信【小程序】服务通知</p><p>3、微信主页顶部置顶入口</p><p>4、Android系统添加到桌面图标</p><p>5、微信【小程序】中【附近的小程序】列表</p><p>6、【附近小程序】列表广告（LBS推广功能）</p><p>7、前往小程序【体验版】的入口页</p><p>8、小程序Profile页</p><p>9、带Share Ticket的小程序消息卡片</p><p>10、【体验版】小程序绑定邀请页</p><p>11、从小程序跳转到另一个小程序</p><p>12、从另一个小程序返回</p><p>13、客服消息列表下发的小程序消息卡片</p><p>14、微信顶部搜索框</p><p>15、微信顶部搜索框下【历史小程序】入口</p><p>16、【发现】tab小程序主入口下的搜索框</p><p>17、【添加好友】搜索框的搜索结果页</p><p>18、Android系统【发现】tab中【搜一搜】</p><p>19、微信顶部搜索结果中【使用过的小程序】</p><p>20、公众号Profile页【相关小程序】列表</p><p>21、公众号自定义菜单</p><p>22、关联模板消息</p><p>23、公众号文章</p><p>24、公众号文章【广告】（含小程序落地广告）</p><p>25、公众号会话下发的小程序消息卡片</p><p>26、扫描二维码</p><p>27、长按图片识别二维码</p><p>28手机相册选取二维码、</p><p>29、扫描一维码</p><p>30、长按图片识别一维码</p><p>31、手机相册选取一维码</p><p>32、扫描小程序码</p><p>33、长按图片识别小程序码</p><p>34手机相册选取小程序码、</p><p>35、二维码收款页面（微信指定小程序）</p><p>36、好友会话中的【小程序消息卡片】</p><p>37、群聊会话中的【小程序消息卡片】</p><p>38、好友会话资料的【聊天小程序】</p><p>39、群聊会话资料的（聊天小程序）</p><p>40、微信钱宝【第三方服务】</p><p>41、微信支付完成页</p><p>42、支付完成消息</p><p>43、微信WI-FI状态栏</p><p>44、微信【卡包】会员卡入口</p><p>45、从App分享到微信好友会话，自动转换的小程序卡片</p><p>46、摇电视</p><p>47、小程序顶部的音乐播放器菜单（音频类小程序点击可跳转，如【小睡眠】）</p><p>48、QQ浏览器导航栏</p><p>49、QQ浏览器关键词搜索小程序</p><p>50、IOS 11版本的原生相机可扫描小程序二维码</p>'
        }
      ],
      current: 1
    }
  },
  created () {
    this.get()
  },
  watch: {
    '$route' (to, from) {
      this.get()
    }
  },
  methods: {
    get () {
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
}
</script>

<style lang="less">
.j_flow_chart_item{
  margin-bottom: 20px;
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
      padding: 8px 8px 8px 21px;
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
