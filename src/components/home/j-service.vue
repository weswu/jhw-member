<template>
  <div class="j_home_service j_panel">
    <Tabs :value="tabActive" @on-click="tabChange">
      <TabPane label="正在服务" name="00">
        <ul class="j_scroll" style="height: 238px;" v-if="list2.length>0">
          <li v-for="(item, index) in list2" :key="index">
            <div class="title" v-html="item.fdbk_subject64" @click="getDetail(item)"></div>
            <p>
              负责人:{{item.emp_name}} {{item.fdbk_due_date | time('yyyy-MM-dd')}}
            </p>
          </li>
        </ul>
        <div class="j_empty j_warpper" v-if="list.length===0">暂无数据</div>
      </TabPane>
      <TabPane label="服务结束" name="01">
        <ul class="j_scroll" v-if="list.length>0">
          <li v-for="(item, index) in list" :key="index">
            <div class="title" v-html="item.fdbk_subject64" @click="getDetail(item)"></div>
            <p>
              负责人:{{item.emp_name}} {{item.fdbk_due_date | time('yyyy-MM-dd')}}
            </p>
          </li>
        </ul>
        <div class="j_empty j_warpper" v-if="list.length===0">暂无数据</div>
        <span class="j_more" @click="open">我要服务反馈</span>
      </TabPane>
    </Tabs>
    <Feedback ref="feedback"/>
    <Modal
     class-name="fdbk_detail"
      v-model="modal"
      :title="detail.fdbk_subject64 || '反馈查看'"
      @on-cancel="modal = false">
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
      </div>
      <div class="">
        <div class="title">描述</div>
        <div class="content" v-html="detail.desc"></div>
        <div class="title">处理结果</div>
        <div class="content">{{detail.fdbk_result || '暂无数据'}}</div>
        <div class="title">处理过程</div>
        <div class="content">
          <ul>
            <li v-for="(item, index) in detail.content" :key="index">
              <div class="emp_name" v-html="item.emp_name"></div>
              <p>
                {{item.deal_time | time}}<br/>
                <span>{{item.deal_result}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Feedback from '@/components/home/j-feedback'
export default {
  components: {
    Feedback
  },
  data () {
    return {
      modal: false,
      tabActive: '01',
      list: [],
      list2: [],
      detail: {},
      detailTest: {
        fdbk_id: 323613,
        fdbk_result: '',
        emp_name: '赵汉杰(李飞跃)',
        fdbk_subject64: '网安备案',
        fdbk_intro1k: [
          '资料在客户备案资料统一存放文件夹威猛达'
        ],
        fdbk_due_date: 1495123200000,
        content: [
          {
            fdbk_r_id: 931530,
            emp_name: '王婷立/前台',
            deal_time: 1496366253000,
            deal_result: '通过，浙公网安备 33078402100360号'
          },
          {
            fdbk_r_id: 926368,
            emp_name: '王婷立/前台',
            deal_time: 1495164793000,
            deal_result: '已提交'
          }
        ]
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/crm/list?sort=' + this.tabActive).then(res => {
        if (res.success) {
          if (this.tabActive === '01') {
            this.list = res.attributes.data
          } else {
            this.list2 = res.attributes.data
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    getDetail (item) {
      let desc = ''
      item.fdbk_intro1k.forEach(item => {
        desc += item + '<br/>'
      })
      this.detail = item
      this.detail.desc = desc
      this.$http.get('/rest/api/crm/detail/' + item.fdbk_id).then(res => {
        if (res.success) {
          this.detail.content = res.attributes.data
          this.modal = true
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    tabChange (name) {
      this.tabActive = name
      if (name === '00' && this.list2.length === 0) {
        this.get()
      }
    },
    open () {
      this.$refs.feedback.open()
    }
  }
}
</script>

<style lang="less">
.j_home_service ul{
  padding: 0 1px;
  height: 193px;
  li{
    border-bottom: 1px solid #eaedf1;
    padding: 9px 15px;
    line-height: 1.6;
    .title{
      color: #0366ce;
      font-size: 14px;
      cursor: pointer;
    }
    p{
      color: #999;
      span {
        padding-left: 10px;
      }
    }
  }
}
.fdbk_detail{
  .ivu-modal-body{
    padding: 0;
    margin-top: 10px;
  }
  .title {
    background: #f5f5f5;
    padding: 8px 15px;
    font-weight: 600;
    font-size: 12px;
  }
  .content{
    color: #666;padding: 6px 15px;
    li{
      border-bottom: 1px solid #eaedf1;
       padding: 9px 15px;
       line-height: 1.6;
    }
    .emp_name{
      font-size: 14px;
    }
    p{
      color: #999;
      span{
        color: #000;
      }
    }
  }
}
</style>
