<template>
  <Modal
    v-model="modal"
    title="SEO编辑"
    :width="650"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="model" :label-width="90" class="seo_detail" v-if="modal">
      <FormItem label="Seo标题：">
        <Input v-model="model.title" :maxlength="100" placeholder="请输入Seo标题"></Input>
        <span class="char">{{len1}}&nbsp;/&nbsp;100&nbsp;字符</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="http://www.jihui88.com/html/201703221490154284762temp_0.html" class="seo_a" target="_blank">不知道怎么填写？</a>

        <Poptip placement="bottom" width="400">
          <a href="javascript:;" class="seo_a" @click="getKey">提取关键字</a>
          <div class="j_keyword_store" slot="content">
            <ul>
              <li v-for="(item, index) in list" :key="index" :title="item.keywords">
                <Checkbox v-model="item._checked">{{item.keywords}}</Checkbox>
              </li>
              <li class="j_keyword_empty" v-if="list.length === 0">暂无关键词</li>
            </ul>
            <br/>
            <Button type="primary" size="small" @click="saveKey('1')">确定</Button>
          </div>
        </Poptip>
      </FormItem>
      <FormItem label="Seo关键字：">
        <Input v-model="model.keywords" :maxlength="100" placeholder="请输入Seo关键字"></Input>
        <span class="char">{{len2}}&nbsp;/&nbsp;100&nbsp;字符</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="http://www.jihui88.com/html/201703221490159979488temp_0.html" class="seo_a" target="_blank">不知道怎么填写？</a>
        <Poptip placement="bottom" width="400">
          <a href="javascript:;" class="seo_a" @click="getKey">提取关键字</a>
          <div class="j_keyword_store" slot="content">
            <ul>
              <li v-for="(item, index) in list" :key="index" :title="item.keywords">
                <Checkbox v-model="item._checked">{{item.keywords}}</Checkbox>
              </li>
              <li class="j_keyword_empty" v-if="list.length === 0">暂无关键词</li>
            </ul>
            <br/>
            <Button type="primary" size="small" @click="saveKey('2')">确定</Button>
          </div>
        </Poptip>
      </FormItem>
      <FormItem label="Seo描述：">
        <Input v-model="model.description" :maxlength="250" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="限250字符内，加联系电话或邮件" style="width: 330px;"></Input>
        <span class="char">{{len3}}&nbsp;/&nbsp;100&nbsp;字符</span><br>
        <a href="http://www.jihui88.com/html/201703221490160215562temp_0.html" class="seo_a" target="_blank">不知道怎么填写？</a>
        <Poptip placement="bottom" width="400">
          <a href="javascript:;" class="seo_a" @click="getKey">提取关键字</a>
          <div class="j_keyword_store" slot="content">
            <ul>
              <li v-for="(item, index) in list" :key="index" :title="item.keywords">
                <Checkbox v-model="item._checked">{{item.keywords}}</Checkbox>
              </li>
              <li class="j_keyword_empty" v-if="list.length === 0">暂无关键词</li>
            </ul>
            <br/>
            <Button type="primary" size="small" @click="saveKey('3')">确定</Button>
          </div>
        </Poptip>
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
      page: '',
      model: {
        title: '',
        keywords: '',
        description: ''
      },
      len1: 0,
      len2: 0,
      len3: 0,
      type: 'page',
      list: []
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
      this.page = id
      if (type === 'page') {
        this.$http.get('/rest/pc/api/navigator/detail/' + id).then((res) => {
          if (res.success) {
            this.model = res.attributes.data || {}
            this.model.title = this.model.seoTitle || ''
            this.model.keywords = this.model.seoKeywords || ''
            this.model.description = this.model.seoDescription || ''
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.$http.get('/rest/api/seo/pc/detail/' + id).then((res) => {
          if (res.success) {
            this.model = res.attributes.data || {}
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    },
    cancel () {
      this.modal = false
    },
    getKey () {
      if (this.list.length === 0) {
        this.$http.get('/rest/api/keywords/list?pageSize=500').then((res) => {
          if (res.success) {
            let data = res.attributes.data
            data.forEach(item => {
              item._checked = false
            })
            this.list = data || []
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    },
    saveKey (e) {
      let ids1 = ''
      let ids2 = ''
      this.list.forEach(item => {
        if (item._checked) {
          ids1 += '_' + item.keywords
          ids2 += ',' + item.keywords
        }
        item._checked = false
      })
      if (e === '1') {
        if (this.len1 === 0) ids1 = ids1.substr(1)
        this.model.title += ids1
      }
      if (e === '2') {
        if (this.len2 === 0) ids2 = ids2.substr(1)
        this.model.keywords += ids2
      }
      if (e === '3') {
        if (this.len3 === 0) ids2 = ids2.substr(1)
        this.model.description += ids2
      }
    },
    submit (name) {
      if (this.type === 'page') {
        return this.navHttp()
      }
      if (!this.model.seoId) {
        this.model.page = this.page
      }
      let data = {
        model: JSON.stringify(this.model),
        _method: 'put'
      }
      this.$http.post('/rest/api/seo/pc/save/' + (this.model.seoId || this.page), qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    navHttp () {
      let data = {
        model: JSON.stringify({
          id: this.model.id,
          seoTitle: this.model.title,
          seoKeywords: this.model.keywords,
          seoDescription: this.model.description
        }),
        _method: 'put'
      }
      this.$http.post('/rest/pc/api/navigator/detail/' + this.model.id, qs.stringify(data)).then((res) => {
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
.j_keyword_store {
  ul{
    border-left: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;
    overflow: hidden;
    li{
      float: left;
      width: 33.3%;
      color: #656565;
      margin-right: 0;
      padding: 10px 10px;
      border-right: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      position: relative;
      .ivu-checkbox-wrapper{
        .ivu-checkbox{
          padding-right: 5px;
        }
      }
      .icon-huishouzhan{
        cursor: pointer;
        position: absolute;
        right: 8px;
      }
    }
    .j_keyword_empty{
      width: 100%;
      text-align: center;
    }
  }
}
</style>
