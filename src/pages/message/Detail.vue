<template>
  <Modal
    class-name="j_detail_table"
    v-model="modal"
    title="留言查看"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
    </div>
    <Row>
      <Col span="24">标题：{{model.title}}</Col>
    </Row>
    <Row>
      <Col span="12">发件人:{{model.fromName}}</Col>
      <Col span="12">时间：{{model.addTime | time}}</Col>
    </Row>
    <Row>
      <Col span="12">联系电话:{{model.fromPhone}}</Col>
      <Col span="12">电子邮箱：{{model.fromEmail}}</Col>
    </Row>
    <Row>
      <Col span="24">留言内容：<span v-html="model.content"></span> </Col>
    </Row>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      model: {}
    }
  },
  methods: {
    open (id) {
      this.modal = true
      this.$http.get('/rest/api/message/detail/' + id).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          if (data.content.indexOf('[{"value":"') > -1) {
            var cList = JSON.parse(data.content)
            data.content = ''
            for (var item of cList) {
              if (cList.length === 1 && item.type === 'textarea') { // 单一选项
                data.content = item.value
              } else {
                if (item.label === '姓名') {
                  data.fromName = item.wxNick || item.value
                } else {
                  if (data.content === '') {
                    data.content = item.label + ':' + item.value
                  } else {
                    data.content = data.content + '<br/>' + item.label + ':' + item.value
                  }
                }
              }
            }
          }
          this.model = data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    cancel () {
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_detail_table{
  .ivu-row{
      border-right: 1px solid #e9e9e9;
      &:first-child{
        border-top: 1px solid #e9e9e9;
      }
      .ivu-col{
        padding: 8px 15px;
        color: #666;
        border-left: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
      }
  }
}
</style>
