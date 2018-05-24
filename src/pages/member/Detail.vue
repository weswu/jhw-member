<template>
  <Layout class="ivu-layout-has-sider j_member_detail">
    <MenuBar :data="'menu_member_detail'" :active="active" :detail="true" @on-change="activeChange"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="menuBarList.menu[active].text"/>
      <Content>
        <Form :model="detail" :label-width="130" :rules="rules" ref="modalForm">
          <div class="" :hidden="active !== '0'">
            <FormItem label="账号：" prop="username">
              <Input v-model="detail.username" placeholder="请输入账号" :disabled="this.$route.params.id !== 'add'"></Input>
            </FormItem>
            <FormItem label="昵称：" prop="name">
              <Input v-model="detail.name" placeholder="请输入昵称"></Input>
            </FormItem>
            <FormItem label="密码：" prop="password">
              <Input v-model="detail.password" type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码：" prop="rePassword">
              <Input v-model="detail.rePassword" type="password" placeholder="请再次输入密码"></Input>
            </FormItem>
            <FormItem label="E-mail：">
              <Input v-model="detail.email" type="email" placeholder="请输入E-mail"></Input>
            </FormItem>
            <FormItem label="积分:">
              <InputNumber v-model="detail.point" placeholder="请输入积分" class="w144"></InputNumber>
            </FormItem>
            <FormItem label="预存款:">
              <InputNumber v-model="detail.deposit" placeholder="请输入预存款" class="w144"></InputNumber>
            </FormItem>

            <FormItem label="会员等级：">
              <Select v-model="detail.memberRank.rankId" class="w144">
                <Option v-for="item in memberRankList" :value="item.rankId" :key="item.rankId">
                  {{item.name}}
                </Option>
              </Select>
              <a class="a_normal" href="#/member_rank" style="padding-left:10px;">编辑会员等级</a>
            </FormItem>
            <FormItem label="是否启用：">
              <RadioGroup v-model="detail.isAccountEnabled">
                <Radio label="01">是</Radio>
                <Radio label="00">否</Radio>
              </RadioGroup>
            </FormItem>
            <hr/>
            <FormItem label="注册时间：">
              <DatePicker type="datetime" placeholder="注册时间" v-model="detail.addTime" @on-change="detail.addTime=$event"></DatePicker>
            </FormItem>
            <FormItem label="注册IP:">
              <Input v-model="detail.registerIp" placeholder="请输入注册IP"></Input>
            </FormItem>
          </div>
          <div :hidden="active !== '1'">
            <FormItem
              v-for="(item, index) in detail.items"
              v-if="item.isEnabled === '01'"
              :key="index"
              :label="item.name+'：'"
              :prop="'items.' + index + '.value'"
              :rules="{required: item.isRequired === '01', type: item.attributeType === 'checkbox' ? 'array' : (item.attributeType === 'number' ? 'number' : (item.attributeType === 'date' ? 'date' : '')), message: '内容不能为空', trigger: 'blur'}">
              <Input v-model="item.value" v-if="item.attributeType === 'text'"></Input>
              <InputNumber v-model="item.value" class="w144" v-if="item.attributeType === 'number'"></InputNumber>
              <Input v-model="item.value" v-if="item.attributeType === 'alphaint'"></Input>
              <RadioGroup v-model="item.value" v-if="item.attributeType === 'select'">
                <Radio :label="row" v-for="row in item.attributeOptionList" :key="row">{{row}}</Radio>
              </RadioGroup>
              <CheckboxGroup v-model="item.value" v-if="item.attributeType === 'checkbox'">
                <Checkbox :label="row" v-for="row in item.attributeOptionList" :key="row"></Checkbox>
              </CheckboxGroup>
              <DatePicker type="date" v-model="item.value" @on-change="item.value=$event" class="w144" v-if="item.attributeType === 'date'"></DatePicker>
            </FormItem>
          </div>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit('modalForm')">保存</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    MenuBar,
    JHeader
  },
  data () {
    return {
      active: '0',
      detail: {
        memberRank: {}
      },
      rules: {
        username: [
          { required: this.$route.params.id === 'add', message: '账号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: this.$route.params.id === 'add', message: '密码不能为空', trigger: 'blur' }
        ],
        rePassword: [
          { required: this.$route.params.id === 'add', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      menuBarList: state => state.status.menu_member_detail,
      memberRankList: state => state.memberRankList,
      memberAttrList: state => state.memberAttrList
    })
  },
  created () {
    this.get()
    this.$store.dispatch('getMemberRank')
  },
  methods: {
    get () {
      var ctx = this
      if (this.$route.params.id === 'add') {
        this.detail = {
          memberRank: {},
          isAccountEnabled: '00'
        }
        this.$store.dispatch('getMemberAttr').then((res) => {
          ctx.detail.items = ctx.memberAttrList
        })
      } else {
        this.$http.get('/rest/api/member/detail/' + this.$route.params.id).then(res => {
          if (res.success) {
            let data = res.attributes.data
            // 属性
            data.items = []
            data.memberAttributeMapStore.forEach(item => {
              let obj = item.att
              let val = item.element.substring(1, item.element.length - 1)
              if (obj.attributeType === 'checkbox') {
                obj.value = val.split(',')
              } else if (obj.attributeType === 'number') {
                obj.value = parseInt(val)
              } else {
                obj.value = val
              }
              data.items.push(obj)
            })
            this.detail = data
          }
        })
      }
    },
    // 功能
    activeChange (e) {
      this.active = e
    },
    // 提交
    submit (name) {
      var ctx = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 属性
          let detail = this.detail
          this.detail.items.forEach(item => {
            if (item.isEnabled === '01') {
              if (item.attributeType === 'checkbox') {
                detail[item.attId] = item.value.join()
              } else if (item.attributeType === 'number') {
                detail[item.attId] = item.value + ''
              } else if (item.attributeType === 'date') {
                detail[item.attId] = ctx.dataFormat(item.value, 'yyyy-MM-dd')
              } else {
                detail[item.attId] = item.value
              }
            }
          })
          // 时间组件bug处理
          detail.addTime = ctx.dataFormat(detail.addTime, 'yyyy-MM-dd hh:mm:ss')
          let data = {
            model: JSON.stringify(detail)
          }
          let url = ''
          if (this.detail.memberId) {
            url = '/' + this.detail.memberId
            data._method = 'put'
          } else {
            if (this.detail.password !== this.detail.rePassword) {
              return this.$Message.info('密码不相同')
            }
          }
          this.$http.post('/rest/api/member/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
