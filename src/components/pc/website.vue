<template>
  <div class="j_static_website">
    <div class="j_tip" style="margin-top: 13px;">由于互联网信息管理法规，发布网站需要验证您的手机号信息。
      <a href="#/account" class="a_underline">立即验证</a>
      <a href="https://v.qq.com/x/page/f0753d6r4fb.html" class="a_underline" target="_blank" style="margin-left:5px">视频教程</a>
    </div>
    <div v-if="!isSubEmp">
      <Button icon="plus" class="orange yd_website" @click="add">创建新网站</Button> 您有{{onlineCount}}个网站上线了
    </div>
    <ul class="static_info j_scroll">
      <li class="item" v-for="item in list" :key="item.id">
        <p>
          <span class="name">{{item.seoTitle}}</span>
          <Poptip placement="right" class="j_poptip_confirm_edit" v-if="!isSubEmp"
            confirm
            @on-ok="edit(item)">
            <i class="iconfont icon-bianji2"></i>
            <div slot="title">
              <Input v-model="item.seoTitle2" placeholder="请输入网站名称"></Input>
            </div>
          </Poptip>
          <span>(网站编号：
            <Badge dot :count="item.count">
              {{item.id}}
            </Badge>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            语言：<span v-html="lanFilter(item.language)"></span>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            版本：{{item.siteVersion}}
            )</span>
          <!-- 状态 -->
          <span v-html="stateFilter(item.state)"></span>
          <span v-html="onlineFilter(item.bind.online)"></span>
          <span class="country" v-html="countryFilter(item.country)"></span>
        </p>
        <p>
          <a :href="item.url | http" target="_blank" class="url">{{item.url}}</a>
          <span class="time" v-if="item.endTime">(到期时间：{{item.endTime | time}})</span>

          <a href="javascript:;" class="buy" @click="buy(item.id)" v-if="!item.new && !isSubEmp">购买</a>

          <a href="javascript:;" class="buy" v-if="item.new && !isSubEmp" @click="again(item.id)">续费</a>
          <a :href="'http://buy.jihui88.com/#/?layoutId=' + item.id" class="buy" target="_blank" v-if="item.new && !isSubEmp">升级</a>
        </p>
        <p v-if="item.country">
          温馨提醒：您选择的“<span v-html="countryFilter(item.country)"></span><span v-if="item.country === 'en' || item.country === 'hc'">“不需要备案，如果要上线网站，请联系我们：139-6793-8189，我们将帮您免费办理域名绑定。</span>
          <span v-else>”需要备案（大概需要21个工作日的审核时间），请尽早联系我们：139-6793-8189，我们将协助您办理备案手续。</span>
        </p>
        <p class="more" v-if="!isSubEmp">
          <a :href="'http://pc.jihui88.com/pc/design.html?layoutId=' + item.id" target="_blank" class="a_underline" @click="goEdit(item)">进入编辑</a>
          <Poptip placement="top" class="j_poptip_ul">
            <span class="a_underline">更多选项</span>
            <ul slot="content">
              <Poptip placement="right" width="200"
                confirm
                title="是否复制？"
                @on-ok="copy(item)">
                <li> 复制网站 </li>
              </Poptip>

              <li @click="del(item.id)"> 删除网站 </li>

              <li @click="countryChange(item)"> 变更机房 </li>
              <li @click="bind(item.id)"> 网站上线 </li>
              <li @click="lanSetting(item)"> 语言设置 </li>
              <li @click="data"> 同步数据 </li>
            </ul>
          </Poptip>
        </p>
      </li>
    </ul>
    <Modal v-model="modalDel" width="360" class-name="vertical-center-modal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>请谨慎！</span>
      </p>
      <div style="text-align:left;text-indent: 25px;line-height: 1.7;">
        <p>站点（网站编号：{{id}}）将会被彻底删除，站点（网站编号：{{id}}）下的网站页面内容、到期时间等将永久失效（注：公司信息、产品、相册及新闻将会保留）。不建议删除未到期的站点。如果您真的确定要删除站点，请点击【确认】。</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="delItem">确认</Button>
      </div>
    </Modal>
    <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="get"></JPagination>
    <JDialog ref="lan" :title="'设置语言版本'" :tip="'温馨提醒：语言切换仅限中英文。如需其他语言，请联系我们139-6793-8189。'" @on-ok="save" >
      <div slot="content">
        <Select v-model="lan" style="width:144px">
          <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.text }}</Option>
        </Select>
      </div>
    </JDialog>
    <JDialog ref="data" :title="'同步数据'" :width="715" :okText="'确定'" :tip="'温馨提醒：同步数据包含（新闻和产品数据），请完善总站的数据后再导数据，导入后“文字内容”需自行修改'" @on-ok="saveData" >
      <div slot="content">
        <Form :model="detail" :label-width="120">
          <FormItem label="来源语言版本：">
            <Select v-model="detail.begin" class="border w144">
              <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.text }}</Option>
            </Select>
          </FormItem>
          <FormItem label="目标语言版本：">
            <Select v-model="detail.end" class="border w144">
              <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.text }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </JDialog>
    <Again ref="again"/>
    <Buy ref="buy" @on-change="get"/>
    <Add ref="add" @on-change="addChange"/>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JPagination from '@/components/group/j-pagination'
