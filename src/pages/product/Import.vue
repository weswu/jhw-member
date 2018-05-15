<template>
  <Layout class="ivu-layout-has-sider j_product_import j_product_import_download">
    <MenuBar :data="'menu_product'" :active="'product_import'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'导入'" :lan="true"/>
        <div class="import_title">
          Excle表格批量上传
        </div>
        <div class="j_tip">
          <span class="red">步骤一：</span>“打勾”生成产品表格模板
        </div>
        <table class="j_table">
          <thead>
            <tr>
              <th>表格模板内容：</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckboxGroup v-model="col">
                  <Checkbox :label="item.value" v-for="item in list" :key="item.value">{{item.text}}</Checkbox>
                </CheckboxGroup>
              </td>
            </tr>
          </tbody>
        </table>
        <a href="http://www.jihui88.com/sample/productMulti.xls"><Button type="primary" style="margin-bottom:22px;">生成产品表格模板</Button></a>

        <div class="j_tip">
          <span class="red">步骤二：</span>进行批量上传产品表格前，请先把产品图片上传好
        </div>
        <Button type="primary" @click="update" style="margin-bottom:16px;">上传产品图片</Button>
        <div class="j_tip">
          <span class="red">步骤三：</span>提交填写好的产品表格
        </div>
        <Row :gutter="24" class="form">
          <Col span="3">
            <span class="star">*</span>上传表格:
          </Col>
          <Col span="21">
            <input id="fileUpload" type="file" style="width:440px;float:left" class="ivu-input"></input>
            <span class="select" @click="select">选择文件</span>
            <Button type="primary" @click="submit()" class="submit">提交</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import lrz from 'lrz'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      col: [],
      list: [
        { value: 'name', text: '产品名称' },
        { value: 'prodtype', text: '产品型号' },
        { value: 'category', text: '产品分类' },
        { value: 'picName', text: '图片名称' },
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
        { value: 'picPath', text: '产品主图缩略图' },
        { value: 'productImageListStore', text: '多方位图缩略图' },
        { value: 'tag', text: '产品标签' },
        { value: 'a', text: '-' },
        { value: 'b', text: '-' },
        { value: 'c', text: '-' }
      ]
    }
  },
  methods: {
    update () {
      this.$Message.info('更新中')
    },
    select () {
      var btn = document.getElementById('fileUpload')
      btn.click()
    },
    submit () {
      this.$Message.info('更新中')
      let _this = this
      var e = document.getElementById('fileUpload')
      lrz(e.files[0], {fieldName: 'Filedata'})
        .then(function (rst) {
          // 这里该上传给后端啦
          /* ==================================================== */
          // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
          // 其他框架，例如jQuery处理formData略有不同，请自行google，baidu。
          let xhr = new XMLHttpRequest()
          xhr.open('POST', '/user_v2/product/uploadProducts')
          xhr.onload = function () {
            _this.isloading = false
            if (xhr.status === 200) {
              // 上传成功
              let result = JSON.parse(xhr.response).attributes
              console.log(result)
              _this.result = result
              _this.$emit('result', result)
            } else {
              // 处理其他情况
              console.log(xhr.statusText)
            }
          }
          xhr.onerror = function () {
            // 处理错误
          }
          xhr.upload.onprogress = function (e) {
            // 上传进度
            _this.isloading = true
            // var percentComplete = ((e.loaded / e.total) || 0) * 100
          }
          // 添加参数
          rst.formData.append('fileLen', rst.fileLen)
          // 触发上传
          xhr.send(rst.formData)
          /* ==================================================== */
          return rst
        })
        .catch(function (err) {
          console.log(err)
          // 处理失败会执行
        })
        .always(function () {
          _this.isloading = false
          // 不管是成功失败，都会执行
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
    }
    .select{
      position: absolute;
      left: 22px;
      top: 5px;
      background: #fff;
      color: #aaa;
      text-decoration: underline;
      padding: 0 9px;
      line-height: 26px;
      cursor: pointer;
    }
  }
}
</style>
