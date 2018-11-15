<template>
  <Layout class="j_layout_content j_bind">
    <JHeader :title="'域名绑定'" :website="true" :type="true" :tip="tip"/>
    <div class="j_search">
      <Input v-model="address" class="w180" placeholder="输入新域名" clearable></Input>
      <Button class="submit" @click="add" style="padding:6px 20px">提交</Button>
    </div>
    <Content>
      <Table :columns="columns" :data="list"></Table>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      tip: '温馨提醒：<br/>1、一个网站编号只支持一个机房。如果您变更机房，之前绑定的域名会被清除，请慎重选择。<br/>2、为了在搜索引擎上有更好的排名，这些简单的事情别忘了：<br/>（1）网站上线前，<a href="#/seo">设置SEO</a>（网站标题、关键词、描述）。<br/>（2）网站上线后，<a href="#/sitemap">生成Sitemap</a>；<a href="#/seo_batch">批量提交</a>；接入<a href="#/third_party_statistics">第三方统计</a>。',
      columns: [
        { title: '绑定域名', key: 'address' },
        { title: '所属网站编号', key: 'layoutId' },
        { title: '网站服务器地点', render: this.countryFilter },
        { title: '添加时间', width: 135, render: this.dataFilter },
        { title: '是否绑定', width: 85, render: this.stateFilter },
        { title: '是否上线', width: 85, render: this.onlineFilter },
        { title: '操作', className: 'j_table_operate', width: 115, render: this.renderOperate }
      ],
      list: [],
      address: ''
    }
  },
  computed: {
    ...mapState(['agent'])
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      let url = ''
      if (this.$route.query.layoutId) {
        url = '&layoutId=' + this.$route.query.layoutId
      }
      this.$http.get('/rest/pc/api/bind/bindList?pageSize=100' + url).then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    add () {
      let layoutId = this.$store.state.layoutId
      let staticList = this.$store.state.staticList
      if (staticList.length === 0) {
        return this.$Message.warning('请先<a href="#/static">购买站点</a>才能实现域名的自动绑定')
      }
      if (!layoutId) {
        return this.$Message.warning('请选择右上角站点')
      }
      let data = {
        layoutId: layoutId,
        address: this.address,
        country: 'cn'
      }
      this.$http.post('/rest/pc/api/bind/bindAdd', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功,生效时间10分钟')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 过滤
    countryFilter (h, params) {
      let text = '中国机房'
      if (params.row.country === 'cn') text = '中国机房'
      if (params.row.country === 'en') text = '美国机房'
      if (params.row.country === 'hc') text = '香港机房'
      return h('span', text)
    },
    // 时间格式化
    dataFilter (h, params) {
      return h('div', this.dateFormat(params.row.addTime))
    },
    stateFilter (h, params) {
      let text = '免费用户'
      if (params.row.state === '00') {
        return h('span', [
          h('span', {
            style: {
              color: '#f5a623'
            }
          }, '审核中'),
          h('Poptip', {
            class: {
              state_tip: true
            },
            props: {
              placement: 'right',
              trigger: 'hover',
              width: 310
            }
          }, [
            h('div', {
              slot: 'content',
              style: {
                'white-space': 'normal'
              }
            }, '温馨提示：自动绑定只针对购买过站点的客户，请先购买站点，如有问题，请咨询：' + this.agent.user.cellphone)
          ])
        ])
      }
      if (params.row.state === '01') text = '<span style="color:#417505">是</span>'
      if (params.row.state === '02') text = '<span style="color:#d0021b">否</span>'
      return h('span', {
        domProps: {
          innerHTML: text
        }
      })
    },
    onlineFilter (h, params) {
      let text = '<span style="color:#d0021b">否</span>'
      if (params.row.online === '01') text = '<span style="color:#417505">是</span>'
      if (params.row.online === '00') text = '<span style="color:#d0021b">否</span>'
      return h('span', {
        domProps: {
          innerHTML: text
        }
      })
    },
    renderOperate (h, params) {
      var ctx = this
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$router.push({path: '/bind/' + params.row.bindId})
            }
          }
        }, '操作'),
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
                this.$http.post('/rest/pc/api/bind/bindDel?bindId=' + params.row.bindId).then((res) => {
                  if (res.success) {
                    ctx.$Message.success('删除成功')
                    ctx.list.splice(params.index, 1)
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
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
.state_tip{
  width: 14px;
  height: 14px;
  position: absolute;
  margin-left: 5px;
  &:after{
    content: '?';
    background: #d3d3d3;
    color: #fff;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    text-align: center;
    line-height: 14px;
    cursor: pointer;
    position: absolute;
    font-size: 12px;
  }
}
</style>
