<template>
  <div class="j_static_website">
    <div class="j_tip" style="margin-top: 13px;">由于互联网信息管理法规，发布网站需要验证你的手机号信息。 <a href="#/account" class="a_underline">立即验证</a></div>
    <Button icon="plus" class="orange" @click="add">创建新网站</Button> 你有0个网站上线了
    <ul class="static_info j_scroll">
      <li class="item" v-for="item in list" :key="item.id">
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
          <span class="type" v-if="!item.url">未上线</span>
        </p>
        <p>
          <span v-if="!item.url">http://pc.jihui88.com/rest/site/{{item.id}}/index</span>
          <span v-else>item.url</span>
          <span class="time" v-if="item.endTime">(到期时间：{{item.endTime | time}})</span>
          <Poptip trigger="hover" placement="top" class="j_poptip_ul" v-if="!item.endTime">
            <a href="javascript:;" class="buy">购买</a>
            <ul slot="content">
              <li><a :href="'http://buy.jihui88.com/#/?tab=tab1&layoutId=' + item.id" target="_blank">自选模板</a></li>
              <li><a :href="'http://buy.jihui88.com/#/?tab=tab2&layoutId=' + item.id" target="_blank">定制设计</a></li>
            </ul>
          </Poptip>
          <a href="javascript:;" class="buy" v-if="item.endTime">续费</a>
          <a :href="'http://buy.jihui88.com/#/?layoutId=' + item.id" class="buy" target="_blank" v-if="item.endTime">升级</a>
        </p>
        <p class="more">
          <a :href="'http://pc.jihui88.com/rest/site/' + item.id + '/index'" target="_blank" class="a_underline">进入编辑</a>
          <Poptip placement="top" class="j_poptip_ul">
            <span class="a_underline">更多选项</span>
            <ul slot="content">
              <li @click="copy(item)"> 复制网站 </li>

              <Poptip placement="right" width="200"
                confirm
                title="是否删除?"
                @on-ok="del">
                <li> 删除网站 </li>
              </Poptip>

              <li @click="update($Message)"> 网站上线 </li>
              <li @click="lanSetting(item)"> 语言设置 </li>
              <li @click="data"> 同步数据 </li>
            </ul>
          </Poptip>
        </p>
      </li>
    </ul>
    <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="pageChange" @get="get"></JPagination>
    <JDialog ref="lan" :title="'设置语言版本'" :tip="'温馨提醒：'"  @on-ok="save" >
      <div slot="content">
        <Select v-model="lan" style="width:144px">
          <Option v-for="item in lanList" :value="item.value" :key="item.value">{{ item.text }}</Option>
        </Select>
      </div>
    </JDialog>
    <JDialog ref="data" :title="'同步数据'" :width="715" :okText="'确定'" :tip="'温馨提醒：同步数据包含（新闻和产品数据），请完善总站的数据后再导数据，导入后“文字内容”需自行修改'"  @on-ok="save" >
      <div slot="content">
        <Form :model="detail" :label-width="120">
          <FormItem label="来源语言版本：">
            <Select v-model="detail.begin" class="border" style="width:144px">
              <Option value="1">中文版</Option>
              <Option value="2">英文版</Option>
            </Select>
          </FormItem>
          <FormItem label="目标语言版本：">
            <Select v-model="detail.end" class="border" style="width:144px">
              <Option value="1">中文版</Option>
              <Option value="2">英文版</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </JDialog>
    <Add ref="add" @on-change="addChange"/>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JPagination from '@/components/group/j-pagination'
import JDialog from '@/components/group/j-dialog'
import Add from '@/components/static/add'
export default {
  props: {
    searchData: {
      type: Object,
      default () {
        return {
          page: 1,
          pageSize: 4
        }
      }
    }
  },
  components: {
    JPagination,
    JDialog,
    Add
  },
  data () {
    return {
      list: [],
      total: 0,
      lan: '1',
      detail: {
        begin: '1',
        end: '2'
      }
    }
  },
  computed: {
    ...mapState({
      lanList: state => state.status.lanList
    })
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/pc/api/baseLayout/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          res.attributes.data.forEach(item => {
            if (item.bind.address) {
              item.url = item.bind.address
            }
            item.seoTitle2 = item.seoTitle
          })
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
          if (res.msg === '未登录') {
            this.get()
          }
        }
      })
    },
    add () {
      this.$refs.add.open()
    },
    addChange () {
      this.searchData.page = 1
      this.get()
    },
    // 分页
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    // 更多
    edit (item) {
      let data = {
        model: JSON.stringify({
          id: item.id,
          seoTitle: item.seoTitle2
        })
      }
      this.$http.post('/rest/pc/baseLayout/detail/' + item.id, qs.stringify(data)).then((res) => {
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
      this.$http.post('/rest/pc/baseLayout/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('复制成功')
          this.list.splice(0, 0, res.attributes.data)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    del (id) {
      this.$http.delete('/rest/pc/baseLayout/detail/' + id).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id === id) {
              this.list.splice(i, 1)
            }
          }
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
        methods: 'put'
      }
      this.$http.post('/rest/pc/baseLayout/languageLayout/' + this.id, qs.stringify(data)).then((res) => {
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
