<template>
  <div class="j_album_category">
    <div class="title">
      附件目录
    </div>
    <div style="width:209px;">
      <Input v-model="name" class="w144" clearable placeholder="搜索文件夹" @on-change="clearInput"></Input>
      <Button class="search" @click="search" style="margin-right: 0;">搜索</Button>
    </div>
    <ul ref="menu" class="menu j_panel">
      <li @click="add">新建</li>
      <li @click="edit" v-if="item.id !== ''">修改</li>
      <li @click="del" v-if="item.id !== ''">删除</li>
    </ul>
    <Tree ref="tree" :data="data" :render="iconFilter" class="j_scroll"></Tree>
    <span class="a_normal" @click="add">新建分类</span>
    <Add ref="add" @on-change="get"/>
  </div>
</template>

<script>
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
          title: '全部附件',
          id: '',
          expand: true, // 展开节点
          selected: true, // 选中节点
          children: []
        }
      ],
      list: [],
      item: {},
      fileNameEdit: false
    }
  },
  mounted () {
    var ctx = this
    window.document.addEventListener('click', function (e) {
      if (ctx.$refs.menu) ctx.$refs.menu.style.display = 'none'
      if (e.target.innerHTML !== '重命名' && e.target.className !== 'ivu-input') {
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
      this.initData()
    },
    initData () {
      var ctx = this
      this.data = [
        {
          title: '全部附件',
          id: '',
          expand: true, // 展开节点
          selected: true, // 选中节点
          children: []
        }
      ]
      this.list.forEach(item => {
        if (!item.belongId) {
          this.data[0].children.push({
            title: item.name,
            id: item.albumId,
            belongId: item.belongId,
            expand: false,
            selected: false,
            _checked: false,
            children: [],
            attCount: item.attCount
          })
        }
      })
      this.data[0].children.forEach(item => {
        ctx.list.forEach(item2 => {
          if (item.id === item2.belongId) {
            item.children.push({
              title: item2.name,
              id: item2.albumId,
              belongId: item.belongId,
              expand: false,
              selected: false,
              _checked: false,
              children: [],
              attCount: item2.attCount
            })
          }
        })
      })
      this.data[0].children.forEach(item => {
        item.children.forEach(row => {
          ctx.list.forEach(item2 => {
            if (row.id === item2.belongId) {
              row.children.push({
                title: item2.name,
                id: item2.albumId,
                belongId: item.belongId,
                selected: false,
                _checked: false,
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
              belongId: item.belongId,
              expand: false,
              selected: false,
              _checked: false,
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
              root.find(el => {
                if (el.node.id === data.id) {
                  el.node.selected = true
                } else {
                  el.node.selected = false
                }
              })
              this.$emit('on-change', {
                data: data
              })
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
      ])
    },
    clearInput () {
      if (this.name === '') {
        this.initData()
      }
    },
    add () {
      this.$refs.add.open(this.list)
    },
    edit () {
      this.$refs.add.open(this.list, this.item)
    },
    del (type) {
      this.$http.post('/rest/pc/api/album/attachment/del/' + this.item.id).then((res) => {
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
</style>
