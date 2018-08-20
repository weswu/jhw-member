<template>
  <div class="j_static_website">
    <div class="j_tip" style="margin-top: 13px;">由于互联网信息管理法规，发布网站需要验证您的手机号信息。
      <a href="#/account" class="a_underline">立即验证</a>
      <a href="https://v.qq.com/x/page/f0753d6r4fb.html" class="a_underline" target="_blank" style="margin-left:5px">视频教程</a>
    </div>
    <Button icon="plus" class="orange" @click="add">创建新网站</Button> 您有{{onlineCount}}个网站上线了
    <ul class="static_info j_scroll">
      <li class="item" v-for="(item, index) in list" :key="item.id">
        <p>
          <span class="name">{{item.seoTitle}}</span>
          <Poptip placement="right" class="j_poptip_confirm_edit"
            confirm
            @on-ok="edit(item)">
            <i class="iconfont icon-bianji2"></i>
            <div slot="title">
              <Input v-model="item.seoTitle2" placeholder="请输入网站名称"></Input>
            </div>
          </Poptip>
          <span>(网站编号：{{item.id}}&nbsp;&nbsp;/&nbsp;&nbsp;语言：<span v-if="item.language === '1'">中文</span><span v-if="item.language === '2'">英文</span>)</span>
          <!-- 状态 -->
          <span class="type" v-if="item.state === '0'">审核中</span>
          <span class="type" v-else-if="item.state === '3'" style="background: #d0021b;">审核未通过</span>
          <span class="type" v-else-if="!item.bind.address">未上线</span>
        </p>
        <p>
          <a :href="item.url | http" target="_blank" class="url">{{item.url}}</a>
          <span class="time" v-if="item.endTime">(到期时间：{{item.endTime | time}})</span>

          <a href="javascript:;" class="buy" @click="buy(item.id)" v-if="!item.new">购买</a>

          <a href="javascript:;" class="buy" v-if="item.new" @click="again(item.id)">续费</a>
          <a :href="'http://buy.jihui88.com/#/?layoutId=' + item.id" class="buy" target="_blank" v-if="item.new">升级</a>
        </p>
        <p class="more">
          <a :href="'http://pc.jihui88.com/pc/design.html?layoutId=' + item.id" target="_blank" class="a_underline">进入编辑</a>
          <Poptip placement="top" class="j_poptip_ul">
            <span class="a_underline">更多选项</span>
            <ul slot="content">
              <li @click="copy(item)"> 复制网站 </li>

              <Poptip placement="right" width="200"
                confirm
                title="是否删除?"
                @on-ok="del(item.id, index)">
                <li> 删除网站 </li>
              </Poptip>

              <li @click="bind(item.id)"> 网站上线 </li>
              <li @click="lanSetting(item)"> 语言设置 </li>
              <li @click="data"> 同步数据 </li>
            </ul>
          </Poptip>
        </p>
      </li>
    </ul>
    <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="get"></JPagination>
    <JDialog ref="lan" :title="'设置语言版本'" :tip="'温馨提醒：'" @on-ok="save" >
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
              <Option value="1">中文版</Option>
              <Option value="2">英文版</Option>
            </Select>
          </FormItem>
          <FormItem label="目标语言版本：">
            <Select v-model="detail.end" class="border w144">
              <Option value="1">中文版</Option>
              <Option value="2">英文版</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </JDialog>
    <Again ref="again"/>
    <Buy ref="buy" @on-change="get"/>
    <Add ref="add" @on-change="get"/>
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
          new: false,
          state: '3',
          url: '',
          bind: {
            address: ''
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
      getCount: 0
    }
  },
  computed: {
    ...mapState({
      lanList: state => state.status.lanList,
      staticList: state => state.staticList
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
      let data = {
        model: JSON.stringify({
          title: '我的网站',
          seoTitle: '我的网站',
          language: '1',
          grade: 1,
          name: '我的网站',
          cellphone: '',
          categoryId: '7',
          entName: '',
          areaPath: ''
        })
      }
      this.$http.post('/rest/pc/api/baseLayout/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('创建成功')
          this.staticList.splice(0, 0, res.attributes.data)
          this.$store.commit('setStaticList', this.staticList)
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    again (id) {
      this.$refs.again.open(id)
    },
    buy (id) {
      this.$refs.buy.open(id)
    },
    // 网站上线
    bind (e) {
      this.$store.commit('setLayoutId', parseInt(e))
      this.$router.push({path: '/bind'})
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
          this.$Message.success('复制成功')
          this.staticList.splice(0, 0, res.attributes.data)
          this.$store.commit('setStaticList', this.staticList)
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    del (id, index) {
      this.$http.delete('/rest/pc/api/baseLayout/detail/' + id).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.list.splice(index, 1)
          for (let i = 0; i < this.staticList.length; i++) {
            if (this.staticList[i].id === id) {
              this.staticList.splice(i, 1)
            }
          }
          this.$store.commit('setStaticList', this.staticList)
          this.total -= 1
        } else {
          this.$Message.success(res.msg)
        }
      })
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
        model: JSON.stringify({
          originLanId: this.detail.begin,
          targetLanId: this.detail.end
        })
      }
      this.$http.post('/rest/api/import/synchronousData', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('同步成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_static_website .j_poptip_ul{
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
      height: 60px;
      line-height: 60px;
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
