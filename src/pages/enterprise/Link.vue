<template>
  <Layout class="j_layout ivu-layout-has-sider j_link">
    <MenuBar :data="'menuEnter'" :active="'link'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'友情链接'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加友情链接</Button>
        </div>
        <Table :columns="columns" :data="list"></Table>
      </Content>
    </Layout>
    <Detail ref='detail'/>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/pages/enterprise/LinkDetail'
export default {
  components: {
    MenuBar,
    JHeader,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '链接名称', key: 'name' },
        { title: '链接地址', key: 'url' },
        { title: '链接图片', className: 'j_table_img', render: this.imgFilter },
        { title: '排序', key: 'lorder', width: 100 },
        { title: '操作', className: 'j_table_operate', width: 120, align: 'right', render: this.renderOperate }
      ],
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/link/list?page=1&pageSize=200').then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    add () {
      this.$refs.detail.open()
    },
    // 过滤
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
            src: 'http://img.jihui88.com/' + this.picUrl(params.row.image, 4)
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
              this.$refs.detail.open(params.row.linkId)
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
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].linkId === params.row.linkId) {
                        ctx.list.splice(i, 1)
                      }
                    }
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
    width: 32px;
  }
}
</style>
