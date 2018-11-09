<template>
  <Layout class="ivu-layout-has-sider j_product_detail">
    <MenuBar :data="'menu_product_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text" :lan="true" @on-change="get" :tip="'建议使用最新版的谷歌浏览器、360浏览器、IE11及以上浏览器'"/>
      <Content>
        <Form :model="detail" :label-width="130" ref="model" :hidden="active !== '0'">
          <FormItem label="产品名称：">
            <Input v-model="detail.name" placeholder="请输入产品名称"></Input>
          </FormItem>
          <CategoryList ref="category" :categorySelect="productCategory"/>
          <FormItem label="产品型号：">
            <Input v-model="detail.prodtype" placeholder="请输入产品型号"></Input>
          </FormItem>
          <FormItem label="是否上架：">
            <RadioGroup v-model="detail.isMarketableBol">
              <Radio label="01">是</Radio>
              <Radio label="00">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="新品商品：" class="formitem_left">
            <RadioGroup v-model="detail.isNew">
              <Radio label="01">是</Radio>
              <Radio label="00">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="精品商品：" class="formitem_left">
            <RadioGroup v-model="detail.isBest">
              <Radio label="01">是</Radio>
              <Radio label="00">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="热销商品：" class="formitem_left">
            <RadioGroup v-model="detail.isHot">
              <Radio label="01">是</Radio>
              <Radio label="00">否</Radio>
            </RadioGroup>
          </FormItem>
          <br/>
          <FormItem label="产品图片：">
            <JPictrue :list="imgList" :type="'product'"
            @on-change="imgChange"
            @on-prev="prevImg"
            @on-next="nextImg"
            @on-del="delImg"/>
          </FormItem>
        </Form>
        <UE :content='detail.proddesc' ref='ue1' :hidden="active !== '1'" v-if="editor1"></UE>
        <UE :content='detail.mobiledesc' ref='ue2' :hidden="active !== '2'" v-if="editor2"></UE>
        <UE :content='detail.detail1' ref='ue3' :hidden="active !== '3'" v-if="editor3"></UE>
        <UE :content='detail.detail2' ref='ue4' :hidden="active !== '4'" v-if="editor4"></UE>
        <!-- 商城 -->
        <Form :model="detail" :label-width="130" ref="model2" class="shop" :hidden="active !== '5'">
          <FormItem label="商品价格：" class="formitem_left">
            <Input v-model="detail.price" placeholder="请输入商品价格"></Input><span class="unit">元</span>
          </FormItem>
          <FormItem label="市场价格：" class="formitem_left">
            <Input v-model="detail.marketPrice" placeholder="请输入市场价格"></Input><span class="unit">元</span>
          </FormItem>
          <br/>
          <FormItem label="商品重量：" class="formitem_left">
            <Input v-model="detail.weight" placeholder="请输入商品重量"></Input>
          </FormItem>
          <FormItem label="重量单位：" class="formitem_left">
            <Select v-model="detail.weightUnit" class="border" style="width: 155px;">
              <Option value="g">克</Option>
              <Option value="kg">千克</Option>
              <Option value="t">吨</Option>
            </Select>
          </FormItem>
          <FormItem label="剩余库存：">
            <Input v-model="detail.store" placeholder="请输入商品库存"></Input><span class="unit">件</span>
          </FormItem>
          <FormItem label="商品积分：">
            <Input v-model="detail.point" placeholder="请输入商品积分"></Input>
          </FormItem>
          <hr/>
          <FormItem label="秒杀开始：" class="formitem_left">
            <DatePicker type="datetime" placeholder="秒杀开始时间" v-model="detail.publishTime" @on-change="detail.publishTime=$event"></DatePicker>
          </FormItem>
          <FormItem label="商品评价：" class="formitem_left" v-if="this.$route.params.id !== 'add'">
            <a :href="'#/evaluate/'+detail.productId" class="a_underline">查看评价</a>
          </FormItem>
          <br/>
          <FormItem label="秒杀结束：" class="formitem_left">
            <DatePicker type="datetime" placeholder="秒杀结束时间" v-model="detail.unpublishTime" @on-change="detail.unpublishTime=$event"></DatePicker>
          </FormItem>
          <FormItem label="最低购买数量：" class="formitem_left" style="width: 330px;">
            <Input v-model="detail.purchaseNum" placeholder="请输入购买数量"></Input><span class="unit">件起售</span>
          </FormItem>
          <hr/>
          <FormItem label="会员价格：">
            <RadioGroup v-model="detail.priceState">
              <Radio label="01">开启</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <hr/>
          <FormItem label="会员限购：">
            <RadioGroup v-model="detail.limitState">
              <Radio label="01">开启</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <hr/>
          <FormItem label="积分抵扣：">
            <RadioGroup v-model="detail.integralState">
              <Radio label="01">开启</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <hr/>
          <!-- 产品属性 -->
          <FormItem label="属性价格：">
            <RadioGroup v-model="detail.attrState">
              <Radio label="01">开启产品规格</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="产品规格：" :hidden="detail.attrState !== '01'">
            <Button type="ghost" size="small" @click="attrAdd">添加产品规格</Button>
          </FormItem>
          <Attr :list="attrtList" :hidden="detail.attrState !== '01'" @on-change="attrListChange"/>
          <AttrPanel ref="attr" :attrtList="attrtList" :data="detail.attrItems" :hidden="detail.attrState !== '01'"/>
          <hr/>
          <FormItem label="总价格：" v-if="detail.customAttrMapStore.length > 0">
            <Input v-model="detail.formula" placeholder="（如:长度*宽度*商品价格）" style="width:279px;"></Input>
          </FormItem>
          <FormItem label="定制规格：">
            <AttrCustom ref="attrCustom" :data="detail.customAttrMapStore" @on-change="customAttrChange"/>
          </FormItem>
        </Form>
        <div v-if="active === '6'">
          <Form :model="detail" :label-width="130" ref="model3">
            <JTag :tagMapStore="detail.tagMapStore" :id="detail.productId" :type="'product'"/>
          </Form>
          <div class="j_tip" style="width: 560px;margin-left: 130px;">
            小提示: <br>
            <span class="red">1.标签说明：</span> 产品标签主要用于网站显示个性化定制的模块，比如打折商品模块、最新商品模块等<br>
            <span class="red">2.标签使用：</span> 新添加的标签将保存到标签库， 方便下次选择<br>
            <span class="red">3.注意事项：</span> 标签的添加跟产品的保存无关， 请慎重添加
          </div>
        </div>
        <Form :model="detail" :label-width="130" ref="model4" :hidden="active !== '7'">
          <FormItem label="SEO标题：">
            <Input v-model="detail.seoTitle" :maxlength="100" placeholder="请输入SEO标题"></Input>
          </FormItem>
          <FormItem label="SEO关键字：">
            <Input v-model="detail.pkey" :maxlength="100" placeholder="请输入SEO关键字"></Input>
          </FormItem>
          <FormItem label="SEO描述：">
            <Input v-model="detail.seoDescription" :maxlength="250" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="限250字符内，加联系电话或邮件"></Input>
          </FormItem>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">保存</Button>
        <Poptip placement="bottom" class="j_poptip_ul" v-if="this.$route.params.id !== 'add'">
          <Button type="ghost" size="small">预览</Button>
          <ul slot="content" style="max-height: 250px;">
            <li v-for="(item, index) in staticList" :key="index">
              <a :href="'http://pc.jihui88.com/rest/site/'+item.layoutId+'/pd?itemId='+$route.params.id" target="_blank">网站编号：{{item.layoutId}}</a>
            </li>
          </ul>
        </Poptip>
      </Footer>
    </Layout>
    <AttrAdd ref="attrAdd" :categoryId="detail.category" @on-change="attrChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import UE from '@/components/group/j-editor'
