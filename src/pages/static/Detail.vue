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
        <Cascader :data="areaList" v-model="detail.address" style="width: 250px;"></Cascader>
      </FormItem>
      <FormItem label="邮寄的详细地址：" prop="detail">
        <Input v-model="detail.detail" placeholder="请输入详细地址"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      modal: false,
      detail: {},
      sf: {
        card_no: this.$store.state.user.username,
        fdbk_subject64: '幕布照邮寄',
        fdbk_intro1k: '',
        fdbk_type: '2'
      },
      areaList: [],
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
  methods: {
    open (id) {
      this.modal = true
      this.getArea()
      this.detail = {}
    },
    getArea () {
      this.$http.get('/rest/api/area/list').then((res) => {
        if (res.success) {
          this.list = []
          this.initArea(res.attributes.data)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    initArea (area) {
      area.forEach(item => {
        if (item.level === 0) {
          this.areaList.push({
            areaId: item.areaId,
            value: item.name,
            label: item.name,
            children: []
          })
        }
      })
      area.forEach(item => {
        if (item.level === 1) {
          this.areaList.forEach(row => {
            if (row.areaId === item.belongId) {
              row.children.push({
                areaId: item.areaId,
                value: item.name,
                label: item.name,
                children: []
              })
            }
          })
        }
      })
      area.forEach(item => {
        if (item.level === 2) {
          this.areaList.forEach(row => {
            row.children.forEach(item2 => {
              if (item2.areaId === item.belongId) {
                item2.children.push({
                  areaId: item.areaId,
                  value: item.name,
                  label: item.name
                })
              }
            })
          })
        }
      })
    },
    cancel () {
      this.modal = false
    },
    submit (name) {
      debugger
      this.$refs[name].validate((valid) => {
        if (valid) {
          debugger
          this.sf.fdbk_intro1k = '姓名:' + this.detail.name + '\n手机:' + this.detail.phone +
          '\n邮寄地址:' + this.detail.address.join(' ') + '\n手机:' + this.detail.detail
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
