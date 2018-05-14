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
      detail: {}
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
