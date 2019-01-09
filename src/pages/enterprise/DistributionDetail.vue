<template>
  <Modal class-name="j_distribution_deatil"
    v-model="modal"
    title="网络分布详情"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit">保存</Button>
    </div>
    <Form ref="modalForm" :model="detail" :label-width="110">
      <FormItem label="省：">
        <Select v-model="detail.province" style="width:200px" @on-change="pSearch">
          <Option v-for="item in cityList" :value="item.areaId" :key="item.areaId" v-if="item.level === 0">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="市：">
        <Select v-model="detail.city" style="width:200px" @on-change="cSearch">
          <Option v-for="item in cityList" :value="item.areaId" :key="item.areaId" v-if="item.level === 1 && item.belongId === detail.province">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="区：">
        <Select v-model="detail.country" style="width:200px">
          <Option v-for="item in cityList" :value="item.areaId" :key="item.areaId" v-if="item.level === 2 && item.belongId === detail.city">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="详细地址：">
        <Input v-model="detail.address" placeholder="请输入详细地址"></Input>
      </FormItem>
      <FormItem label="地图坐标：">
        <Input v-model="detail.point" placeholder="请输入地图坐标"></Input> <a class="a_underline j_unit" href="https://lbs.amap.com/console/show/picker" target="_blank">查看</a>
      </FormItem>
      <Tabs active-key="key1" :animated="false">
        <Tab-pane label="简要信息" key="key1">
          <UE :content='detail.summary' ref='ue' :eWidth="666" :eHeight="350"></UE>
        </Tab-pane>
        <Tab-pane label="详细信息" key="key2">
          <UE :content='detail.detail' ref='ue2' :eWidth="666" :eHeight="350"></UE>
        </Tab-pane>
      </Tabs>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import UE from '@/components/group/j-editor'
export default {
  props: ['cityList'],
  components: {
    UE
  },
  data () {
    return {
      modal: false,
      detail: {},
      rules: {
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        point: [
          { required: true, message: '地图坐标不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (id) {
      this.modal = true
      if (id) {
        this.$refs['modalForm'].resetFields()
        this.$http.get('/rest/api/distribution/distributionDetail?distributionId=' + id).then((res) => {
          if (res.success) {
            this.detail = res.attributes.data
            this.$refs.ue.setUEContent(this.detail.summary)
            this.$refs.ue2.setUEContent(this.detail.detail)
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.detail = {}
        this.$refs.ue.setUEContent('<p><br/></p>')
        this.$refs.ue2.setUEContent('<p><br/></p>')
      }
    },
    cancel () {
      this.modal = false
    },
    pSearch (e) {
      this.detail.city = ''
      this.cityList.forEach(item => {
        if (item.level === 1 && item.belongId === this.detail.province && this.detail.city === '') {
          this.detail.city = item.areaId
          this.cSearch()
        }
      })
    },
    cSearch (e) {
      this.detail.country = ''
      this.cityList.forEach(item => {
        if (item.level === 2 && item.belongId === this.detail.city && this.detail.country === '') {
          this.detail.country = item.areaId
        }
      })
    },
    submit () {
      this.detail.summary = this.$refs.ue.getUEContent()
      this.detail.detail = this.$refs.ue2.getUEContent()
      let url = 'distributionEdit'
      if (!this.detail.distributionId) {
        url = 'distributionSave'
      }
      this.$http.post('/rest/api/distribution/' + url, qs.stringify(this.detail)).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.$emit('on-change')
          this.modal = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_distribution_deatil .ivu-modal{
  width: 700px !important;
  top: 50px;
  .ivu-tabs-nav-scroll{
    margin-left: 10px;
  }
}
</style>
