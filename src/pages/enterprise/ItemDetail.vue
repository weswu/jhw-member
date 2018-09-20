<template>
  <Form ref="modalForm" :model="detail" :rules="rules" :label-width="110">
    <FormItem label="名称：" prop="name">
      <Input v-model="detail.name" placeholder="请输入名称"></Input>
    </FormItem>
    <FormItem label="地址：">
      <Input v-model="detail.url" placeholder="请输入地址"></Input>
    </FormItem>
    <FormItem label="图片：">
      <JPictrue :src="detail.image" @on-change="change"/>
    </FormItem>
    <FormItem label="描述：" v-if="type === '03'">
      <Input v-model="detail.ldesc" :maxlength="250" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="成员描述"></Input>
    </FormItem>
    <Button type="primary" size="small" class="j_link_save" @click="submit" v-if="$route.params.id">保存</Button>
  </Form>
</template>

<script>
import qs from 'qs'
import JPictrue from '@/components/group/j-pictrue'
export default {
  props: ['type'],
  components: {
    JPictrue
  },
  data () {
    return {
      detail: {},
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get (id) {
      id = id || this.$route.params.id
      if (!id || id === 'add') {
        this.detail = {
          image: '',
          type: this.type,
          desc: ''
        }
      } else {
        this.$http.get('/rest/api/link/detail/' + id).then((res) => {
          if (res.success) {
            this.detail = res.attributes.data
            if (!this.detail.image) this.detail.image = ''
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    },
    // 功能
    change (e) {
      this.detail.image = e.src
    },
    // 提交
    submit () {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          let data = {
            model: JSON.stringify(this.detail)
          }
          let url = ''
          if (this.detail.linkId) {
            url = '/' + this.detail.linkId
            data._method = 'put'
          }
          this.$http.post('/rest/api/link/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
              this.$emit('on-change')
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_link_save{
  margin-left:110px;margin-top:20px;
}
</style>
