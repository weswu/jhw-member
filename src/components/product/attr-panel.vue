<template>
  <div class="j_product_attr_panel">
    <table class="j_table">
      <thead>
        <tr>
          <td v-for="(item, index) in attrtList" :key="index" v-if="item.value && item.value.length>0">
            {{item.name}}
          </td>
          <td>价格</td><td>剩余库存</td><td>对应图片(选填)</td><td>对应条形码(选填)</td><td>会员价格</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.id">
          <!-- 难受 -->
          <td v-for="attr in attrtList" v-if="attr.value && attr.value.length>0" :key="attr.attId">{{attr.name}}</td>
          <td><Input v-model="item.costPrice"></Input></td>
          <td><InputNumber v-model="item.stockNum"></InputNumber></td>
          <td>
            <img src="http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2016//10//12/28b30359-2faf-4020-8cc3-7b775b6a6b4b.png!120?v=3861432547" width="33" heigt="33" v-if="!item.pic">
            <img :src="item.pic" width="33" heigt="33" v-if="!item.pic">
            <Button type="ghost" size="small" @click="uploadImg(index)">选择图片</Button>
            <Button type="ghost" size="small" @click="del(index)">消除</Button>
          </td>
          <td><Input v-model="item.barCode"></Input></td>
          <td><Checkbox v-model="item.memberPriceStateBol" @on-change="change(item)">启用</Checkbox> <span class="a_normal" @click="setting" v-if="item.memberPriceState === '01'">设置</span> </td>
        </tr>
      </tbody>
    </table>
    <JAblum ref="ablum" @on-change="picChange"/>
    <attrPrice ref="attrPrice" @on-change="picChange"/>
  </div>
</template>

<script>
import JAblum from '@/components/group/j-ablum'
import attrPrice from '@/components/product/attr-panel-price'
export default {
  props: {
    data: Array,
    attrtList: Array
  },
  components: {
    JAblum,
    attrPrice
  },
  data () {
    return {
      list: [],
      index: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.data.forEach(item => {
        if (item.memberPriceState === '00') {
          item.memberPriceStateBol = false
        } else {
          item.memberPriceStateBol = true
        }
        this.list.push(item)
      })
    },
    picChange (e) {
      this.list[this.index].pic = e.src
    },
    uploadImg (index) {
      this.index = index
      this.$refs.ablum.open()
    },
    del (index) {
      this.list[this.index].pic = null
    },
    change (item) {
      item.memberPriceState = item.memberPriceStateBol ? '01' : '00'
    },
    setting (item) {
      this.$refs.attrPrice.open(item.memberPrice, item.id)
    }
  }
}
</script>

<style lang="less">
.j_product_attr_panel{
  img{
    vertical-align: middle;
  }
}
</style>
