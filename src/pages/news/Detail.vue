<template>
  <Layout class="ivu-layout-has-sider j_news_detail">
    <MenuBar :data="'menu_news_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text" :lan="true" @on-change="get" :tip="'建议使用最新版的谷歌浏览器、360浏览器、IE11及以上浏览器'"/>
      <Content>
        <Form :model="detail" :label-width="130" :rules="rules" ref="modalForm" :hidden="active !== '0'">
          <FormItem label="新闻标题：" prop="title">
            <Input v-model="detail.title" placeholder="请输入新闻标题"></Input>
          </FormItem>
          <CategoryList ref="category" :categorySelect="newsCategory" :type="'news'"/>
          <FormItem label="延时发布：">
            <Select v-model="dateselect" class="border" style="width: 100px;" @on-change="dataChange">
              <Option :value="i" v-for="i in 11" :key="i">{{i-1}}</Option>
            </Select>
            <DatePicker type="date" placeholder="延时发布" v-model="detail.addTime" @on-change="detail.addTime=$event" style="width: 155px;"></DatePicker>
          </FormItem>
          <FormItem label="来源：">
            <Input v-model="detail.origin" placeholder="请输入来源"></Input>
          </FormItem>
          <FormItem label="作者">
            <Input v-model="detail.author" placeholder="请输入作者"></Input>
          </FormItem>
          <FormItem label="文章属性：">
            <Checkbox v-model="imagenews" @on-change="imagenewsChange">图片</Checkbox>
            <Checkbox v-model="topnews" @on-change="topnewsChange">置顶</Checkbox>
          </FormItem>
          <FormItem label="新闻图片：" v-if="detail.imagenews === '01'">
            <JPictrue :src="detail.picPath" @on-change="picChange"/>
          </FormItem>
        </Form>
        <UE :content='detail.content' ref='ue' :hidden="active !== '1'" v-if="editor"></UE>
        <div v-if="active === '2'">
          <Form :model="detail" :label-width="130">
            <JTag :tagMapStore="detail.tagMapStore" :id="detail.newsId" :type="'news'"/>
          </Form>
          <div class="j_tip" style="width: 560px;margin-left: 130px;">
            小提示: <br>
            <span class="red">1.标签说明：</span> 新闻标签主要用于网站显示个性化定制的模块、最新新闻模块等<br>
            <span class="red">2.标签使用：</span> 新添加的标签将保存到标签库， 方便下次选择<br>
            <span class="red">3.注意事项：</span> 标签的添加跟新闻的保存无关， 请慎重添加
          </div>
        </div>
        <Form :model="detail" :label-width="130" :hidden="active !== '3'">
          <FormItem label="SEO标题：">
            <Input v-model="detail.seoTitle" :maxlength="100" placeholder="请输入SEO标题"></Input>
          </FormItem>
          <FormItem label="SEO关键字：">
            <Input v-model="detail.nkey" :maxlength="100" placeholder="请输入SEO关键字"></Input>
          </FormItem>
          <FormItem label="SEO描述：">
            <Input v-model="detail.seoDescription" :maxlength="250" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="限250字符内，加联系电话或邮件"></Input>
          </FormItem>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit('modalForm')">保存</Button>
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
      detail: {
        addTime: new Date()
      },
      dateselect: 1,
      addTime: new Date(),
      imagenews: false,
      topnews: false,
      editor: false,
      rules: {
        title: [
          { required: true, message: '新闻标题不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '新闻分类不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_news_detail,
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
          addTime: new Date()
        }
      } else {
        let id = this.decodeId(this.$route.params.id, 'News_', 32)
        this.$http.get('/rest/api/news/detail/' + id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
            this.detail.addTime = new Date(this.detail.addTime)
            if (this.detail.imagenews === '01') this.imagenews = true
            if (this.detail.topnews === '01') this.topnews = true
            this.addTime = this.detail.addTime
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
    dataChange (e) {
      this.detail.addTime = new Date(this.addTime.getTime() + 24 * 60 * 60 * 1000 * (e - 1))
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
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.detail.content = this.$refs.ue.getUEContent()
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
              this.$Message.success('保存成功')
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
