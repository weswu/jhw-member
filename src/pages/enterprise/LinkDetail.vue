<template>
  <Modal
    v-model="modal"
    title="友情链接"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="链接名称：" prop="name">
        <Input v-model="detail.name" placeholder="请输入链接名称"></Input>
      </FormItem>
      <FormItem label="链接地址：" prop="url">
        <Input v-model="detail.url" placeholder="请输入链接地址"></Input>
      </FormItem>
      <FormItem label="链接图片：">
        <JPictrue :src="detail.image" @on-change="change"/>
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
        image: ''
      },
      rules: {
        name: [
          { required: true, message: '链接名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$refs['modalForm'].resetFields()
        this.$http.get('/rest/api/link/detail/' + id).then((res) => {
          if (res.success) {
            this.detail = res.attributes.data
            if (!this.detail.image) this.detail.image = ''
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.detail = {
          image: ''
        }
      }
    },
    cancel () {
      this.modal = false
    },
    change (e) {
      this.detail.image = e.src
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            model: JSON.stringify(this.detail)
          }
          let url = ''
          if (this.detail.linkId) {
            url = '/' + this.detail.linkId
            data._method = 'put'
          }
          this.$http.post('/rest/api/link/detail' + url, qs.stringify(data)).then((res) => {
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
