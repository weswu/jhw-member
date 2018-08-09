<template>
  <div class="j_album_category">
    <div class="title">
      图片目录
    </div>
    <div style="width:209px;">
      <Input v-model="name" class="w144" clearable placeholder="搜索文件夹" @on-change="clearInput"></Input>
      <Button class="search" @click="search" style="margin-right: 0;">搜索</Button>
    </div>
    <ul ref="menu" class="menu j_panel">
      <li @click="add">新建</li>
      <li @click="copy">复制</li>
      <li @click="move">移动</li>
      <li @click="edit">重命名</li>
      <li @click="del">删除</li>
    </ul>
    <Tree ref="tree" :data="data" class="j_scroll"></Tree>
    <span class="a_normal" @click="add">新建分类</span>
    <Add ref="add" @on-change="get"/>
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
          selected: true, // 选中节点
          editting: false, // 修改
          render: this.iconFilter,
          children: []
        }
      ],
      list: this.$store.state.albumCategory,
      item: {},
      fileNameEdit: false,
      copyId: ''
    }
  },
  created () {
    if (this.$route.path === '/album' || this.$store.state.albumCategory.length === 0) {
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
      this.$store.dispatch('getAlbumCategory').then(res => {
        this.initData()
      })
    },
    initData () {
      var ctx = this
      this.list = this.$store.state.albumCategory
      this.dataTest = [
        {
          title: '全部图片',
          id: 'all',
          expand: true, // 展开节点
          selected: true, // 选中节点
          editting: false, // 修改
          render: this.iconFilter,
          children: []
        }
      ]
      this.data = [
        {
          title: '全部图片',
          id: 'all',
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
      this.data[0].children.forEach(item1 => {
        item1.attCount = (item1.attCount || 0) + item1.children.length
        if (item1.id === ctx.copyId) {
          item1.expand = true
          ctx.$emit('on-file', item1)
        }
        item1.children.forEach(item2 => {
          item2.attCount = (item2.attCount || 0) + item2.children.length
          if (item2.id === ctx.copyId) {
            item1.expand = true
            item2.expand = true
            ctx.$emit('on-file', item2)
          }
          item2.children.forEach(item3 => {
            item3.attCount = (item3.attCount || 0) + item3.children.length
          })
        })
      })
      if (ctx.copyId === 'all') ctx.$emit('on-file', this.data[0])
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
      this.data[0].children.forEach(item => {
        item.selected = false
        if (item.id === value) {
          item.selected = true
        }
        item.children.forEach(item1 => {
          item1.selected = false
          if (item1.id === value) {
            item1.selected = true
          }
          item1.children.forEach(item2 => {
            item2.selected = false
            if (item2.id === value) {
              item2.selected = true
            }
          })
        })
      })
    },
    clearInput () {
      if (this.name === '') {
        this.initData()
      }
    },
    // 计数
    intiCount (value, count) {
      this.data[0].children.forEach(item => {
        if (item.id === value) {
          item.attCount = count + item.children.length
        }
        item.children.forEach(item1 => {
          if (item1.id === value) {
            item1.attCount = count + item1.children.length
          }
          item1.children.forEach(item2 => {
            if (item2.id === value) {
              item2.attCount = count + item2.children.length
            }
          })
        })
      })
    },
    // 右击
    add () {
      this.$refs.add.open(this.item.id)
    },
    move () {
      this.$refs.TransferAlbum.open()
    },
    edit () {
      if (this.item.id !== 'all') {
        this.item.editting = true
      }
    },
    initCopyId (value) {
      var ctx = this
      this.data[0].children.forEach(item => {
        if (item.id === value) {
          ctx.copyId = 'all'
        }
        item.children.forEach(item1 => {
          if (item1.id === value) {
            ctx.copyId = item.id
          }
          item1.children.forEach(item2 => {
            if (item2.id === value) {
              ctx.copyId = item1.id
            }
          })
        })
      })
    },
    copy (type, id) {
      this.initCopyId(id || this.item.id)
      this.$http.post('/rest/api/album/albumCopy?albumId=' + (id || this.item.id)).then((res) => {
        if (res.success) {
          if (!id || type === 'end') {
            this.$Message.success('复制成功')
            this.get()
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    del (type, id) {
      this.initCopyId(id || this.item.id)
      let data = {
        _method: 'delete'
      }
      this.$http.post('/rest/api/album/detail/' + (id || this.item.id), qs.stringify(data)).then((res) => {
        if (res.success) {
          if (!id || type === 'end') {
            this.$Message.success('删除成功')
            this.get()
          }
          this.$emit('on-del', this.item.id)
        } else {
          this.$Message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
