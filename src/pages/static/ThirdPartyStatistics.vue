<template>
  <Layout class="j_layout_content">
    <JHeader :title="'第三方统计'"
      :type="true" :tip="tip"
      :website="true" @on-layout="get"/>
    <Content>
      <Form :model="detail" :label-width="75">
        <FormItem label="页头设置：">
          <RadioGroup v-model="detail.analysisHeadState">
            <Radio label="01">启用</Radio>
            <Radio label="00">关闭</Radio>
          </RadioGroup><br/>
          <Input v-model="detail.analysisHeadContent" type="textarea" v-if="detail.analysisHeadState === '01'"></Input>
        </FormItem>
        <FormItem label="页尾设置：">
          <RadioGroup v-model="detail.analysisTailState">
            <Radio label="01">启用</Radio>
            <Radio label="00">关闭</Radio>
          </RadioGroup><br/>
          <Input v-model="detail.analysisTailContent" type="textarea" v-if="detail.analysisTailState === '01'"></Input>
        </FormItem>
        <FormItem class="submit" :label-width="1">
          <Button type="primary" @click="submit">保存</Button>
        </FormItem>
      </Form>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      tip: '温馨提醒：请选择好右边的网站编号再来设置下面的按钮。<a href="https://v.qq.com/x/page/j0753ycgfeh.html" class="a_underline" target="_blank">视频教程</a>',
      detail: {
        analysisHeadState: '00',
        analysisTailState: '00'
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/pc/api/analysis/detail?layoutId=' + this.$store.state.layoutId).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          if (!this.detail.analysisHeadState) this.detail.analysisHeadState = '00'
          if (!this.detail.analysisTailState) this.detail.analysisTailState = '00'
        }
      })
    },
    submit () {
      let data = {
        analysisId: this.detail.analysisId,
        analysisHeadState: this.detail.analysisHeadState,
        analysisHeadContent: this.detail.analysisHeadContent || '',
        analysisTailState: this.detail.analysisTailState,
        analysisTailContent: this.detail.analysisTailContent || ''
      }
      this.$http.post('/rest/pc/api/analysis/save', qs.stringify(data)).then((res) => {
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
</style>
