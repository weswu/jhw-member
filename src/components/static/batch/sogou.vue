<template>
  <div class="">
    <Form action="http://fankui.help.sogou.com/index.php/web/web/addShoulu" method="post" name="delcache" target="submit_iframe"
      ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="网址：" prop="webAdr">
        <Input v-model="detail.webAdr" name="Shoulu[webAdr]" placeholder="例：http://www.sogou.com/"></Input>
      </FormItem>
      <FormItem label="原因描述：">
        <Input name="Shoulu[reason]"></Input>
      </FormItem>
      <FormItem label="邮箱：" prop="email">
        <Input v-model="detail.email" name="Shoulu[email]"></Input>
        <Input v-model="detail.site_type" name="site_type" style="display:none"></Input>
        <Input v-model="detail.source" name="source" style="display:none"></Input>
      </FormItem>
      <FormItem label="验证码：" prop="feedbackCode">
        <Input v-model="detail.feedbackCode" name="
        " style="width: 200px;"></Input>
        <img id="feedbackCodesrc" src="http://fankui.help.sogou.com/index.php/web/uc/vcode" class="feedbackCode" style="vertical-align: middle;padding: 0 10px 0 13px;">
        <i class="iconfont icon-shuaxin" onclick="javascript:document.getElementById('feedbackCodesrc').src += '?&amp;';return false;" style="font-size: 18px;vertical-align: middle;cursor: pointer;"></i>
      </FormItem>
      <FormItem>
        <Button type="primary" html-type="submit" @click="submit()">提交</Button>
      </FormItem>
    </Form>
    <iframe name="submit_iframe" width="0" height="0" scrolling="no" style="display: none;"></iframe>
    <a href="http://fankui.help.sogou.com/index.php/web/web/index?type=1" target="_blank" class="a_underline">搜搜/搜狗提交入口</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      detail: {
        site_type: 1,
        source: 1
      },
      rules: {
        webAdr: [
          { required: true, message: '网址不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        feedbackCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          this.$Message.success('提交完成')
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
