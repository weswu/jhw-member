<template>
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
    count: {}
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
</style>
