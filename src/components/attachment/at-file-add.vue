<template>
  <JDialog ref="dialog" :title="title" :width="520" :tip="tip" @on-ok="ok" :okText="'提交'">
    <Form ref="modalForm" :model="detail" :label-width="120" slot="content">
      <FormItem label="上级分类：">
        <CategorySelect :categoryId="detail.belongId" :list="list" :isDefalut="true" @on-change="change"/>
      </FormItem>
      <FormItem label="文件名称：">
        <Input v-model="detail.title" placeholder="请输入文件名称"></Input>
      </FormItem>
    </Form>
  </JDialog>
</template>

<script>
import qs from 'qs'
import JDialog from '@/components/group/j-dialog'
import CategorySelect from '@/components/group/j-category-select'
export default {
  components: {
    JDialog,
    CategorySelect
  },
  data () {
    return {
      title: '',
      tip: '<span class="red">温馨提醒</span>：未选择分类表示添加的是顶级分类',
      id: '',
      detail: {},
      list: []
    }
  },
  methods: {
    open (data, e) {
      this.initList(data)
      if (e) {
        this.detail = e
        this.title = '修改文件'
      } else {
        this.detail = {}
        this.title = '新建文件'
      }
      this.$refs.dialog.open()
    },
    initList (data) {
      this.list = []
      let list = []
      // 1级
      data.forEach(item => {
        if (!item.belongId) {
          item.isroot = false // 根目录和三角
          item.expand = true // 三角图标展开-关闭
          item.bg = false // 层级背景颜色
          item.grade = '1'
          item.categoryId = item.albumId
          item.belongId = item.belongId
          list.push(item)
        }
      })
      // 2级
      data.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '1' && (row.belongId === item.albumId)) {
            item.isroot = true
            row.isroot = false
            row.hidden = false // 显示隐藏
            row.expand = true
            row.bg = false
            row.grade = '2'
            row.categoryId = row.albumId
            row.belongId = row.belongId
            list.splice(index + 1, 0, row)
          }
        })
      })
      // 3级
      data.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '2' && (row.belongId === item.albumId)) {
            item.isroot = true
            row.isroot = false
            row.hidden = false
            row.bg = false
            row.grade = '3'
            row.categoryId = row.albumId
            row.belongId = row.belongId
            list.splice(index + 1, 0, row)
          }
        })
      })
      this.list = list
    },
    change (e) {
      this.detail.belongId = e
    },
    ok () {
      let url = 'insert'
      if (this.detail.id) {
        url = 'save/' + this.detail.id
      }
      let data = {
        belongId: this.detail.belongId,
        name: this.detail.title
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
