<template>
  <div class="">
    <div class="j_pagination fixed border" v-if="fixed && checkbox">
      <div class="btn">
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="j_pagination fixed" v-if="fixed" style="text-align:right" :class="{border_top: borderTop}">
      {{searchData.page}}/{{ Math.ceil(total/searchData.pageSize)}}页，共有{{total}}{{unit}}，每页显示：
      <input v-model="searchData.pageSize" type="number" class="number" @change="change"/>{{unit}}
      <Page :total="total" :page-size="searchData.pageSize" @on-change="pageChange"></Page>
      <div class="page">
        <Input size="small" v-model="page"></Input>
        <Button type="primary" size="small" @click="pageChange(page)">GO</Button>
        <Button type="primary" size="small" @click="refresh" class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></Button>
      </div>
    </div>
    <div class="j_pagination" v-if="!fixed">
      <!-- 分页2样式 -->
      <Row :gutter="24">
        <Col :span="left" v-if="checkbox" class="btn">
          <slot name="btn"></slot>
        </Col>
        <Col :span="right" style="text-align:right;">
          共有{{total}}条，每页显示：{{searchData.pageSize}}条
          <Page :total="total" :page-size="searchData.pageSize" @on-change="pageChange"></Page>
          <div class="page">
            <Input size="small" v-model="page"></Input>
            <Button size="small" @click="pageChange(page)" class="go" style="margin-left: 8px;">GO</Button>
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
    },
    borderTop: {
      type: Boolean,
      default: false
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
    },
    change () {
      this.$emit('on-pagesize', this.searchData.pageSize)
    }
  }
}
</script>

<style lang="less">
</style>
