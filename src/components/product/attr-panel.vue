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
        <tr v-for="(sku, index) in skus" :key="sku.id">
          <td v-for="item in sku.values" :key="item">{{item}}</td>
          <!-- 难受
          <td v-for="item in attrtList" v-if="item.value && item.value.length>0" :key="item.attId">{{getValueName(sku, item)}}</td>-->
          <td><Input v-model="sku.costPrice" style="width: 80px;"></Input></td>
          <td><InputNumber v-model="sku.stockNum"></InputNumber></td>
          <td>
            <img src="http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2016//10//12/28b30359-2faf-4020-8cc3-7b775b6a6b4b.png!120?v=3861432547" width="33" heigt="33" v-if="!sku.pic">
            <img :src="sku.pic" width="33" heigt="33" v-if="sku.pic">
            <Button type="ghost" size="small" @click="uploadImg(index)">选择图片</Button>
            <Button type="ghost" size="small" @click="del(index)">消除</Button>
          </td>
          <td><Input v-model="sku.barCode"></Input></td>
          <td><Checkbox v-model="sku.memberPriceStateBol" @on-change="change(sku)">启用</Checkbox> <span class="a_normal" @click="setting" v-if="sku.memberPriceState === '01'">设置</span> </td>
        </tr>
      </tbody>
    </table>
    <JAlbum ref="ablum" @on-change="picChange"/>
    <attrPrice ref="attrPrice" @on-change="picChange"/>
  </div>
</template>

<script>
import JAlbum from '@/components/group/j-album'
import attrPrice from '@/components/product/attr-panel-price'
export default {
  props: {
    data: Array,
    attrtList: Array
  },
  components: {
    JAlbum,
    attrPrice
  },
  data () {
    return {
      skus: [],
      index: 0
    }
  },
  computed: {
    allCheckedLength () {
      var length = 0
      this.attrtList.forEach(item => {
        if (item.value) {
          length += item.value.length
        }
      })
      return length
    }
  },
  watch: {
    'allCheckedLength': {
      handler: 'reBuild'
    },
    data () {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.data) {
        this.data.forEach(item => {
          if (item.memberPriceState === '00') {
            item.memberPriceStateBol = false
          } else {
            item.memberPriceStateBol = true
          }
          item.values = item.skuCode.split(',') || []
          this.skus.push(item)
        })
      }
    },
    // 笛卡尔积算法  https://codepen.io/JayceWu/pen/dOxLex
    reBuild: function (val, oldVal) {
      var ori = []
      var skus = []
      this.attrtList.forEach((item, index) => {
        var value = item.value
        if (value && value.length > 0) {
          ori.push(value)
        }
      })
      console.log(JSON.stringify(ori))
      var ret = this.descartes(ori)
      console.log(JSON.stringify(ret))
      for (var i = 0; i < ret.length; i++) {
        var sku = {skuCode: '', costPrice: '', stockNum: 1, barCode: ''}
        sku.values = []
        ret[i].forEach(item => {
          sku.values.push(item)
        })
        sku.skuCode = sku.values.join()
        this.skus.forEach(sItem => {
          if (sItem.skuCode === sku.skuCode) {
            sku = sItem
          }
        })
        skus.push(sku)
      }
      this.skus = skus
    },
    descartes (list) {
      // parent上一级索引;count指针计数
      var point = {}
      var result = []
      var pIndex = null
      var tempCount = 0
      var temp = []
      // 根据参数列生成指针对象
      for (var index2 in list) {
        if (typeof list[index2] === 'object') {
          point[index2] = {'parent': pIndex, 'count': 0}
          pIndex = index2
        }
      }
      // 单维度数据结构直接返回
      if (pIndex === null) {
        return list
      }
      // 动态生成笛卡尔积
      while (true) {
        for (var index in list) {
          tempCount = point[index]['count']
          temp.push(list[index][tempCount])
        }
        // 压入结果数组
        result.push(temp)
        temp = []
        // 检查指针最大值问题
        while (true) {
          if (point[index]['count'] + 1 >= list[index].length) {
            point[index]['count'] = 0
            pIndex = point[index]['parent']
            if (pIndex == null) {
              return result
            }
            // 赋值parent进行再次检查
            index = pIndex
          } else {
            point[index]['count']++
            break
          }
        }
      }
    },
    picChange (e) {
      this.skus[this.index].pic = e.src
    },
    uploadImg (index) {
      this.index = index
      this.$refs.ablum.open()
    },
    del (index) {
      this.skus[this.index].pic = null
    },
    change (item) {
      item.memberPriceState = item.memberPriceStateBol ? '01' : '00'
    },
    setting (item) {
      this.$refs.attrPrice.open(item.memberPrice, item.id)
    },
    getValueName (sku, property) {
      var valueName = ''
      sku.values.forEach(_this => {
        if (_this.name === property.name) {
          valueName = name
          return false
        }
      })
      return valueName
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
