<template>
  <Modal
    v-model="modal"
    title="设置水印">
    <Form ref="modalForm" :model="detail" :label-width="120" slot="content">
      <FormItem label="水印属性：">
        <RadioGroup v-model="detail.type">
          <Radio label="text">文字</Radio>
          <Radio label="img">图片</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="名称：">
        <Input v-model="detail.txt" placeholder="请输入名称"></Input>
      </FormItem>
      <FormItem label="颜色：">
        <ColorPicker v-model="color2" />
      </FormItem>
      <FormItem label="大小：">
        <Input v-model="detail.txt" placeholder="请输入名称"></Input>
      </FormItem>
      <FormItem label="位置：">
        <Input v-model="detail.txt" placeholder="请输入名称"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      detail: {}
    }
  },
  methods: {
    open () {
      this.modal = true
      this.$http.get('/rest/api/watermarkAlbum/detail').then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    cancel () {
      this.modal = false
    },
    ok () {
      this.$emit('on-change', this.list, this.id)
    }
  }
}
</script>

<style lang="less">
.j_product_attr_panel_price{
  .title{
    display: inline-block;
    width: 100px;
  }
}
</style>
