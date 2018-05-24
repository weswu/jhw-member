<template>
  <Layout class="j_layout ivu-layout-has-sider j_beian">
    <MenuBar :data="'menuStatic'" :active="'beian'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'域名备案'" v-if="active === '0'"/>
      <JHeader :title="'域名备案'" :website="true" v-if="active === '1'"/>
      <Content>
        <div class="j_search">
          <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
          <div class="j_tip">
            温馨提醒：
            <span v-if="active === '0'">备案只针对国内的空间，放国外不需要备案。</span>
            <span v-if="active === '1'">为了更好的帮你备案，请提交以下相关资料（备案只针对国内的空间，放国外不需要备案。）</span>
            如有问题，请咨询：QQ：260404208
          </div>
        </div>
        <a href="https://beian.aliyun.com/?utm_content=se_1351982" target="_blank"><Button type="info" class="w130" v-if="active === '0'">查看教程</Button></a>
        <div v-if="active === '1'">
          <a href="http://buy.jihui88.com/#/?tab=tab1" target="_blank"><Button class="orange">前往购买“代理备案”</Button></a>
          <hr style="background:#c9c9c9;margin: 28px 0"/>
          <Form :model="detail" :label-width="150" ref="model" class="j_scroll">
            <Select v-model="type" class="w144">
              <Option value="00">负责人备案</Option>
              <Option value="01">法人自己备案</Option>
            </Select>
            <div class="j_beian_title">备案的域名：
              <Poptip trigger="hover" placement="right">
                <span class="a_underline">查看示例</span>
                <div slot="title">例如：abc.com</div>
              </Poptip>
              <span>（备注：填写您申请好的域名）</span></div>
            <FormItem label="域名：">
              <Input v-model="bindDetail.address" placeholder="填写您的域名"></Input>
            </FormItem>
            <div class="j_beian_title">域名证书：
              <Poptip trigger="hover" placement="right">
                <span class="a_underline">查看示例</span>
                <div slot="title">
                  请您上传有效的主办单位有效证件扫描件，证件应不大于400KB。<br/>证件扫描件，图片完整(不缺少连线、信息清晰可辨、不得做作何修改。)
                </div>
                <div class="certPic" slot="content">
                  <img src="http://img.jihui88.com/wcd/upload//j//j2//jihui//picture//2018//05//22/f35c8add-c844-4019-b506-d6c6c8c6038b.jpg"/>
                </div>
              </Poptip>
              <span>（备注：上传域名证书给我们）</span></div>
            <FormItem label="域名证书：">
              <Input v-model="detail.enterprise.domainCertPic" placeholder="上传域名证书" @on-focus="upload('enterprise.domainCertPic')"></Input>
            </FormItem>
            <div class="j_beian_title">营业执照：
              <Poptip trigger="hover" placement="right">
                <span class="a_underline">查看示例</span>
                <div slot="title">
                  请您上传有效的主办单位有效证件扫描件，证件应不大于400KB。<br/>证件扫描件，图片完整(不缺少连线、信息清晰可辨、不得做作何修改。)
                </div>
                <div class="certPic" slot="content">
                  <img src="http://img.jihui88.com/upload/j/j2/jihui88/picture/2018/05/24/0aadd6ac-98ad-4cb9-9414-a0e689c12078.jpg" style="width:400px;"/>
                </div>
              </Poptip><span>（备注：上传营业执照给我们）</span></div>
            <FormItem label="营业执照：">
              <Input v-model="detail.enterprise.certPic" placeholder="上传营业执照" @on-focus="upload('enterprise.certPic')"></Input>
            </FormItem>
            <div class="j_beian_title">上传法人身份正反<em v-if="type === '00'">（有负责人也需）</em>电子版：
              <Poptip trigger="hover" placement="right">
                <span class="a_underline">查看示例</span>
                <div class="certPic" slot="title">
                  <img src="http://img.jihui88.com/wcd/upload//j//j2//jihui88//picture//2016//11//25/ab58eb04-e56b-4e06-b84a-f96d250e89e7.jpg"/>
                  <img src="http://img.jihui88.com/wcd/upload//g//g2//ggggfj//picture//2016//11//25/128cbcba-ee9d-4fe0-94d9-66031d78bbd3.jpg"/>
                </div>
              </Poptip>
              <span>（备注：法人必须上传<em v-if="type === '00'">，如有负责人也需上传</em>）</span></div>
            <FormItem label="法人身份证正面：" class="formitem_left">
              <Input v-model="detail.emergency.certFrontPic" placeholder="选择文件：法人身份证正面" @on-focus="upload('emergency.certFrontPic')"></Input>
            </FormItem>
            <FormItem label="负责人身份证正面：" class="formitem_left" v-if="type === '00'">
              <Input v-model="detail.principal.certFrontPic" placeholder="选择文件：负责人身份证正面" @on-focus="upload('principal.certFrontPic')"></Input>
            </FormItem>
            <br/>
            <FormItem label="法人身份证反面：" class="formitem_left">
              <Input v-model="detail.emergency.certReversePic" placeholder="选择文件：法人身份证反面" @on-focus="upload('emergency.certReversePic')"></Input>
            </FormItem>
            <FormItem label="负责人身份证反面：" class="formitem_left" v-if="type === '00'">
              <Input v-model="detail.principal.certReversePic" placeholder="选择文件：负责人身份证反面" @on-focus="upload('principal.certReversePic')"></Input>
            </FormItem>
            <!-- 幕布照 -->
            <div class="j_beian_title">幕布照（<em v-if="type === '01'">法</em><em v-if="type === '00'">负责</em>人）：
              <a href="https://help.aliyun.com/knowledge_detail/36968.html?spm=a2c4g.11186623.4.1.Fl5stx#%E6%8B%8D%E7%85%A7%E8%A6%81%E6%B1%82" target="_blank" class="a_underline">点击查看示例</a>
              <span v-if="type === '01'">（备注：必须上传）</span>
              <a href="javascript:;" class="a_underline a_underline_tow" @click="add">填写幕布照邮寄地址</a></div>
            <FormItem label="法人幕布照：" v-if="type === '01'">
              <Input v-model="detail.enterprise.legalPersonBust" placeholder="选择文件：法人幕布照" @on-focus="upload('enterprise.legalPersonBust')"></Input>
            </FormItem>
            <FormItem label="负责人幕布照：" v-if="type === '00'">
              <Input v-model="detail.enterprise.legalPersonBust" placeholder="选择文件：负责人幕布照" @on-focus="upload('enterprise.legalPersonBust')"></Input>
            </FormItem>
            <!-- 手持身份证 -->
            <div class="j_beian_title">手持身份证照片（<em v-if="type === '01'">法</em><em v-if="type === '00'">负责</em>人）：
              <Poptip trigger="hover" placement="right">
                <span class="a_underline">查看示例</span>
                <div class="certPic" slot="title">
                  <img src="http://img.jihui88.com/wcd/upload//g//g2//ggggfj//picture//2016//11//25/d86eaccb-81b8-45b8-8125-4617de1750f0.jpg"/>
                </div>
              </Poptip><span>（备注：必需上传）</span>
            </div>
            <FormItem label="负责人手持身份证照片：" v-if="type === '00'">
              <Input v-model="detail.principal.certHandPic" placeholder="选择文件：负责人的手持身份证照片" @on-focus="upload('principal.certHandPic')"></Input>
            </FormItem>
            <FormItem label="法人手持身份证照片：" v-if="type === '01'">
              <Input v-model="detail.emergency.certHandPic" placeholder="选择文件：法人的手持身份证照片" @on-focus="upload('emergency.certHandPic')"></Input>
            </FormItem>

            <div class="j_beian_title">手机号码：<span>（备注：法人必填<em v-if="type === '00'">，如有负责人也需要</em>）</span></div>
            <FormItem label="法人手机号：" class="formitem_left">
              <Input v-model="detail.enterprise.legalPersonCellphone"></Input>
            </FormItem>
            <FormItem label="负责人手机号：" class="formitem_left" v-if="type === '00'">
              <Input v-model="detail.principal.cellphone"></Input>
            </FormItem>
            <div class="j_beian_title">邮箱地址：<span>（备注：法人必填<em v-if="type === '00'">，如有负责人也需要</em>）</span></div>
            <FormItem label="法人邮箱：" class="formitem_left">
              <Input v-model="detail.enterprise.email"></Input>
            </FormItem>
            <FormItem label="负责人邮箱：" class="formitem_left" v-if="type === '00'">
              <Input v-model="detail.principal.email"></Input>
            </FormItem>
            <div class="j_beian_title">座机电话：<span>（备注：必填，写清楚区号）</span></div>
            <FormItem label="座机电话：">
              <Input v-model="detail.enterprise.phone"></Input>
            </FormItem>
            <div class="j_beian_title">核验单：
              <a href="http://gtms02.alicdn.com/tps/i2/TB1f.iSJVXXXXXkXFXX6HFAMXXX-1240-1980.jpg" target="_blank" class="a_underline">点击查看示例</a>
              <span>（备注：下载核验单请联系微信/手机：150-5858-6617，核验单下载打印后，盖好公章，然后拍照上传）</span>
            </div>
            <FormItem label="上传核验单：" style="margin-bottom:30px;">
              <Input v-model="detail.webinfo.checkPic" placeholder="选择文件：核验单" @on-focus="upload('enterprise.webinfo.checkPic')"></Input>
            </FormItem>
          </Form>
        </div>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">提交</Button>
      </Footer>
    </Layout>
    <Detail ref="beianDetail"/>
    <JAblum ref="ablum" @on-change="picChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JAblum from '@/components/group/j-ablum'
