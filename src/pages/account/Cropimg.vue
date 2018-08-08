<template>
  <Modal v-model="showCropedImage">
    <p slot="header">图片裁剪</p>
    <div slot="footer">
      <Button type="text" size="large" @click="showCropedImage = false">取消</Button>
      <Button type="primary" @click="handlecrop1" icon="crop">裁剪并上传</Button>
    </div>
    <Row :gutter="10">
        <Col span="24" class="image-editor-con1">
            <div class="cropper">
                <img id="cropimg1" :src="src" alt="">
            </div>
        </Col>
    </Row>
  </Modal>
</template>

<script>
import Cropper from 'cropperjs'
export default {
  data () {
    return {
      cropper1: {},
      showCropedImage: false,
      cropedImg: '',
      src: ''
    }
  },
  mounted () {
    let img1 = document.getElementById('cropimg1')
    this.cropper1 = new Cropper(img1, {
      aspectRatio: 1,
      dragMode: 'move',
      preview: '.preview',
      restore: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      toggleDragModeOnDblclick: false
    })
  },
  methods: {
    handlecrop1 () {
      let file = this.cropper1.getCroppedCanvas().toDataURL()
      this.cropedImg = file
      let imgBase64Data = file
      // 构造上传图片的数据
      let formData = new FormData()
      // 截取字符串
      let photoType = imgBase64Data.substring(imgBase64Data.indexOf(',') + 1)
      // 进制转换
      const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data)
        const byteArrays = []
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize)
          const byteNumbers = new Array(slice.length)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }
          const byteArray = new Uint8Array(byteNumbers)
          byteArrays.push(byteArray)
        }
        const blob = new Blob(byteArrays, {
          type: contentType
        })
        return blob
      }
      const contentType = 'image/jepg'
      const b64Data2 = photoType
      const blob = b64toBlob(b64Data2, contentType)
      formData.append('Filedata', blob, 'client-camera-photo.png')
      this.$http.post('/commonutil/uploadUtil2?username=' + this.$store.state.user.username + '&replace=00&attId=&id=all', formData).then((res) => {
        if (res !== null) {
          this.$emit('on-change', res.split(',')[0].split('http://img.jihui88.com/')[1].replace(/_5/g, ''))
          this.showCropedImage = false
          this.$Message.success('上传成功')
        } else {
          this.$Message.error('上传失败')
        }
      })
    },
    open (src) {
      this.showCropedImage = true
      this.cropper1.replace(this.$store.state.status.IMG_HOST + src)
    }
  }
}
</script>

<style lang="less">
/*!
 * Cropper.js v1.1.2
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2017 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2017-10-18T13:26:08.981Z
 */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:rgba(51,153,255,.75);outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:e-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:n-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:w-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:s-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:e-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:n-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:w-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:ne-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nw-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:sw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:se-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}
/*# sourceMappingURL=cropper.min.css.map */
.cropper{
    box-sizing: border-box;
    border: 1px solid #c3c3c3;
    width: 100%;
    height: 100%;
    img{
        max-height: 100%;
    }
}
.image-editor-con1{
    height: 300px;
    &-preview-con{
        width: 100% !important;
        height: 200px !important;
        border: 1px solid #c3c3c3;
        .preview{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
}
</style>
