<template>
  <Upload ref="upload" :action="'/commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=' + replace + '&attId=' + attId + '&id=' + id"
    :multiple="multiple"
    :show-upload-list="show"
    name="Filedata"
    :max-size="2048"
    :on-success="handleSuccess"
    :on-exceeded-size="handleMaxSize">
    <slot name="content"></slot>
  </Upload>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: 'all'
    },
    attId: {
      type: String,
      default: ''
    },
    replace: {
      type: String,
      default: '00'
    }
  },
  methods: {
    handleSuccess (res, file) {
      var ctx = this
      setTimeout(function () {
        ctx.$refs.upload.clearFiles()
      }, 3000)
      let obj = {}
      if (res !== null) {
        obj = {
          id: res.split(',')[1],
          src: res.split(',')[0].split('http://img.jihui88.com/')[1].replace(/_5/g, ''),
          name: res.split(',')[2]
        }
      }
      this.$emit('on-success', obj)
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + file.name + ' 太大，不能超过2M。'
      })
    }
  }
}
</script>

<style lang="less">
// 上传
.ivu-upload-list{
  position: absolute;
  z-index: 99;
  background: #fff;
  border: 1px solid #f0f0f0;
}
</style>
