<template>
  <Modal
    v-model="modal"
    title="属性添加">
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="130">
      <FormItem label="属性名称" prop="name">
        <Input v-model="detail.name" placeholder="请输入属性名称"></Input>
      </FormItem>
      <FormItem
        v-for="(item, index) in detail.items"
        :key="index"
        label="选项"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: '内容不能为空', trigger: 'blur'}">
        <Input v-model="item.value" style="width:140px;"></Input>
        <Button type="ghost" @click="handleRemove(index)" style="margin-left: 10px;">删除</Button>
      </FormItem>
      <FormItem>
        <Button type="dashed" long @click="handleAdd" icon="plus-round" style="width:100px;">添加</Button>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    categoryId: {}
  },
  data () {
    return {
      modal: false,
      detail: {
        attributeType: 'checkbox',
        isRequired: '00',
        isEnabled: '01',
        state: '01',
        items: [
          {
            value: ''
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '属性名称不能为空', trigger: 'blur' }
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
      this.$refs['modalForm'].resetFields()
    },
    handleAdd () {
      this.detail.items.push({
        value: ''
      })
    },
    handleRemove (index) {
      if (this.detail.items.length > 1) {
        this.detail.items.splice(index, 1)
      }
    },
    ok () {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          this.detail.categoryId = this.categoryId
          let items = []
          this.detail.items.forEach(item => {
            items.push(item.value)
          })
          this.detail.attributeOptionList = JSON.stringify(items)
          let data = {
            model: JSON.stringify(this.detail)
          }
          this.$http.post('/rest/api/attr/detail', qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('添加成功')
              this.$emit('on-change', res.attributes.data)
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