import JPictrue from '@/components/group/j-pictrue'
import JTag from '@/components/group/j-tag'
import CategoryList from '@/components/product/category-list'
import Attr from '@/components/product/attr'
import AttrAdd from '@/components/product/attr-add'
import AttrCustom from '@/components/product/attr-custom'
import AttrPanel from '@/components/product/attr-panel'
export default {
  components: {
    MenuBar,
    JHeader,
    UE,
    CategoryList,
    JPictrue,
    JTag,
    Attr,
    AttrAdd,
    AttrCustom,
    AttrPanel
  },
  data () {
    return {
      active: '0',
      detail: {
        isMarketableBol: '01', // 上架,三品
        isNew: '00',
        isBest: '00',
        isHot: '00',
        price: 0,
        marketPrice: 0,
        store: 999,
        weight: 0,
        weightUnit: 'kg',
        priceState: '00',
        limitState: '00',
        integralState: '00',
        attrState: '00', // 关闭属性价格
        customAttrMapStore: [],
        productAttributeMapStore: []
      },
      // 多图
      imgList: [],
      attrtList: [],
      // editor1
      editor1: false,
      editor2: false,
      editor3: false,
      editor4: false
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_product_detail,
      staticList: state => state.staticList,
      productCategory: state => state.productCategory
    })
  },
  created () {
    this.get()
    if (this.productCategory.length === 0) this.$store.dispatch('getCategory', 'product')
  },
  methods: {
    get () {
      var ctx = this
      let id = this.decodeId(this.$route.params.id, 'Product_', 32)
      this.$route.params.id !== 'add' && this.$http.get('/rest/api/product/detail/' + id).then(res => {
        if (res.success) {
          let data = res.attributes.data
          let imglist = JSON.parse(data.productImageListStore)
          ctx.imgList = []
          imglist && imglist.forEach(item => {
            ctx.imgList.push({id: item.id, src: item.sourceProductImagePath})
          })
          if (data.isMarketable) {
            data.isMarketableBol = '01'
          } else {
            data.isMarketableBol = '00'
          }
          this.detail = data
          if (!data.category) { data.category = '' }
          this.$refs.category.open(data.category)
          this.detail.customAttrMapStore = []
          this.initAttr()
        }
      })
    },
    customAttrChange () {
      this.detail.customAttrMapStore.push({})
    },
    // 功能
    activeChange (e) {
      this.active = e
      if (e === '1') this.editor1 = true
      if (e === '2') this.editor2 = true
      if (e === '3') this.editor3 = true
      if (e === '4') this.editor4 = true
    },
    // 产品图片
    imgChange (list, index) {
      if (index === 'add') {
        list.forEach(item => {
          this.imgList.push({id: item.id, src: item.src})
        })
      } else if (index === 0 || index > 0) {
        this.imgList[index].src = list[0].src
      } else {
        list.forEach(item => {
          this.imgList.push({id: item.id, src: item.src})
        })
      }
    },
    prevImg (index) {
      this.imgListChange(index - 1, index)
    },
    nextImg (index) {
      this.imgListChange(index, index + 1)
    },
    imgListChange (a, b) {
      let list = this.imgList
      let objA = list[a]
      let objB = list[b]
      this.imgList.splice(a, 1, objB)
      this.imgList.splice(b, 1, objA)
    },
    delImg (index) {
      this.imgList.splice(index, 1)
    },
    // 产品属性
    attrAdd () {
      this.$refs.attrAdd.open()
    },
    attrChange (item) {
      this.attrtList.push(item)
    },
    attrListChange () {
      let arr = this.attrtList[0]
      this.$set(this.attrtList, 0, arr)
      this.attrtList.forEach(att => {
        let value = []
        let values = att.value
        if (att.value.length > 0) {
          att.attributeOptionList.forEach(item => {
            values.forEach(val => {
              if (item === val) {
                value.push(item)
              }
            })
          })
          att.value = value
        }
      })
      this.$refs.attr.reBuild()
      // 不能监听数组 只能监听checkBox
    },
    initAttr () {
      var ctx = this
      this.$http.get('/rest/api/attr/list/' + this.detail.category).then(res => {
        if (res.success) {
          this.attrtList = res.attributes.data
          this.detail.productAttributeMapStore.forEach(item => {
            ctx.attrtList.forEach(att => {
              if (item.productAttribute.attId === att.attId) {
                att.value = item.attributeOptionList
              }
            })
          })
        }
      })
    },
    // 提交
    submit () {
      var ctx = this
      this.detail.purchaseNum = this.detail.purchaseNum + ''
      // 多分类
      this.detail.category = this.$refs.category.list.join()
      // 上架
      if (this.detail.isMarketableBol === '01') {
        this.detail.isMarketable = true
      } else {
        this.detail.isMarketable = false
      }
      // 图片
      if (this.imgList.length === 0) return this.$Message.info('请上传图片')
      this.detail.picPath = this.imgList[0].src
      let imageListStore = []
      this.imgList.forEach((item, index) => {
        if (index === 0) {
          ctx.detail.photo = item.src
          ctx.detail.photoId = item.id
        } else {
          imageListStore.push({
            id: item.id,
            src: item.src
          })
        }
      })
      this.detail.photo2 = JSON.stringify(imageListStore)
      this.detail.productImageListStore = JSON.stringify(imageListStore)
      this.detail.taglist = ''
      // 编辑器
      if (this.$refs.ue1) this.detail.proddesc = this.$refs.ue1.getUEContent()
      if (this.$refs.ue2) this.detail.mobiledesc = this.$refs.ue2.getUEContent()
      if (this.$refs.ue3) this.detail.detail1 = this.$refs.ue3.getUEContent()
      if (this.$refs.ue4) this.detail.detail2 = this.$refs.ue4.getUEContent()
      // 属性
      this.attrtList.forEach(item => {
        if (item.isEnabled === '01') {
          if (item.attributeType === 'checkbox') {
            let val = item.value || []
            ctx.detail[item.attId] = val.join()
          }
        }
      })
      // 属性价格
      if (this.detail.attrState && this.detail.attrState === '01' && this.$refs.attr.skus.length === 0) {
        return this.$Message.info('请设置产品规格或者关闭属性固定价格')
      }
      this.detail.attrItems = this.$refs.attr.skus
      // 定制规格
      var customAttrList = []
      this.$refs.attrCustom.list.forEach(item => {
        if (item.madeName && item.madeUnit) {
          customAttrList.push({
            madeName: item.madeName,
            madeUnit: item.madeUnit,
            madeType: item.unitBol ? '00' : '01'
          })
        }
      })
      this.detail.customAttr = JSON.stringify(customAttrList)
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.productId) {
        url = '/' + this.detail.productId
        data._method = 'put'
      }
      this.$http.post('/rest/api/product/detail' + url, qs.stringify(data)).then((res) => {
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
.j_product_detail{
  .j_category_select{
    width: 450px;
  }
  .j_tip_category{
    position: absolute;
    left: 533px;
    top: -23px;
    line-height: 2;
    color: #999;
  }
  // 商城属性
  .shop{
    .unit{
      padding-left: 5px;
      position: absolute;
    }
    .ivu-input-wrapper{
      width: 155px;
    }
  }
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
