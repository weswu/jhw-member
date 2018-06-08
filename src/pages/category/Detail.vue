<template>
  <JDialog ref="dialog" :title="'分类'" :width="620" :tip="tip" @on-ok="ok" :okText="'提交'">
    <Form ref="modalForm" :model="detail" :label-width="80" slot="content" class="j_category_detail">
      <FormItem label="上级分类：">
        <CategorySelect :categoryId="detail.belongId" :type="$route.params.id" @on-change="categoryChange"/>
      </FormItem>
      <FormItem label="分类名称：">
        <Input v-model="detail.name" placeholder="请输入分类名称" style="width: 100%;"></Input>
      </FormItem>
    </Form>
  </JDialog>
</template>

<script>
import qs from 'qs'
import JDialog from '@/components/group/j-dialog'
import CategorySelect from '@/components/group/j-category-select'
export default {
  props: {
    list: Array
  },
  components: {
    JDialog,
    CategorySelect
  },
  data () {
    return {
      title: '',
      tip: '<span class="red">温馨提醒</span>：未选择分类表示添加的是顶级分类',
      detail: {}
    }
  },
  methods: {
    open (id) {
      this.$refs.dialog.open()
      if (id) {
        this.$http.get('/rest/api/category/detail/' + id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
          }
        })
      }
    },
    categoryChange (e) {
      this.detail.belongId = e
    },
    ok () {
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.categoryId) {
        url = '/' + this.detail.categoryId
        data._method = 'put'
      }
      this.$http.post('/rest/api/category/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.$emit('on-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.ivu-modal .j_category_detail{
  .ivu-input-wrapper{
    width: 432px
  }
}
</style>
