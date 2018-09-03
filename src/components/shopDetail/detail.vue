<template>
  <FormItem label="订单状态：">
    [<span v-html="orderStatusFilter"></span>] [<span v-html="paymentStatusFilter"></span>] [<span v-html="shippingStatusFilter"></span>] [{{detail.paymentConfigName}}]
  </FormItem>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    detail: {}
  },
  computed: {
    ...mapState({
      paymentStatus: state => state.status.paymentStatus,
      shippingStatus: state => state.status.shippingStatus,
      orderStatus: state => state.status.orderStatus
    }),
    orderStatusFilter: function () {
      let html = ''
      this.orderStatus.forEach(item => {
        if (item.value === this.detail.orderStatus) {
          html = item.html
        }
      })
      return html
    },
    shippingStatusFilter: function () {
      let html = ''
      this.shippingStatus.forEach(item => {
        if (item.value === this.detail.shippingStatus) {
          html = item.html
        }
      })
      return html
    },
    paymentStatusFilter: function () {
      let html = ''
      this.paymentStatus.forEach(item => {
        if (item.value === this.detail.paymentStatus) {
          html = item.html
        }
      })
      return html
    }
  }
}
</script>

<style lang="css">
</style>
