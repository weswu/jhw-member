<template>
  <Layout class="j_layout ivu-layout-has-sider j_enterprise">
    <MenuBar :data="'menuEnter'" :active="'enterprise'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'基本资料'" :lan="true" :tip="'请完善以下信息，方便我们更好的为您服务'"/>
      <Content>
        <Form :model="user" :rules="rules" :label-width="130" ref="model">
          <span class="title" style="margin-top:0px;">基本信息：</span>
          <FormItem label="公司Logo：" prop="enterprise.logo">
            <div @click="pciType('1')">
              <JPictrue :src="user.enterprise.logo" @on-change="picChange" :width="104"/>
            </div>
          </FormItem>
          <FormItem label="公司全称：" prop="enterprise.name">
            <Input v-model="user.enterprise.name" placeholder="请输入公司全称"></Input>
          </FormItem>
          <FormItem label="法人：" prop="enterprise.legalPre">
            <Input v-model="user.enterprise.legalPre" placeholder="请输入法人"></Input>
          </FormItem>
          <FormItem label="成立时间：" prop="enterprise.regTime">
            <DatePicker type="date" placeholder="选择时间" v-model="user.enterprise.regTime" @on-change="user.enterprise.regTime=$event"></DatePicker>
          </FormItem>
          <span class="title">业务信息：</span>
          <FormItem label="主营产品：" prop="enterprise.mainBusiness">
            <Input v-model="user.enterprise.mainBusiness" placeholder="请输入主营产品"></Input>
          </FormItem>
          <FormItem label="网址：">
            <Input v-model="user.url" placeholder="请输入网址"></Input>
          </FormItem>
          <FormItem label="ico图标：">
            <Row :gutter="24" class="ico">
              <Col span="6">
                <div @click="pciType('2')">
                  <JPictrue :src="user.enterprise.icon" @on-change="picChange" :width="51"/>
                </div>
              </Col>
              <Col span="18">
                <p>建议图标上传尺寸：32x32像素</p>
                <a href="https://baike.baidu.com/item/ICO%E5%9B%BE%E6%A0%87" target="_blank">什么是ico图标？</a>
              </Col>
            </Row>
          </FormItem>
          <span class="title">联系信息：</span>
          <FormItem label="单位地址：" prop="enterprise.address">
            <Cascader :data="areaList" v-model="address" style="width: 250px;"></Cascader>
          </FormItem>
          <FormItem label="详细地址：" prop="address">
            <Input v-model="user.address" placeholder="请输入详细地址"></Input>
          </FormItem>
          <FormItem label="联系电话：">
            <Input v-model="user.phone" placeholder="请输入联系电话"></Input>
          </FormItem>
          <FormItem label="法人手机：" prop="enterprise.legalPersonCellphone">
            <Input v-model="user.enterprise.legalPersonCellphone" placeholder="请输入法人手机"></Input>
          </FormItem>
          <FormItem label="传真：">
            <Input v-model="user.fax" placeholder="请输入传真"></Input>
          </FormItem>
          <span class="title">业务联系人信息：</span>
          <FormItem label="姓名：" prop="name">
            <Input v-model="user.name" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="手机：" prop="name">
            <Input v-model="user.cellphone" placeholder="请输入手机"></Input>
          </FormItem>
          <FormItem label="Email：">
            <Input v-model="user.email" placeholder="请输入Email"></Input>
          </FormItem>
          <FormItem label="性别：">
            <Select v-model="user.sex" style="width: 187px;">
              <Option value="00">男</Option>
              <Option value="01">女</Option>
            </Select>
          </FormItem>
          <FormItem label="职务：">
            <Input v-model="user.position" placeholder="请输入Email"></Input>
          </FormItem>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">保存</Button>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState, mapActions } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPictrue from '@/components/group/j-image'
export default {
  components: {
    MenuBar, JHeader, JPictrue
  },
  computed: {
    ...mapState({
      'user': state => state.user,
      'lanId': state => state.lanId,
      lanList: state => state.status.lanList
    })
  },
  data () {
    return {
      rules: {
        'enterprise.logo': [
          { required: true, message: 'logo不能为空', trigger: 'blur' }
        ],
        'enterprise.name': [
          { required: true, message: '公司全称不能为空', trigger: 'blur' }
        ],
        'enterprise.legalPre': [
          { required: true, message: '法人不能为空', trigger: 'blur' }
        ],
        'enterprise.regTime': [
          { required: true, message: '成立时间不能为空', trigger: 'change' }
        ],
        'enterprise.mainBusiness': [
          { required: true, message: '主营产品不能为空', trigger: 'blur' }
        ],
        'enterprise.address': [
          { required: true, message: '单位地址不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        'enterprise.legalPersonCellphone': [
          { required: true, message: '法人手机不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        cellphone: [
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ]
      },
      areaList: [],
      address: [],
      type: ''
    }
  },
  created () {
    this.getArea()
    this.address = this.user.enterprise.address && this.user.enterprise.address.split(',')
  },
  methods: {
    ...mapActions(['lanIdChange']),
    getArea () {
      this.$http.get('/rest/api/area/list').then((res) => {
        if (res.success) {
          this.initArea(res.attributes.data)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    initArea (area) {
      area.forEach(item => {
        if (item.level === 0) {
          this.areaList.push({
            value: item.areaId,
            label: item.name,
            children: []
          })
        }
      })
      area.forEach(item => {
        if (item.level === 1) {
          this.areaList.forEach(row => {
            if (row.value === item.belongId) {
              row.children.push({
                value: item.areaId,
                label: item.name,
                children: []
              })
            }
          })
        }
      })
      area.forEach(item => {
        if (item.level === 2) {
          this.areaList.forEach(row => {
            row.children.forEach(item2 => {
              if (item2.value === item.belongId) {
                item2.children.push({
                  value: item.areaId,
                  label: item.name
                })
              }
            })
          })
        }
      })
    },
    pciType (e) {
      this.type = e
    },
    picChange (e) {
      if (this.type === '1') {
        this.user.enterprise.logo = e.src
      } else {
        this.user.enterprise.icon = e.src
      }
    },
    submit () {
      this.$refs['model'].validate((valid) => {
        if (valid) {
          this.setUser()
          this.setEnterprise()
        }
      })
    },
    setUser () {
      let user = {
        model: JSON.stringify(this.user),
        _method: 'put'
      }
      this.$http.post('/rest/api/user/detail/' + this.user.userId, qs.stringify(user)).then((res) => {
        if (res.success) {
          // this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    setEnterprise () {
      this.user.enterprise.address = this.address.join()
      let data = {
        model: JSON.stringify(this.user.enterprise),
        _method: 'put'
      }
      this.$http.post('/rest/api/enterprise/detail/' + this.user.enterprise.enterpriseId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_enterprise{
  .ivu-form .title{
    margin: 20px 0 0 0;
    font-size: 14px;
    display: block;
  }
  .ico{
    width:300px;float:left;
    .ivu-col-span-18{
      line-height: 1.5;
      padding-left: 0px;
      p{
        color: #b7b7b7;
        padding-top: 7px;
      }
    }
  }
}
</style>
