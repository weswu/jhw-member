<template>
  <Sider id="J_Sider" ref="side1" hide-trigger collapsible :collapsed-width="50" v-model="customData.isCollapsed" width="180">
    <Header :style="{padding: 0}" class="layout-header-bar" @click.native="collapsedSider">
      <Icon :class="rotateIcon" :style="{margin: '10px 10px 0'}" type="navicon" size="20"></Icon>
    </Header>
    <Menu theme="dark" width="auto" :class="menuitemClasses" :active-name="activeName" :open-names="open" @on-select="mrouter" accordion>
      <Tooltip content="首页" placement="right" :transfer="transfer" :disabled="disabled">
        <MenuItem name="index">
          <i class="iconfont icon-ai-home"></i>
          <span>首页</span>
        </MenuItem>
      </Tooltip>
      <Submenu :name="item.name" v-for="(item, index) in navList" :key="index">
        <template slot="title">
          <Tooltip :content="item.text" placement="right" :transfer="transfer" :disabled="disabled">
            <i :class="'iconfont icon-' + item.icon"></i>
            <span>{{item.text}}</span>
          </Tooltip>
        </template>
        <Tooltip v-for="(row, i) in item.children" :key="i" :content="row.text" placement="right" :transfer="transfer" :disabled="disabled">
          <MenuItem :name="row.name">
            <i :class="'iconfont icon-' + row.icon"></i>
            <span>{{row.text}}</span>
          </MenuItem>
        </Tooltip>
      </Submenu>
      <Tooltip :content="item.text" placement="right" v-for="item in navList2" :key="item.name" :transfer="transfer" :disabled="disabled">
        <MenuItem :name="item.name" v-if="!item.url">
          <i :class="'iconfont icon-' + item.icon"></i>
          <span>{{item.text}}</span>
        </MenuItem>
        <a :href="item.url" target="_blank" v-if="item.url">
          <MenuItem :name="item.name">
            <i :class="'iconfont icon-' + item.icon"></i>
            <span>{{item.text}}</span>
          </MenuItem>
        </a>
      </Tooltip>
    </Menu>
  </Sider>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      transfer: true,
      disabled: false,
      activeName: 'index',
      open: [],
      navList: [
        { name: '1',
          icon: 'fl-renyuan',
          text: '账号信息',
          children: [
            { name: 'account', icon: 'account-only', text: '账号管理' },
            { name: 'cost_order', icon: 'price', text: '费用中心' },
            { name: 'point', icon: 'jifen', text: '积分管理' }
          ]
        },
        { name: '2',
          icon: 'fl-shuju',
          text: '数据管理中心',
          children: [
            { name: 'static', icon: 'qiu', text: '站点管理' },
            { name: 'enterprise', icon: 'kujialeqiyezhan_gongsishili', text: '公司信息' },
            { name: 'product', icon: 'product', text: '产品管理' },
            { name: 'news', icon: 'xinwenzixun', text: '新闻管理' },
            { name: 'album', icon: 'xiangce', text: '相册管理' },
            { name: 'member', icon: 'huiyuan', text: '客户管理' },
            { name: 'shop', icon: 'jiankangshangcheng', text: '商城管理' }
          ]
        }
      ],
      navList2: [
        { name: 'pc',
          icon: 'diannao-tianchong',
          text: '网站界面管理'
        },
        { name: 'xiaochengxu',
          icon: 'xiaochengxu',
          text: '小程序界面管理',
          url: 'http://buy.jihui88.com/#/'
        },
        { name: 'fenxiao',
          icon: 'fenxiao',
          text: '微分销',
          url: 'http://cps.jihui88.com/dashboard/login' + this.getCps()
        },
        { name: 'wcd',
          icon: 'haibao',
          text: '微传单',
          url: 'http://wcd.jihui88.com/leaflet/index.html#/home_my'
        }
      ]
    }
  },
  computed: {
    ...mapState(['customData']),
    rotateIcon () {
      return [
        'menu-icon',
        this.customData.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.customData.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  created () {
    if (this.$route.meta.open) this.open = this.$route.meta.open.split('')
    if (this.$route.meta.parent) {
      if (this.$route.path === '/category/news') {
        this.activeName = 'news'
      } else {
        this.activeName = this.$route.meta.parent
      }
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
      this.disabled = !this.customData.isCollapsed
      this.customData.isCollapsed = this.customData.isCollapsed
      this.$store.dispatch('SAVE_CUSTOM_DATA')
    },
    mrouter (name) {
      this.$router.push({path: '/' + name})
    },
    getCps () {
      if (!this.$cookie.get('sid') || this.$cookie.get('sid').length < 1) {
        return ''
      }
      return '/index/' + this.$cookie.get('sid')
    }
  }
}
</script>

<style lang="less">
@import '../../assets/variables.less';
#J_Sider{
  background: #2d303c;
  height: 100%;
  transition: none;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar{width: 0;}
  .ivu-tooltip,.ivu-tooltip-rel{width: 100%}
  .layout-header-bar{
    background: #414659;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &:hover{
      .menu-icon{
        color: #fff;
      }
    }
    .menu-icon{
      color: #d8d8d8;
    }
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #2d303c;
  }
  // 选中
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    background: #12bedb !important;
    border-right: none;
    color: #fff;
  }
  // 展开
  .ivu-icon-navicon{
    transform: rotate(90deg);
  }
  .rotate-icon{
    transform: rotate(0deg);
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #3a3f51;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0;
  }

  .menu-item{
    font-size: 12px;
    line-height: 40px;
    .ivu-menu-item {
      font-size: 12px;
    }
    span{
       margin-right: 0;
       display: inline-block;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       vertical-align: middle;
    }
    .iconfont {
        float: left;
        margin-right: 0;
        vertical-align: middle;
        font-size: 16px;
        display: inline-block;
        text-align: center;
        width: 50px;
    }
    .ivu-menu-submenu-title-icon{
      font-size: 14px;
      position: absolute;
      right: 3px;
      top: 14px;
        &::before{
          content: "\F363";
        }
    }
    // 二级菜单
    .ivu-menu-submenu{
      .ivu-menu-item {
        padding-left: 10px !important;
        transition: none;
      }
    }
    // 二级菜单打开
    .ivu-menu-opened{
      .ivu-menu-submenu-title-icon{
          transform: rotate(90deg);
      }
    }
  }

  // 菜单关闭
  .collapsed-menu {
    span{
      width: 0;
    }
    .iconfont {
      width: 100%;
    }
    .ivu-icon{
      display: none
    }
    // 二级
    .ivu-menu-submenu{
      .ivu-menu-item {
        padding-left: 0 !important;
        span{
          width: 0px;
        }
      }
    }
  }
}
</style>
