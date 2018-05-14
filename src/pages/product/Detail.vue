<template>
  <Layout class="ivu-layout-has-sider j_product_detail">
    <MenuBar :data="'menu_product_detail'" :active="active" :detail="true" :on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text" :lan="true" @on-change="get" :tip="'建议使用最新版的谷歌浏览器、360浏览器、IE11及以上浏览器'"/>
      <Content>
        <div class="" v-if="active === '0'">
          <Form :model="detail" :label-width="130" ref="model">
            <FormItem label="产品名称：">
              <Input v-model="detail.name" placeholder="请输入产品名称"></Input>
            </FormItem>
            <FormItem label="产品分类：">
              <Select v-model="detail.category">
                <Option value="00">男</Option>
                <Option value="01">女</Option>
              </Select>
              <span class="a_normal" style="padding-left:10px;">新增分类</span>
              <div class="j_tip j_tip_category">
                <div style="position: absolute;">注意: </div>
                <div style="padding-left: 35px;">产品分类修改后商城属性规格将会相应改变，建议先选择好分类后再设置商城属性规格。</div>
              </div>
            </FormItem>
            <FormItem label="产品型号：">
              <Input v-model="detail.legalPre" placeholder="请输入产品型号"></Input>
            </FormItem>
            <FormItem label="是否上架：">
              <RadioGroup v-model="detail.isdisplay">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="新品商品：" class="d_radio">
              <RadioGroup v-model="detail.isNew">
                <Radio label="01">是</Radio>
                <Radio label="00">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="精品商品：" :label-width="95" class="d_radio">
              <RadioGroup v-model="detail.isBest">
                <Radio label="01">是</Radio>
                <Radio label="00">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="热销商品：" :label-width="95">
              <RadioGroup v-model="detail.isHot">
                <Radio label="01">是</Radio>
                <Radio label="00">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="产品图片：">
              <ul class="pro_img_list">
                <li>
                  <img src="" alt="">
                  <div class="more">
                    <div class="top">产品主图</div>
                    <div class="bom">
                      <i class="iconfont"></i>
                      <i class="iconfont"></i>
                      <i class="iconfont"></i>
                    </div>
                  </div>
                </li>
                <li class="add">
                  <i class="iconfont "></i>
                </li>
              </ul>
            </FormItem>
          </Form>
        </div>
        <div class="" v-if="active === '2'">
          a
        </div>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">发布</Button>
        <Button size="small">保存草稿</Button>
        <Button size="small">预览</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      active: '0',
      detail: {
        name: '商量',
        state: '01',
        type: 'NM',
        domain: null,
        username: null,
        endTime: null,
        category: 'Category_00000000000000000087648',
        sort: 33979,
        weight: 1,
        enterpriseId: 'Enterp_0000000000000000000000039',
        price: 2,
        mainPic: null,
        adduserId: 'User_000000000000000000000000082',
        attachList: [ ],
        productId: 'Product_000000000000000000581124',
        attList: null,
        attrState: '01',
        attrItems: [
          {
            addTime: {
              date: 23,
              day: 1,
              hours: 9,
              minutes: 46,
              month: 3,
              nanos: 763000000,
              seconds: 18,
              time: 1524447978763,
              timezoneOffset: -480,
              year: 118
            },
            barCode: '',
            costPrice: '0',
            groupNum: 0,
            groupPrice: '',
            id: '8a9e457e62e0d6d50162f02e250b0242',
            memberPrice: [ ],
            memberPriceState: '00',
            pic: '',
            productId: 'Product_000000000000000000581124',
            propertyNames: '颜色:红色',
            skuCode: '红色',
            soldNum: 0,
            status: '01',
            stockNum: 0
          },
          {
            addTime: {
              date: 23,
              day: 1,
              hours: 9,
              minutes: 46,
              month: 3,
              nanos: 763000000,
              seconds: 18,
              time: 1524447978763,
              timezoneOffset: -480,
              year: 118
            },
            barCode: '',
            costPrice: '0.01',
            groupNum: 0,
            groupPrice: '',
            id: '8a9e457e62e0d6d50162f02e250b0243',
            memberPrice: [ ],
            memberPriceState: '00',
            pic: '',
            productId: 'Product_000000000000000000581124',
            propertyNames: '颜色:白色',
            skuCode: '白色',
            soldNum: 0,
            status: '01',
            stockNum: 999
          }
        ],
        store: 1997,
        productAttributeMapStore: [
        {
          id: '8a9e457e62e0d6d50162f02e25010241',
          element: '[红色,白色]',
          price: '[0,0,0]',
          productId: 'Product_000000000000000000581124',
          orderList: 12,
          productAttribute: {
            name: '颜色',
            state: '01',
            attributeType: 'checkbox',
            enterpriseId: 'Enterp_0000000000000000000000039',
            categoryId: 'Category_00000000000000000087648',
            attId: 'ff8081814f5118e4014f5321bf7b000c',
            orderList: 12,
            formula: null,
            addTime: 1440208764785,
            updateTime: 1440208764785,
            isRequired: '00',
            isEnabled: '01',
            attributeOptionStore: "['红色','白色','绿色']",
            attributeOptionList: [
              '红色',
              '白色',
              '绿色'
            ]
          },
          formula: null,
          priceList: [
            '0',
            '0',
            '0'
          ],
          addTime: 1524447978753,
          attributeOptionStore: null,
          attributeOptionList: [
            '红色',
            '白色'
          ],
          price2: '[0,0]',
          attributePriceList: [
            '0',
            '0'
          ],
          price2List: [
            '0',
            '0'
          ]
        }
        ],
        customAttr: '[]',
        formula: null,
        publishTime: null,
        unpublishTime: null,
        memberPriceList: [ ],
        memberLimitList: [ ],
        integralProduct: {
          name: null,
          type: 'money',
          enterpriseId: 'Enterp_0000000000000000000000039',
          productId: null,
          store: null,
          integralProductId: null,
          point: null,
          addTime: 1526028316654,
          money: null,
          num: null,
          updateTime: null,
          pic: null,
          integralProductSn: null,
          receiveCount: null
        },
        point: 1,
        sell: 0,
        addTime: 1493859147515,
        folder: null,
        integralState: '00',
        proddesc: '<p>a</p>',
        picPath: 'upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4.jpg',
        productSn: 'SN_5D1FFC36117F',
        activity: null,
        lanId: 1,
        auditTime: null,
        unit: '件',
        brand: null,
        entType: null,
        seoDescription: '33',
        contactId: null,
        publish: '01',
        viewsum: '0',
        isdisplay: '1',
        loginView: '1',
        broadcast: null,
        detailTitle1: null,
        detailTitle2: null,
        detailTitle3: null,
        detail1: null,
        detail2: "<section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 20px; margin-bottom: 20px; max-width: 100%; box-sizing: border-box; text-align: center; word-wrap: break-word !important;'><section class='' style='max-width: 100%; box-sizing: border-box; display: inline-block; word-wrap: break-word !important;'><section class='' style='margin-top: -2em; margin-bottom: 1em; max-width: 100%; box-sizing: border-box; line-height: 1.2em; font-size: 24px; color: rgb(255, 255, 255); word-wrap: break-word !important;'><p style='max-width: 100%; box-sizing: border-box; min-height: 1em; word-wrap: break-word !important;'><br style='max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'/></p></section></section></section></section><p><section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 15px; margin-bottom: 15px; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='padding-right: 10px; padding-left: 10px; max-width: 100%; box-sizing: border-box; font-size: 14px; line-height: 2; word-wrap: break-word !important;'><p style='max-width: 100%; box-sizing: border-box; min-height: 1em; word-wrap: break-word !important;'>8月21-23日，保康轮毂携豪华阵容亮相第十五届中国国际轮胎博览会和2017年上海车轮展览会，热情迎接来自全球各地的参观嘉宾及采购商。</p></section></section></section><section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 10px; margin-bottom: 10px; max-width: 100%; box-sizing: border-box; text-align: center; word-wrap: break-word !important;'><img class='' data-src='http://mmbiz.qpic.cn/mmbiz_jpg/edOMLQwiapgILF30kyicia5A5GlIZeo6rgreuibeJk3xIibnKwahIiadUGIGticjpa8DJa3BiavA3tIzF0uPcNw4SviciaSA/0?wx_fmt=jpeg' data-ratio='0.6671875' data-w='640' data-type='jpeg' src='http://mmbiz.qpic.cn/mmbiz_jpg/edOMLQwiapgILF30kyicia5A5GlIZeo6rgreuibeJk3xIibnKwahIiadUGIGticjpa8DJa3BiavA3tIzF0uPcNw4SviciaSA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1' data-fail='0' style='border: 0px none; max-width: 1140px; box-sizing: border-box; vertical-align: middle; word-wrap: break-word !important; width: auto !important; visibility: visible !important;'/></section></section><section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 10px; margin-bottom: 10px; max-width: 100%; box-sizing: border-box; text-align: center; word-wrap: break-word !important;'><img class='' data-src='http://mmbiz.qpic.cn/mmbiz_jpg/edOMLQwiapgILF30kyicia5A5GlIZeo6rgrJ54su6lLvcEUapYu9EFZnodwTWcW9ibNU6YTUp3NtkmULQ6U5wFoCiag/0?wx_fmt=jpeg' data-ratio='0.6671875' data-w='640' data-type='jpeg' src='http://mmbiz.qpic.cn/mmbiz_jpg/edOMLQwiapgILF30kyicia5A5GlIZeo6rgrJ54su6lLvcEUapYu9EFZnodwTWcW9ibNU6YTUp3NtkmULQ6U5wFoCiag/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1' data-fail='0' style='border: 0px none; max-width: 1140px; box-sizing: border-box; vertical-align: middle; word-wrap: break-word !important; width: auto !important; visibility: visible !important;'/></section></section><section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><p style='max-width: 100%; box-sizing: border-box; min-height: 1em; word-wrap: break-word !important;'><br style='max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'/></p></section></section></section><section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 15px; margin-bottom: 15px; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='padding-left: 2px; max-width: 100%; box-sizing: border-box; display: inline-block; vertical-align: top; width: 335px; word-wrap: break-word !important;'><section class='' powered-by='xiumi.us' style='max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 0.5em; margin-bottom: 0.5em; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='max-width: 100%; box-sizing: border-box; background-color: rgb(62, 62, 62); height: 4px; word-wrap: break-word !important;'></section></section></section></section><section class='' style='padding-right: 2px; max-width: 100%; box-sizing: border-box; display: inline-block; vertical-align: top; width: 335px; word-wrap: break-word !important;'><section class='' powered-by='xiumi.us' style='max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 0.5em; margin-bottom: 0.5em; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='max-width: 100%; box-sizing: border-box; background-color: rgb(62, 62, 62); height: 1px; word-wrap: break-word !important;'></section></section></section></section></section></section><section class='' powered-by='xiumi.us' style='color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 16px; text-align: justify; white-space: normal; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='margin-top: 15px; margin-bottom: 15px; max-width: 100%; box-sizing: border-box; word-wrap: break-word !important;'><section class='' style='padding-right: 10px; padding-left: 10px; max-width: 100%; box-sizing: border-box; font-size: 14px; line-height: 2; word-wrap: break-word !important;'><p style='max-width: 100%; box-sizing: border-box; min-height: 1em; word-wrap: break-word !important;'><strong style='max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;'>本次保康轮毂展出锻造、旋压、低压、铸造等系列产品</strong>，展现了产品的多样化，全方位的满足了国内外中高端各类市场的需求，吸引了大批采购商和专业人员前来洽谈咨询。</p></section></section></section></p><p><br/></p>",
        detail3: '{}',
        seoTitle: '11',
        adminBroadcast: null,
        ads: '1',
        marketPrice: 1,
        weightUnit: 'kg',
        freezeStore: 0,
        isMarketable: '00',
        isBest: '01',
        isNew: '01',
        isHot: '01',
        productImageListStore: "[{'id':'Attach_0000000000000000001292948','sourceProductImagePath':'upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4.jpg','type':'main_pic'},{'id':'Attach_0000000000000000001391525','sourceProductImagePath':'upload//g//g2//ggggfj//picture//2017//08//22/1ac85e6c-4949-49ac-8d1a-484b8de69d9a.jpg','type':'pertain_pic'}]",
        pModel: null,
        prodtype: '与你',
        pkey: '22',
        customAttrMapStore: [ ],
        productCustomAttributeMapStore: null,
        productStaticAttributeMapStore: null,
        jsonDetail3: { },
        certificateList: null,
        tagMapStore: [
          {
            name: '热卖',
            id: '8a9e457e5eb660aa015eb7b6e455008e',
            tag: {
              name: '热卖',
              state: '01',
              type: 'product',
              enterpriseId: 'Enterp_0000000000000000000000039',
              categoryId: null,
              addTime: 1425097726480,
              tagId: 'ff8081814bc86848014bce719a100005'
            },
            belongId: 'Product_000000000000000000581124',
            tagId: 'ff8081814bc86848014bce719a100005'
          },
          {
            name: '置顶',
            id: '8a9e457e5eb660aa015eb7b69c65008d',
            tag: {
              name: '置顶',
              state: '01',
              type: 'product',
              enterpriseId: 'Enterp_0000000000000000000000039',
              categoryId: null,
              addTime: 1426825125912,
              tagId: 'ff8081814c35516f014c3567a0510002'
            },
            belongId: 'Product_000000000000000000581124',
            tagId: 'ff8081814c35516f014c3567a0510002'
          },
          {
            name: '促销',
            id: '8a9e457e5eb660aa015eb7b693df008c',
            tag: {
              name: '促销',
              state: '01',
              type: 'product',
              enterpriseId: 'Enterp_0000000000000000000000039',
              categoryId: null,
              addTime: 1426825151634,
              tagId: 'ff8081814c35516f014c356804920004'
            },
            belongId: 'Product_000000000000000000581124',
            tagId: 'ff8081814c35516f014c356804920004'
          }
        ],
        picUrl5: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4_5.jpg',
        picUrl: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4.jpg',
        picUrl8: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4_8.jpg',
        picUrl6: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4_6.jpg',
        picUrl7: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4_7.jpg',
        picUrl3: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4_3.jpg',
        picUrl4: 'http://img.jihui88.com/upload/g/g2/ggggfj/picture/2016/11/29/f0a83431-d266-492b-ae9a-230542065dc4_4.jpg',
        albumList: null,
        c_url: null,
        mobiledesc: null,
        isAgent: '00',
        attributeList: null,
        purchaseNum: 1,
        subTotalPrice: null,
        priceState: '00',
        limitState: '00'
      }
    }
  },
  computed: {
    ...mapState({
      'menuBarList': state => state.status.menu_product_detail
    })
  },
  created () {
    this.get()
    this.$store.dispatch('getCategory', 'product')
  },
  methods: {
    get () {
      let id = this.decodeId(this.$route.params.id, 'Product_', 32)
      this.$route.params.id !== 'add' && this.$http.get('/rest/api/product/detail/' + id).then(res => {
        if (res.success) {
          this.detail = res.attributes.data
        }
      })
    },
    update () {
      this.$Message.info('更新中')
    },
    activeChange (e) {
      debugger
      this.active = e
    },
    submit () {
      this.$Message.info('更新中')
    }
  }
}
</script>

<style lang="less">
.j_product_detail{
  .pro_img_list{
    li{
      width: 104px;
      height: 104px;
      border: 1px solid #c9c9c9;
      float: left;
      text-align: center;
      margin-right: 11px;
      position: relative;
      .more{
      }
      .top{
        position: absolute;
        left: 0px;
        top: 0px;
        background: #3e3e3e;
        width: 104px;
        color: #fff;
      }
      .bom{
        position: absolute;
        left: 0px;
        bottom: 0px;
        background: #3e3e3e;
        width: 104px;
        color: #fff;
      }
    }
  }
  .d_radio{
    width: 243px;
    float: left;
  }
  .j_tip_category{
    position: absolute;
    left: 533px;
    top: -23px;
    line-height: 2;
    color: #999;
  }
}
</style>
