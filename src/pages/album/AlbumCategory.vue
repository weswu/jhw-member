<template>
  <div class="j_album_category">
    <div class="title">
      图片目录
    </div>
    <div style="width:209px;">
      <Input v-model="name" class="w144" placeholder="搜索文件夹"></Input>
      <Button class="search" @click="search" style="margin-right: 0;">搜索</Button>
    </div>
    <ul ref="menu" class="menu j_panel">
      <li @click="add">新建</li>
      <li @click="copy">复制</li>
      <li @click="move">移动</li>
      <li @click="edit">重命名</li>
      <li @click="del">删除</li>
    </ul>
    <Tree :data="data" class="j_scroll"></Tree>
    <Add ref="add"/>
    <TransferAlbum ref="TransferAlbum" :item="item" @on-change="get"/>
  </div>
</template>

<script>
import qs from 'qs'
import Add from '@/pages/album/Add'
import TransferAlbum from '@/pages/album/transfer-album'
export default {
  components: {
    Add,
    TransferAlbum
  },
  data () {
    return {
      name: '',
      data: [
        {
          title: '全部图片',
          id: 'all',
          expand: true, // 展开节点
          selected: false, // 选中节点
          render: this.iconFilter,
          children: []
        }
      ],
      list: this.$store.state.albumCategory,
      item: {}
    }
  },
  created () {
    if (this.list.length < 2) {
      this.$store.dispatch('getAlbumCategory').then(res => {
        this.initData()
      })
    } else {
      this.initData()
    }
  },
  mounted () {
    var ctx = this
    window.document.addEventListener('click', function (e) {
      if (ctx.$refs.menu) ctx.$refs.menu.style.display = 'none'
    })
  },
  methods: {
    get () {
      this.$store.dispatch('getAlbumCategory').then(res => {
        this.initData()
      })
    },
    initData () {
      var ctx = this
      this.list = this.$store.state.albumCategory
      this.data = [
        {
          title: '全部图片',
          id: 'all',
          expand: true, // 展开节点
          selected: false, // 选中节点
          render: this.iconFilter,
          children: []
        }
      ]
      ctx.data2 = [
        {
          title: '全部图片',
          id: 'all',
          expand: true, // 展开节点
          selected: false, // 选中节点
          render: this.iconFilter,
          children: [
            {
              title: '图片1',
              id: 'all1',
              expand: false,
              selected: false,
              render: this.iconFilter,
              attCount: '10',
              children: [
                {
                  title: '图片2',
                  id: 'all2',
                  expand: false,
                  selected: false,
                  render: this.iconFilter,
                  attCount: 20
                }
              ]
            }
          ]
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
              children: [],
              attCount: item.attCount
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
                children: [],
                attCount: item.attCount
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
            id: 'all',
            expand: true,
            selected: false,
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
        this.initData()
      }
    },
    iconFilter (h, { root, node, data }) {
      var ctx = this
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
              this.ok(root, node, data)
            },
            contextmenu: (e) => {
              ctx.$refs.menu.style.display = 'block'
              ctx.$refs.menu.style.left = e.target.getBoundingClientRect().left + 'px'
              ctx.$refs.menu.style.top = e.target.getBoundingClientRect().top + 'px'
              ctx.item = data
              e.preventDefault()
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
    },
    ok (root, node, data) {
      root.find(el => {
        el.node.selected = false
      })
      data.selected = true
      let breadList = [
        { value: 'all', text: '全部图片' }
      ]
      const parentKey = root.find(el => el === node).parent
      if (parentKey || parentKey === 0) {
        breadList.push({
          value: data.id,
          text: data.title
        })
        const parent = root.find(el => el.nodeKey === parentKey)
        if (parent && parent.node.id !== 'all') {
          breadList.splice(1, 0, {
            value: parent.node.id,
            text: parent.node.title
          })
        }
        const parent2 = root.find(el => el.nodeKey === parent.parent)
        if (parent2 && parent2.node.id !== 'all') {
          breadList.splice(1, 0, {
            value: parent2.node.id,
            text: parent2.node.title
          })
        }
      }
      this.$emit('on-change', {
        breadList: breadList,
        data: data
      })
    },
    // 文件
    bread (value) {
      this.data.forEach(item => {
        item.selected = false
        if (item.id === value) {
          item.selected = true
        }
      })
    },
    // 右击
    add () {
      this.$refs.add.open()
    },
    move () {
      this.$refs.TransferAlbum.open()
    },
    copy () {
      this.$refs.TransferAlbum.open('copy', '复制相册')
    },
    edit () {
      var ctx = this
      if (this.item.id !== 'all') {
        this.$Modal.confirm({
          width: 280,
          render: (h) => {
            return h('Input', {
              props: {
                value: this.item.title,
                autofocus: true,
                placeholder: '修改相册'
              },
              on: {
                input: (val) => {
                  this.item.title = val
                }
              }
            })
          },
          onOk: () => {
            if (!this.item.title) return this.$Message.info('相册名称不能为空')
            let data = {
              model: JSON.stringify({
                id: this.item.id,
                name: this.item.title
              }),
              _method: 'put'
            }
            this.$http.post('/rest/api/album/detail/' + this.item.id, qs.stringify(data)).then((res) => {
              if (res.success) {
                ctx.$Message.success('修改成功')
                ctx.get()
              } else {
                ctx.$Message.error(res.msg)
              }
            })
          }
        })
      }
    },
    del () {
      let data = {
        _method: 'delete'
      }
      this.$http.post('/rest/api/album/detail/' + this.item.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
        } else {
          this.$Message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_album_category{
  width: 227px;
  flex: 0 0 227px;
  background: #ebedf1;
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
    height: calc(100vh - 238px);
    overflow: auto;
    overflow-x: hidden;
  }
  .ivu-tree ul {
    line-height: 1.3;
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
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 129px;
          vertical-align: text-bottom;
        }
        ul li{
          .ivu-tree-title span{
            width: 106px;
          }
          ul li{
            .ivu-tree-title span{
              width: 83px;
            }
          }
        }
      }
    }
  }
}
</style>
