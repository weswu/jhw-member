<template>
  <Modal
    v-model="modal"
    title="会员等级"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="等级名称：" prop="name">
        <Input v-model="detail.name" placeholder="请输入等级名称"></Input>
      </FormItem>
      <FormItem label="折扣：" prop="preferentialScale">
        <InputNumber  v-model="detail.preferentialScale" placeholder="请输入折扣"></InputNumber >
      </FormItem>
      <FormItem label="所需积分：" prop="point">
        <InputNumber  v-model="detail.point" placeholder="请输入积分"></InputNumber >
      </FormItem>
      <FormItem label="是否默认：">
        <RadioGroup v-model="detail.isDefault">
          <Radio label="01">是</Radio>
          <Radio label="00">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="等级说明：">
        <Input v-model="detail.rdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
      detail: {},
      rules: {
        name: [
          { required: true, message: '等级名称不能为空', trigger: 'blur' }
        ],
        preferentialScale: [
          { required: true, type: 'number', message: '折扣不能为空', trigger: 'blur' }
        ],
        point: [
          { required: true, type: 'number', message: '积分不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$refs['modalForm'].resetFields()
        this.$http.get('/rest/api/member/rank/detail/' + id).then((res) => {
          if (res.success) {
            this.detail = res.attributes.data
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.detail = {
          isDefault: '00',
          preferentialScale: 100,
          point: 0
        }
      }
    },
    cancel () {
      this.modal = false
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            model: JSON.stringify(this.detail)
          }
          let url = ''
          if (this.detail.rankId) {
            url = '/' + this.detail.rankId
            data._method = 'put'
          }
          this.$http.post('/rest/api/member/rank/detail' + url, qs.stringify(data)).then((res) => {
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
