<template>
  <Sider id="J_Sider" ref="side1" hide-trigger collapsible :collapsed-width="50" v-model="customData.isCollapsed" width="180">
    <Header :style="{padding: 0}" class="layout-header-bar" @click.native="collapsedSider">
      <Icon :class="rotateIcon" :style="{margin: '10px 10px 0'}" type="navicon" size="20"></Icon>
    </Header>
    <Menu ref="menu" theme="dark" width="auto" :class="menuitemClasses" :active-name="activeName" :open-names="openNames" @on-select="mrouter" accordion v-if="menuList.length > 0">
      <div v-for="item in menuList" :key="item.name">
        <Tooltip :content="item.meta.title" placement="right" :transfer="transfer" :disabled="disabled" v-if="!item.children">
          <MenuItem :name="item.name === 'index' ? '' : item.name">
            <i :class="'iconfont icon-' + item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </MenuItem>
        </Tooltip>

        <Submenu :name="item.name" v-if="item.children && item.children.length > 0">
          <template slot="title">
            <Tooltip :content="item.meta.title" placement="right" :transfer="transfer" :disabled="disabled">
              <i :class="'iconfont icon-' + item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </Tooltip>
          </template>
          <Tooltip v-for="(row, i) in item.children" :key="i" :content="row.meta.title" placement="right" :transfer="transfer" :disabled="disabled">
            <MenuItem :name="row.meta.manage || row.name" v-if="!row.meta.href">
              <i :class="'iconfont icon-' + row.meta.icon"></i>
              <span>{{row.meta.title}}</span>
            </MenuItem>

            <a :href="row.meta.href + (item.name === 'fenxiao' ? sid : '')" target="_blank" v-if="row.meta.href">
              <MenuItem :name="row.name">
                <i :class="'iconfont icon-' + row.meta.icon"></i>
                <span>{{row.meta.title}}</span>
              </MenuItem>
            </a>
          </Tooltip>
        </Submenu>
      </div>

    </Menu>
  </Sider>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      transfer: true, // 是否将弹层放置于 body 内，它将不受父级样式影响
      disabled: false, // 是否禁用提示框
      activeName: '',
      openNames: [],
      sid: ''
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.status.menuList,
      customData: state => state.customData
    }),
    rotateIcon () {
      return [
        'yd_collapsed',
        'menu-icon',
        this.customData.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.customData.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    menuList () {
      return this.$store.state.status.menuList
    }
  },
  watch: {
    $route (to, from) {
      this.initRoute()
    },
    menuList: {
      handler () {
        this.initRoute()
      }
    }
  },
  created () {
    // 初始化选中样式
    this.getCps()
  },
  mounted () {
    var vm = this
    setTimeout(function () {
      vm.disabled = !vm.customData.isCollapsed
    }, 1000)
  },
  methods: {
    initRoute () {
      let match = this.$route.matched
      this.activeName = match.length > 1 ? (match[1].meta.manage || match[1].name) : ''
      this.openNames = match.length > 0 ? (match[0].name && match[0].name.split(',')) : []
      this.$nextTick(() => {
        this.$refs.menu && this.$refs.menu.updateOpened()
      })
    },
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
      this.disabled = !this.customData.isCollapsed
      this.customData.isCollapsed = this.customData.isCollapsed
      this.$store.dispatch('SAVE_CUSTOM_DATA')
    },
    mrouter (name) {
      if (name !== 'wcd' && name !== 'fenxiao') this.$router.push({path: '/' + name})
    },
    getCps () {
      if (!this.$cookie.get('sid') || this.$cookie.get('sid').length < 1) {
        return ''
      }
      this.sid = '/index/' + this.$cookie.get('sid')
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
