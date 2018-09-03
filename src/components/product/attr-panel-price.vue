<template>
  <Modal
    v-model="modal"
    title="设置会员价格">
    <ul class="j_product_attr_panel_price">
      <li v-for="item in list" :key="item.id">
        <span class="title">{{item.memberRank.name}}</span>
        <Checkbox v-model="item.stateBol" @on-change="change(item)">启用</Checkbox>
        <span v-if="item.state !== '01'">
          按<Select v-model="item.type" class="border" style="width: 90px;margin: 0 20px 0 5px">
            <Option value="fixed">固定价格</Option>
            <Option value="percentage">百分比</Option>
          </Select>
          <InputNumber v-model="item.price"></InputNumber>
          <span class="j_unit" v-if="item.type === 'fixed'">元</span>
          <span class="j_unit" v-if="item.type === 'percentage'">%</span>
        </span>
      </li>
    </ul>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      id: {},
      list: [
        {
          memberRank: {}
        }
      ]
    }
  },
  methods: {
    open (list, id) {
      this.modal = true
      // this.list = list
      this.id = id
      this.$store.dispatch('getMemberRank').then(e => {
        this.init()
      })
    },
    init () {},
    cancel () {
      this.modal = false
    },
    change (item) {
      item.state = item.stateBol ? '01' : '00'
    },
    ok () {
      this.$emit('on-change', this.list, this.id)
    }
  }
}
</script>

<style lang="less">
.j_product_attr_panel_price{
  .title{
    display: inline-block;
    width: 100px;
  }
}
</style>
