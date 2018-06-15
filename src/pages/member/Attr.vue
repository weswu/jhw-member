<template>
  <Layout class="j_layout ivu-layout-has-sider j_member_attr">
    <MenuBar :data="'menuMember'" :active="'member_attr'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'会员属性配置'"/>
      <Content>
        <div class="j_search">
          <Button type="info" icon="plus" class="w130" @click="add">添加会员属性</Button>
        </div>
        <DragableTable :list="memberAttrList" :columns="columns" @on-update="tableUpdate"/>
      </Content>
    </Layout>
    <Detail ref='detail' @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Detail from '@/pages/member/AttrDetail'
import DragableTable from '@/components/group/j-dragable-table'
export default {
  components: {
    MenuBar,
    JHeader,
    Detail,
    DragableTable
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '名称', key: 'name', minWidth: 110 },
        { title: '类型', render: this.typeFilter, minWidth: 110 },
        { title: '是否必填', render: this.isRequiredFilter, minWidth: 85 },
        { title: '是否启用', render: this.isEnabledFilter, minWidth: 85 },
        { title: '移序', className: 'j_table_sort', key: 'sort', minWidth: 125, render: this.editFilter },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      listTest: [
        {
          attributeType: 'checkbox',
          name: '爱好',
          sort: 0,
          enterpriseId: 'Enterp_0000000000000000000000039',
          attId: '4028818f4ac894bd014ac8a7a2ee0003',
          addTime: 1420705637087,
          updateTime: 1462867959468,
          isRequired: '01',
          isEnabled: '01',
          attributeOptionList: [
            '唱歌',
            '跳舞',
            '下棋',
            '打乒乓'
          ],
          edittingCell: {
            sort: false,
            api: 'member/attr',
            id: '4028818f4ac894bd014ac8a7a2ee0003'
          }
        }
      ]
    }
  },
  computed: {
    ...mapState(['memberAttrList'])
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('getMemberAttr')
    },
    // 上
    add () {
      this.$refs.detail.open()
    },
    tableUpdate (a, b) {
      this.sortable(a, b, 'member/attr', 'attId')
    },
    // 过滤
    editFilter (h, params) {
      return this.cellEdit(this, h, params)
    },
    typeFilter (h, params) {
      let text = '文本'
      this.memberAttrList.forEach(item => {
        if (item.value === params.row.attributeType) {
          text = item.text
        }
      })
      return h('span', text)
    },
    isRequiredFilter (h, params) {
      return h('span', {
        class: {
          whether: true,
          iconfont: true,
          'icon-x': params.row.isRequired === '00',
          'icon-gou': params.row.isRequired === '01'
        }
      })
    },
    isEnabledFilter (h, params) {
      return h('span', {
        class: {
          whether: true,
          iconfont: true,
          'icon-x': params.row.isEnabled === '00',
          'icon-gou': params.row.isEnabled === '01'
        }
      })
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.attId)
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
                this.$http.post('/rest/api/member/attr/detail/' + params.row.attId, qs.stringify({_method: 'DELETE'})).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.get()
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
.j_member_attr .ivu-table td{
   height: 64px
 }
</style>
