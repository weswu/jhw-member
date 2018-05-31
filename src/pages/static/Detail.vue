<template>
  <Modal
    v-model="modal"
    title="幕布照邮寄"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalBeian')">保存</Button>
    </div>
    <Form ref="modalBeian" :model="detail" :rules="rules" :label-width="130">
      <FormItem label="姓名：" prop="name">
        <Input v-model="detail.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="手机：" prop="phone">
        <Input v-model="detail.phone" placeholder="请输入手机"></Input>
      </FormItem>
      <FormItem label="邮寄的地区：">
        <Cascader :data="areaList" v-model="address" style="width: 250px;"></Cascader>
      </FormItem>
      <FormItem label="邮寄的详细地址：" prop="detail">
        <Input v-model="detail.detail" placeholder="请输入详细地址"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      modal: false,
      detail: {},
      address: [],
      sf: {
        card_no: this.$store.state.user.username,
        fdbk_subject64: '幕布照邮寄',
        fdbk_intro1k: '',
        fdbk_type: '2'
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '详细地址能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      areaList: state => state.areaList
    })
  },
  methods: {
    open (id) {
      this.modal = true
      if (this.areaList.length === 0) {
        this.$store.dispatch('getAreaList')
      }
      this.detail = {}
    },
    cancel () {
      this.modal = false
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.sf.fdbk_intro1k = '姓名:' + this.detail.name + '\n手机:' + this.detail.phone +
          '\n邮寄地址:' + this.address.join(' ') + '\n手机:' + this.detail.detail
          this.sf.fdbk_subject64 = this.sf.fdbk_subject64
          this.$http.post('http://crmyun.jihui88.com:9500/api/jihuifeedback.php', qs.stringify(this.sf)).then((res) => {
            window.alert('发送成功')
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
