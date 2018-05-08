<template>
  <Modal
    v-model="modal"
    title="发送留言"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">点此发送留言</Button>
    </div>
    <Form ref="modalForm" :model="model" :rules="rules" :label-width="110">
      <FormItem label="发送给：">
        <Select v-model="model.type" style="width: 187px;">
          <Option value="user">同级会员</Option>
          <Option value="member">子会员</Option>
          <Option value="admin">系统管理员</Option>
        </Select>
      </FormItem>
      <FormItem label="收信人：" prop="username" v-if="model.type !== 'admin'">
        <Input v-model="model.username" placeholder="请输入收信人"></Input>
      </FormItem>
      <FormItem label="反馈类型：">
        <Select v-model="model.fdbkType" style="width: 187px;">
          <Option :value="item.value" v-for="item in fdbkList" :key="item.value">{{item.text}}</Option>
        </Select>
      </FormItem>
      <FormItem label="标题：" prop="title">
        <Input v-model="model.title" placeholder="请输入标题"></Input>
      </FormItem>
      <FormItem label="内容：" prop="content">
        <Input v-model="model.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入留言内容"></Input>
      </FormItem>
      <FormItem label="验证码：" prop="randCode">
        <Input v-model="model.randCode" placeholder="请输入验证码" style="width:110px;"></Input>
        <img :src="'http://www.jihui88.com/veriImg'+time" @click="refreshCode" alt="验证码" style="vertical-align: middle;width: 56px;height: 25px;">
        <a  href="javascript:;" @click="refreshCode">换一张？</a>
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
      fdbkList: [
        {value: '0', text: '其它'},
        {value: '1', text: '购买'},
        {value: '2', text: '服务'},
        {value: '3', text: '投诉'},
        {value: '4', text: '表扬'},
        {value: '5', text: '建议'}
      ],
      time: '',
      model: {
        type: 'user',
        fdbkType: '0'
      },
      rules: {
        username: [
          { required: true, message: '收信人不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
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
    },
    refreshCode () {
      this.time = '?time=' + new Date().getTime()
    },
    submit (name) {
      if (this.model.type === 'admin') {
        this.model.username = 'jihui88'
      }
      if (!this.model.randCode) {
        return this.$Message.error('验证码不能为空')
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.model.fromName = this.$store.state.user.name
          this.model.fromEmail = this.$store.state.user.email
          this.model.fromPhone = this.$store.state.user.cellphone
          let data = {
            model: JSON.stringify(this.model)
          }
          this.$http.post('/rest/api/message/detail', qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('留言成功')
              this.model = {
                type: 'user',
                fdbkType: '0'
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
