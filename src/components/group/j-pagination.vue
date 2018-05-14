<template>
  <div class="">
    <div class="j_pagination fixed border btn" v-if="fixed && checkbox">
      <div class="btn">
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="j_pagination fixed" v-if="fixed" style="text-align:right">
      {{searchData.page}}/{{ Math.ceil(total/searchData.pageSize)}}页，共有{{total}}{{unit}}，每页显示：
      <input v-model="searchData.pageSize" type="number" class="number"/>{{unit}}
      <Page :total="total" @on-change="pageChange"></Page>
      <div class="page">
        <Input size="small" v-model="page"></Input>
        <Button type="primary" size="small" @click="pageChange(page)">GO</Button>
        <Button type="primary" size="small" @click="refresh" class="refresh"><i class="iconfont icon-shuaxin"></i>刷新</Button>
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
          <Page :total="total" @on-change="pageChange"></Page>
          <div class="page">
            <Input size="small" v-model="page"></Input>
            <Button size="small" @click="pageChange(page)" class="go">GO</Button>
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
.j_pagination{
  overflow: hidden;
  line-height: 38px;
  background: #f5f6fa;
  border: 1px solid #e9e9e9;
  border-top: none;
  color: #a0a0a0;
  font-size: 12px;
  &.border{
    border-bottom: none;
  }
  &.fixed{
    border-top: 1px solid #e9e9e9;
    .page{
      padding-left: 6px;
    }
  }
  .ivu-checkbox-wrapper{
    margin: 0 20px 0 11px;
    .ivu-checkbox-inner{
      border: 1px solid #b2b2b2;
      border-radius: 4px;
    }
  }
  input{
    box-shadow: none;
    border: 1px solid #d5d5d5;
    &:hover{
      border: 1px solid #d5d5d5;
    }
  }
  // 右
  .btn .ivu-btn{
    color: #a0a0a0;
  }
  .number {
    height: 27px;
    line-height: 27px;
    border: 1px solid #d5d5d5;
    width: 45px;
    padding-left: 10px;
    padding-right: 0;
    margin-right: 2px;
  }
  .ivu-page{
    padding-left: 18px;
  }
  .page{
    display:inline-block;
    padding-right: 15px;
    padding-left: 20px;
    .ivu-input-wrapper{
      width: 35px;
      float: left;
      padding-top: 7px;
    }
  }
  .go{
    background: #f4f3f5;
    color: #a0a0a0;
    &:hover{
      color: #a0a0a0;
    }
  }
}
</style>
