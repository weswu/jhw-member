<template>
  <Modal
    v-model="modal"
    title="退货处理">
    <Form ref="modalForm" :model="detail" :label-width="130">
      <FormItem label="退货状态:">
        <Select v-model="detail.state" class="w144 border">
          <Option :value="item.value" v-for="item in disputeState" :key="item.value">{{item.text}}</Option>
        </Select>
      </FormItem>
      <FormItem label="退货类型:">
        <Select v-model="detail.type" class="w144 border">
          <Option :value="item.value" v-for="item in disputeType" :key="item.value">{{item.text}}</Option>
        </Select>
      </FormItem>
      <FormItem label="退货金额:">
        <InputNumber v-model="detail.amount" placeholder="请输入退货金额"></InputNumber>
      </FormItem>
      <FormItem label="退联系电话:">
        {{detail.mobile}}
      </FormItem>
      <FormItem label="退货说明:">
        <Input v-model="detail.buyerReason" type="textarea" placeholder="退货说明"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  props: {
    list: Array
  },
  data () {
    return {
      modal: false,
      detail: {}
    }
  },
  computed: {
    ...mapState({
      disputeType: state => state.status.disputeType,
      disputeState: state => state.status.disputeState
    })
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$http.get('/rest/api/orderDispute/detail/' + id).then(res => {
          if (res.success) {
            this.detail = res.attributes.data
          }
        })
      }
    },
    cancel () {
      this.modal = false
    },
    ok () {
      let data = {
        model: JSON.stringify(this.detail)
      }
      let url = ''
      if (this.detail.disputeId) {
        url = '/' + this.detail.disputeId
        data._method = 'put'
      }
      this.$http.post('/rest/api/orderDispute/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
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

<style lang="less">
</style>
