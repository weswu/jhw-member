<template>
  <JDialog ref="dialog" :title="'新建相册'" :width="520" :tip="tip" @on-ok="ok" :okText="'提交'">
    <Form ref="modalForm" :model="detail" :label-width="120" slot="content">
      <FormItem label="上级分类：">
        <Select v-model="detail.parentId">
          <Option :value="item.albumId" v-for="item in $store.state.albumCategory" :key="item.albumId" :class="{item: !!item.parentId}">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="相册名称：">
        <Input v-model="detail.name" placeholder="请输入相册名称"></Input>
      </FormItem>
      <FormItem label="网站上是否可见：">
        <RadioGroup v-model="detail.blongType">
          <Radio label="AP">用户可见</Radio>
          <Radio label="BP">用户不可见</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </JDialog>
</template>

<script>
import qs from 'qs'
import JDialog from '@/components/group/j-dialog'
export default {
  props: {
    init: Boolean
  },
  components: {
    JDialog
  },
  data () {
    return {
      title: '',
      tip: '<span class="red">温馨提醒</span>：未选择分类表示添加的是顶级分类',
      detail: {
        blongType: 'AP',
        state: '01'
      }
    }
  },
  methods: {
    open (id) {
      if (id) this.detail.id = id
      this.$refs.dialog.open()
    },
    ok () {
      let data = {
        model: JSON.stringify(this.detail)
      }
      this.$http.post('/rest/api/album/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.$emit('on-change')
          if (this.init) {
            this.$store.dispatch('getAlbumCategory')
          }
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
