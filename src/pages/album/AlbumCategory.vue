<template>
  <div class="j_album_category">
    <div class="title">
      图片目录
    </div>
    <div class="">
      <Input v-model="name" style="width:140px;padding-right:5px;" placeholder="搜索文件夹"></Input>
      <Button class="j_buttom" @click="search">搜索</Button>
    </div>
    <Tree :data="data" @on-select-change="clickCategory"></Tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      data: [],
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/list?page=1&pageSize=9000').then(res => {
        if (res.success) {
          this.list = res.attributes.data
          this.init()
        }
      })
    },
    init () {
      var ctx = this
      this.data = [
        {
          title: '全部图片',
          id: '',
          expand: true,
          selected: false,
          render: this.iconFilter,
          children: []
        }
      ]
      this.list.forEach(item => {
        if (!item.parentId) {
          this.data[0].children.push({
            title: item.name,
            id: item.albumId,
            expand: false,
            selected: false,
            render: this.iconFilter,
            children: []
          })
        }
      })
      this.data[0].children.forEach(item => {
        ctx.list.forEach(item2 => {
          if (item.id === item2.parentId) {
            item.children.push({
              title: item2.name,
              id: item2.albumId,
              expand: false,
              selected: false,
              render: this.iconFilter,
              children: []
            })
          }
        })
      })
      this.data[0].children.forEach(item => {
        item.children.forEach(row => {
          ctx.list.forEach(item2 => {
            if (row.id === item2.parentId) {
              row.children.push({
                title: item2.name,
                id: item2.albumId,
                render: this.iconFilter,
                checked: false
              })
            }
          })
        })
      })
    },
    search () {
      if (this.name) {
        this.data = [
          {
            title: '搜索结果',
            id: '',
            expand: true,
            selected: false,
            render: this.iconFilter,
            children: []
          }
        ]
        this.list.forEach(item => {
          if (item.name.match(this.name)) {
            this.data[0].children.push({
              title: item.name,
              id: item.albumId,
              expand: false,
              selected: false,
              render: this.iconFilter,
              children: []
            })
          }
        })
      } else {
        this.init()
      }
    },
    clickCategory (e) {
    },
    iconFilter (h, { root, node, data }) {
      return h('span', {
        class: {
          'item': true
        },
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', {
          class: {
            'ivu-tree-title': true,
            'ivu-tree-title-selected': data.selected
          },
          on: {
            click: () => {
              data.selected = !data.selected
            }
          }
        }, [
          h('i', {
            class: {
              'iconfont': true,
              'icon-weibiaoti5': !data.expand,
              'icon-wenjianjia-zhankai': data.expand
            },
            style: {
              marginRight: '8px',
              color: '#79d3fb'
            }
          }),
          h('span', data.title)
        ])
      ])
    }
  }
}
</script>

<style lang="less">
.j_album_category{
  width: 227px;
  flex: 0 0 227px;
  background: #ebedf1;
  height: calc(100vh - 149px);
  padding: 10px;
  .title{
    color:#737373;padding: 10px 0;font-size:14px;
  }
  .ivu-tree-arrow{
    position: relative;
    z-index: 11;
    vertical-align: sub;
  }
  .ivu-icon-arrow-right-b{
    font-family: "iconfont" !important;
    color: #6f6f6f;
    transform: none;
    background: #ebedf1;
    &:before{
      content: "\e60c";
    }
  }
  .ivu-tree-arrow-open{
    .ivu-icon-arrow-right-b{
      &:before{
        content: "\e61a";
      }
    }
  }
  .ivu-tree{
    overflow: hidden;
  }
  .ivu-tree ul {
    .item{
      position: relative;
      padding: 2px 0;
      &::after{
        content: '';
        position: absolute;
        background: url(http://www.jihui88.com/member_new/static/img/dashed2.png);
        background-repeat: repeat-x;
        background-size: 3px;
        top: 43%;
        left: -10px;
        width: 10px;
        height: 1px;
        z-index: 10;
      }
      .ivu-tree-title{
        border-radius: 0px;
        color: #595959;
        border: 1px solid #ebedf1;
      }
      .ivu-tree-title-selected, .ivu-tree-title-selected:hover,.ivu-tree-title:hover {
        background-color: #ffecc0;
        border: 1px solid #ffce83;
        box-sizing: border-box;
      }
    }
    li ul {
      &:last-child{
        li{
          &::before{
            height: 13px;
          }
        }
      }
      li{
        position: relative;
        margin: 0;
        padding-left: 5px;
        &::before{
          content: '';
          position: absolute;
          left: 10px;
          height: 100%;
          width: 1px;
          z-index: 9;
          background: url(http://www.jihui88.com/member_new/static/img/dashed.png);
          background-repeat: repeat-y;
          background-size: 1px;
        }
        .ivu-tree-title span{
          overflow: hidden;
          display: inline-block;
          text-overflow: ellipsis;
          width: 80%;
          vertical-align: text-bottom;
        }
      }
    }
  }
}
</style>
