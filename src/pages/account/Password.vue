<template>
  <Modal
    v-model="modal"
    title="修改密码"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="resetPassword">重置密码</Button>
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
    <Form ref="modal" :model="model" :rules="rules" :label-width="110" class="j_password">
      <FormItem label="旧密码" prop="oldpassword">
        <Input v-model="model.oldpassword" placeholder="请输入旧密码"></Input>
      </FormItem>
      <FormItem label="新密码" prop="newpassword">
        <Input v-model="model.newpassword" placeholder="请输入新密码"></Input>
      </FormItem>
      <FormItem label="再次输入新密码" prop="newpassword2">
        <Input v-model="model.newpassword2" placeholder="请再次输入新密码"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('旧密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('旧密码不能小于6位'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('新密码不能小于6位'))
      } else {
        if (this.model.newpassword2 !== '') {
          // 对第二个密码框单独验证
          this.$refs.modal.validateField('newpassword2')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('新密码不能小于6位'))
      } else if (value !== this.model.newpassword) {
        callback(new Error('新密码不相同'))
      } else {
        callback()
      }
    }
    return {
      modal: false,
      model: {
        oldpassword: '',
        newpassword: '',
        newpassword2: ''
      },
      rules: {
        'oldpassword': [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        'newpassword': [
          { validator: validatePass, trigger: 'blur' }
        ],
        'newpassword2': [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open () {
      this.modal = true
    },
    cancel () {
      this.modal = false
      // 清空form规则检查
      this.$refs['modal'].resetFields()
    },
    ok () {
      this.$refs['modal'].validate((valid) => {
        if (valid) {
          let data = {
            model: JSON.stringify(this.model)
          }
          this.$http.post('/rest/api/user/password', qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('密码修改成功')
              this.$Modal.remove()
              this.modal = false
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    },
    resetPassword () {
      this.$http.post('/rest/api/user/resetPassword').then((res) => {
        if (res.success) {
          this.$Message.success('密码已重置为123456')
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_password{
  .ivu-input-wrapper{
    width: 250px;
    margin-bottom: 10px;
  }
  .resetPassword{
    padding-left: 20px;
  }
}
</style>
