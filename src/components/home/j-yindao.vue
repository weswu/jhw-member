<template>
  <div class="j_yindao">
    <div class="counter" v-if="counter !== -1" :style="{left: item.dom.left - 6 + 'px', top: item.dom.top - 7 + 'px'}">
      <div class="box" :style="{width: item.dom.width + 12 + 'px', height: item.dom.height + 14 + 'px', display: item.dom.display || 'block'}"></div>
      <div :class="'y_panel ' + item.class">
        <div class="y_header">
          <span class="title">新手提示</span>
          <span class="close" @click="close">关闭</span>
        </div>
        <div class="y_content">
          <p v-html="item.text"></p>
          <span class="count">{{counter + 1}} / {{list2.length}}</span>
          <span class="next" @click="next">{{counter === this.list2.length - 1 ? '完成' : counter === 0 ? '开始' : '继续'}}</span>
        </div>
      </div>
    </div>

    <div class="j_yindao_mask" v-if="counter !== -1">
      <div class="box" :style="{width: item.dom.width + 12 + 'px', height: item.dom.height + 14 + 'px', left: item.dom.left - 6 + 'px', top: item.dom.top - 7 + 'px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: -1,
      list: [
        {
          text: '',
          class: 'begin',
          index: 0
        },
        {
          text: '点击"创建新网站"，可以生成免费试用1个月的站点，您在这期间可以编辑成您想要的网站，内有很多免费的网站模板和版块。<br/>当然也可以联系我们，为您量身定制设计。',
          class: 'yd_website',
          index: 1
        },
        {
          text: '点击"消息图标"，<br/>可以查看到站内消息通知（客户留言、产品消息、服务消息、活动消息等），您还可以设置"消息接收人',
          class: 'yd_message',
          index: 2
        },
        {
          text: '点击"折叠图标"，<br/>可以折叠左侧菜单列表，系统会记录您的操作习惯，下次登录时会怎么显示上次最后的折叠状态。',
          class: 'yd_collapsed',
          index: 3
        },
        {
          text: '上下拖动"标签页"，<br/>可以按您的浏览习惯来排序（我的网站标签页、我的工具、待缴费标签页）。',
          class: 'j_home_static',
          index: 4
        },
        {
          text: '点击"加号图标"，<br/>可以自定义您需要功能导航（默认站点数据管理、会员管理、产品列表）。',
          class: 'yd_tool',
          index: 5
        },
        {
          text: '点击"订阅"，<br/>可以设置可以个性化定制您的首页面板内容（我的网站、消费记录、已购产品、我的积分、客户消息、服务消息）。',
          class: 'yd_subscribe',
          index: 6
        },
        {
          text: '点击"咨询与建议"，<br/>可以使用到qq咨询与反馈建议（智能顾问、聆听.建议反馈）。',
          class: 'yd_zixun',
          index: 6
        },
        {
          text: '点击"教程"，<br/>可以查看到后台相关教程（新手提示、视频教程）。',
          class: 'yd_jiaocheng',
          index: 7
        },
        {
          text: '关闭“新手提示”后，您可以在后台-首页-右下角的“教程”-“新手提示”中重新打开。',
          class: 'end',
          index: 8
        }
      ],
      list2: [],
      item: {
        text: '',
        dom: {}
      }
    }
  },
  mounted () {
    let vm = this
    window.onresize = () => {
      if (vm.$route.path === '/') {
        // 没用
      }
    }
    setTimeout(e => {
      this.list[0].text = (this.$store.state.user.nickName || this.$store.state.user.username) + ',您好<br/>接下来有些小提示，帮助您更快的熟悉后台。'
      if (!vm.$store.state.customData.yindao) { // 未引导和子员工
        if (location.port !== '8080' && !vm.$store.state.userInfo.privilege) vm.open()
        vm.$store.state.customData.yindao = true
        vm.$store.dispatch('SAVE_CUSTOM_DATA')
      }
    }, 1000)
  },
  methods: {
    init () {
      this.list2 = []
      this.list.forEach(item => {
        if (item.index > 0 && item.index < 8) {
          let dom = window.document.getElementsByClassName(item.class)[0]
          if (dom) {
            item.dom = dom.getBoundingClientRect()
            this.list2.push(item)
          }
        } else {
          let left = window.innerWidth / 2 - 159
          item.dom = {
            left: left,
            top: 250,
            width: 0,
            height: 0,
            display: 'none'
          }
          this.list2.push(item)
        }
      })
    },
    open () {
      this.init()
      this.next()
    },
    close () {
      this.counter = -1
      this.item = this.list2[0]
    },
    next () {
      if (this.counter === this.list2.length - 1) {
        this.close()
      } else {
        this.counter += 1
        let item = this.list2[this.counter]
        // 高度
        if (item.class === 'yd_website' || item.class === 'yd_tool' || item.class === 'yd_subscribe' || item.class === 'j_home_static') {
          let dom = window.document.getElementsByClassName(item.class)[0]
          let top = dom.getBoundingClientRect().top + document.getElementsByClassName('j_home')[0].scrollTop
          let height = dom.getBoundingClientRect().height + 70
          if (item.class === 'j_home_static') {
            height = dom.getElementsByClassName('ivu-tabs-bar')[0].getBoundingClientRect().height + 70
          }
          document.getElementsByClassName('j_home')[0].scrollTop = top - height
          let data = dom.getBoundingClientRect()
          if (item.class === 'j_home_static') {
            data = dom.getElementsByClassName('ivu-tabs-bar')[0].getBoundingClientRect()
          }
          item.dom = data
        }
        this.item = item
      }
    }
  }
}
</script>

