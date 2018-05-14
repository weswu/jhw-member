<template>
  <div :class="{j_head: tip}">
    <div class="j_header">
      <span class="title" v-if="!lan">{{title}}<span v-if="count">拥有积分：{{count}}分</span></span>
      <Row :gutter="24" v-if="lan">
        <Col span="10">
          <span class="title">{{title}}</span>
        </Col>
        <Col span="14" style="text-align:right">
          <Select v-model="lanId" class="primary" @on-change="change" style="width:100px">
            <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
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
    count: {},
    tip: {}
  },
  computed: {
    ...mapState({
      'lanId': state => state.lanId,
      'lanList': state => state.status.lanList
    })
  },
  methods: {
    change (e) {
      var ctx = this
      this.$store.dispatch('lanIdChange', e).then((res) => {
        ctx.$emit('on-change')
      })
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
    margin: 0 0 20px 0;
  }
}
.j_header{
  border-bottom: 1px solid #c9c9c9;
  padding: 26px 0 12px 0;
  margin-bottom: 24px;
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
