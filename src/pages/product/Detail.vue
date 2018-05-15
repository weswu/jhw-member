<template>
  <Layout class="ivu-layout-has-sider j_product_detail">
    <MenuBar :data="'menu_product_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text" :lan="true" @on-change="get" :tip="'建议使用最新版的谷歌浏览器、360浏览器、IE11及以上浏览器'"/>
      <Content>
        <Form :model="detail" :label-width="130" ref="model" v-if="active === '0'">
          <FormItem label="产品名称：">
            <Input v-model="detail.name" placeholder="请输入产品名称"></Input>
          </FormItem>
          <FormItem label="产品分类：">
            <Select v-model="detail.category" class="product_category_list" @on-change="change">
              <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId" v-if="item._checked" :class="'item' + item.grade">
                <div class="item">
                  <span>{{item.name}}</span>
                  <i class="iconfont icon-xialajiantou" v-if="item.isroot" @click="changeCateList(item.categoryId)"></i>
                </div>
              </Option>
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
          <img src="" alt="">
          <FormItem label="产品图片：">
            <ul class="pro_img_list">
              <li>
                <i class="iconfont icon-plus-add"></i>
                <div class="more">
                  <div class="top">产品主图</div>
                  <div class="bom">
                    <i class="iconfont icon-zuojiantou"></i>
                    <i class="iconfont icon-youjiantou"></i>
                    <i class="iconfont icon-x"></i>
                  </div>
                </div>
              </li>
              <li class="add">
                <i class="iconfont icon-plus-add"></i>
              </li>
            </ul>
          </FormItem>
        </Form>
        <UE :content='detail.proddesc' ref='ue1' :hidden="active !== '1'"></UE>
        <UE :content='detail.mobiledesc' ref='ue2' :hidden="active !== '2'"></UE>
        <UE :content='detail.detail1' ref='ue3' :hidden="active !== '3'"></UE>
        <UE :content='detail.detail2' ref='ue4' :hidden="active !== '4'"></UE>
        <!-- 商城 -->
        <Form :model="detail" :label-width="130" ref="model2" class="shop" v-if="active === '5'">
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
            <Select v-model="detail.weightUnit" style="width: 144px;">
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
          <FormItem label="秒杀开始时间：" class="formitem_left">
            <DatePicker type="date" placeholder="选择时间" v-model="detail.publishTime" @on-change="detail.publishTime=$event"></DatePicker>
          </FormItem>
          <FormItem label="商品评价：" class="formitem_left">
            <span class="a_underline">查看评价</span>
          </FormItem>
          <br/>
          <FormItem label="秒杀开始时间：" class="formitem_left">
            <DatePicker type="date" placeholder="选择时间" v-model="detail.unpublishTime" @on-change="detail.unpublishTime=$event"></DatePicker>
          </FormItem>
          <FormItem label="最低购买数量：" class="formitem_left" style="width: 325px;">
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
          <FormItem label="产品规格：">
            <Button type="ghost" size="small">添加产品规格</Button>
          </FormItem>
          <FormItem label="属性价格：">
            <RadioGroup v-model="detail.attrState">
              <Radio label="01">开启</Radio>
              <Radio label="00">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <hr/>
          <FormItem label="定制规格：">
            <Button type="ghost" size="small">添加</Button>
            <a class="a_underline" href="http://sj.jihui88.com/rest/site/59//formula" target="_blank">查看使用说明</a>
            <div class="j_tip j_tip_category" style="left: 140px;">
              总价格 = （如:长度*宽度*商品价格）<br>
              说明：固定值对买家不可见，只参与表达式的计算。<br>
              商品价格可移到表达式中，如：总价格 = （长度*宽度*商品价格+开启价格*开启扇数）
            </div>
          </FormItem>
        </Form>
        <Form :model="detail" :label-width="130" ref="model3" v-if="active === '6'">
          <FormItem label="产品标签：">
            <Select v-model="detail.taglist" multiple style="width:260px">
              <Option v-for="item in detail.tagMapStore" :value="item.tagId" :key="item.tagId">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
        <Form :model="detail" :label-width="130" ref="model4" v-if="active === '7'">
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
        <Button type="primary" size="small" @click="publish" v-if="this.$route.params.id !== 'add'">发布</Button>
        <Button type="ghost" size="small" @click="submit">保存草稿</Button>
        <Button type="ghost" size="small" @click="view" v-if="this.$route.params.id !== 'add'">预览</Button>
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
export default {
  components: {
    MenuBar,
    JHeader,
    UE
  },
  data () {
    return {
      active: '0',
      detail: {}
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_product_detail,
      categoryList: state => state.productCategory
    })
  },
  created () {
    this.get()
    this.$store.dispatch('getProductCategory')
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
      this.active = e
    },
    change (e) {
      console.log(e)
    },
    changeCateList (id) {
      this.categoryList.forEach(item => {
        if (item.belongId === id) {
          item._checked = !item._checked
        }
      })
    },
    submit () {
      // this.detail.proddesc = this.$refs.ue1.getUEContent().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
      // this.detail.mobiledesc = this.$refs.ue2.getUEContent().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
      // this.detail.detail1 = this.$refs.ue3.getUEContent().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
      // this.detail.detail2 = this.$refs.ue4.getUEContent().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
      this.detail.purchaseNum = parseInt(this.detail.purchaseNum)
      let data = {
        model: JSON.stringify(this.detail),
        _method: 'put'
      }
      this.$http.post('/rest/api/product/detail/' + this.detail.productId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    publish () {
      this.publish2('page&thisPage=')
      this.publish2('category&thisPage=product')
      this.publish2('detail&thisPage=product&productId=' + this.detail.productId, true)
    },
    publish2 (url, tip) {
      this.$http.post('/rest/static1/' + this.$store.state.user.username + '/publish?type=' + url).then((res) => {
        if (tip) {
          if (res === '') {
            this.$Message.success('发布成功')
          } else {
            this.$Message.error('发布失败')
          }
        }
      })
    },
    view () {
      window.location.href = 'http://www.jihui88.com/rest/site/' + this.$store.state.user.username + '/product_detail?itemId=' + this.detail.productId
    }
  }
}
</script>

