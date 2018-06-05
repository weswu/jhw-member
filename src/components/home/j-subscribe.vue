<template>
  <div class="j_subscribe">
    <a href="#" class="subscribe" @click="modal1 = true">+订阅</a>
    <Modal
      class-name="j_subscribe_model"
      v-model="modal"
      width="735"
      title="订阅"
      okText="确定"
      cancelText="取消"
      @on-ok="ok"
      @on-cancel="cancel">
      <CheckboxGroup v-model="mySelected" class="j_home">
        <Tabs :value="'0'" v-for="item in list" :key="item.value">
          <Checkbox :label="item.value">
            <span class="name">{{item.value}}</span>
          </Checkbox>
          <TabPane :label="item.name0" name="0">
            <div style="padding: 0 28px 28px 28px;">
              <div class="j_null">
                暂无数据
              </div>
            </div>
          </TabPane>
          <TabPane :label="item.name1" name="1">
            <div style="padding: 0 28px 28px 28px;">
              <div class="j_null">
                暂无数据
              </div>
            </div>
          </TabPane>
          <TabPane :label="item.name2" name="2" v-if="item.name2">
            <div style="padding: 0 28px 28px 28px;">
              <div class="j_null">
                暂无数据
              </div>
            </div>
          </TabPane>
        </Tabs>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: true,
      mySelected: ['0'],
      list: [
        {
          name0: '我的网站',
          name1: '我的小程序',
          value: '0'
        },
        {
          name0: '消费记录',
          name1: '已购产品',
          name2: '我的积分',
          value: '1'
        },
        {
          name0: '公告',
          name1: '网站询盘',
          value: '2'

        },
        {
          name0: '正在服务',
          name1: '服务结束',
          value: '3'
        }
      ]
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
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
    .ivu-tabs{
      width:327px;
      .j_null{
        text-align: center;
      }
      .ivu-checkbox-wrapper{
        position: absolute;
        top: -47px;
        right: 0;
        .ivu-checkbox-inner{
          border: 1px solid #12bedb;
          border-radius: 0;
          width: 23px;
          height: 23px;
          &.ivu-checkbox-checked{
            border-radius: 4px;
          }
          &::after{width: 8px;
            width: 9px;
            height: 14px;
            top: 1px;
            left: 6px;
            border: 2px solid #12bedb;
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
