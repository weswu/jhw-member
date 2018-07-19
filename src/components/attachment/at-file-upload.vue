<template>
  <Upload ref="upload" :action="'/rest/pc/api/upload/uploadAttachment?albumId=' + albumId"
    :headers="headers"
    :multiple="true"
    :show-upload-list="true"
    name="Filedata"
    :max-size="10240"
    :on-success="handleSuccess"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload">
    <slot name="content"></slot>
  </Upload>
</template>

<script>
export default {
  props: {
    albumId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: {
        'X-CSRF-Token': window.token
      }
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleSuccess (res, file) {
      var ctx = this
      setTimeout(function () {
        ctx.$refs.upload.clearFiles()
      }, 3000)
      if (res.success) {
        this.$emit('on-success', res.attributes)
      } else {
        this.$Message.error(res.msg)
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文档' + file.name + '格式不正确',
        desc: '我们支持以下格式的文档上传：<br/>MS Office文档：doc，docx，ppt，pptx，xls，xlsx，rtf，<br/>WPS office系列：wps，et，dps，<br/>PDF：pdf<br>纯文本：txt'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文档大小限制',
        desc: '文档' + file.name + '太大，不能超过10M。'
      })
    },
    handleBeforeUpload (file) {
      const check = this.uploadList.length < 10
      if (!check) {
        this.$Notice.warning({
          title: '每次最多可以上传10份文档'
        })
      }
      return check
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
