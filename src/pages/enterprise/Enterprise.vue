<template>
  <Layout class="j_layout ivu-layout-has-sider j_enterprise">
    <MenuBar :data="'menuEnter'" :active="'enterprise'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'基本资料'" :lan="true" :tip="'请完善以下信息，方便我们更好的为您服务'"/>
      <Content>
        <Form :model="user" :rules="rules" :label-width="130" ref="model">
          <span class="title" style="margin-top:0px;">基本信息：</span>
          <FormItem label="公司Logo：">
            <JImage :src="user.enterprise.logo" @on-change="picChange" :width="104"/>
          </FormItem>
          <FormItem label="公司全称：" prop="enterprise.name">
            <Input v-model="user.enterprise.name" placeholder="请输入公司全称"></Input>
          </FormItem>
          <FormItem label="法人：" prop="enterprise.legalPre">
            <Input v-model="user.enterprise.legalPre" placeholder="请输入法人"></Input>
          </FormItem>
          <FormItem label="成立时间：">
            <DatePicker type="date" placeholder="选择时间" v-model="user.enterprise.regTime" @on-change="user.enterprise.regTime=$event"></DatePicker>
          </FormItem>
          <span class="title">联系信息：</span>
          <FormItem label="单位地址：" prop="enterprise.address">
            <Cascader :data="areaList" v-model="address" style="width: 450px;"></Cascader>
          </FormItem>
          <FormItem label="详细地址：" prop="address">
            <Input v-model="user.address" placeholder="请输入详细地址"></Input>
            <Button @click="map" class="submit">地图定位</Button>
          </FormItem>
          <FormItem label="联系电话：">
            <Input v-model="user.phone" placeholder="请输入联系电话"></Input>
          </FormItem>
          <FormItem label="法人手机：">
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
    <Map ref="map"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JImage from '@/components/group/j-image'
import Map from '@/pages/enterprise/Map'
export default {
  components: {
    MenuBar, JHeader, JImage, Map
  },
  computed: {
    ...mapState({
      user: state => state.user,
      lanId: state => state.lanId,
      lanList: state => state.status.lanList
    })
  },
  data () {
    return {
      rules: {
        'enterprise.name': [
          { required: true, message: '公司全称不能为空', trigger: 'blur' }
        ],
        'enterprise.legalPre': [
          { required: true, message: '法人不能为空', trigger: 'blur' }
        ],
        'enterprise.address': [
          { required: true, message: '单位地址不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        cellphone: [
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ]
      },
      areaList: [],
      address: []
    }
  },
  created () {
    this.getArea()
    this.address = this.user.enterprise.address && this.user.enterprise.address.split(',')
  },
  methods: {
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
    picChange (e) {
      this.user.enterprise.logo = e.src
    },
    map () {
      this.$refs.map.open()
    },
    submit () {
      this.$refs['model'].validate((valid) => {
        if (valid) {
          this.user.enterprise.regTime = this.dateFormat(this.user.enterprise.regTime, 'yyyy-MM-dd')
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
