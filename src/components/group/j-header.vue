<template>
  <div class="safari_header" :class="{j_head: tip, j_head2: type}" v-if="$store.state.win !== 'small'">
    <div class="j_header">
      <Row type="flex" justify="space-between">
        <Col>
          <span class="title">{{title}}<span v-if="count">拥有积分：{{count}}分</span></span>
        </Col>
        <Col>
          <Select v-model="$store.state.lanId" class="primary" @on-change="lanChange" style="width:106px" v-show="lan" v-if="lanHidden">
            <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.text }}</Option>
          </Select>
          <Select v-model="$store.state.lanId" class="primary" @on-change="lanChange" style="width:106px" v-if="!lanHidden && lan">
            <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.text }}</Option>
          </Select>
          <Select v-model="$store.state.layoutId" class="primary" @on-change="layoutChange" style="width:167px" v-if="website">
            <Option v-for="item in staticList" :value="item.id" :key="item.id">网站编号：{{ item.id }}</Option>
          </Select>
          <slot name="btn"></slot>
        </Col>
      </Row>
    </div>
    <div class="j_tip" v-html="tip" v-if="tip"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    lan: {
      type: Boolean,
      default: false
    },
    lanHidden: {
      type: Boolean,
      default: false
    },
    website: {
      type: Boolean,
      default: false
    },
    count: {},
    tip: {},
    type: {}
  },
  computed: {
    ...mapState({
      lanList: state => state.status.lanList,
      staticList: state => state.staticList,
      user: state => state.user
    })
  },
  methods: {
    lanChange (e) {
      var ctx = this
      this.$store.dispatch('lanIdChange', e).then((res) => {
        ctx.$emit('on-change', e)
        ctx.$store.dispatch('getUser').then((res) => {
          ctx.$emit('on-user', e)
        })
        ctx.$store.dispatch('getEnterprise').then((res) => {
          ctx.$emit('on-enterprise', e)
        })
      })
    },
    layoutChange (e) {
      window.localStorage.setItem('layoutId', e)
      this.$emit('on-layout', e)
    }
  }
}
</script>

<style lang="less">
// 内页标题
.j_head{
  .j_header{
    border-bottom: none;
    margin-bottom: 0;
  }
  .j_tip{
    margin-top: 0;
    margin-bottom: 0;
  }
  &.j_head2{
    .j_header{
      border-bottom: 1px solid #c9c9c9;
      margin-bottom: 21px;
    }
  }
}
.safari_header{
  padding-bottom: 24px;
}
.j_header{
  border-bottom: 1px solid #c9c9c9;
  padding: 26px 0 12px 0;
  .title{
    padding: 0 15px;
    color: #595959;
    font-size: 14px;
    display: inline-block;
    height: 32px;
    line-height: 30px;
    position: relative;
    &::after{
      content: '';
      position:absolute;
      left: 0;
      top: 6px;
      height: 17px;
      width: 2px;
      background: #12bedb;
    }
    span{
      font-size: 12px;
      padding-left: 10px;
      color: #666;
    }
  }
  .ivu-btn{
    margin-left: 7px;
  }
}
</style>
