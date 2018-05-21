<template>
  <Layout class="j_layout ivu-layout-has-sider j_beian">
    <MenuBar :data="'menuStatic'" :active="'beian'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'域名备案'" v-if="active === '0'"/>
      <JHeader :title="'域名备案'" :website="true" @on-static="staticChange" v-if="active === '1'"/>
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
        <Button type="info" class="w130" v-if="active === '0'">查看教程</Button>
        <div v-if="active === '1'">
          <Button class="orange" @click="update($Message)">前往购买“代理备案”</Button>
          <hr style="background:#c9c9c9;margin: 28px 0"/>
          <Form :model="detail" :label-width="130" ref="model" class="j_scroll">
            <Button type="button" class="w144" @click="type = !type">
              <span class="btn-text" v-if="type">法人自己备案</span>
              <span class="btn-text" v-if="!type">负责人备案</span>
              <i class="iconfont icon-xialajiantou"></i>
            </Button>
            <div class="j_beian_title">备案的域名：<span class="a_underline">查看示例</span><span>(备注：填写您申请好的域名)</span></div>
            <FormItem label="域名：">
              <Input v-model="detail.seoTitle" placeholder="填写您的域名"></Input>
            </FormItem>
            <div class="j_beian_title">域名证书：<span class="a_underline">查看示例</span><span>(备注：上传域名证书给我们)</span></div>
            <FormItem label="域名证书：">
              <Input v-model="detail.pkey" placeholder="上传域名证书"></Input>
            </FormItem>
            <div class="j_beian_title">营业执照：<span class="a_underline">查看示例</span><span>(备注：上传营业执照给我们)</span></div>
            <FormItem label="营业执照：">
              <Input v-model="detail.pkey" placeholder="上传营业执照"></Input>
            </FormItem>
            <div class="j_beian_title">上传法人身份正反电子版：<span class="a_underline">查看示例</span><span>(备注：法人必须上传)</span></div>
            <FormItem label="法人身份证正面：">
              <Input v-model="detail.pkey" placeholder="选择文件：法人身份证正面"></Input>
            </FormItem>
            <FormItem label="法人身份证反面：">
              <Input v-model="detail.pkey" placeholder="选择文件：法人身份证反面"></Input>
            </FormItem>
            <div class="j_beian_title">幕布照（法人）：<span class="a_underline">查看示例</span><span>(备注：必须上传)</span><a href="#" class="a_underline">幕布照申请邮寄</a></div>
            <FormItem label="法人幕布照：">
              <Input v-model="detail.pkey" placeholder="选择文件：法人幕布照"></Input>
            </FormItem>
            <div class="j_beian_title">手持身份证照片（跟幕布照对应）：<span class="a_underline">查看示例</span><span>(备注：手持身份证跟幕布照对应)</span></div>
            <FormItem label="法人幕布照：">
              <Input v-model="detail.pkey" placeholder="选择文件：法人幕布照"></Input>
            </FormItem>
            <div class="j_beian_title">手机号码：<span>(备注：法人必填)</span></div>
            <FormItem label="法人手机号：">
              <Input v-model="detail.pkey"></Input>
            </FormItem>
            <div class="j_beian_title">邮箱地址：<span>(备注：法人必填)</span></div>
            <FormItem label="法人邮箱：">
              <Input v-model="detail.pkey"></Input>
            </FormItem>
            <div class="j_beian_title">座机电话：<span>(备注：必填，写清楚区号)</span></div>
            <FormItem label="座机电话：">
              <Input v-model="detail.pkey"></Input>
            </FormItem>
            <div class="j_beian_title">核验单：<span class="a_underline">查看示例</span>
              <span>(备注：核验单下载后，盖好公章，拍照发给我们)</span>
              <a href="#" class="a_underline">下载核验单</a>
            </div>
          </Form>
        </div>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">提交</Button>
      </Footer>
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
      btns: [
        { text: '自动备案（备案在阿里云）', value: '0' },
        { text: '代理备案', value: '1' }
      ],
      active: '1',
      type: true,
      detail: {}
    }
  },
  methods: {
    staticChange () {},
    submit () {

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
    border-color: #979797;
    color: #595959;
    .btn-text{
      display: inline-block;
      width: 94px;
    }
  }
  input::-webkit-input-placeholder {
    text-decoration: underline;
    color: #aaaaaa;
  }
  form{
    height: calc(100vh - 400px);
    overflow-y: scroll;
  }
  .j_beian_title{
    font-size: 14px;
    padding: 33px 0 12px 0;
    span{
      color: #bababa;
      font-size: 12px;
      &.a_underline{
        color: #f5a623;
        margin: 0 10px 0 15px;
      }
    }
    .a_underline{
      font-size: 12px;
    }
  }
}
</style>
