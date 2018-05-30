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
      :title="'生成'"
      :tip="tip"
      @on-ok="ok">
      <ul slot="content">
        <li class="keywords-li" v-for="item in klist" :key="item">
          {{item}}
          <a href="a"></a>
        </li>
      </ul>
    </JDialog>
  </div>
</template>

<script>
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
    generate () {
      this.tip = '此次共生成&nbsp;<span class="red">' + 5 + '</span>个长尾关键词!点击选用可以添加至我的关键词中'
      this.$refs.dialog.open()
    },
    ok () {}
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
}
</style>
