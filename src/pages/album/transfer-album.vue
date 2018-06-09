<template>
  <Modal
    v-model="modal"
    width="430"
    :title="title"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="submit">确定</Button>
    </div>
    <Form :model="detail" :label-width="90">
      <FormItem label="请选择：">
        <Select v-model="detail.parentId">
          <Option :value="item.albumId" v-for="item in $store.state.albumCategory" :key="item.albumId" :class="{item: !!item.parentId}">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    item: {}
  },
  data () {
    return {
      modal: false,
      detail: {},
      title: '相册',
      type: ''
    }
  },
  methods: {
    open (type, title) {
      this.modal = true
      this.type = type || 'move'
      this.title = title || '移动相册'
    },
    cancel () {
      this.modal = false
    },
    submit () {
      if (this.type === 'copy') {
        this.copy()
      } else {
        this.move()
      }
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
    },
    copy () {
      let data = {
        albumId: this.detail.parentId
      }
      this.$http.post('/rest/api/album/albumCopy', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('复制成功')
          this.$emit('on-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>
