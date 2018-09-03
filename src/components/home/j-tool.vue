<template>
  <Modal
    class-name="j_homt_tools"
    title="常用工具"
    :width="813"
    v-model="modal">
    <CheckboxGroup v-model="mySelected">
      <table class="j_table" v-for="row in list" :key="row.title">
        <tbody>
          <tr>
            <td>
              {{row.title}}
            </td>
            <td v-for="item in row.children" :key="item.value">
              <Checkbox :label="item.text === '-' ? item.value : item.text">
                <i :class="'iconfont ' + item.icon"></i>
                <span class="name">{{item.text}}</span>
              </Checkbox>
            </td>
            <td v-for="item in (7 - row.children.length)" :key="item"></td>
          </tr>
        </tbody>
      </table>
    </CheckboxGroup>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    selected: Array
  },
  data () {
    return {
      modal: false,
      detail: {},
      mySelected: [],
      list: [
        {
          title: '站点管理',
          children: [
            { value: 'static', text: '站点数据管理', icon: 'icon-shuju' },
            { value: 'seo', text: 'SEO管理', icon: 'icon-SEO1' },
            { value: 'beian', text: '域名备案', icon: 'icon-yuming' },
            { value: 'sitemap', text: 'Sitemap生成', icon: 'icon-sitemap' },
            { value: 'seo_batch', text: '批量提交', icon: 'icon-tijiao' },
            { value: 'third_party_statistics', text: '第三方统计', icon: 'icon-tongji' },
            { value: 'convenient', text: '便捷登录配置', icon: 'icon-denglu' }
          ]
        },
        {
          title: '公司信息',
          children: [
            { value: 'enterprise', text: '基本资料', icon: 'icon-ziliao' },
            { value: 'company', text: '公司简介', icon: 'icon-gongsi1' },
            { value: 'recruit', text: '招聘管理', icon: 'icon-zhaopin' },
            { value: 'link', text: '友情链接', icon: 'icon-ziyuan' }
          ]
        },
        {
          title: '产品管理',
          children: [
            { value: 'product', text: '产品列表', icon: 'icon-liebiao1' },
            { value: 'category/product', text: '产品分类', icon: 'icon-classifi' },
            { value: 'product_import', text: '导入', icon: 'icon-daoru1' },
            { value: 'product_download', text: '下载', icon: 'icon-xiazai' }
          ]
        },
        {
          title: '新闻管理',
          children: [
            { value: 'news', text: '新闻列表', icon: 'icon-liebiao' },
            { value: 'category/news', text: '新闻分类', icon: 'icon-classifi' }
          ]
        },
        {
          title: '相册管理',
          children: [
            { value: 'album', text: '图片目录', icon: 'icon-mulu' },
            { value: 'addAlbum', text: '新建相册', icon: 'icon-xinjian' },
            { value: 'shangchuanPic', text: '上传图片', icon: 'icon-shangchuan1' },
            { value: 'recycle', text: '回收站', icon: 'icon-huishouzhan1' }
          ]
        },
        {
          title: '客户管理',
          children: [
            { value: 'member', text: '会员管理', icon: 'icon-Group' },
            { value: 'member_rank', text: '会员等级配置', icon: 'icon-huiyuandengjidengjizuanshi' },
            { value: 'member_attr', text: '会员属性配置', icon: 'icon-huiyuanshuxing' },
            { value: 'member_register', text: '网站会员注册', icon: 'icon-huiyuanzhuce' }
          ]
        },
        {
          title: '商城管理',
          children: [
            { value: 'shop', text: '订单管理', icon: 'icon-dingdandaifukuan' },
            { value: 'shop_config', text: '商品相关配置', icon: 'icon-shangpin' },
            { value: 'shop_pay', text: '支付方式管理', icon: 'icon-zhifu' },
            { value: 'shop_delivery', text: '物流公司管理', icon: 'icon-gongsi11' },
            { value: 'shop_bill', text: '物流单据设置', icon: 'icon-wuliu' },
            { value: 'shop_refund', text: '商品退换货管理', icon: 'icon-tuihuanhuo' },
            { value: 'coupon', text: '营销管理', icon: 'icon-yingxiao' }
          ]
        }
      ]
    }
  },
  methods: {
    open () {
      this.modal = true
      this.mySelected = []
      this.selected.forEach(item => {
        this.mySelected.push(item.text)
      })
    },
    cancel () {
      this.modal = false
    },
    ok () {
      let data = []
      this.mySelected.forEach(text => {
        this.list.forEach(row => {
          row.children.forEach(item => {
            if (text === item.text) {
              data.push(item)
            }
          })
        })
      })
      this.$store.state.customData.linkList = data
      this.$store.dispatch('SAVE_CUSTOM_DATA')
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_homt_tools{
  .ivu-modal{
    top: 47px;
    .j_table{
      margin-bottom: 9px;
      td{
        width: 93px;
        height: 91px;
        position: relative;
        color: #9999a4;
        text-align: center;
        padding: 0 7px;
        .iconfont{
          color: #12bedb;
          display: block;
          font-size: 26px;
          padding-top: 10px;
          padding-bottom: 4px;
        }
        .name{
          height: 35px;
          display: block;
        }
        .ivu-checkbox{
          position: absolute;
          right: 6px;
          top: 4px;
          .ivu-checkbox-inner {
            border: none;
            border-radius: 50%;
            background: #dddddd;
            width: 17px;
            height: 17px;
            &::after{
              border: 1px solid #fff;
              border-top: 0;
              border-left: 0;
              content: '';
              display: table;
              width: 4px;
              height: 8px;
              position: absolute;
              top: 3px;
              left: 6px;
              transform: rotate(45deg) scale(1);
            }
          }
        }
        .ivu-checkbox-checked .ivu-checkbox-inner{
          background: #34b34a;
        }
      }
    }
  }
}
</style>
