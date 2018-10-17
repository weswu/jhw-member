<template>
  <Layout class="j_layout_content j_storage_service">
    <JHeader :title="'附件存储服务'" :type="true" :tip="tip" :website="true"/>
    <Content>
      <Form :model="detail" :label-width="75">
        <FormItem label="可选方案：">
          <RadioGroup v-model="detail.name" @on-change="change">
            <Radio label="">无</Radio>
            <Radio label="aliyun">阿里云</Radio>
            <Radio label="qiniuyun">七牛云</Radio>
            <Radio label="jhyun">机汇云</Radio>
          </RadioGroup>
        </FormItem>
        <div class="j_panel_box" v-if="detail.name === 'aliyun'">
          <div>
            阿里云简介：&nbsp;&nbsp;无免费套餐，适合对性能和速度有要求的客户（数据访问频繁，且有性能需要），可选方案较多
          </div>
          <a href="https://www.aliyun.com/price/product?spm=5176.7933691.744462.c1.79cf6a56BmItn3#/oss/detail" target="_blank"><Button class="orange">查看价格</Button></a>
          <div>
            <a href="https://help.aliyun.com/document_detail/31818.html?spm=a2c4g.11186623.6.540.t7rl9n" class="a_underline" target="_blank">详细介绍</a>
          </div>
        </div>
        <div class="j_panel_box" v-if="detail.name === 'qiniuyun'">
          <div>
            七牛云简介：&nbsp;&nbsp;有免费套餐，适合对性能和速度要求不高的客户，可选方案较少
          </div>
          <a href="https://www.qiniu.com/prices?source=kodo" target="_blank"><Button class="orange">查看价格</Button></a>
          <div>
            <a href="https://www.qiniu.com/products/kodo" class="a_underline" target="_blank">详细介绍</a>
          </div>
        </div>
        <div class="j_panel_box" v-if="detail.name === 'jhyun'">
          上传涉及侵权、敏感、非法内容的文档将会被移除；<br/>
          每次最多上传10份文档，每份文档不超过10M；<br/>
          我们支持以下格式的文档上传：<br/>
          MS Office文档：doc，docx，ppt，pptx，xls，xlsx，rtf，<br/>
          WPS office系列：wps，et，dps，<br/>
          PDF：pdf<br/>
          纯文本：txt<br/>
          <br/>
          机汇云提供1GB的免费空间，用于存放网站附件，如上传数量、文档大小、格式无法满足，请选择阿里云或者七牛云。<br/>
          <br/>
          <div class="jhyun_progress">
            空间占用量：
            <Progress :percent="percent" :stroke-width="6" hide-info ></Progress>
            <span class="disk">{{diskCapacity}}M</span>
            <span class="gb">1GB</span>
          </div><br/>
          <span class="a_underline" @click="openAt">附件管理</span>
        </div>
        <div v-if="detail.name === 'aliyun' || detail.name === 'qiniuyun'" style="margin-top:10px">
          <FormItem label="AppId：">
            <Input v-model="detail.appid" class="w244"></Input>
          </FormItem>
          <FormItem label="密钥：">
            <Input v-model="detail.appsecret" class="w244"></Input>
          </FormItem>
          <FormItem label="空间：">
            <Input v-model="detail.bucketname" class="w244"></Input>
          </FormItem>
          <FormItem label="地域节点：" v-if="detail.name === 'aliyun'">
            <Input v-model="detail.endpoint" class="w244"></Input>
          </FormItem>
        </div>
        <Button type="primary" @click="submit" style="margin-top:17px" v-if="detail.name !== ''">保存设置</Button>
      </Form>
    </Content>
    <Attachment ref="attachment" @on-disk="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
import Attachment from '@/components/attachment/at-file'
export default {
  components: {
    JHeader,
    Attachment
  },
  data () {
    return {
      tip: '采用专业存储方案的好处：<br/>- 数据自动多重备份，不会因为硬件问题造成数据丢失；<br/>- 存储空间不受限制，根据业务需求自行扩展；',
      detail: {
        name: 'jhyun'
      },
      list: [],
      diskCapacity: 0,
      percent: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/pc/api/third_app/attachment/list').then(res => {
        if (res.success) {
          let data = res.attributes.data
          this.list = data
          data.forEach(item => {
            if (item.state === '01') {
              this.detail = JSON.parse(JSON.stringify(item))
            }
          })
          this.diskCapacity = res.attributes.diskCapacity
          this.percent = this.diskCapacity / 1024 * 100
        }
      })
    },
    change (e) {
      let data = JSON.parse(JSON.stringify(this.list))
      data.forEach(item => {
        if (item.name === e) {
          this.detail = item
        }
      })
    },
    openAt () {
      this.$refs.attachment.open()
    },
    submit () {
      var ctx = this
      let data = {
        appid: this.detail.appid,
        appsecret: this.detail.appsecret,
        bucketname: this.detail.bucketname,
        endpoint: this.detail.endpoint
      }
      this.$http.post('/rest/pc/api/third_app/attachment/save/' + this.detail.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.list.forEach(item => {
            if (item.name === ctx.detail.name) {
              item.appid = ctx.detail.appid
              item.appsecret = ctx.detail.appsecret
              item.bucketname = ctx.detail.bucketname
              item.endpoint = ctx.detail.endpoint
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_storage_service .jhyun_progress{
  position: relative;
  .ivu-progress{
    width: 209px;
    .ivu-progress-bg{
      background: #e7ae5f
    }
  }
  .disk{
    position: absolute;
    margin-left: -109px;
    bottom: 12px;
  }
  .gb{
    color: #b3b3b3;
    padding-left: 5px;
  }
}
</style>
