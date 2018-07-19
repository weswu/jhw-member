<template>
  <div class="j_album_category">
    <div class="title">
      文件目录
    </div>
    <div style="width:209px;">
      <Input v-model="name" class="w144" clearable placeholder="搜索文件夹" @on-change="clearInput"></Input>
      <Button class="search" @click="search" style="margin-right: 0;">搜索</Button>
    </div>
    <ul ref="menu" class="menu j_panel">
      <li @click="add">新建</li>
      <li @click="edit">修改</li>
      <li @click="del">删除</li>
    </ul>
    <Tree ref="tree" :data="data" class="j_scroll"></Tree>
    <Add ref="add" :list="initList" @on-change="get"/>
  </div>
</template>

<script>
import qs from 'qs'
import Add from '@/components/attachment/at-file-add'
export default {
  components: {
    Add
  },
  data () {
    return {
      name: '',
      data: [
        {
          title: '全部文档',
          id: '',
          expand: true, // 展开节点
          selected: true, // 选中节点
          editting: false, // 修改
          render: this.iconFilter,
          children: []
        }
      ],
      list: [],
      initList: [],
      item: {},
      fileNameEdit: false
    }
  },
  mounted () {
    var ctx = this
    window.document.addEventListener('click', function (e) {
      if (ctx.$refs.menu) ctx.$refs.menu.style.display = 'none'
      if (e.target.innerHTML !== '重命名' && e.target.className !== 'ivu-input') {
        ctx.data[0].children.forEach(row => {
          row.editting = false
          row.children.forEach(row1 => {
            row1.editting = false
            row1.children.forEach(row2 => {
              row2.editting = false
            })
          })
        })
        ctx.fileNameEdit = false
      }
    })
  },
  methods: {
    get () {
      this.$http.get('/rest/pc/api/album/attachment/list').then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.initData()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    initData () {
      var ctx = this
      this.data = [
        {
          title: '全部文档',
          id: '',
          expand: true, // 展开节点
          selected: true, // 选中节点
          editting: false, // 修改
          render: this.iconFilter,
          children: []
        }
      ]
      this.dataTest = [
        {
          title: '全部文档',
          id: '',
          expand: true, // 展开节点
          selected: false, // 选中节点
          editting: false, // 修改
          render: this.iconFilter,
          children: [
            {
              title: '图片1',
              id: 'all1',
              expand: false,
              selected: false,
              render: this.iconFilter,
              _checked: false,
              editting: false,
              attCount: 10,
              children: [
                {
                  title: '图片2',
                  id: 'all2',
                  expand: false,
                  selected: false,
                  render: this.iconFilter,
                  _checked: false,
                  editting: false,
                  attCount: 20,
                  children: [
                    {
                      title: '图片3',
                      id: 'all3',
                      expand: false,
                      selected: false,
                      render: this.iconFilter,
                      _checked: false,
                      editting: false,
                      attCount: 22,
                      children: []
                    }
                  ]
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
            _checked: false,
            editting: false,
            children: [],
            attCount: item.attCount
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
              _checked: false,
              editting: false,
              children: [],
              attCount: item2.attCount
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
                selected: false,
                render: this.iconFilter,
                _checked: false,
                editting: false,
                children: [],
                attCount: item2.attCount
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
              _checked: false,
              editting: false,
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
      let a = h('Input', {
        props: {
          type: 'text',
          value: data.title
        },
        on: {
          input: (val) => {
            data.title = val
          },
          'on-blur': (e) => {
            let data = {
              model: JSON.stringify({
                id: ctx.item.id,
                name: e.target.value
              }),
              _method: 'put'
            }
            this.$http.post('/rest/api/album/detail/' + ctx.item.id, qs.stringify(data)).then((res) => {
              if (res.success) {
                ctx.$Message.success('修改成功')
              } else {
                ctx.$Message.error(res.msg)
              }
            })
          }
        }
      })
      let b = h('span', {
        class: {
          'ivu-tree-title': true,
          'ivu-tree-title-selected': data.selected
        },
        on: {
          click: () => {
            root.find(el => {
              if (el.node.id === data.id) {
                el.node.selected = true
              } else {
                el.node.selected = false
              }
            })
            this.ok(root, node, data)
          },
          contextmenu: (e) => {
            ctx.$refs.menu.style.display = 'block'
            let dom = e.target.getBoundingClientRect()
            ctx.$refs.menu.style.left = dom.left + dom.width / 2 + 'px'
            ctx.$refs.menu.style.top = dom.top + dom.height / 2 + 'px'
            ctx.item = data
            ctx.fileNameEdit = false
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
      return h('span', {
        class: {
          'item': true
        },
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        (data.editting && !this.fileNameEdit) ? a : b
      ])
    },
    ok (root, node, data) {
      this.$emit('on-change', {
        data: data
      })
    },
    clearInput () {
      if (this.name === '') {
        this.initData()
      }
    },
    // 右击
    initListDate () {
      this.initList = []
      let list = []
      // 1级
      this.list.forEach(item => {
        if (!item.parentId) {
          item.isroot = false // 根目录和三角
          item.expand = true // 三角图标展开-关闭
          item.bg = false // 层级背景颜色
          item.grade = '1'
          item.categoryId = item.albumId
          item.belongId = item.parentId
          list.push(item)
        }
      })
      // 2级
      this.list.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '1' && (row.parentId === item.albumId)) {
            item.isroot = true
            row.isroot = false
            row.hidden = false // 显示隐藏
            row.expand = true
            row.bg = false
            row.grade = '2'
            row.categoryId = row.albumId
            row.belongId = row.parentId
            list.splice(index + 1, 0, row)
          }
        })
      })
      // 3级
      this.list.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '2' && (row.parentId === item.albumId)) {
            item.isroot = true
            row.isroot = false
            row.hidden = false
            row.bg = false
            row.grade = '3'
            row.categoryId = row.albumId
            row.belongId = row.parentId
            list.splice(index + 1, 0, row)
          }
        })
      })
      this.initList = list
    },
    add () {
      this.initListDate()
      this.$refs.add.open()
    },
    edit () {
      this.initListDate()
      this.$refs.add.open(this.item)
    },
    del (type) {
      let data = {
        _method: 'delete'
      }
      this.$http.post('/rest/pc/api/album/attachment/del/' + this.item.id, qs.stringify(data)).then((res) => {
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
    .ivu-input{
      padding: 0px 10px;
      height: 26px;
    }
    .item{
      position: relative;
      padding: 2px 0;
      &::after{
        content: '';
        position: absolute;
        background: url(http://www.jihui88.com/manage_v4/platform/img/dashed2.png);
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
          background: url(http://www.jihui88.com/manage_v4/platform/img/dashed.png);
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
        .ivu-input{
          width: 164px;
        }
        ul li{
          .ivu-tree-title span{
            width: 106px;
          }
          .ivu-input{
            width: 141px;
          }
          ul li{
            .ivu-tree-title span{
              width: 83px;
            }
            .ivu-input{
              width: 118px;
            }
          }
        }
      }
    }
  }
}
</style>