<style lang="less">
.j_yindao {
  // 个别css
  .yd_website,.yd_collapsed,.yd_tool{
    left: 190px;
    top: 12px;
    &::after{
      height: 2px;
      width: 55px;
      left: -55px;
      top: 8px;
    }
    &::before{
      height: 10px;
      width: 10px;
      left: -65px;
      top: 4px;
    }
  }
  .yd_collapsed{
    left: 92px;
  }
  .yd_tool{
    left: 140px;
    top: -35px;
    &::after{
      top: 54px;
    }
    &::before{
      top: 50px;
    }
  }
  .yd_message,.j_home_static,.yd_subscribe{
    left: -125px;
    top: 110px;
    &::after{
      height: 55px;
      width: 2px;
      left: 154px;
      top: -55px;
    }
    &::before{
      height: 10px;
      width: 10px;
      left: 150px;
      top: -65px;
    }
  }
  .j_home_static{
    left: 120px;
    top: 120px;
  }
  .yd_subscribe{
    left: 0;
    top: 105px;
    &::after{
      height: 30px;
      top: -30px;
    }
    &::before{
      top: -40px;
    }
  }
  .yd_zixun,.yd_jiaocheng{
    left: -385px;
    top: -42px;
    &::after{
      height: 2px;
      width: 55px;
      left: 317px;
      top: 110px;
    }
    &::before{
      height: 10px;
      width: 10px;
      left: 372px;
      top: 106px;
    }
  }
  .yd_jiaocheng{
    top: -80px;
  }
  // 基本内容
  .counter{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    transition: all 0.2s ease-in-out;
    .box{
      border: 2.5px solid #feea3d;
    }
  }
  .y_panel{
    width: 318px;
    height: 181px;
    background: #fef49b;
    position: absolute;
    transition: all 0.2s ease-in-out;
    &::after{
      content: '';
      position:absolute;
      background: #feea3d;
      transition: all 0.2s ease-in-out;
    }
    &::before{
      content: '';
      position:absolute;
      border-radius: 10px;
      background: #feea3d;
      transition: all 0.2s ease-in-out;
    }
  }
  .y_header{
    height: 19px;
    line-height: 20px;
    background: #feea3d;
    color: #b9a100;
    span{
      padding: 0 12px;
    }
    .close{
      cursor: pointer;
      width: 55px;
      float: right;
      text-align: center;
    }
  }
  p{
    height: 128px;
    color: #000;
    padding: 20px 12px;
    line-height: 2;
  }
  .count{
    margin-left: 13px;
    color: #b8a103;
  }
  .next{
    cursor: pointer;
    float: right;
    text-decoration: underline;
    color: #b8a103;
    margin-right: 15px;
  }
}
.j_yindao_mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 998;
  .box{
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 0 solid #000;
    opacity: .5;
    filter: alpha(opacity=75);
    z-index: 998;
    -webkit-transition: all .25s;
    box-shadow: 0 0 0 10000px #fff;
    overflow: hidden;
  }
}
</style>
