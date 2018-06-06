<template>
  <div class="">
    <div class="j_pagination fixed border" v-if="fixed && checkbox">
      <div class="btn">
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="j_pagination fixed" v-if="fixed" style="text-align:right" :class="{border_top: borderTop}">
      {{searchData.page}}/{{ Math.ceil(total/searchData.pageSize)}}页，共有{{total}}{{unit}}，每页显示：
      <input v-model="searchData.pageSize" type="number" class="number" @change="refresh"/>{{unit}}
      <Page :total="total" :current="searchData.page" :page-size="searchData.pageSize" @on-change="pageChange"></Page>
      <div class="page">
        <Input size="small" v-model="page"></Input>
        <Button type="primary" size="small" @click="pageChange(page)">GO</Button>
        <Button type="primary" size="small" @click="refresh" class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></Button>
      </div>
    </div>
    <!-- 分页样式(简单) -->
    <div class="j_pagination" v-if="!fixed">
      <Row type="flex" justify="space-between">
        <Col class="btn">
          <slot name="btn"></slot>
        </Col>
        <Col>
          共有{{total}}条，每页显示：{{searchData.pageSize}}条
          <Page :total="total" :current="searchData.page" :page-size="searchData.pageSize" @on-change="pageChange"></Page>
          <div class="page">
            <Input size="small" v-model="page"></Input>
            <Button type="ghost" size="small" @click="pageChange(page)" class="go">GO</Button>
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
    total: Number,
    searchData: {},
    checkbox: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: '条'
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
      this.searchData.page = parseInt(page) || 1
      this.page = ''
      this.$emit('on-change')
    },
    refresh () {
      this.$emit('on-change')
    }
  }
}
</script>

<style lang="less">
</style>
