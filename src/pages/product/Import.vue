<template>
  <Layout class="j_layout_content j_product_import j_product_import_download">
    <Content>
      <JHeader :title="'导入'" :lan="true"/>
      <div class="j_search">
        <Button class="grey" @click="active = item.value"
          v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</span></Button>
      </div>
      <div v-if="active === '0'">
        <div class="import_title">
          Excle表格批量上传<a :href="agent.vImport" class="a_underline" target="_blank" style="font-size: 12px;padding-left: 20px;" v-if="agent.vImport">导入视频教程</a>
        </div>
        <div class="j_tip">
          <span class="red">步骤一：</span>“打勾”生成产品表格模板
        </div>
        <table class="j_table j_table_li">
          <thead>
            <tr>
              <th>表格模板内容：</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckboxGroup v-model="col">
                  <Checkbox :label="item.text === '-' ? item.value : item.text" v-for="item in list" :key="item.value">{{item.text}}</Checkbox>
                </CheckboxGroup>
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="primary" style="margin-bottom:22px;" @click="generate">生成产品表格模板</Button>
        <div class="j_tip">
          <span class="red">步骤二：</span>进行批量上传产品表格前，请先把产品图片上传好
        </div>
        <Button type="primary" @click="uploadPic" style="margin-bottom:16px;">上传产品图片</Button>
        <JUpload :id="albumId" @on-success="handleSuccess" style="height: 0px;">
          <span slot="content">
            <div id="productUpload" style="display:none">上传</div>
          </span>
        </JUpload>
        <div class="j_tip">
          <span class="red">步骤三：</span>提交填写好的产品表格
        </div>
        <Row :gutter="24" class="form">
          <Col span="3">
            <span class="star">*</span>上传表格:
          </Col>
          <Col span="21">
            <Upload ref="upload2" action="/rest/api/product/uploadProductsByExcel"
              formenctype="multipart/form-data"
              :on-success="handleSuccess2">
              <div id="fileUpload" >
                <span class="select">选择文件</span>{{name}}
              </div>
            </Upload>
          </Col>
        </Row>
      </div>

      <div v-if="active === '1'">
        <BatchTag />
      </div>

    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JUpload from '@/components/group/j-upload'
import BatchTag from '@/pages/product/BatchTag'
export default {
  components: {
    JHeader,
    JUpload,
    BatchTag
  },
  data () {
    return {
      btns: [
        { text: '产品', value: '0' },
        { text: '标签', value: '1' }
      ],
      active: '0',
      col: [],
      list: [
        { value: 'name', text: '产品名称' },
        { value: 'prodtype', text: '产品型号' },
        { value: 'category', text: '产品分类' },
        { value: 'picName', text: '产品图片' },
        { value: 'proddesc', text: '产品内容' },
        { value: 'detail1', text: '产品描述' },
        { value: 'detail2', text: '产品卖点' },
        { value: 'attr', text: '商城属性' },
        { value: 'price', text: '价格' },
        { value: 'weight', text: '重量' },
        { value: 'store', text: '库存' },
        { value: 'isMarketable', text: '是否上架' },
        { value: 'isNew', text: '新品' },
        { value: 'isBest', text: '精品' },
        { value: 'isHot', text: '热销' },
        { value: 'tag', text: '产品标签' },
        { value: 'a', text: '-' },
        { value: 'b', text: '-' },
        { value: 'c', text: '-' },
        { value: 'd', text: '-' },
        { value: 'e', text: '-' }
      ],
      modal: false,
      albumId: 'all',
      name: '未选择任何文件'
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.albumCategory,
      agent: state => state.agent
    })
  },
  watch: {
    categoryList: {
      handler () {
        this.init()
      }
    }
  },
  created () {
    if (this.categoryList.length === 0) {
      this.$store.dispatch('getAlbumCategory').then(res => {
        this.init()
      })
    } else {
      this.init()
    }
  },
  methods: {
    init () {
      this.categoryList.forEach(item => {
        if (item.name === '产品批量上传') {
          this.albumId = item.albumId
        }
      })
    },
    uploadPic () {
      var btn = document.getElementById('productUpload')
      if (this.albumId !== 'all') {
        btn.click()
      } else {
        let data = {
          model: JSON.stringify({blongType: 'AP', state: '01', name: '产品批量上传'})
        }
        this.$http.post('/rest/api/album/detail', qs.stringify(data)).then((res) => {
          if (res.success) {
            this.albumId = res.attributes.data.albumId
            btn.click()
          }
        })
      }
    },
    handleSuccess (res, file) {
      var ctx = this
      this.$Message.info('上传成功')
      setTimeout(function () {
        ctx.$refs.upload.clearFiles()
      }, 1000)
    },
    handleSuccess2 (res, file) {
      var ctx = this
      this.name = file.name
      this.$Message.info('上传成功')
      setTimeout(function () {
        ctx.$refs.upload2.clearFiles()
      }, 1000)
    },
    select () {
      var btn = document.getElementById('fileUpload')
      btn.click()
    },
    generate () {
      let data = {
        fields: this.col.join()
      }
      this.$http.post('/rest/api/product/downloadProductExcel?' + qs.stringify(data)).then(res => {
        if (res.success) {
          window.open(res.attributes.data)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_product_import{
  .import_title{
    font-size: 14px;
    color: #595959;
    padding: 10px 0 5px 0;
  }
  .j_tip{
    margin: 20px 0 13px 0;
    color: #656565;
  }
  .j_select_qrcode_img{
    position: relative;
    width: 111px;
    .ivu-select-selection{
      height: 18px;
      line-height: 18px;
      border: 1px solid #c6c6c6;
      .ivu-select-placeholder{
        height: 18px !important;
        line-height: 18px !important;
      }
    }
  }
  .form{
    width:640px;
    line-height: 32px;
    .star{
      border: 0 none;
      font-family: inherit;
      font-size: 100%;
      font-style: inherit;
      font-weight: inherit;
      margin: 0;
      padding: 0;
      vertical-align: baseline;
      color: #FF0000;
      font-weight: normal;
      list-style-type: none;
      line-height: 1.5;
    }
    .ivu-upload-select{
      width: 100%;
    }
    #fileUpload{
      color: #aaa;
      cursor: pointer;
      border: 1px solid #c9c9c9;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      max-width: 440px;
    }
    .select{
      background: #fff;
      color: #aaa;
      text-decoration: underline;
      padding: 0 9px 0 20px;
      line-height: 26px;
      cursor: pointer;
    }
  }
}
</style>