import Detail from '@/pages/static/Detail'
export default {
  components: {
    MenuBar,
    JHeader,
    JAblum,
    Detail
  },
  data () {
    return {
      btns: [
        { text: '自动备案（备案在阿里云）', value: '0' },
        { text: '代理备案', value: '1' }
      ],
      active: '1',
      type: '00',
      detail: {
        bind: {},
        principal: {},
        emergency: {},
        enterprise: {},
        webinfo: {}
      },
      bindDetail: {},
      uploadText: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/profile/detail/all').then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
      this.$http.get('/rest/pc/api/bind/detail/' + this.$store.state.staticId).then((res) => {
        if (res.success) {
          this.bindDetail = res.attributes.data
        }
      })
    },
    add () {
      this.$refs.beianDetail.open()
    },
    picChange (e) {
      let obj = this.uploadText.split('.')
      this.detail[obj[0]][obj[1]] = e.src
    },
    upload (e) {
      this.uploadText = e
      this.$refs.ablum.open()
    },
    submit () {
      let data = {
        model: JSON.stringify(this.detail),
        _method: 'put'
      }
      this.$http.post('/rest/api/profile/detail/all', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
      // 域名提交
      if (this.bindDetail.id) {
        let bindDetail = {
          model: JSON.stringify(this.bindDetail),
          _method: 'put'
        }
        this.$http.post('/rest/api/bind/detail/' + this.bindDetail.id, qs.stringify(bindDetail)).then((res) => {
          if (res.success) {
            console.log('域名保存成功')
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.j_beian {
  .j_tip{
    margin-top: 9px;
  }
  .w144{
    text-align: center;
    .ivu-select-selection{
      border-color: #979797;
    }
    .ivu-select-arrow{
      right: 16px;
    }
  }
  form{
    height: calc(100vh - 400px);
    overflow-y: scroll;
    .ivu-input-wrapper{
      width: 250px;
    }
    input::-webkit-input-placeholder {
      text-decoration: underline;
      color: #aaaaaa;
    }
  }
  .j_beian_title{
    font-size: 14px;
    padding: 33px 0 12px 0;
    em{
      font-style: normal;
    }
    span{
      color: #bababa;
      font-size: 12px;
    }
    .a_underline{
      color: #f5a623;
      margin: 0 10px 0 12px;
      font-size: 12px;
    }
    .a_underline_tow{
      color: #0366ce;
      font-size: 12px;
      margin: 0
    }
  }
  .certPic img{
    width: 200px;
  }
}
</style>
