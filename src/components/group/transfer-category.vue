<template>
  <Modal
    v-model="modal"
    title="批量转移分类"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="submit">确定</Button>
    </div>
    <Form :model="model" :label-width="90">
      <FormItem label="请选择：">
        <Select v-model="model.category" style="width:250px">
          <Option :value="item.categoryId" v-for="item in data" :key="item.categoryId">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    data: {
      type: Array
    },
    ids: {},
    type: {}
  },
  data () {
    return {
      modal: false,
      model: {}
    }
  },
  methods: {
    open () {
      this.modal = true
    },
    cancel () {
      this.modal = false
    },
    submit () {
      this.model.ids = this.ids
      this.$http.post('/rest/api/' + this.type + '/batch/transfer', qs.stringify(this.model)).then((res) => {
        if (res.success) {
          this.$Message.success('转移成功')
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
