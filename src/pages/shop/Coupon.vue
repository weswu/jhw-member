<template>
  <Layout class="j_layout_content">
    <JHeader :title="'营销管理'">
      <div slot="btn">
        <Select v-model="searchData.listType" class="primary" @on-change="get" style="width:167px">
          <Option value="1">所有优惠券</Option>
          <Option value="2">未开始</Option>
          <Option value="3">进行中</Option>
          <Option value="4">已结束</Option>
        </Select>
      </div>
    </JHeader>
    <Content>
      <div class="j_search j_search_41">
        <Row type="flex" justify="space-between">
          <Col>
            <Button type="info" icon="plus" class="w130" @click="url('/coupon/add')">添加优惠券</Button>
          </Col>
          <Col>
            <Input v-model="searchData.name" class="w144" placeholder="请输入优惠券名称" clearable @on-change="clearInput"></Input>
            <Button class="search" @click="search">搜索</Button>
            <a :href="'http://www.jihui88.com/member/mem_s.html#/coupon_ent_list/'+$store.state.user.enterpriseId" target="_blank">
              <Button class="info">领取优惠卷网址</Button>
            </a>
          </Col>
        </Row>
      </div>
      <Table :columns="columns" :data="list"/>
      <JPagination :checkbox="true" :total="total" :searchData='searchData' @on-change="get"/>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JHeader,
    JPagination
  },
  data () {
    return {
      columns: [
        { type: 'index2', title: '序号', align: 'center', width: 60, render: this.indexFilter },
        { title: '优惠券名称', render: this.nameFilter },
        { title: '价值(元)', ellipsis: true, render: this.amountFilter },
        { title: '领取限制', ellipsis: true, render: this.countFilter },
        { title: '有效期', ellipsis: true, render: this.timeFilter },
        { title: '领取人/次', width: 90, render: this.gainFilter },
        { title: '已使用', width: 75, key: 'gainUseCount' },
        { title: '操作', className: 'j_table_operate', width: 120, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          gainCount: 2,
          gainMemberCount: 1,
          gainUseCount: 0,
          productList: null,
          name: '优惠券指定产品测试',
          state: '01',
          count: 200,
          scope: 'Product_000000000000000000602353',
          endTime: 1684313856786,
          theme: '2',
          enterpriseId: 'Enterp_0000000000000000000049090',
          threshold: null,
          quantity: 0,
          addTime: 1525683533788,
          couponId: 'Coupon_0000000000000000000001161',
          israndom: '02',
          amount: 10,
          thresholdtype: '01',
          scopeType: '02',
          updateTime: null,
          amountend: null,
          memberrankId: '0',
          beginTime: 1525683456786,
          pic: null
        }
      ],
      searchData: {
        page: 1,
        pageSize: 10,
        listType: '1'
      },
      total: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/coupon/list?' + qs.stringify(this.searchData)).then(res => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    // 功能
    search () {
      this.searchData.page = 1
      this.get()
    },
    // 搜索
    clearInput () {
      if (this.searchData.name === '') {
        this.get()
      }
    },
    // 过滤
    indexFilter (h, params) {
      return h('span', params.index + (this.searchData.page - 1) * this.searchData.pageSize + 1)
    },
    nameFilter (h, params) {
      return h('span', [
        h('Poptip', {
          props: {
            placement: 'right',
            trigger: 'hover'
          }
        }, [
          h('a', {
            attrs: {
              href: 'http://www.jihui88.com/member/mem_s.html#/coupon_receive/' + params.row.couponId,
              target: '_blank'
            }
          }, params.row.name),
          h('img', {
            slot: 'content',
            attrs: {
              src: 'http://wcd.jihui88.com/rest/comm/qrbar/createAndDownload?w=300&text=' + encodeURIComponent('http://www.jihui88.com/member/mem_s.html#/coupon_receive/' + params.row.couponId)
            },
            style: {
              width: '150px'
            }
          })
        ])
      ])
    },
    amountFilter (h, params) {
      return h('div', [
        h('div', {
          class: {
            'text-color': true
          }
        }, params.row.amount),
        h('span', '最低消费: ' + (params.row.thresholdtype !== '01' ? '￥' + params.row.threshold : '不限制'))
      ])
    },
    countFilter (h, params) {
      return h('div', [
        h('div', {
          class: {
            'text-color': true
          }
        }, '一人' + (params.row.quantity === 0 ? '无限' : params.row.quantity) + '张'),
        h('span', '库存: ' + (params.row.count - params.row.gainCount))
      ])
    },
    timeFilter (h, params) {
      return h('div', [
        h('div', this.dateFormat(params.row.beginTime, 'yyyy-MM-dd hh:mm:ss') + ' 至'),
        h('span', this.dateFormat(params.row.endTime), 'yyyy-MM-dd hh:mm:ss')
      ])
    },
    gainFilter (h, params) {
      return h('span', [
        h('a', {
          attrs: {
            href: '#/coupon_r/' + parseInt(params.row.couponId.split('Coupon_')[1])
          }
        }, params.row.gainCount),
        h('span', '/' + params.row.gainCount)
      ])
    },
    renderOperate (h, params) {
      var ctx = this
      if (params.row.state === '02') {
        return h('span', '已失效')
      } else {
        return h('div', [
          h('a', {
            attrs: {
              href: '#/coupon/' + parseInt(params.row.couponId.split('Coupon_')[1])
            }
          }, '修改'),
          h('span', {
            class: { delimiter: true }
          }, '|'),
          h('a', {
            on: {
              click: () => {
                let data = {
                  model: JSON.stringify({
                    id: params.row.couponId,
                    state: '02',
                    editField: true
                  }),
                  _method: 'put'
                }
                this.$http.post('/rest/api/coupon/detail/' + params.row.couponId, qs.stringify(data)).then((res) => {
                  if (res.success) {
                    params.row.state = '02'
                    ctx.$Message.success('操作成功')
                  } else {
                    ctx.$Message.success(res.msg)
                  }
                })
              }
            }
          }, '使失效')
        ])
      }
    }
  }
}
</script>

<style lang="less">
.j_shop{
  .ivu-table-body td{
    color: #5b5b5b
  }
}
</style>
