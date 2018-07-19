<template>
  <JDialog ref="dialog" :title="title" :width="520" :tip="tip" @on-ok="ok" :okText="'提交'">
    <Form ref="modalForm" :model="detail" :label-width="120" slot="content">
      <FormItem label="上级分类：">
        <CategorySelect :list="list" :isDefalut="true" @on-change="change"/>
      </FormItem>
      <FormItem label="文件名称：">
        <Input v-model="detail.name" placeholder="请输入文件名称"></Input>
      </FormItem>
    </Form>
  </JDialog>
</template>

<script>
import qs from 'qs'
import JDialog from '@/components/group/j-dialog'
import CategorySelect from '@/pages/album/CategorySelect'
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
      id: '',
      detail: {}
    }
  },
  methods: {
    open (e) {
      if (e.albumId) {
        this.detail = e
        this.title = '修改文件'
      } else {
        this.detail = {}
        this.title = '新建文件'
      }
      this.$refs.dialog.open()
    },
    change (e) {
      this.detail.belongId = e
    },
    ok () {
      let url = 'insert'
      if (this.detail.albumId) {
        url = 'save/' + this.detail.albumId
      }
      let data = {
        belongId: this.detail.belongId,
        name: this.detail.name
      }
      this.$http.post('/rest/pc/api/album/attachment/' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.$emit('on-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    add () {

    }
  }
}
</script>

<style lang="less">
</style>
