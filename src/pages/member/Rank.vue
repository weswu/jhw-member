<template>
  <Layout class="j_layout ivu-layout-has-sider">
    <MenuBar :data="'menuMember'" :active="'member_rank'"/>
    <Layout class="j_layout_content">
      <Content>
        <JHeader :title="'会员等级配置'"/>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加会员等级</Button>
        </div>
        <Table :columns="columns" :data="list"/>
      </Content>
    </Layout>
    <Detail ref='detail' @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/pages/member/RankDetail'
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
        { title: '等級名称', key: 'name' },
        { title: '折扣', render: this.prefFilter },
        { title: '所需积分', key: 'point' },
        { title: '是否默认', render: this.isDefaultFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: this.$store.state.memberRankList
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('getMemberRank')
    },
    // 上
    add () {
      this.$refs.detail.open()
    },
    // 过滤
    prefFilter (h, params) {
      return h('span', params.row.preferentialScale + '%')
    },
    isDefaultFilter (h, params) {
      return h('span', {
        class: {
          whether: true,
          iconfont: true,
          'icon-x': params.row.isDefault === '00',
          'icon-gou': params.row.isDefault === '01'
        }
      })
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.rankId)
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
                this.$http.post('/rest/api/member/rank/detail/' + params.row.rankId, qs.stringify({_method: 'DELETE'})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    for (let i = 0; i < ctx.list.length; i++) {
                      if (ctx.list[i].rankId === params.row.rankId) {
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
</style>
