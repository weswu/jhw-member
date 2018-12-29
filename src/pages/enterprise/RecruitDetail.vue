<template>
  <Modal class-name="j_recruit_deatil"
    v-model="modal"
    title="招聘"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="标题：" prop="title">
        <Input v-model="detail.title" placeholder="请输入标题"></Input>
      </FormItem>
      <FormItem label="职务：" prop="duty">
        <Input v-model="detail.duty" placeholder="请输入职务"></Input>
      </FormItem>
      <FormItem label="招聘人数：">
        <Input v-model="detail.sum" placeholder="请输入招聘人数"></Input>
      </FormItem>
      <Tabs active-key="key1" :animated="false">
        <Tab-pane label="职责" key="key1">
          <UE :content='detail.obligation' ref='ue2' :eWidth="666" :eHeight="350"></UE>
        </Tab-pane>
        <Tab-pane label="要求" key="key2">
          <UE :content='detail.content' ref='ue' :eWidth="666" :eHeight="350"></UE>
        </Tab-pane>
      </Tabs>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import UE from '@/components/group/j-editor'
export default {
  components: {
    UE
  },
  data () {
    return {
      modal: false,
      detail: {},
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        duty: [
          { required: true, message: '职务不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$refs['modalForm'].resetFields()
        this.$http.get('/rest/api/job/detail/' + id).then((res) => {
          if (res.success) {
            this.detail = res.attributes.data
            this.$refs.ue.setUEContent(this.detail.content)
            this.$refs.ue2.setUEContent(this.detail.obligation)
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.detail = {}
        this.$refs.ue.setUEContent('<p><br/></p>')
        this.$refs.ue2.setUEContent('<p><br/></p>')
      }
    },
    cancel () {
      this.modal = false
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.detail.content = this.$refs.ue.getUEContent()
          this.detail.obligation = this.$refs.ue2.getUEContent()
          let data = {
            model: JSON.stringify(this.detail)
          }
          let url = ''
          if (this.detail.jobId) {
            url = '/' + this.detail.jobId
            data._method = 'put'
          }
          this.$http.post('/rest/api/job/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
              this.$emit('on-change')
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
.j_recruit_deatil .ivu-modal{
  width: 700px !important;
  top: 50px;
  .ivu-tabs-nav-scroll{
    margin-left: 37px;
  }
}
</style>
