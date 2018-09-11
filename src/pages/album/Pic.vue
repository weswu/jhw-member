<template>
  <div class="j_pic_preview" :style="'width:'+width+'px;height:'+width+'px;'">
    <img :src="'http://img.jihui88.com/' + detail.serverPath" :alt="detail.filename">
    <div class="button-group">
      <JUpload :multiple="false" :show="false" :replace="'01'" :attId="detail.attId" @on-success="handleSuccess">
        <Button slot="content" type="primary" size="small">替换图片</Button>
      </JUpload>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import JUpload from '@/components/group/j-upload'
export default {
  components: {
    JUpload
  },
  data () {
    return {
      detail: {},
      attId: '',
      width: 500
    }
  },
  created () {
    let params = window.location.search.substr(1).split('&')
    params.forEach(item => {
      let arr = item.split('=')
      if (arr[0] === 'attId') {
        this.attId = arr[1]
      }
      if (arr[0] === 'width') {
        this.width = arr[1] || '500'
      }
    })
    this.$http.get('/rest/api/album/attr/img/detail/' + this.attId).then(res => {
      this.detail = res.attributes.data
    })
  },
  methods: {
    handleSuccess (res, file) {
      this.$Message.success('替换成功,图片5分钟左右生效')
      this.refurbish()
    },
    refurbish () {
      let data = {
        serverPath: this.detail.serverPath
      }
      this.$http.post('/rest/api/album/single/refurbish', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.detail.serverPath = this.detail.serverPath + '?0'
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_pic_preview{
  width: 500px;
  height: 500px;
  text-align: center;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .button-group{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    padding: 10px;
  }
}
</style>
