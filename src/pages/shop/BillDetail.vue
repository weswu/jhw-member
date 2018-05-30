<template>
  <Layout class="ivu-layout-has-sider j_news_detail">
    <MenuBar :data="'menu_shop_bill_detail'" :active="'0'" :detail="true"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="title"/>
      <Content>
        <Form :model="detail" :label-width="130" ref="modalForm">
          <FormItem label="单据名称：">
            <Select v-model="detail.corpId" class="w144 border">
              <Option :value="item.corpId" v-for="item in list" :key="item.corpId">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="单据尺寸：">
            <Input v-model="detail.singleWidth" style="width:60px;"></Input><span style="padding: 0 2px 0 5px;">x</span>
            <Input v-model="detail.singleHeight" style="width:60px;"></Input><span class="j_unit">mm</span> <span class="a_underline" @click="initPic">初始化单据高宽</span>
          </FormItem>
          <FormItem label="单据背景图：">
            <span class="a_underline" @click="selectPic">选择图片</span>
          </FormItem>
          <FormItem label="添加打印项：">
            <Select class="w144 border" @on-change="v=>{change(v,'test')}" :label-in-value="true">
              <Option :value="item.value" v-for="item in addItems" :key="item.value">{{item.text}}</Option>
            </Select>
          </FormItem>
          <img ref="img" style="position: absolute;"
            :style="[{width: detail.singleWidth + 'px;', height: detail.singleHeight + 'px'}]"
            :src="$store.state.status.IMG_HOST + detail.img" alt="物流单据" />
          <ul class="bill-drag">
            <li v-for="(item, index) in items"
              :key="index"
              :style="[{left: item.left + 'px', top: item.top + 'px'}]"
              @mouseup="up($event, item)" v-drag>
              {{item.text}}
              <i class="close_btn" @click="del(index)">&nbsp;</i>
            </li>
          </ul>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit('modalForm')">保存</Button>
      </Footer>
    </Layout>
    <JAblum ref="ablum" @on-change="picChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JAblum from '@/components/group/j-ablum'
export default {
  components: {
    MenuBar,
    JHeader,
    JAblum
  },
  data () {
    return {
      detail: {},
      list: [],
      addItems: [
        { text: '发件人-单位', value: 'fent' },
        { text: '发件人-姓名', value: 'fname' },
        { text: '发件人-联系电话', value: 'fphone' },
        { text: '发件人-地址', value: 'faddress' },
        { text: '收件人-姓名', value: 'rname' },
        { text: '收件人-手机号码', value: 'rmobile' },
        { text: '收件人-联系电话', value: 'rphone' },
        { text: '收件人-地区1级', value: 'raddressCategory1' },
        { text: '收件人-地区2级', value: 'raddressCategory2' },
        { text: '收件人-地区3级', value: 'raddressCategory3' },
        { text: '收件人-地址', value: 'raddress' },
        { text: '收件人-邮政编号', value: 'rcode' },
        { text: '产品名称', value: 'productName' }
      ],
      additem: '',
      items: [],
      title: ''
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_shop_pay_detail
    })
  },
  directives: {
    drag: {
      inserted (el, bindings) {
        el.onmousedown = function (e) {
          var disx = e.pageX - el.offsetLeft
          var disy = e.pageY - el.offsetTop
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + 'px'
            el.style.top = e.pageY - disy + 'px'
          }
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null
          }
        }
      }
    }
  },
  created () {
    this.get()
    this.getCate()
  },
  methods: {
    get () {
      if (this.$route.params.id === 'add') {
        this.detail = {
          img: 'upload/g/g2/ggggfj/picture/2015/10/30/67a5bb09-22a0-4d66-a4e1-3f256746367a.jpg',
          singleWidth: '922',
          singleHeight: '510'
        }
        this.title = '物流单据添加'
      } else {
        this.title = '物流单据修改'
        this.$http.get('/rest/api/deliverycorpSingle/detail/' + this.$route.params.id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
            this.items = JSON.parse(this.detail.dcontent)
          }
        })
      }
    },
    getCate () {
      this.$http.get('/rest/api/deliverycorp/list?pageSize=500').then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    initPic () {
      this.detail.singleWidth = this.$refs.img.naturalWidth || '922'
      this.detail.singleHeight = this.$refs.img.naturalHeight || '922'
    },
    selectPic () {
      this.$refs.ablum.open()
    },
    picChange (e) {
      this.detail.img = e.src
    },
    change (e) {
      let bol = false
      this.items.forEach(item => {
        if (e.value === item.value) {
          bol = true
          this.$Message.info('已添加')
        }
      })
      if (!bol) {
        this.items.push({
          left: 0,
          top: 0,
          text: e.label,
          value: e.value
        })
      }
    },
    up (e, item) {
      item.left = parseInt(e.target.style.left)
      item.top = parseInt(e.target.style.top)
    },
    del (index) {
      this.items.splice(index, 1)
    },
    // 提交
    submit () {
      var ctx = this
      this.detail.dcontent = JSON.stringify(this.items)
      this.list.forEach(item => {
        if (ctx.detail.corpId === item.corpId) {
          ctx.detail.name = item.name
        }
      })
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.singleId) {
        url = '/' + this.detail.singleId
        data._method = 'put'
      }
      this.$http.post('/rest/api/deliverycorpSingle/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
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
.bill-drag{
  position: relative;
  li{
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
    border: 1px solid #999;
    background: #fff;
    display: inline-block;
    position: absolute;
    .close_btn {
      display: none;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      position: absolute;
      right: -8px;
      top: -8px;
      background: url(http://kstore.qianmi.com/boss/images/express_close_btn.png) no-repeat;
      cursor: pointer;
    }
    &:hover{
      .close_btn{
        display: block;
      }
    }
  }
}
</style>
