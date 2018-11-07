<template>
  <Modal
    v-model="modal"
    title="标签">
    <Form ref="modalForm" :model="detail" :label-width="130">
      <FormItem label="分类">
        <Select v-model="detail.categoryId" class="w144 border">
          <Option :value="item.categoryId" v-for="item in list" :key="item.categoryId">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="标签名称">
        <Input v-model="detail.name" placeholder="请输入标签名称"></Input>
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
    list: Array
  },
  data () {
    return {
      modal: false,
      detail: {}
    }
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$http.get('/rest/api/tag/detail/' + id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
          }
        })
      }
    },
    cancel () {
      this.modal = false
    },
    ok () {
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.tagId) {
        url = '/' + this.detail.tagId
        data._method = 'put'
      }
      this.$http.post('/rest/api/tag/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('操作成功')
          this.$emit('on-change')
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
</style>
