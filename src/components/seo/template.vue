<template>
  <div class="j_seo_template">
    <div class="j_search">
      <Button class="mormal" @click="activeChange(item.value)" v-for="(item, index) in btns" :key="index" :class="{active: active === item.value}">{{item.text}}</Button>
      <div class="j_tip">
        温馨提醒：此项设置包括（首页、产品展示页、新闻展示页、自定义页等导航页面的设置），“基本栏目模板配置”一旦保存，会覆盖所有的页面，请慎用。
      </div>
    </div>
    <Form :model="detail" :label-width="105" ref="model">
      <FormItem label="SEO标题：">
        <Input v-model="detail.seoTitle"></Input><i class="iconfont icon-daoru" title="导入到所有相关seo标题,导入后覆盖原有的数据" @click="importSeo('seoTitle')"></i>
      </FormItem>
      <FormItem label="SEO关键字：">
        <Input v-model="detail.seoKey"></Input><i class="iconfont icon-daoru" title="导入到所有相关Seo关键词,导入后覆盖原有的数据" @click="importSeo('seoKey')"></i>
      </FormItem>
      <FormItem label="SEO描述：">
        <Input v-model="detail.seoDescription" :maxlength="250" type="textarea" :autosize="{minRows: 4,maxRows: 7}"></Input>
        <i class="iconfont icon-daoru" title="导入到所有相关Seo描述,导入后覆盖原有的数据" @click="importSeo('seoDescription')"></i>
      </FormItem>
      <FormItem style="margin-top:15px;">
        <Button type="primary" size="small" @click="submit" style="margin-right:7px">保存</Button>
        <Button class="info" size="small" @click="back">返回</Button>
      </FormItem>
      <div class="explain">
        <span>视频教程: </span> <a href="https://v.qq.com/x/page/a0179l2o2l2.html" target="_blank" class="a_underline">SEO优化视频教程</a><br/>
        关键词中可用的变量有如下几个:<br/>
        栏目名称:{page},<br/>
        新闻标题:{news_title},<br/>
        产品标题:{product_title},<br/>
        产品类型:{product_type},<br/>
        产品/新闻分类:{category},<br/>
        关键词库随机抽取{random_key},<br/>
        关键词指定内随机{random:关键词1,关键词2,多个可以用逗号隔开},<br/>
        年:{yyyy},月:{MM},日:{dd},小时:{hh},分:{mm}<br/><br/>
        如:{page},关键词1，关键词2，关键词3，{yyyy}-{MM}-{dd}会自动生成:首页,关键词1，关键词2，关键词3,2012-12-20<br/><br/>
        如:{news_title},关键词1，关键词2，关键词3，东方五金电子商务有限公司,会自动生成:新闻标题,关键词1，关键词2，关键词3,东方五金电子商务有限公司
      </div>
    </Form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      btns: [
        { text: '基本栏目模板配置', value: '0' },
        { text: '新闻分类页模板配置', value: '1' },
        { text: '产品分类页模板配置', value: '2' },
        { text: '新闻详细页模板配置', value: '3' },
        { text: '产品详细页模板配置', value: '4' }
      ],
      active: '0',
      detail: {},
      data: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/seoTemplate/list').then((res) => {
        if (res.success) {
          this.data.push(res.attributes.commonList)
          this.data.push(res.attributes.news_categoryList)
          this.data.push(res.attributes.product_categoryList)
          this.data.push(res.attributes.news_detailList)
          this.data.push(res.attributes.product_detailList)
          this.detail = this.data[0]
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    activeChange (e) {
      this.active = e
      this.detail = this.data[e]
    },
    importSeo (e) {
      let data = {
        templatePage: this.detail.page,
        pageType: e
      }
      this.$http.post('/rest/api/seoTemplate/importSeo', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('导入成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    submit () {
      var ctx = this
      let data = {
        templatePage: this.detail.page,
        seoTitle: this.detail.seoTitle,
        seoKey: this.detail.seoKey,
        seoDescription: this.detail.seoDescription
      }
      this.$http.post('/rest/api/seoTemplate/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.data.forEach(item => {
            if (item.page === data.templatePage) {
              item.seoTitle = data.seoTitle
              item.seoKey = data.seoKey
              item.seoDescription = data.seoDescription
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    back () {
      this.$emit('on-change', '0')
    }
  }
}
</script>

<style lang="less">
.j_seo_template{
  .icon-daoru{
    color: #0366ce;
    padding-left: 14px;
    cursor: pointer;
    position: absolute;
  }
  .explain{
    color: #b9b9b9;margin-top: 72px;
    span{
      color: #5f5f5f;
      margin-bottom: 15px;
      display: inline-block;
    }
  }
}
</style>
