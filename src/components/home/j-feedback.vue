<template>
  <Modal
    class-name="j_consult_model"
    v-model="modal"
    width="460"
    title="服务反馈"
    okText="确定"
    cancelText="取消">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="100">
      <FormItem label="主题：" prop="fdbk_subject64">
        <Input v-model="detail.fdbk_subject64" placeholder="请输入主题"></Input>
      </FormItem>
      <FormItem label="反馈类型：">
        <Select v-model="detail.fdbk_type">
          <Option :value="item.value" v-for="item in list" :key="item.value">{{item.text}}</Option>
        </Select>
      </FormItem>
      <FormItem label="反馈内容：">
        <Input v-model="detail.fdbk_intro1k" type="textarea" :rows="3" placeholder="请描述您的反馈内容，并附带上您的手机号码，我们好及时对接您提的反馈内容。"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      modal: false,
      detail: {
        card_no: this.$store.state.user.username,
        fdbk_type: '5'
      },
      rules: {
        fdbk_subject64: [
          { required: true, message: '主题不能为空', trigger: 'blur' }
        ]
      },
      list: [
        { text: '表扬', value: '4' },
        { text: '建议', value: '5' },
        { text: '【页面修改】', value: '1506' },
        { text: '【资料修改】', value: '1507' },
        { text: '【页面与资料修改】', value: '1508' }
      ]
    }
  },
  methods: {
    open () {
      this.modal = true
      this.$refs['modalForm'].resetFields()
    },
    cancel () {
      this.modal = false
      this.$refs['modalForm'].resetFields()
    },
    ok () {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          var ctx = this
          this.detail.card_no = this.$store.state.user.username
          this.$http.post('http://crmyun.jihui88.com:9500/api/jihuifeedback.php', qs.stringify(this.detail)).then((res) => {
            ctx.$Message.success('发送成功')
          })
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
