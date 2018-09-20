<template>
  <Layout class="ivu-layout-has-sider j_link">
    <MenuBar :data="'menuEnter'" :active="active"/>
    <Layout class="j_layout_content">
      <JHeader :title="title" :lan="true" @on-change="get"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加{{title}}</Button>
        </div>
        <DragableTable
          :list="list"
          :columns="columns"
          @on-update="tableUpdate"/>
      </Content>
    </Layout>
    <Modal
      v-model="modal"
      :title="title"
      @on-cancel="cancel">
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="submit">保存</Button>
      </div>
        <ItemDetail ref='detail' :type="type" @on-change="get"/>
    </Modal>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import DragableTable from '@/components/group/j-dragable-table'
import ItemDetail from '@/pages/enterprise/ItemDetail'
export default {
  props: ['title', 'active', 'type'],
  components: {
    MenuBar,
    JHeader,
    DragableTable,
    ItemDetail
  },
  data () {
    return {
      modal: false,
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '名称', key: 'name', minWidth: 90, render: this.editFilter },
        { title: '地址', key: 'url', minWidth: 90, render: this.editFilter },
        { title: '图片', className: 'j_table_img', minWidth: 90, render: this.imgFilter },
        { title: '排序', className: 'j_table_sort', key: 'lorder', width: 125, render: this.editFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          name: '李五2',
          state: null,
          url: 'g.cn',
          userId: 'User_000000000000000000000000082',
          linkId: 'Link_000000000000000000000000102',
          lorder: 2,
          lanId: 1,
          image: null,
          edittingCell: {
            name: false,
            url: false,
            api: 'link',
            id: 'Link_000000000000000000000000102'
          }
        },
        {
          name: '李五2',
          state: null,
          url: 'g.cn',
          userId: 'User_000000000000000000000000082',
          linkId: 'Link_000000000000000000000000102',
          lorder: 2,
          lanId: 1,
          image: null,
          edittingCell: {
            name: false,
            url: false,
            api: 'link',
            id: 'Link_000000000000000000000000102'
          }
        }
      ]
    }
  },
  created () {
    this.get()
    if (this.type === '01') {
      this.columns[1].title = '链接名称'
      this.columns[2].title = '链接地址'
      this.columns[3].title = '链接图片'
    }
    if (this.type === '02') {
      this.columns[1].title = '合作伙伴名称'
      this.columns[2].title = '合作伙伴地址'
      this.columns[3].title = '合作伙伴图片'
    }
    if (this.type === '03') {
      this.columns[1].title = '名称'
      this.columns[2].title = '团队地址'
      this.columns[3].title = '团队图片'
    }
  },
  methods: {
    get () {
      this.modal = false
      this.$http.get('/rest/api/link/list?page=1&pageSize=200&type=' + this.type).then(res => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item.edittingCell = {
              name: false,
              url: false,
              lorder: false,
              api: 'link',
              id: item.linkId
            }
          })
          this.list = data
        }
      })
    },
    add () {
      this.modal = true
      this.$refs.detail.get('add')
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'link')
    },
    cancel () {
      this.modal = false
    },
    submit () {
      this.$refs.detail.submit()
    },
    // 过滤
    editFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    imgFilter (h, params) {
      return h('div', {
        class: {
          'product-img': true
        }
      }, [
        h('i', {
          class: {
            'iconfont': true,
            'icon-tupian': true
          },
          style: {
            fontSize: '24px',
            padding: '0',
            display: !params.row.image ? 'block' : 'none'
          }
        }),
        h('img', {
          style: {
            display: params.row.image ? 'inline-block' : 'none'
          },
          attrs: {
            src: this.$store.state.status.IMG_HOST + this.picUrl(params.row.image, 4)
          }
        })
      ])
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.modal = true
              this.$refs.detail.get(params.row.linkId)
            }
          }
        }, '修改'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', [
          h('Poptip', {
            props: {
              confirm: true,
              title: '确定要删除吗！',
              width: '170',
              placement: 'top-end'
            },
            on: {
              'on-ok': () => {
                this.$http.delete('/rest/api/link/detail/' + params.row.linkId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.list.splice(params.index, 1)
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
              },
              'on-cancel': () => {
                console.log('cancel')
              }
            }
          }, '删除')
        ])
      ])
    }
  }
}
</script>

<style lang="less">
.j_link .j_table_img{
  img{
    max-width: 48px;
  }
}
</style>
