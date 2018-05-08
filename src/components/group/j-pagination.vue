<template>
  <div class="">
    <div class="j_pagination fixed border" v-if="fixed && checkbox">
      <slot name="btn"></slot>
    </div>
    <div class="j_pagination fixed" v-if="fixed" style="text-align:right">
      {{searchData.page}}/{{ Math.ceil(total/searchData.pageSize)}}页，共有{{total}}{{unit}}，每页显示：
      <input v-model="searchData.pageSize" type="number" class="number"/>{{unit}}
      <Page :total="total" @on-change="pageChange"></Page>
      <div class="page">
        <Input v-model="page"></Input>
        <Button type="primary" @click="pageChange(page)">GO</Button>
        <Button type="primary" @click="refresh" class="refresh"><i class="iconfont icon-shuaxin"></i>刷新</Button>
      </div>
    </div>
    <div class="j_pagination" v-if="!fixed">
      <!-- 分页2样式 -->
      <Row :gutter="24">
        <Col :span="left" v-if="checkbox">
          <slot name="btn"></slot>
        </Col>
        <Col :span="right" style="text-align:right;">
          共有{{total}}条，每页显示：{{searchData.pageSize}}条
          <Page :total="total" @on-change="pageChange"></Page>
          <div class="page">
            <Input v-model="page"></Input>
            <Button class="j_buttom" @click="pageChange(page)">GO</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    searchData: {},
    checkbox: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: '条'
    },
    left: {
      type: String,
      default: '6'
    },
    right: {
      type: String,
      default: '18'
    }
  },
  data () {
    return {
      page: ''
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('on-change', page || 1)
      this.page = ''
    },
    refresh () {
      this.$emit('get')
    }
  }
}
</script>

<style lang="less">
</style>
