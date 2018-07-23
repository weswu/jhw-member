<template>
  <Modal
    v-model="modal"
    class-name="transfer-album"
    width="430"
    :title="'移动相册'"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="submit">确定</Button>
    </div>
    <Form :model="detail" :label-width="90">
      <FormItem label="请选择：">
        <CategorySelect @on-change="change"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import CategorySelect from '@/pages/album/CategorySelect'
export default {
  props: {
    item: {}
  },
  components: {
    CategorySelect
  },
  data () {
    return {
      modal: false,
      detail: {}
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
      this.move()
    },
    change (e) {
      this.detail.parentId = e
    },
    move () {
      let data = {
        model: JSON.stringify({
          parentId: this.detail.parentId
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/album/detail/' + this.item.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('转移成功')
          this.$emit('on-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style >
  .transfer-album{
    z-index: 1001
  }
</style>
