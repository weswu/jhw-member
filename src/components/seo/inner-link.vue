<template>
  <div class="j_seo_inner_link">
    <div class="j_search">
      <Row type="flex" justify="space-between">
        <Col>
          <Button type="info" icon="plus" class="w130" @click="add">添加链接</Button>
        </Col>
        <Col>
          <Button class="info" @click="openSys">{{sysLink}}</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="columns" :data="list"/>
    <JPagination :fixed="true" :borderTop="true" :total="total" :searchData='searchData' @on-change="get"/>
    <Detail ref="detail" :list="navList" @on-change="get"/>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/components/seo/inner-link-detail'
export default {
  components: {
    JPagination,
    Detail
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '关键字名称', key: 'keywords' },
        { title: '内部链接地址', render: this.linkFilter },
        { title: '操作', className: 'j_table_operate', width: 130, render: this.renderOperate }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 10
      },
      sysLink: '已开启系统分类链接',
      navList: []
    }
  },
  computed: {
    ...mapState(['layoutId'])
  },
  watch: {
    layoutId () {
      this.get()
      this.getNav()
    }
  },
  created () {
    this.get()
    this.getNav()
  },
  methods: {
    get () {
      this.searchData.layoutId = this.$store.state.layoutId || ''
      this.$http.get('/rest/api/keywords/innerLinks/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
          this.sysLink = res.attributes.model.sysLink
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    getNav () {
      let data = {
        page: 1,
        pageSize: 100,
        layoutId: this.layoutId
      }
      this.$http.get('/rest/pc/api/navigator/list?' + qs.stringify(data)).then((res) => {
        if (res.success) {
          this.navList = res.attributes.data
        }
      })
    },
    // 功能
    add () {
      this.$refs.detail.open()
    },
    openSys () {
      this.$http.get('/rest/api/keywords/innerLinks/openSys').then((res) => {
        if (res.success) {
          this.sysLink = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 过滤
    indexFilter (h, params) {
      return this.index2(this, h, params)
    },
    linkFilter (h, params) {
      let text = params.row.toReplace || ''
      if (text.indexOf('http') > -1) {
        return h('div', text)
      } else {
        let option = []
        this.navList.forEach(item => {
          option.push(h('Option', {
            props: {
              value: item.page
            }
          }, item.name))
        })
        return h('Select', {
          props: {
            value: params.row.toReplace
          },
          on: {
            'on-change': (val) => {
              params.row.toReplace = val
              let data = {
                model: JSON.stringify({
                  id: params.row.keywordsId,
                  layoutId: this.layoutId,
                  toReplace: val
                }),
                _method: 'put'
              }
              this.$http.post('/rest/api/keywords/innerLinks/detail/' + params.row.keywordsId, qs.stringify(data)).then((res) => {
                if (res.success) {
                  console.log('修改成功')
                }
              })
            }
          }
        }, option)
      }
    },
    renderOperate (h, params) {
      var ctx = this
      return h('a', [
        h('Poptip', {
          props: {
            confirm: true,
            title: '确定要删除吗！',
            width: '170',
            placement: 'top-end'
          },
          on: {
            'on-ok': () => {
              this.$http.delete('/rest/api/keywords/innerLinks/detail/' + params.row.keywordsId).then((res) => {
                if (res.success) {
                  ctx.$Message.success('删除成功')
                  ctx.list.splice(params.index, 1)
                  ctx.total -= 1
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
    }
  }
}
</script>

<style lang="less">

</style>
