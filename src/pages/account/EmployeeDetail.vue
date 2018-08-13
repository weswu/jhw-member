<template>
  <Modal
    v-model="modal"
    :title="title"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok('modalForm')">确定</Button>
    </div>
    <div class="j_tip" v-if="model.memberId">
      提示：登录页面打勾'使用员工账号登录'，即可绑定微信和QQ登录
    </div>
    <Form ref="modalForm" :model="model" :rules="rules" :label-width="110">
      <FormItem label="员工账号" prop="username">
        <Input v-model="model.username" placeholder="请输入员工账号"></Input>
      </FormItem>
      <FormItem label="姓名" prop="name">
        <Input v-model="model.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="权限" v-if="model.memberId">
        <a href="javascript:;" @click="auth">设置</a>
      </FormItem>
      <FormItem label="重置密码" v-if="model.memberId">
        <a href="javascript:;" @click="resetPassword = true" v-if="!resetPassword">重置</a>
        <a href="javascript:;" @click="resetPassword = false" v-if="resetPassword">取消</a>
      </FormItem>
      <FormItem label="密码" prop="password" v-if="!model.memberId || resetPassword">
        <Input v-model="model.password" placeholder="请输入密码" type="password"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="rePassword" v-if="!model.memberId || resetPassword">
        <Input v-model="model.rePassword" placeholder="请再次输入密码" type="password"></Input>
      </FormItem>
      <FormItem label="性别：">
        <Select v-model="model.sex" style="width: 187px;">
          <Option value="00">男</Option>
          <Option value="01">女</Option>
        </Select>
      </FormItem>
      <FormItem label="职位">
        <Input v-model="model.position" placeholder="请输入职位"></Input>
      </FormItem>
      <FormItem label="电话">
        <Input v-model="model.phone" placeholder="请输入电话"></Input>
      </FormItem>
      <FormItem label="手机">
        <Input v-model="model.mobile" placeholder="请输入手机"></Input>
      </FormItem>
      <FormItem label="Email" prop="email">
        <Input v-model="model.email" placeholder="请输入Email"></Input>
      </FormItem>
    </Form>
    <Authority ref="auth"/>
  </Modal>
</template>

<script>
import qs from 'qs'
import Authority from '@/pages/account/Authority'
export default {
  components: {
    Authority
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        if (this.model.rePassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.modalForm.validateField('rePassword')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (value !== this.model.password) {
        callback(new Error('密码不相同'))
      } else {
        callback()
      }
    }
    return {
      modal: false,
      title: '新增员工',
      model: {},
      rules: {
        username: [
          { required: true, message: '员工账号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '格式不正确', trigger: 'blur' }
        ]
      },
      resetPassword: false
    }
  },
  methods: {
    open (title, id) {
      this.modal = true
      this.title = title
      if (id) {
        this.$http.get('/rest/api/submember/detail/' + id).then((res) => {
          if (res.success) {
            this.model = res.attributes.data
            this.model.password = ''
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.model = {}
      }
    },
    auth () {
      this.$refs.auth.open(this.model.memberId)
    },
    cancel () {
      this.modal = false
      // 清空form规则检查
      // this.$refs['modalForm'].resetFields()
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            model: JSON.stringify(this.model)
          }
          let url = ''
          if (this.model.memberId) {
            data._method = 'put'
            url = '/' + this.model.memberId
          }
          this.$http.post('/rest/api/submember/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
              this.$Modal.remove()
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
