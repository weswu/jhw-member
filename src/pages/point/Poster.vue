<template>
  <Layout class="ivu-layout-has-sider j_point_poster">
    <MenuBar :data="'menuPoint'" :active="'poster_list'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'推广'" :tip="'你可以把以下专属于你的推广海报保存到相册，并转发到朋友圈和微信群，即可获取积分和现金抵扣。'"/>
      <Content>
        <div class="j_search">
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="info" class="w130" @click="member">我推广的会员</Button>
              <Button class="info" @click="add">马上推荐朋友</Button>
            </Col>
            <Col>
              <span class="spread-url">我的推广链接：{{url}}
                <Button class="info" v-clipboard:copy="url" v-clipboard:success="onCopy">复制</Button>
              </span>
            </Col>
          </Row>
        </div>
        <div class="j_search">
          <Button class="grey" @click="active = item.value" v-for="(item, index) in btns" :key="index" :class="{primary: active === item.value}">{{item.text}}</Button>
        </div>
        <div class="list j_scroll">
          <div v-for='item in list' :key="item.posterId" class='item' v-if='item.posterCate === active'>
            <img class='extend_img' :src="$store.state.status.IMG_HOST + item.pic | picUrl(4)" v-if="!item.checked">
            <img class='extend_img' :src="item.pic" v-if="item.checked">
            <p class='extend_desc'>{{item.posterDesc}}</p>
            <Button @click='saveImg(item, 1)' type="primary" size="small">保存图片</Button>
            <Poptip placement="top" width="200">
              <Button class="qr" @click='saveImg(item)' type="primary" size="small">微信扫一扫</Button>
              <div class="api" slot="content">
                <img :src="'http://buy.jihui88.com/api/order/qrcode?url=' + item.pic" v-if="item.pic === pic">
              </div>
            </Poptip>
          </div>
        </div>
        <a id="picDownload" :href="pic" style="display:none" target="_blank" download="poster.jpg">下载</a>
      </Content>
    </Layout>
    <Rank ref="rank" v-if="rankBol"/>
    <Modal
      v-model="modal"
      width="460"
      title="我有朋友要购买">
      <div slot="footer">
        <Button type="text" size="large" @click="modal = false">取消</Button>
        <Button type="primary" size="large" @click="submit">确定</Button>
      </div>
      <Form ref="modalForm" :model="m" :label-width="100">
        <FormItem label="朋友姓名：">
          <Input v-model="m.name" placeholder="请输入朋友姓名"></Input>
        </FormItem>
        <FormItem label="朋友公司：">
          <Input v-model="m.company" placeholder="请输入朋友公司"></Input>
        </FormItem>
        <FormItem label="朋友电话：">
          <Input v-model="m.phone" placeholder="请输入朋友电话"></Input>
        </FormItem>
        <FormItem label="推荐人：">
          <Input v-model="m.referee" placeholder="请输入推荐人"></Input>
        </FormItem>
        <FormItem label="说明：">
          <Input v-model="m.content" type="textarea" :rows="3" placeholder="说明..."></Input>
        </FormItem>
      </Form>
    </Modal>
  </Layout>
</template>

<script>
import qs from 'qs'
import jsonp from 'jsonp'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import Rank from '@/pages/point/Rank'
export default {
  components: {
    MenuBar,
    JHeader,
    Rank
  },
  data () {
    return {
      active: 'promotion',
      btns: [
        { text: '知识类', value: 'promotion' },
        { text: '产品类', value: 'product' },
        { text: '促销类', value: 'person' },
        { text: '人物类', value: 'knowledge' }
      ],
      list: [],
      pic: '',
      url: 'http://www.jihui88.com/member/reg_m.html?d=' + (this.$store.state.user.username || 'jihui'),
      rankBol: false,
      // 推荐朋友
      modal: false,
      m: {},
      sf: {
        card_no: '',
        fdbk_subject64: '朋友介绍[v4]',
        fdbk_type: '5'
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/rest/api/comm/poster/list?page=1&pageSize=100').then(res => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item.checked = false
            ctx.list.push(item)
          })
        }
      })
      jsonp('http://fetch.myacg.ga/sina_short_url_proxy_by_yx.php?lurl=' + this.url, {param: 'callback', name: 'yx_callback'}, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          if (data) ctx.url = data[0].url_short
        }
      })
    },
    saveImg (p, type) {
      var ctx = this
      if (p.checked) {
        if (this.pic !== p.pic) { this.pic = p.pic }
        if (type === 1) {
          document.getElementById('picDownload').click()
        }
        return ''
      }
      this.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      var data = {
        pic: 'http://img.jihui88.com/' + p.pic,
        qrcodeWidth: p.qrcodeWidth,
        qrcodeHeight: p.qrcodeHeight,
        username: 'ggggfj',
        qrcodeLeft: p.qrcodeLeft,
        qrcodeTop: p.qrcodeTop,
        posterId: p.posterId,
        qrcode: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w=' + p.qrcodeWidth + '&text=http://www.jihui88.com/member/reg_m.html?d=' + this.$store.state.user.username
      }
      this.$http.post('http://api.jihui88.net/qrcode_poster/api/poster', qs.stringify(data)).then((res) => {
        p.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
        p.checked = true
        ctx.next(p)
      }).catch((result) => {
        setTimeout(function () {
          p.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
          p.checked = true
          ctx.next(p)
        }, 3000)
      })
    },
    next (p) {
      document.getElementById('picDownload').click()
    },
    onCopy (e) {
      this.$Message.info('复制成功 ')
    },
    member () {
      !this.rankBol ? this.rankBol = true : this.$refs.rank.open()
    },
    add () {
      this.modal = true
    },
    submit () {
      var ctx = this
      if (!this.m.name) { return this.$Message.info('朋友姓名不能为空') }
      if (!this.m.company) { return this.$Message.info('朋友公司不能为空') }
      if (!this.m.phone) { return this.$Message.info('朋友电话不能为空') }
      if (!this.m.referee) { return this.$Message.info('推荐人不能为空') }
      this.sf.card_no = this.$store.state.user.username
      this.sf.fdbk_intro1k = '姓名:' + this.m.name + '\n公司:' + this.m.company + '\n电话:' + this.m.phone +
      '\n推荐人:' + this.m.referee + '\n说明:' + this.m.content
      this.$store.commit('setLoading', true)
      this.$http.post('http://crmyun.jihui88.com:9500/api/jihuifeedback.php', qs.stringify(this.sf)).then((res) => {
        ctx.$Message.success('感谢推荐')
        ctx.modal = false
        ctx.m = {}
      })
    }
  }
}
</script>

<style lang="less">
.j_point_poster {
  .spread-url{
    color: #999;
  }
  .list{
    max-height: calc(100vh - 258px);
  }
  .item{
    width: 200px;
    float:left;
    padding: 14px;
    .extend_desc {
      color: #666;
      padding: 15px 0;
    }
    img{
      width: 168px
    }
    .qr{
      float:right
    }
    .ivu-poptip{float: right;}
  }
}
</style>
