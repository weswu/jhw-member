<template>
  <div class="long-tail-keyword">
    <div class="j_search">
      <Button class="info" @click="generate">快速生成</Button>
      <Button class="info" @click="add">增加一行</Button>
      <Button class="info" @click="del">删除一行</Button>
      <Button class="info" @click="status = !status">查看示例</Button>
    </div>
    <p style="padding-bottom: 5px">
      请列出相关关键词（每一个产品用一张表格）
    </p>
    <table class="j_table">
      <thead>
        <tr>
          <th>品牌</th>
          <th>地区</th>
          <th>产品特性</th>
          <th>用途/应用</th>
          <th>产品/服务</th>
          <th>盈利模式</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in list" :key="index">
            <td v-for="(item, j) in row.children" :key="j">
              <Input v-model="item.value"/>
            </td>
        </tr>
      </tbody>
    </table>

    <table class="j_table" style="margin-top: 20px;width: 300px;" v-if="status">
      <thead>
        <tr>
          <th>品牌</th>
          <th>地区</th>
          <th>产品特性</th>
          <th>用途/应用</th>
          <th>产品/服务</th>
          <th>盈利模式</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>步阳</td><td>杭州</td><td>钢木</td><td>防盗</td><td>门</td><td>加盟</td>
        </tr>
        <tr>
            <td>忠恒</td><td>永康</td><td>不锈钢</td><td>室内</td><td></td><td>代理</td>
        </tr>
        <tr>
            <td>王力</td><td></td><td>木</td><td>室外</td><td></td><td>合作</td>
        </tr>
        <tr>
            <td></td><td></td><td></td><td></td><td></td><td>招商</td>
        </tr>
        <tr>
            <td></td><td></td><td></td><td></td><td></td><td>厂家</td>
        </tr>
      </tbody>
    </table>
    <JDialog ref="dialog"
      :title="'生成关键词'"
      :width="550"
      :tip="tip"
      :okText="'导出到txt文档'"
      @on-ok="ok">
      <ul slot="content" style="overflow: hidden;">
        <li class="keywords-li" v-for="item in klist" :key="item" :title="item">
          <span class="ellipsis">{{item}}</span>
          <a href="javascript:;" @click="select(item)">选用</a>
        </li>
      </ul>
    </JDialog>
  </div>
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
      list: [
        {
          children: [
            { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
          ]
        },
        {
          children: [
            { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
          ]
        },
        {
          children: [
            { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
          ]
        },
        {
          children: [
            { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
          ]
        },
        {
          children: [
            { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
          ]
        }
      ],
      status: false,
      tip: '',
      klist: []
    }
  },
  methods: {
    add () {
      this.list.push({
        children: [
          { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
        ]
      })
    },
    del () {
      this.list.splice(this.list.length - 1, 1)
    },
    select (item) {
      this.$http.post('/rest/api/keywords/savaName', qs.stringify({keywords: item})).then((res) => {
        if (res.success) {
          this.$Message.success('msg')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    generate () {
      var ctx = this
      let a = []
      let b = []
      let c = []
      let d = []
      let e = []
      let f = []
      this.list.forEach(row => {
        row.children.forEach((item, i) => {
          if (item.value) {
            if (i === 0) { a.push(item.value) }
            if (i === 1) { b.push(item.value) }
            if (i === 2) { c.push(item.value) }
            if (i === 3) { d.push(item.value) }
            if (i === 4) { e.push(item.value) }
            if (i === 5) { f.push(item.value) }
          }
        })
      })
      if (a.length === 0 && b.length === 0 && c.length === 0 && d.length === 0 && e.length === 0 && f.length === 0) {
        return this.$Message.info('数据不能全空，请输入后再生成!')
      }
      if (a.length === 0) a.push('')
      if (b.length === 0) b.push('')
      if (c.length === 0) c.push('')
      if (d.length === 0) d.push('')
      if (e.length === 0) e.push('')
      if (f.length === 0) f.push('')
      var t = 0
      this.klist = []
      for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < b.length; j++) {
          for (var k = 0; k < c.length; k++) {
            for (var l = 0; l < d.length; l++) {
              for (var m = 0; m < e.length; m++) {
                for (var n = 0; n < f.length; n++) {
                  ctx.klist.push(a[i].trim() + b[j].trim() + c[k].trim() + d[l].trim() + e[m].trim() + f[n].trim())
                  t++
                }
              }
            }
          }
        }
      }
      this.tip = '此次共生成&nbsp;<span class="red">' + t + '</span>个长尾关键词!点击选用可以添加至我的关键词中'
      this.$refs.dialog.open()
    },
    ok () {
      let a = ''
      let b = ''
      let c = ''
      let d = ''
      let e = ''
      let f = ''
      this.list.forEach(row => {
        row.children.forEach((item, i) => {
          if (item.value) {
            if (i === 0) { a = a ? (a + ',' + item.value) : item.value }
            if (i === 1) { b = b ? (b + ',' + item.value) : item.value }
            if (i === 2) { c = c ? (c + ',' + item.value) : item.value }
            if (i === 3) { d = d ? (d + ',' + item.value) : item.value }
            if (i === 4) { e = e ? (e + ',' + item.value) : item.value }
            if (i === 5) { f = f ? (f + ',' + item.value) : item.value }
          }
        })
      })
      let data = {
        keywordsList: a + '-!-' + b + '-!-' + c + '-!-' + d + '-!-' + e + '-!-' + f
      }
      this.$http.get('/rest/api/keywords/generateKeywords', qs.stringify(data)).then((res) => {
        if (res.success) {
          if (res.attributes.data === 0) {
            this.$Message.success('导出失败，请检查数据!')
          } else {
            window.open(res.attributes.data)
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.keywords-li{
  background: none repeat scroll 0 0 #FFF;
  border-bottom: 1px solid #C1DAD7;
  border-right: 1px solid #C1DAD7;
  border-left: 1px solid #C1DAD7;
  border-top: 1px solid #c1dad7;
  color: #4F6B72;
  font-size: 11px;
  padding: 6px 6px 6px 5px;
  width: 25%;
  float:left;
  margin: 0 5px 5px 0;
  span{
    width: 70%;
    display: inline-block;
  }
  a{
    float:right;
  }
}
</style>
