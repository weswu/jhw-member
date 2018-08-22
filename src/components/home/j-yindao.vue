<template>
  <div class="j_yindao">
    <div class="counter" v-if="counter === 1" :style="{left: yindao1.left - 6 + 'px', top: yindao1.top - 7 + 'px'}">
      <div class="box" :style="{width: yindao1.width + 12 + 'px', height: yindao1.height + 14 + 'px'}"></div>
      <div class="y_panel y_panel1">
        <div class="y_header">
          <span class="title">新手提示</span>
          <span class="close" @click="close">关闭</span>
        </div>
        <div class="y_content">
          <p>
            点击"创建新网站"，可以生成免费试用1个月的站点，您在这期间可以编辑成您想要的网站，内有很多免费的网站模板和版块。<br/>
            当然也可以联系我们，为您量身定制设计。
          </p>
          <span class="next" @click="next">继续</span>
        </div>
      </div>
    </div>

    <div class="counter" v-if="counter === 2" :style="{left: yindao2.left - 6 + 'px', top: yindao2.top - 7 + 'px'}">
      <div class="box" :style="{width: yindao2.width + 12 + 'px', height: yindao2.height + 14 + 'px'}"></div>
      <div class="y_panel y_panel2">
        <div class="y_header">
          <span class="title">新手提示</span>
          <span class="close" @click="close">关闭</span>
        </div>
        <div class="y_content">
          <p>
            点击"消息图标"，<br/>
            可以查看到站内消息通知（客户留言、产品消息、服务消息、活动消息等），您还可以设置"消息接收人"。
          </p>
          <span class="next" @click="next">继续</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: 0,
      yindao1: {},
      yindao2: {}
    }
  },
  mounted () {
    let vm = this
    window.document.getElementsByClassName('j_home')[0].onscroll = function () {
      vm.init()
    }
    window.onresize = () => {
      vm.init()
      vm.init2()
    }
    this.init()
    this.init2()
  },
  methods: {
    init () {
      this.yindao1 = document.getElementById('websiteCreate').getBoundingClientRect()
    },
    init2 () {
      this.yindao2 = document.getElementById('messageView').getBoundingClientRect()
    },
    open () {
      this.counter = 1
    },
    close () {
      this.counter = 0
    },
    next () {
      this.counter += 1
    }
  }
}
</script>

<style lang="less">
.y_panel1{
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
.y_panel2{
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

// 基本内容
.j_yindao{
  .counter{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .box{
    border: 2.5px solid #feea3d;
  }
}
.y_panel{
  width: 318px;
  height: 181px;
  background: #fef49b;
  position: absolute;
  &::after{
    content: '';
    position:absolute;
    background: #feea3d;
  }
  &::before{
    content: '';
    position:absolute;
    border-radius: 10px;
    background: #feea3d;
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
  .next{
    cursor: pointer;
    float: right;
    text-decoration: underline;
    color: #b8a103;
    margin-right: 15px;
  }
}
</style>
