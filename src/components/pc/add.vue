<template>
  <Modal class-name="j_static_add" width="660"
    v-model="modal"
    :title="title"
    @on-cancel="cancel">
    <div class="j_tip" v-if="show" style="margin-top: 0;">
      温馨提醒：一个站点下只支持一个机房。如果您变更机房，之前绑定的域名会被清除，请慎重选择。
    </div>
    <RadioGroup v-model="detail.country" style="width:100%">
      <Row type="flex" justify="space-between">
          <Col span="12" v-for="item in countryType" :key="item.id">
            <Radio :label="item.value">
                <div :class="{'ivu-checkbox': true, 'ivu-checkbox-checked': item.value === detail.country}">
                  <span class="ivu-checkbox-inner"></span>
                </div>
                <img :src="'platform/img/country' + item.value + '.png'">
                <p>
                  {{item.text}}<br/>
                  ({{item.content}})
                </p>
            </Radio>
          </Col>
      </Row>
    </RadioGroup>

    <div class="submitBtn" v-if="!show">
      <Button class="orange" size="large" @click="submit">现在创建网站</Button>
      <Poptip trigger="click" width="400">
        <a href="javascript:;">把网站放在国内还是国外?</a>
        <div class="a_content" slot="content">
          <p>1.网站的备案，国外空间是不需要备案的，网站做好后可以直接上线，国内空间需要严格的备案审核，需要21个工作日的时间去审核备案，如果网站是要着急上线可以考虑使用国外空间或者不具备备案条件也可以选择使用国外空间。</p>
          <p>2.网站访问速度不一样，因为国内对带宽的限制，使用国外空间可能网站打开速度会比国内空间要慢一些，使用国外空间的好处就是免备案，如果备案资料不齐全的话可以把网站暂时放到国外空间，等资料齐全以后再转移到国内空间。</p>
          <p>3.如果需要在国内搜索引擎（如：百度）上，投付费广告的，是需要备案的。</p>
        </div>
      </Poptip>
    </div>
    <div slot="footer">
      <div class="footer" v-if="show">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="ok">确定</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title: '',
      modal: false,
      show: false,
      detail: {
        country: 'cn'
      },
      countryType: [
        { text: '美国', value: 'en', content: '免备案' },
        { text: '中国大陆', value: 'cn', content: '阿里云主机，需备案' }
      ]
    }
  },
  computed: {
    ...mapState({
      staticList: state => state.staticList
    })
  },
  methods: {
    open (e) {
      if (e) {
        this.title = e.title
        this.detail = JSON.parse(JSON.stringify(e.item))
        this.show = true
      } else {
        this.title = '选择网站服务器地点'
        this.detail = {
          country: 'cn'
        }
        this.show = false
      }
      this.modal = true
    },
    cancel () {
      this.modal = false
    },
    submit (e) {
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
        }),
        country: this.detail.country
      }
      this.$http.post('/rest/pc/api/baseLayout/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success({
            render: h => {
              return h('p', {
                style: {
                  textAlign: 'left'
                },
                domProps: {
                  innerHTML: '网站创建成功（网站编号：<span style="color:#ff6700">' + res.attributes.data.id + '</span>）！<br/>您可以免费试用1个月，您在这期间可以编辑成您想要的网站，内有很多免费的网站模板和版块。<br/>当然也可以联系我们，为您量身定制设计。'
                }
              })
            },
            duration: 15,
            closable: true
          })
          this.staticList.splice(0, 0, res.attributes.data)
          this.$store.commit('setStaticList', this.staticList)
          this.$emit('on-change', res.attributes.data)
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    ok () {
      let data = {
        model: JSON.stringify({
          id: this.detail.id,
          country: this.detail.country
        }),
        _method: 'put'
      }
      this.$http.post('/rest/pc/api/baseLayout/detail/' + this.detail.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('更改完成')
          this.$emit('on-change')
          this.modal = false
          this.$Modal.confirm({
            content: '温馨提醒：如果您之前有绑定过域名的，请前往重新“域名绑定”',
            okText: '前往',
            onOk: () => {
              this.$store.commit('setLayoutId', parseInt(this.detail.layoutId))
              this.$router.push({path: '/bind', query: {layoutId: this.detail.layoutId}})
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.ivu-message-notice-closable .ivu-message-notice-content-text {
    vertical-align: top;
    padding-right: 10px !important;
}
.j_static_add{
  .ivu-modal{
    top: 250px
  }
  .ivu-modal-body{
    padding: 29px 31px;
  }
  .ivu-modal-footer{
    padding: 0;
    .footer{
      padding: 12px 18px 12px 18px;
      overflow: hidden;
    }
  }
  .ivu-col{
    width: 280px;
    height: 175px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: relative;
    .ivu-radio-wrapper{
      width: 100%;
      height: 100%;text-align: center;
      .ivu-radio{
        display: none;
      }
      .ivu-checkbox {
        display: block;text-align: left;
        margin: 14px 0 9px 12px;
        .ivu-checkbox-inner{
          border: 1px solid #12bedb;
          border-radius: 0;
          width: 23px;
          height: 23px;
        }
        .ivu-checkbox-inner:after{
          width: 8px;
          height: 16px;
          left: 7px;
        }
        &.ivu-checkbox-checked .ivu-checkbox-inner{
          background: #fff;
          &:after{
            border: 2px solid #12bedb;
            border-top: 0;
            border-left: 0;
          }
        }
      }
      img{
        width: 125px;
      }
      p{
        color: #9b9b9b;
        font-size: 14px;
        padding-top: 5px;
      }
    }
  }
  .submitBtn{
    text-align: center;
    button.orange{
      width: 335px;
      height: 45px;
      display: block;
      margin: 30px auto 15px auto;
    }
    a{
      color: #707070;
      text-decoration: underline;
      padding-bottom: 20px;
      display: block;
    }
    .a_content{
      white-space: normal;text-align: left;padding: 10px 5px;
      p{
        padding: 5px 0;
        text-indent: 25px;
        line-height: 1.7;
      }
    }
  }
  .bind_state{
    float: right;margin-bottom: 20px;
    span{
      background: #ffa000;
      color: #fff;
      padding: 3px 5px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
