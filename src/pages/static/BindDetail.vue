<template>
  <Layout class="ivu-layout-has-sider j_bind">
    <MenuBar :data="'menu_bind_detail'" :active="'0'" :detail="true"/>
    <Layout class="j_layout_content">
      <JHeader :title="'域名绑定详情'"/>
      <Content>
        <div style="padding-bottom: 20px;">
          <div class="j_tip" style="margin-top: 9px;">
            温馨提醒：还没有域名? <a :href="'http://buy.jihui88.com/#/?tab=tab1&layoutId='+$store.state.layoutId" target="_blank" class="a_underline" style="padding: 0 5px;">点击前往购买</a>
            进入页面后点击基础类里的申请域名。
          </div>
          <div class="j_form_title" style="padding: 10px 0 0 0;">主域名绑定的步骤<span>（请求帮助QQ：260404208）</span></div>
          <div class="j_tip">
            <span class="red">第<span class="count">1</span>步：</span><span class="grey">空间选择</span>
          </div>
          <Form :model="detail" :label-width="0" style="padding-bottom: 10px;">
            <FormItem>
              <Select v-model="detail.country" disabled class="w144">
                <Option value="cn">国内机房</Option>
                <Option value="en">美国机房</Option>
                <Option value="hc">香港机房</Option>
              </Select>
            </FormItem>
            <div v-if="detail.country === 'cn'">
              <FormItem>
                <Input v-model="detail.icp" placeholder="填写ICP备案号（公信备案）"></Input> <Button class="submit" @click="submit">提交</Button>
              </FormItem>
              <a class="a_underline" target="_blank" href="https://help.aliyun.com/knowledge_detail/36922.html?spm=a2c4g.11186623.6.545.txarXU">查看阿里云备案教程</a>
              <a class="a_underline" target="_blank" href="https://beian.aliyun.com/?spm=5176.8006371.388261.5.5d907e630O5Nkf">视频教程</a>
              <a class="a_underline" target="_blank" :href="'http://buy.jihui88.com/#/?tab=tab1&layoutId='+$store.state.layoutId">前往购买“代理备案”</a>
              <span>(备案遇到麻烦？请联系QQ：260404208)</span>
            </div>
            <div class="j_tip">
              <span class="red">第<span class="count">2</span>步：</span>
              <span class="grey">请在此输入您已经拥有的自定义域名。审核(或清除)周期大概2个工作日。</span>
            </div>
            <FormItem>
              <Input v-model="detail.address" placeholder="填写主域名"></Input> <Button class="submit" @click="submit">提交</Button>
            </FormItem>
            <div class="j_tip">
              <span class="red">第<span class="count">3</span>步：</span>
              <span class="grey">域名解析 (注意：请确保您的自定义域名解析正确，域名设置变动一般需要几个小时生效，最长可达2天)</span>
            </div>
            <table class="j_table" style="max-width:460px;color: #aaa;">
              <tbody>
                <tr>
                  <td>解析域名</td>
                  <td>记录类型</td>
                  <td>记录值</td>
                </tr>
                <tr>
                  <td>{{detail.address}}</td>
                  <td>CNAME</td>
                  <td>g<span v-if="detail.country === 'cn'">n</span><span v-if="detail.country !== 'cn'">w</span>1.dns.jihui88.com</td>
                </tr>
                <tr v-if="!isTwoDomain">
                  <td>{{address}}</td>
                  <td>CNAME</td>
                  <td>g<span v-if="detail.country === 'cn'">n</span><span v-if="detail.country !== 'cn'">w</span>1.dns.jihui88.com</td>
                </tr>
              </tbody>
            </table>
            <a class="a_underline" target="_blank" href="https://3203104478.docs.qq.com/09kMYXbP3WX">查看教程-阿里云万网</a>
            <div v-if="detail.country === 'cn'">
              <div class="j_tip">
                <span class="red">第<span class="count">4</span>步：</span>
                <span class="grey">网安备案配置</span>
              </div>
              <FormItem>
                <Input v-model="detail.psr" placeholder="填写网安备案号（公安备案）"></Input> <Button class="submit" @click="submit">提交</Button>
              </FormItem>
              <FormItem>
                <Input v-model="detail.seccurityLink" placeholder="填写网安备案链接地址（公安备案）"></Input> <Button class="submit" @click="submit">提交</Button>
              </FormItem>
              <a class="a_underline" target="_blank" href="https://docs.qq.com/doc/B7xfV62RQmDe1mclWr0lzVOU0CnQYE2DAa9O3">查看网安备案教程</a>
              <a class="a_underline" target="_blank" :href="'http://buy.jihui88.com/#/?tab=tab1&layoutId='+$store.state.layoutId">前往购买 "代理备案"</a>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      detail: {
        country: 'cn'
      },
      address: '',
      layoutId: '',
      isTwoDomain: false
    }
  },
  watch: {
    'detail.address' () {
      this.isDonain()
    }
  },
  created (e) {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/pc/api/bind/bindDetail?bindId=' + this.$route.params.id).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          this.isDonain()
        }
      })
    },
    isDonain () {
      let obj = this.detail.address.split('.')
      this.address = ''
      if (obj.length === 2) {
        this.address = 'www.' + this.detail.address
        this.isTwoDomain = false
      } else if (obj.length > 2) {
        this.isTwoDomain = true
      } else {
        this.isTwoDomain = false
      }
    },
    submit () {
      this.$http.post('/rest/pc/api/bind/bindEdit', qs.stringify(this.detail)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功,生效时间10分钟')
          this.isDonain()
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_bind{
  .ivu-input-wrapper,.ivu-select{
    width: 244px;
  }
  .submit{
    width: 70px;
  }
  form{
    .a_underline{
      padding-right: 15px;
    }
  }
}
</style>
