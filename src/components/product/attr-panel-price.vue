<template>
  <Modal
    v-model="modal"
    title="设置会员价格">
    <ul class="j_product_attr_panel_price">
      <li v-for="item in list" :key="item.id">
        <span class="title">{{item.memberRank.name}}</span>
        <Checkbox v-model="item.stateBol" @on-change="change(item)">启用</Checkbox>
        <span v-if="item.state === '01'">
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      modal: false,
      list: []
    }
  },
  computed: {
    ...mapState(['memberRankList'])
  },
  methods: {
    open (list, id) {
      this.modal = true
      this.list = list || []
      if (this.memberRankList.length === 0) {
        this.$store.dispatch('getMemberRank').then(res => {
          this.init()
        })
      } else {
        this.init()
      }
    },
    init () {
      let ctx = this
      let list = []
      this.memberRankList.forEach(item => {
        let obj = {
          memberRank: item,
          price: 0,
          state: '00',
          stateBol: false,
          type: 'fixed'
        }
        ctx.list.length > 0 && ctx.list.forEach(row => {
          if (row.memberRank.rankId === item.rankId) {
            obj = row
            if (row.state === '01') obj.stateBol = true
          }
        })
        list.push(obj)
      })
      this.list = list
    },
    cancel () {
      this.modal = false
    },
    change (item) {
      item.state = item.stateBol ? '01' : '00'
    },
    ok () {
      this.$emit('on-change', this.list)
      this.modal = false
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
  li{
    margin-bottom: 10px;
    height: 32px;
    line-height: 32px;
  }
}
</style>
