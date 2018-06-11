<template>
  <Modal
    v-model="modal"
    title="SEO编辑"
    :width="600"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="text" size="large" @click="publish">发布</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="model" :label-width="90" class="seo_detail" v-if="modal">
      <FormItem label="Seo标题：">
        <Input v-model="model.title" :maxlength="100" placeholder="请输入Seo标题"></Input>
        <span class="char">{{len1}}&nbsp;/&nbsp;100&nbsp;字符</span><br>
        <a href="http://www.jihui88.com/html/201703221490154284762temp_0.html" class="seo_a" target="_blank">不知道怎么填写？</a>
        <a href="javascript:;" class="seo_a" @click="update($Message)">提取关键字</a>
      </FormItem>
      <FormItem label="Seo关键字：">
        <Input v-model="model.keywords" :maxlength="100" placeholder="请输入Seo关键字"></Input>
        <span class="char">{{len2}}&nbsp;/&nbsp;100&nbsp;字符</span><br>
        <a href="http://www.jihui88.com/html/201703221490159979488temp_0.html" class="seo_a" target="_blank">不知道怎么填写？</a>
        <a href="javascript:;" class="seo_a" @click="update($Message)">提取关键字</a>
      </FormItem>
      <FormItem label="Seo描述：">
        <Input v-model="model.description" :maxlength="250" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="限250字符内，加联系电话或邮件"></Input>
        <span class="char">{{len3}}&nbsp;/&nbsp;100&nbsp;字符</span><br>
        <a href="http://www.jihui88.com/html/201703221490160215562temp_0.html" class="seo_a" target="_blank">不知道怎么填写？</a>
        <a href="javascript:;" class="seo_a" @click="update($Message)">提取关键字</a>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      modal: false,
      model: {},
      len1: 0,
      len2: 0,
      len3: 0,
      type: 'page'
    }
  },
  watch: {
    'model.title' (val, oldval) {
      val && (this.len1 = val.length)
    },
    'model.keywords' (val, oldval) {
      val && (this.len2 = val.length)
    },
    'model.description' (val, oldval) {
      val && (this.len3 = val.length)
    }
  },
  methods: {
    open (id, type) {
      this.modal = true
      this.type = type
      if (type === 'page') {
        this.$http.get('/rest/pc/api/navigator/detail/' + id, {
          headers: {
            'X-CSRF-Token': this.$store.state.user.token
          }
        }).then((res) => {
          if (res.success) {
            this.model = res.attributes.data
            this.model.title = this.model.seoTitle
            this.model.keywords = this.model.seoKeywords
            this.model.description = this.model.seoDescription
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.$http.get('/rest/api/seo/detail/' + id).then((res) => {
          if (res.success) {
            this.model = res.attributes.data
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    },
    cancel () {
      this.modal = false
    },
    publish () {
      let id = this.model.seoId
      let page = this.model.page
      var url = 'type=page&thisPage='
      if (this.type === 'product') {
        url = 'type=detail&thisPage=product&productId=' + id
      } else if (this.type === 'news') {
        url = 'type=detail&thisPage=news&newsId=' + id
      } else if (this.type === 'cate_product') {
        url = 'type=category&thisPage=product'
      } else if (this.type === 'cate_news') {
        url = 'type=category&thisPage=news'
      } else {
        url = url + page
      }
      this.$http.post('/rest/static1/' + this.$store.state.user.username + '/publish?' + url).then((res) => {
        if (res === '') {
          this.$Message.success('发布成功')
          this.modal = false
        } else {
          this.$Message.error('发布失败')
        }
      })
    },
    submit (name) {
      if (this.type === 'page') {
        return this.navHttp()
      }
      let data = {
        model: JSON.stringify(this.model),
        _method: 'put'
      }
      this.$http.post('/rest/api/seo/detail/' + this.model.seoId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    navHttp () {
      this.model.seoTitle = this.model.title
      this.model.seoKeywords = this.model.keywords
      this.model.seoDescription = this.model.description
      let data = {
        model: JSON.stringify(this.model),
        _method: 'put'
      }
      this.$http.post('/rest/api/navigator/detail/10262' + this.model.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.seo_detail{
  .ivu-input-wrapper{
    width: 300px
  }
  .char {
    padding-left: 10px;
    color: #999;
  }
}
</style>
