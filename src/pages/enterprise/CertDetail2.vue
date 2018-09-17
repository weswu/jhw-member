<template>
  <Modal
    v-model="modal"
    title="荣誉证书"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="证书名称：" prop="name">
        <Input v-model="detail.name" placeholder="请输入证书名称"></Input>
      </FormItem>
      <FormItem label="证书图片：" prop="att.serverPath">
        <JPictrue :src.sync="detail.att.serverPath" @on-change="change"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import JPictrue from '@/components/group/j-pictrue'
export default {
  components: {
    JPictrue
  },
  data () {
    return {
      modal: false,
      detail: {
        att: {
          serverPath: ''
        },
        type: '01'
      },
      rules: {
        name: [
          { required: true, message: '证书名称不能为空', trigger: 'blur' }
        ],
        'att.serverPath': [
          { required: true, message: '证书图片不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$refs['modalForm'].resetFields()
        this.$http.get('/rest/api/cert/detail/' + id).then((res) => {
          if (res.success) {
            this.detail = res.attributes.data
            if (!this.detail.att) this.detail.att = {serverPath: ''}
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.detail = {
          att: {
            serverPath: ''
          },
          type: '01'
        }
      }
    },
    cancel () {
      this.modal = false
    },
    change (e) {
      this.detail.att.serverPath = e.src
      this.detail.attachmentId = e.id
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            model: JSON.stringify(this.detail)
          }
          let url = ''
          if (this.detail.certificateId) {
            url = '/' + this.detail.certificateId
            data._method = 'put'
          }
          this.$http.post('/rest/api/cert/detail' + url, qs.stringify(data)).then((res) => {
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
</style>
