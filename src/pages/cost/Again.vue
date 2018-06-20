<template>
  <JDialog ref="again" :title="'续费'" :width="350" :okText="'确定'" @on-ok="saveAgain" >
    <div slot="content">
      <Form :model="detail" :label-width="70">
        <FormItem label="年份：">
          <Select v-model="detail.year" class="border" style="width:144px;">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="10">10</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
  </JDialog>
</template>

<script>
import qs from 'qs'
import JDialog from '@/components/group/j-dialog'
export default {
  components: {
    JDialog
  },
  data () {
    return {
      detail: {
        year: '1'
      }
    }
  },
  methods: {
    open (id, type) {
      if (type === 'orderId') {
        this.detail.orderId = id
      } else {
        this.detail.layoutId = id
      }
      this.$refs.again.open()
    },
    saveAgain () {
      var ctx = this
      this.$http.post('/rest/buy/api/order/renew', qs.stringify(this.detail)).then((res) => {
        if (res.code === 0) {
          window.open('http://buy.jihui88.com/#/alipay?title=续费&orderId=' + res.data.orderId, '_blank')
        } else {
          if (res.msg === '订单不存在') {
            this.$Notice.info({
              title: '该站点未购买过产品!',
              desc: '<a href="http://buy.jihui88.com/#/?layoutId=' + ctx.detail.layoutId + '" target="_blank">前往购买</a>'
            })
          } else {
            this.$Message.error(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