<style lang="less">
.product_category_list{
  .ivu-select-dropdown{
    max-height: 340px;
  }
  .icon-xialajiantou{
    float: right;
    color: #797979;
    font-size: 14px;
  }
  .item2{
    padding: 7px 16px 7px 36px;
  }
  .item3{
    padding: 7px 16px 7px 66px;
  }
  .ivu-select-item-selected{
    &.item1{
      background: #14a4ff;
    }
    &.item2{
      background: #4ebbff;
    }
    &.item3{
      background: #9dd9ff;
    }
    .icon-xialajiantou{
      color: #fff;
    }
  }
}
.j_product_detail{
  .pro_img_list{
    li{
      width: 104px;
      height: 104px;
      line-height: 104px;
      border: 1px solid #c9c9c9;
      float: left;
      text-align: center;
      margin-right: 11px;
      position: relative;
      background: #f5f6fa;
      .top{
        position: absolute;
        left: -1px;
        top: -1px;
        background: #3e3e3e;
        width: 104px;
        color: #fff;height: 21px;
        line-height: 21px
      }
      .bom{
        position: absolute;
        left: 0px;
        bottom: 0px;
        background: #f5f6fa;
        border-top: 1px solid #c9c9c9;
        width: 102px;
        color: #fff;height: 20px;
        line-height: 20px;
        i{
          color: #437708;
          font-size: 22px;
          float: left;
          width: 30%;
        }
        .icon-x{
          color: #d0021b;
          font-size: 14px;
        }
      }
    }
    .icon-plus-add{
      font-size: 38px;
      color: #c9c9c9;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 104px;
    }
  }
  .j_tip_category{
    position: absolute;
    left: 533px;
    top: -23px;
    line-height: 2;
    color: #999;
  }
  .formitem_left{
    display: inline-block;
  }
  // 商城属性
  .shop{
    .unit{
      padding-left: 5px;
      position: absolute;
    }
    .ivu-input-wrapper{
      width: 144px;
    }
    hr{
      height: 1px;
      background: #dddddd;
      border: none;
      margin: 20px 0 23px 0;
    }
  }
}
</style>
