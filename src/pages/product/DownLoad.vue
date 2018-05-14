<template>
  <Layout class="ivu-layout-has-sider j_product_import">
    <MenuBar :data="'menu_product'" :active="'product_download'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'下载'" :lan="true"/>
        <div class="j_search">
          <Button class="j_btn primary">产品表格下载</Button>
          <Button class="j_btn">产品相册下载</Button>
        </div>
        <table class="j_table">
          <thead>
            <tr>
              <th>表格模板内容：需要的请“打勾”，再点下载。</th>
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
        <table class="j_table" style="margin: 25px 0 35px 0">
          <thead>
            <tr>
              <th>
                表格模板内容：需要的请“打勾”，再点下载。温馨提醒（如需下载下面的内容，请先选择好所属的网站编号）
                <Select v-model="website" class="j_select_qrcode_img">
                  <Option v-for="item in websiteList" :value="item.value" :key="item.value" :label="item.label">
                    <span>{{ item.label }}</span>
                  </Option>
                </Select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckboxGroup v-model="col">
                  <Checkbox :label="item.value" v-for="item in list2" :key="item.value">{{item.text}}</Checkbox>
                </CheckboxGroup>
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="info" @click="update" style="width:124px;">下载</Button>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      website: '',
      websiteList: [
        { value: '203', label: '网站编号203' },
        { value: '204', label: '网站编号204' }
      ],
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
      ],
      list2: [
        { value: 'a', text: '产品二维码' },
        { value: 'b', text: '-' },
        { value: 'c', text: '-' },
        { value: 'd', text: '-' },
        { value: 'e', text: '-' },
        { value: 'f', text: '-' },
        { value: 'g', text: '-' }
      ]
    }
  },
  methods: {
    update () {
      this.$Message.info('更新中')
    }
  }
}
</script>

<style lang="less">
.j_product_import{
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
    .ivu-checkbox{
      padding-right: 7%
    }
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
}
</style>
