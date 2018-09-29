<template>
  <Layout class="ivu-layout-has-sider j_enterprise">
    <MenuBar :data="'menuEnter'" :active="'enterprise'"/>
    <Layout class="j_layout_content j_form_detail">
      <JHeader :title="'基本资料'" :lan="true" :tip="'请完善以下信息，方便我们更好的为您服务'" @on-user="initUser" @on-enterprise="initUser"/>
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
          <FormItem label="单位地址：" prop="enterprise.addresslist">
            <Cascader :data="areaList" v-model="user.enterprise.addresslist" style="width: 450px;"></Cascader>
          </FormItem>
          <FormItem label="详细地址：" prop="address">
            <Input v-model="user.address" placeholder="请输入详细地址"></Input>
            <Button @click="map" class="submit">地图定位</Button>
          </FormItem>
          <FormItem label="邮编：">
            <Input v-model="user.zipcode" placeholder="请输入邮编"></Input>
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
          <FormItem label="手机：" prop="cellphone">
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
            <Input v-model="user.position" placeholder="请输入职务"></Input>
          </FormItem>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" size="small" @click="submit">保存</Button>
      </Footer>
    </Layout>
    <Modal class-name="j_map_modal"
      v-model="modal"
      width="700"
      title="地图定位"
      @on-cancel="cancel">
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="submitMap">保存</Button>
      </div>
      <Map ref="map" v-if="isMap" @on-change="initUser" style="height:450px;"/>
    </Modal>
    <Cropimg ref="cropimg" @on-change="cropChange"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JImage from '@/components/group/j-image'
import Map from '@/pages/enterprise/Amap'
import Cropimg from '@/components/common/cropimg'
export default {
  components: {
    MenuBar, JHeader, JImage, Map, Cropimg
  },
  computed: {
    ...mapState({
      areaList: state => state.areaList
    }),
    userModel () {
      return this.$store.state.user
    }
  },
  watch: {
    userModel () {
      var vm = this
      setTimeout(function () {
        vm.initUser()
      }, 500)
      console.log('user init')
    }
  },
  data () {
    return {
      modal: false,
      isMap: false,
      user: {},
      rules: {
        'enterprise.name': [
          { required: true, message: '公司全称不能为空', trigger: 'blur' }
        ],
        'enterprise.legalPre': [
          { required: true, message: '法人不能为空', trigger: 'blur' }
        ],
        'enterprise.addresslist': [
          { required: true, type: 'array', message: '单位地址不能为空', trigger: 'blur' }
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
      }
    }
  },
  created () {
    if (this.areaList.length === 0) {
      this.$store.dispatch('getAreaList')
    }
    this.initUser()
  },
  methods: {
    initUser () {
      this.user = JSON.parse(JSON.stringify(this.userModel))
    },
    picChange (e) {
      this.$refs.cropimg.open(e.src)
    },
    cropChange (src) {
      this.user.enterprise.logo = src
      this.$store.commit('setUser', this.user)
      this.setEnterprise('single')
    },
    map () {
      this.modal = true
      if (!this.isMap) {
        this.isMap = true
      }
      this.$refs.map && this.$refs.map.open()
    },
    cancel () {
      this.modal = false
    },
    submitMap () {
      this.$refs.map.submit()
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
    setEnterprise (e) {
      this.user.enterprise.regTime = this.dateFormat(this.user.enterprise.regTime, 'yyyy-MM-dd')
      this.user.enterprise.address = this.user.enterprise.addresslist.join()
      let data = {
        model: JSON.stringify(this.user.enterprise),
        _method: 'put'
      }
      this.$http.post('/rest/api/enterprise/detail/' + this.user.enterprise.enterpriseId, qs.stringify(data)).then((res) => {
        if (res.success) {
          if (e !== 'single') this.$Message.success('保存成功')
          this.$store.commit('setUser', this.user)
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
.j_map_modal{
  .map{
    height: 450px
  }
}
</style>
