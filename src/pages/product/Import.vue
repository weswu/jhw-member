<template>
  <Layout class="ivu-layout-has-sider j_product_import">
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
        <a href="http://www.jihui88.com/sample/productMulti.xls"><Button type="info">生成产品表格模板</Button></a>

        <div class="j_tip">
          <span class="red">步骤二：</span>进行批量上传产品表格前，请先把产品图片上传好
        </div>
        <Button type="info" @click="update">上传产品图片</Button>
        <div class="j_tip">
          <span class="red">步骤三：</span>提交填写好的产品表格
        </div>
        <Row :gutter="24" class="submit">
          <Col span="3">
            <span class="star">*</span>上传表格:
          </Col>
          <Col span="21">
            <input id="fileUpload" type="file" style="width:440px;" class="ivu-input"></input>
            <span class="select" @click="select">选择文件</span>
            <Button type="primary" @click="submit()" class="j_btn_submit">提交</Button>
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
  }
  .j_table {
    border-bottom: none;
    border-left: none;
    td{
      padding: 0;
      border-bottom: none;
      border-left: none;
    }
  }
  .ivu-checkbox-group-item{
    width: 14.285%;
    margin-right: 0;
    padding: 15px 10px;
    border-left: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .submit{
    width:640px;
    line-height: 33px;
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
    .select{
      position: absolute;
      left: 22px;
      top: 5px;
      background: #fff;
      text-decoration: underline;
      padding: 0 9px;
      line-height: 26px;
      cursor: pointer;
    }
  }
  .j_btn_submit{
    background: #f5f6fa;
    border: 1px solid #c9c9c9;
    padding: 0 15px;
    height: 33px;
    line-height: 33px;
    color: #777;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    margin-left: 4px;
  }
}
</style>
