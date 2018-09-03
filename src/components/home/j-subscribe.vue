<template>
  <div class="j_subscribe">
    <a href="javascript:;" class="subscribe yd_subscribe" @click="modal = true">+订阅</a>
    <Modal
      class-name="j_subscribe_model"
      v-model="modal"
      width="735"
      title="订阅"
      okText="确定"
      cancelText="取消"
      @on-ok="ok"
      @on-cancel="cancel">
      <CheckboxGroup v-model="mySelected">
        <div class="j_subscribe_list" v-for="item in list" :key="item.value">
          <Checkbox :label="item.value">
            <span class="name">{{item.value}}</span>
          </Checkbox>
          <Tabs :value="item.active">
            <TabPane :label="item.name0" name="0">
              <div class="j_null">暂无数据</div>
              <span class="j_more" style="background:#fff;cursor: initial;"></span>
            </TabPane>
            <TabPane :label="item.name1" name="1">
              <div class="j_null">暂无数据</div>
              <span v-if="item.value === 'message'" class="j_more">查看更多</span>
              <span v-if="item.value === 'service'" class="j_more">我要服务反馈</span>
            </TabPane>
            <TabPane :label="item.name2" name="2" v-if="item.name2">
              <div class="j_null">暂无数据</div>
              <span class="j_more" style="background:#fff;cursor: initial;"></span>
            </TabPane>
          </Tabs>
        </div>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      mySelected: [],
      list: [
        {
          name0: '我的网站',
          name1: '我的小程序',
          value: 'static',
          active: '0'
        },
        {
          name0: '待缴费',
          name1: '消费记录',
          name2: '已购产品',
          value: 'order',
          active: '0'
        },
        {
          name0: '公告',
          name1: '客户消息',
          value: 'message',
          active: '1'
        },
        {
          name0: '正在服务',
          name1: '服务结束',
          value: 'service',
          active: '1'
        }
      ]
    }
  },
  created () {
    this.mySelected = []
    this.$store.state.customData.homeSort.forEach(item => {
      if (item.type === '01' && item.status === '01') {
        this.mySelected.push(item.value)
      }
    })
  },
  methods: {
    ok () {
      var ctx = this
      this.$store.state.customData.homeSort.forEach(item => {
        if (item.type === '01') {
          item.status = '00'
          if (ctx.mySelected.join().indexOf(item.value) > -1) {
            item.status = '01'
          }
        }
      })
      this.$store.dispatch('SAVE_CUSTOM_DATA')
      this.modal = false
    },
    cancel () {
      this.modal = false
    }
  }
}
</script>

<style lang="less">
  .j_subscribe{
    padding: 26px 0 20px 0;
    .subscribe{
      display: block;
      text-align: center;
      padding: 13px 0;
      border: 1px solid #c0c0c0;
      font-size: 14px;
      color: #707070
    }
  }
  .j_subscribe_model{
    .ivu-modal-body {
      padding: 25px 16px;
    }
    .j_subscribe_list{
      width:327px;
      display: inline-block;
      margin: 12px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      position: relative;
      .ivu-tabs-bar {
        border-bottom: none;
        background: #f5f6fa;
        padding: 0 14px;
        margin-bottom: 20px;
        &:after {
          display: none;
        }
        .ivu-tabs-nav .ivu-tabs-tab:after{
          left: -8px;
        }
        .ivu-tabs-nav-scrollable {
          padding: 0;
        }
        .ivu-tabs-nav-prev,.ivu-tabs-nav-next{
          display: none
        }
      }
      .j_null{
        text-align: center;
        padding: 30px 0;
        color: #9b9b9b
      }
      .ivu-checkbox-wrapper{
        position: absolute;
        top: 6px;
        right: 5px;
        z-index: 99;
        .ivu-checkbox-inner{
          border: 1px solid #12bedb;
          border-radius: 0;
          width: 23px;
          height: 23px;
          &.ivu-checkbox-checked{
            border-radius: 4px;
          }
          &::after{
            width: 8px;
            width: 9px;
            height: 14px;
            top: 1px;
            left: 6px;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
          }
        }
        .name{
          display: none;
        }
      }
    }
  }
</style>
