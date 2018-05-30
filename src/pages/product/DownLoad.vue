<template>
  <Layout class="ivu-layout-has-sider j_product_import j_product_import_download">
    <MenuBar :data="'menu_product'" :active="'product_download'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'下载'" :lan="true"/>
        <div class="j_search">
          <Button class="grey primary w130">产品表格下载</Button>
          <Button class="grey w130" @click="update($Message)">产品相册下载</Button>
        </div>
        <table class="j_table j_table_li">
          <thead>
            <tr>
              <th>表格模板内容：需要的请“打勾”，再点下载。</th>
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
        <table class="j_table j_table_li" style="margin: 25px 0 35px 0">
          <thead>
            <tr>
              <th>
                表格模板内容：需要的请“打勾”，再点下载。温馨提醒（如需下载下面的内容，请先选择好所属的网站编号）
                <Select v-model="staticId" class="small" style="width:111px">
                  <Option v-for="item in staticList" :value="item.value" :key="item.value" :label="item.label">
                    <span>{{ item.label }}</span>
                  </Option>
                </Select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckboxGroup v-model="col2">
                  <Checkbox :label="item.text === '-' ? item.value : item.text" v-for="item in list2" :key="item.value">{{item.text}}</Checkbox>
                </CheckboxGroup>
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="primary" @click="ok" style="width:124px;">下载</Button>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  computed: {
    ...mapState({
      staticId: state => state.staticId,
      staticList: state => state.staticList
    })
  },
  data () {
    return {
      col: [],
      col2: [],
      list: [
        { value: 'name', text: '产品名称' },
        { value: 'prodtype', text: '产品型号' },
        { value: 'category', text: '产品分类' },
        { value: 'picName', text: '图片主图' },
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
        { value: 'picPath', text: '产品多方位图' },
        { value: 'tag', text: '产品标签' },
        { value: 'a', text: '-' },
        { value: 'b', text: '-' },
        { value: 'c', text: '-' },
        { value: 'd', text: '-' }
      ],
      list2: [
        { value: 'qrcode', text: '产品二维码' },
        { value: '1', text: '-' },
        { value: '2', text: '-' },
        { value: '3', text: '-' },
        { value: '4', text: '-' },
        { value: '5', text: '-' },
        { value: '6', text: '-' }
      ]
    }
  },
  methods: {
    ok () {
      let data = {
        fields: this.col.join() + (this.col2.length > 0 ? ',' + this.col2.join() : ''),
        layoutId: this.staticId
      }
      this.$http.get('/rest/api/product/exportProductsToExcel?' + qs.stringify(data)).then(res => {
        if (res.success) {
          window.open(res.attributes.data)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
