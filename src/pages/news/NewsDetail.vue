<template>
  <Layout class="ivu-layout-has-sider j_news_detail">
    <MenuBar :data="'menu_news_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text" :lan="true" @on-change="get" :tip="'建议使用最新版的谷歌浏览器、360浏览器、IE11及以上浏览器'"/>
      <Content>
        <Form :model="detail" :label-width="130" :rules="rules" ref="modalForm">
          <div :hidden="active !== '0'">
            <FormItem label="新闻标题：" prop="title">
              <Input v-model="detail.title" placeholder="请输入新闻标题"></Input>
            </FormItem>
            <CategoryList ref="category" :categorySelect="newsCategory" :type="'news'"/>
            <FormItem label="延时发布：">
              <DatePicker type="datetime" placeholder="延时发布" :value="detail.addTime" @on-change="detail.addTime=$event" style="width: 155px;"></DatePicker>
            </FormItem>
            <FormItem label="来源：">
              <Input v-model="detail.origin" placeholder="请输入来源"></Input>
            </FormItem>
            <FormItem label="作者：">
              <Input v-model="detail.author" placeholder="请输入作者"></Input>
            </FormItem>
            <FormItem label="文章属性：">
              <Checkbox v-model="imagenews" @on-change="imagenewsChange">图片</Checkbox>
              <Checkbox v-model="topnews" @on-change="topnewsChange">置顶</Checkbox>
            </FormItem>
            <FormItem label="新闻图片：" v-if="detail.imagenews === '01'">
              <JPictrue :src.sync="detail.picPath" @on-change="picChange"/>
            </FormItem>
          </div>
          <UE :content='detail.content' ref='ue' :hidden="active !== '1'" v-if="editor"></UE>
          <div v-if="active === '2'">
            <JTag :tagMapStore="detail.tagMapStore" :id="detail.newsId" :type="'news'"/>
            <div class="j_tip" style="width: 560px;margin-left: 130px;">
              小提示: <br>
              <span class="red">1.标签说明：</span> 新闻标签主要用于网站显示个性化定制的模块、最新新闻模块等<br>
              <span class="red">2.标签使用：</span> 新添加的标签将保存到标签库， 方便下次选择<br>
              <span class="red">3.注意事项：</span> 标签的添加跟新闻的保存无关， 请慎重添加
            </div>
          </div>
          <div :hidden="active !== '3'">
            <FormItem label="SEO标题：">
              <Input v-model="detail.seoTitle" :maxlength="100" placeholder="请输入SEO标题"></Input>
            </FormItem>
            <FormItem label="SEO关键字：">
              <Input v-model="detail.nkey" :maxlength="100" placeholder="请输入SEO关键字"></Input>
            </FormItem>
            <FormItem label="SEO描述：">
              <Input v-model="detail.seoDescription" :maxlength="250" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="限250字符内，加联系电话或邮件"></Input>
            </FormItem>
          </div>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit()">保存</Button>
        <Poptip placement="bottom" class="j_poptip_ul" v-if="this.$route.params.id !== 'add'">
          <Button type="ghost" size="small">预览</Button>
          <ul slot="content" style="max-height: 250px;">
            <li v-for="(item, index) in staticList" :key="index">
              <a :href="'http://pc.jihui88.com/rest/site/'+item.layoutId+'/nd?itemId='+$route.params.id" target="_blank">网站编号：{{item.layoutId}}</a>
            </li>
          </ul>
        </Poptip>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import UE from '@/components/group/j-editor'
import CategoryList from '@/components/product/category-list'
import JPictrue from '@/components/group/j-pictrue'
import JTag from '@/components/group/j-tag'
export default {
  components: {
    MenuBar,
    JHeader,
    UE,
    CategoryList,
    JPictrue,
    JTag
  },
  data () {
    return {
      active: '0',
      detail: {},
      imagenews: false,
      topnews: false,
      editor: false,
      rules: {
        title: [
          { required: true, message: '新闻标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_news_detail,
      staticList: state => state.staticList,
      newsCategory: state => state.newsCategory
    })
  },
  created () {
    this.get()
    if (this.newsCategory.length === 0) this.$store.dispatch('getCategory', 'news')
  },
  methods: {
    get () {
      if (this.$route.params.id === 'add') {
        this.detail = {
          addTime: this.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          picPath: ''
        }
      } else {
        let id = this.decodeId(this.$route.params.id, 'News_', 32)
        this.$http.get('/rest/api/news/detail/' + id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
            this.detail.addTime = this.dateFormat(this.detail.addTime, 'yyyy-MM-dd hh:mm:ss')
            if (this.detail.imagenews === '01') this.imagenews = true
            if (this.detail.topnews === '01') this.topnews = true
            if (!this.detail.picPath) this.detail.picPath = ''
            this.$refs.category.open(this.detail.category)
          }
        })
      }
    },
    // 功能
    activeChange (e) {
      this.active = e
      if (e === '1') this.editor = true
    },
    categoryChange (e) {
      this.detail.category = e
    },
    imagenewsChange (e) {
      this.detail.imagenews = e ? '01' : '00'
    },
    topnewsChange (e) {
      this.detail.topnews = e ? '01' : '00'
    },
    picChange (e) {
      this.detail.picPath = e.src
    },
    // 提交
    submit () {
      console.log(this.detail.addTime)
      if (!this.detail.title) {
        return this.$Message.info('新闻标题不能为空')
      }
      if (this.$refs.ue) this.detail.content = this.$refs.ue.getUEContent()
      // 多分类
      this.detail.category = this.$refs.category.list.join()
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.newsId) {
        url = '/' + this.detail.newsId
        data._method = 'put'
      }
      this.$http.post('/rest/api/news/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_news_detail{
  .j_poptip_ul .ivu-poptip-body li{
    padding: 0;
    a{
      color: #595959;
      padding: 8px 15px;
      display: block;
    }
  }
}
</style>
