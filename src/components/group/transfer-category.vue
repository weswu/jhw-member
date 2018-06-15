<template>
  <Modal
    v-model="modal"
    title="批量转移分类"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="submit">确定</Button>
    </div>
    <Form :model="detail" :label-width="90">
      <FormItem label="请选择：">
        <CategorySelect :categoryId="detail.category" :list="data" @on-change="categoryChange" :isDefalut="true"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import CategorySelect from '@/components/group/j-category-select'
export default {
  props: {
    data: {
      type: Array
    },
    ids: {},
    type: {}
  },
  components: {
    CategorySelect
  },
  data () {
    return {
      modal: false,
      detail: {
        category: ''
      }
    }
  },
  methods: {
    open () {
      this.modal = true
    },
    cancel () {
      this.modal = false
    },
    categoryChange (e) {
      this.detail.category = e
    },
    submit () {
      if (this.ids === this.detail.category) {
        return this.$Message.info('相同分类不能转移')
      }
      if (this.type === 'category/news' || this.type === 'category/product') {
        this.detail.categoryId = this.detail.category
      }
      // rest/api/category/news/batch/transfer   categoryId
      // rest/api/news/batch/transfer  category
      this.detail.ids = this.ids
      this.$http.post('/rest/api/' + this.type + '/batch/transfer', qs.stringify(this.detail)).then((res) => {
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
