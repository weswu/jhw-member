<template>
  <Modal
    v-model="modal"
    title="会员属性"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Form ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="属性名称：" prop="name">
        <Input v-model="detail.name" placeholder="请输入属性名称"></Input>
      </FormItem>
      <FormItem label="属性类型：">
        <Select v-model="detail.attributeType" class="border w144">
          <Option :value="item.value" v-for="item in memberAttrList" :key="item.value">{{item.text}}</Option>
        </Select>
      </FormItem>
      <FormItem
        v-for="(item, index) in detail.items"
        v-if="detail.attributeType === 'select' || detail.attributeType === 'checkbox'"
        :key="index"
        :label="'选项'"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: '选项不能为空', trigger: 'blur'}">
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value"></Input>
          </Col>
          <Col span="4" offset="1">
            <Button type="ghost" @click="handleRemove(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="detail.attributeType === 'select' || detail.attributeType === 'checkbox'">
        <Button class="w144" type="dashed" long @click="handleAdd('')" icon="plus-round">添加</Button>
      </FormItem>
      <FormItem label="是否必填：">
        <RadioGroup v-model="detail.isRequired">
          <Radio label="01">是</Radio>
          <Radio label="00">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="是否启用：">
        <RadioGroup v-model="detail.isEnabled">
          <Radio label="01">是</Radio>
          <Radio label="00">否</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      modal: false,
      detail: {},
      rules: {
        name: [
          { required: true, message: '等级名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      memberAttrList: state => state.status.memberAttrList
    })
  },
  methods: {
    open (id) {
      this.modal = true
      var ctx = this
      if (id) {
        this.$refs['modalForm'].resetFields()
        this.$http.get('/rest/api/member/attr/detail/' + id).then((res) => {
          if (res.success) {
            let data = res.attributes.data
            this.detail = data
            if (data.attributeType === 'select' || data.attributeType === 'checkbox') {
              this.detail.items = []
              data.attributeOptionList.forEach(item => {
                ctx.handleAdd(item)
              })
            }
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.detail = {
          attributeType: 'text',
          isRequired: '00',
          isEnabled: '00',
          items: [
            {
              value: '',
              index: 1
            }
          ]
        }
      }
    },
    cancel () {
      this.modal = false
    },
    handleAdd (val) {
      this.detail.items.push({
        value: val
      })
    },
    handleRemove (index) {
      this.detail.items.splice(index, 1)
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.detail.attributeType === 'select' || this.detail.attributeType === 'checkbox') {
            if (this.detail.items.length === 0) return this.$Message.error('完善选项数据')
            let store = []
            this.detail.items.forEach(item => {
              store.push(item.value)
            })
            this.detail.attributeOptionStore = JSON.stringify(store)
          }
          let data = {
            model: JSON.stringify(this.detail)
          }
          let url = ''
          if (this.detail.attId) {
            url = '/' + this.detail.attId
            data._method = 'put'
          }
          this.$http.post('/rest/api/member/attr/detail' + url, qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success('保存成功')
              this.$emit('on-change')
              this.modal = false
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
