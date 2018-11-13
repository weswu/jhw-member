<template>
  <Layout class="j_layout_content j_sitemap">
    <JHeader :title="'Sitemap生成'" :type="true" :tip="tip" :website="true"/>
    <Content>
      <Button type="info" class="w144" @click="get" v-if="!form">开启自定义选项</Button>
      <Button class="info" @click="update" style="width: 97px;" v-if="!form">一键更新</Button>
      <Form ref="modalForm" :model="detail" :label-width="110" v-if="form">
        <div class="j_form_title">robots.txt</div>
        <FormItem label="robots.txt：">
          <Input v-model="detail.robots" type="textarea" :autosize="{minRows: 3, maxRows: 13}"></Input>
        </FormItem>
        <div class="j_form_title">Sitemap</div>
        <FormItem label="修改频率：">
          <Select v-model="detail.freq" class="w144 border">
            <Option value="always">经常</Option>
            <Option value="hourly">每小时</Option>
            <Option value="daily">每天</Option>
            <Option value="weekly">每周</Option>
            <Option value="monthly">每月</Option>
            <Option value="yearly">每年</Option>
            <Option value="never">从不</Option>
          </Select>
        </FormItem>
        <FormItem label="修改日期：">
          <RadioGroup v-model="detail.lastmodState">
            <Radio label="01">使用原始信息</Radio>
            <Radio label="02">统一成当前日期</Radio>
            <Radio label="03">统一成指定日期</Radio>
            <DatePicker type="date" v-model="detail.lastmod" @on-change="detail.lastmod=$event" style="width: 155px;"></DatePicker>
          </RadioGroup>
        </FormItem>
        <FormItem label="自定义Sitemap：">
          <RadioGroup v-model="detail.contentState">
            <Radio label="01">开启</Radio>
            <Radio label="00">关闭</Radio>
          </RadioGroup><br/>
          <Input v-model="detail.content" type="textarea" :autosize="{minRows: 20, maxRows: 24}" v-if="detail.contentState === '01'"></Input>
        </FormItem>
        <FormItem style="margin-top:20px">
          <Button type="primary" @click="submit">保存并生成</Button>
          <Button @click="form = false">关闭</Button>
        </FormItem>
      </Form>
      <hr/>
      <p class="j_sitemap_tip">
        一般来说，搜索引擎蜘蛛（Spider）会跟着链接爬行到您网站的所有网页。<br/>
        但是很多时候，由于种种原因，并不是所有网页都能被收录进搜索引擎数据库。<br/>
        Sitemap就允许站长提供给搜索引擎一个网站地图，列出您所有需要被抓取的网页及重要性级别。
      </p>
      <Button class="info" @click="url('/seo_batch')" style="margin-bottom:20px">批量提交Sitemap</Button>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      tip: '本工具能提供以下功能：<br/>1、一个符合0.90国际规范的Sitemap文件<br/>2、一个能引导搜索引擎蜘蛛（Spider）发现网站地图的robots.txt文件<br/>3、向各大搜索引擎提交Sitemap的快捷入口',
      form: false,
      detail: {}
    }
  },
  computed: {
    ...mapState(['layoutId', 'agent'])
  },
  watch: {
    layoutId () {
      if (this.form) this.get()
    },
    agent () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    get () {
      let layoutId = this.$store.state.layoutId
      if (!layoutId) return this.$Message.info('请选择站点')
      this.form = true
      this.$http.post('/rest/pc/api/sitemap/detail', qs.stringify({
        layoutId: layoutId
      })).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
        }
      })
    },
    init () {
      if (this.agent.vSitemap) {
        this.tip = this.tip + '<br/>温馨提示：<a href="' + this.agent.vSitemap + '" class="a_underline" target="_blank">Sitemap生成视频教程</a>'
      }
    },
    update () {
      this.$http.post('/rest/pc/api/sitemap/build', qs.stringify({
        layoutId: this.$store.state.layoutId
      })).then((res) => {
        if (res.success) {
          this.$Message.success('更新成功')
        }
      })
    },
    submit () {
      this.$http.post('/rest/pc/api/sitemap/save', qs.stringify(this.detail)).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          this.$Message.success('生成成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_sitemap{
  .j_sitemap_tip{
    color: #9c9c9c;
    line-height: 2;
    padding-bottom: 20px;
  }
  hr{
    margin-top: 70px;
  }
  .j_head .j_tip{
    line-height: 2;
  }
}
</style>
