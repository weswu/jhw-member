<template>
  <Modal
    v-model="modal"
    title="链接添加">
    <Form ref="modalForm" :model="detail" :label-width="120">
      <FormItem label="关键字名称：">
        <Input v-model="detail.keywords" placeholder="请输入关键字名称" style="width:144px;"></Input>
        <span class="j_unit">
        <!-- 优化添加关键词库 -->
        <Poptip placement="bottom" width="400" style="margin-right:5px;">
          <Icon type="plus-circled" size="16" color="green" @click="getKey"></Icon>
          <div class="j_keyword_store" slot="content">
            <ul>
              <li v-for="(item, index) in keylist" :key="index" :title="item.keywords" @click="saveKey(item.keywords)">
                {{item.keywords}}
              </li>
              <li class="j_keyword_empty" v-if="list.length === 0">暂无关键词</li>
            </ul>
          </div>
        </Poptip>
        如："互联网"、"手机"等关键字</span>
      </FormItem>
      <FormItem label="内部链接地址：">
        <Select v-model="detail.toReplace" class="w144" v-if="!type">
          <Option :value="item.value" v-for="item in list" :key="item.value">{{item.text}}</Option>
        </Select>
        <Input v-model="detail.toReplace" style="width:144px;" v-if="type"></Input>
        <span class="a_underline j_unit" @click="type = !type">使用<span v-if="!type">外</span><span v-if="type">内</span>部链接</span>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    list: Array
  },
  data () {
    return {
      modal: false,
      detail: {},
      type: false,
      keylist: []
    }
  },
  methods: {
    open (id) {
      this.modal = true
    },
    cancel () {
      this.modal = false
    },
    getKey () {
      if (this.keylist.length === 0) {
        this.$http.get('/rest/api/keywords/list?pageSize=500').then((res) => {
          if (res.success) {
            let data = res.attributes.data
            data.forEach(item => {
              item._checked = false
            })
            this.keylist = data || []
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    },
    saveKey (e) {
      this.detail.keywords = e
    },
    ok () {
      if (!this.detail.keywords) return this.$Message.info('关键字名称不能为空')
      this.$http.post('/rest/api/keywords/innerLinks/detail', qs.stringify(this.detail)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
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
</style>
