<template>
  <JDialog ref="dialog" :title="'分类'" :tip="'<span class="red">温馨提醒</span>：未选择分类表示添加的是顶级分类'" @on-ok="initCol">
    <Form ref="modalForm" :model="detail" :label-width="130">
      <FormItem label="上级分类">
        <Select v-model="detail.categoryId" class="w144 border">
          <Option :value="item.categoryId" v-for="item in list" :key="item.categoryId">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="分类名称">
        <Input v-model="detail.name" placeholder="请输入标签名称"></Input>
      </FormItem>
    </Form>
  </JDialog>
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
      title: '',
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
          this.$Message.success('添加成功')
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