import JDialog from '@/components/group/j-dialog'
import Add from '@/components/pc/add'
import Buy from '@/components/pc/buy'
import Again from '@/pages/cost/Again'
export default {
  props: {
    searchData: {
      type: Object,
      default () {
        return {
          page: 1,
          pageSize: 4,
          sortType: 'desc'
        }
      }
    }
  },
  components: {
    JPagination,
    JDialog,
    Add,
    Buy,
    Again
  },
  data () {
    return {
      list: [],
      listTest: [
        {
          id: '99',
          seoTitle: '我的网站',
          new: false,
          state: '00',
          url: '',
          language: '1',
          count: 1,
          bind: {
            address: '',
            country: '',
            online: '01'
          }
        }
      ],
      total: 0,
      lan: '1',
      detail: {
        begin: '1',
        end: '2'
      },
      onlineCount: 0,
      getCount: 0,
      id: '',
      modalDel: false,
      modal_loading: false,
      ids: '',
      isSubEmp: false
    }
  },
  computed: {
    ...mapState({
      lanList: state => state.status.lanList,
      staticList: state => state.staticList,
      versionType: state => state.status.versionType,
      countryType: state => state.status.countryType,
      userInfo: state => state.userInfo
    })
  },
  created () {
    if (!window.token) {
      var ctx = this
      setTimeout(function () {
        ctx.get()
      }, 500)
    } else {
      this.get()
    }
  },
  watch: {
    userInfo: {
      handler () {
        let pris = this.userInfo.privilege
        if (pris) this.isSubEmp = true
      }
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/pc/api/baseLayout/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          res.attributes.data.forEach(item => {
            if (item.bind.address) {
              item.url = item.bind.address
            } else {
              item.url = 'http://pc.jihui88.com/rest/site/' + item.id + '/index'
            }
            item.new = false
            if (item.endTime) {
              if (item.endTime - (new Date().getTime() + 60 * 60 * 24 * 30 * 1000) > 0) {
                item.new = true
              }
            }
            item.seoTitle2 = item.seoTitle
            item.count = 0
            this.ids && this.ids.split(',').forEach(id => {
              if (item.id === id) {
                item.count = 1
              }
            })
          })
          this.list = res.attributes.data
          this.total = res.attributes.count
          this.onlineCount = res.attributes.onlineCount
          this.getCount = 0
        } else {
          if (res.msgType === 'notLogin' && this.getCount < 3) {
            var ctx = this
            setTimeout(function () {
              ctx.getCount += 1
              ctx.get()
            }, 1000)
          } else {
            this.$Message.error(res.msg)
          }
        }
      })
    },
    add () {
      this.$refs.add.open()
    },
    again (id) {
      this.$refs.again.open(id)
    },
    buy (id) {
      this.$refs.buy.open(id)
    },
    addChange (e) {
      if (e) this.ids = this.ids ? (this.ids + ',' + e.id) : e.id
      this.get()
    },
    goEdit (item) {
      item.count = 0
      if (this.ids) {
        let list = this.ids.split(',')
        list.forEach((id, index) => {
          if (item.id === id) {
            list.splice(index)
          }
        })
        this.ids = list.join()
      }
    },
    // 网站上线
    bind (e) {
      this.$store.commit('setLayoutId', parseInt(e))
      this.$router.push({path: '/bind', query: {layoutId: e}})
    },
    // 更多
    edit (item) {
      let data = {
        model: JSON.stringify({
          id: item.id,
          seoTitle: item.seoTitle2
        }),
        _method: 'put'
      }
      this.$http.post('/rest/pc/api/baseLayout/detail/' + item.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
          item.seoTitle = item.seoTitle2
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    copy (item) {
      let data = {
        model: JSON.stringify({
          title: item.title,
          seoTitle: item.seoTitle,
          language: item.language,
          grade: item.grade,
          name: item.name,
          cellphone: item.cellphone,
          categoryId: item.categoryId,
          entName: item.entName,
          areaPath: item.areaPath,
          copyId: item.id
        })
      }
      this.$http.post('/rest/pc/api/baseLayout/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success({
            content: '复制成功，生成网站编号：<span style="color:#ff6700">' + res.attributes.data.id + '</span>',
            duration: 3
          })
          this.staticList.splice(0, 0, res.attributes.data)
          this.$store.commit('setStaticList', this.staticList)
          this.addChange(res.attributes.data)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    countryChange (item) {
      this.$refs.add.open({title: '变更机房', item: item})
    },
    delItem () {
      this.modal_loading = true
      this.$http.delete('/rest/pc/api/baseLayout/detail/' + this.id).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          for (let i = 0; i < this.staticList.length; i++) {
            if (this.staticList[i].id === this.id) {
              this.staticList.splice(i, 1)
            }
          }
          this.$store.commit('setStaticList', this.staticList)
          this.modal_loading = false
          this.modalDel = false
          this.get()
        } else {
          this.modal_loading = false
          this.$Message.success(res.msg)
        }
      })
    },
    del (id) {
      this.id = id
      this.modalDel = true
    },
    lanSetting (item) {
      this.lan = item.language
      this.id = item.id
      this.$refs.lan.open()
    },
    save () {
      var ctx = this
      let data = {
        model: JSON.stringify({
          id: this.id,
          language: this.lan
        }),
        _method: 'put'
      }
      this.$http.post('/rest/pc/api/baseLayout/languageLayout/' + this.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
          this.list.forEach(item => {
            if (item.id === ctx.id) {
              item.language = this.lan
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    data () {
      this.$refs.data.open()
    },
    saveData () {
      let data = {
        originLanId: this.detail.begin,
        targetLanId: this.detail.end
      }
      this.$http.post('/rest/api/import/synchronousData', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('同步成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 过滤
    lanFilter (val) {
      let text = ''
      if (val === '0') text = '<span class="type">未开通</span>'
      if (val === '1') text = '<span class="type">已开通</span>'
      this.lanList.forEach(item => {
        if (item.value === val) {
          text = item.text
        }
      })
      return text
    },
    stateFilter (val) {
      let text = ''
      if (val === '0') text = '<span class="type">未开通</span>'
      if (val === '1') text = '<span class="type">已开通</span>'
      return text
    },
    onlineFilter (val) {
      let text = ''
      if (val === '00') text = '<span class="type">未上线</span>'
      if (val === '01') text = '<span class="type">已上线</span>'
      return text
    },
    countryFilter (val) {
      let text = ''
      this.countryType.forEach(item => {
        if (item.value === val) {
          text = item.text + '机房'
        }
      })
      return text
    }
  }
}
</script>

<style lang="less">
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    top: 0;
  }
}
.j_static_website .j_poptip_ul{
  .ivu-poptip-popper{
    z-index: 999;
  }
  height: 16px;
  line-height: 16px;
  .ivu-poptip-body {
    .ivu-poptip,.ivu-poptip-rel{
      width: 100%
    }
    .ivu-poptip-popper{
      padding: 0 5px 0 3px;
      text-align: left;
    }
    .ivu-poptip-body{
      padding: 16px 16px 8px;
    }
  }
  li{
    text-align: center;
    a{
      color: #595959;
      display: block
    }
  }
}
.static_info{
  margin-top: 20px;
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  color: #b9b9b9;
  .ivu-badge{
    color: #777;
    padding-right: 5px;
    .ivu-badge-dot{
      background: #ff6700;
    }
  }
  .item{
    border-top: 1px solid #e9e9e9;
    padding: 0 18px;
    &:first-child{
      border-top: none;
    }
    &:hover{
      background: #f9f9fa;
    }
    .name{
      color: #595959;
    }
    i{
      font-size: 12px;
      color: #9dabb5;
      margin-right: 18px;
      cursor: pointer;
    }
    .type{
      background: #d3d3d3;
      color: #fff;
      padding: 3px 5px;
      margin-left: 10px;
      &.red{
        background: #d0021b
      }
      &.green {
        background: #417505
      }
    }
    .country{
      float:right;
    }
    .url {
      color: #b9b9b9;
    }
    .time{
      margin: 0 8px 0 14px;
    }
    .buy{
      color: #939393;
      text-decoration: underline;
      margin-right: 3px;
    }
    .more{
      a{
        margin-right: 18px;
      }
    }
    p{
      border-bottom: 1px solid #e9e9e9;
      line-height: 30px;
      padding: 15px 0;
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
