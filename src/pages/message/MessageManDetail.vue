<template>
  <Modal
    v-model="modal"
    :title="title"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel()">取消</Button>
      <Button type="primary" size="large" @click="ok('modalForm')">确定</Button>
    </div>
    <Form ref="modalForm" :model="model" :rules="rules" :label-width="110">
      <FormItem label="姓名" prop="name">
        <Input v-model="model.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="Email" prop="email">
        <Input v-model="model.email" placeholder="请输入Email"></Input>
      </FormItem>
      <FormItem label="手机">
        <Input v-model="model.cellphone" placeholder="请输入手机"></Input>
      </FormItem>
      <FormItem label="职位">
        <Input v-model="model.position" placeholder="请输入职位"></Input>
      </FormItem>
      <FormItem label="是否启用">
        <RadioGroup v-model="model.state">
          <Radio label="01">启用</Radio>
          <Radio label="00">不启用</Radio>
        </RadioGroup>
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
      title: '消息接收人',
      model: {},
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email不能为空', trigger: 'blur' },
          { type: 'email', message: '格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (title, model) {
      this.modal = true
      this.title = title || '消息接收人'
      if (model) {
        this.model = model
        this.model.email = model.key
      } else {
        this.model = {}
      }
    },
    cancel () {
      this.modal = false
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let url = ''
          let data = this.model
          if (this.model.customizeId) {
            url = 'edit'
            data = {
              id: this.model.customizeId,
              email: this.model.email,
              name: this.model.name,
              position: this.model.position,
              cellphone: this.model.cellphone,
              state: this.model.state
            }
          } else {
            url = 'add'
          }
          this.$http.post('/rest/api/message/bind/' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
              this.$Modal.remove()
              this.model.key = this.model.email
              if (this.model.customizeId) {
                this.$emit('on-edit', data)
              } else {
                this.$emit('on-add', this.model)
              }
              this.modal = false
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
