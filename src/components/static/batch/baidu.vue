<template>
  <div class="">
    <Form action="http://zhanzhang.baidu.com/linksubmit/urlsubmit" method="post" target="submit_iframe"
      ref="modalForm" :model="detail" :rules="rules" :label-width="60">
      <FormItem label="网址：" prop="url">
        <Input v-model="detail.url" name="url" placeholder="例：www.baidu.com"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" html-type="submit" @click="submit">提交</Button>
      </FormItem>
    </Form>
    <iframe name="submit_iframe" width="0" height="0" @click="submit()" scrolling="no" style="display: none;"></iframe>
    <a href="http://www.sousuoyinqingtijiao.com/baidu/tijiao/" target="_blank" class="a_underline">百度提交入口</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      detail: {},
      rules: {
        url: [
          { required: true, message: '网址不能为空', trigger: 'blur' }
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
