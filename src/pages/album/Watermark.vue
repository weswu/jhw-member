<template>
  <Modal
    class-name="j_watermark"
    v-model="modal"
    width="885"
    title="设置水印">
    <div style="overflow: hidden;">
      <div class="img-wrap" style="width:500px;height: 500px;">
        <span ref="obj" :style="'color: '+detail.fontColor+'; font-size: '+fontSize+'px;'" v-if="detail.type === 'text'">{{detail.txt}}</span>
        <img ref="obj" :src="'http://img.jihui88.com/'+detail.txt" v-if="detail.type === 'img'">
      </div>
      <Form ref="modalForm" :model="detail" :label-width="75" style="float:left">
        <FormItem label="水印属性：">
          <RadioGroup v-model="detail.type">
            <Radio label="text">文字</Radio>
            <Radio label="img">图片</Radio>
          </RadioGroup>
        </FormItem>
        <div v-if="detail.type === 'text'">
          <FormItem label="名称：">
            <Input v-model="detail.txt" placeholder="请输入名称" class="w144"></Input>
          </FormItem>
          <FormItem label="颜色：">
            <ColorPicker v-model="detail.fontColor"/>
          </FormItem>
          <FormItem label="大小：">
            <InputNumber v-model="fontSize"></InputNumber><span class="j_unit">px</span>
          </FormItem>
        </div>
        <FormItem label="图片：" v-if="detail.type === 'img'">
          <JPictrue :src="detail.image" @on-change="change"/>
        </FormItem>
        <FormItem label="位置：">
          <Select v-model="detail.elocation" class="w144 border"  @on-change="changeLoc">
            <Option :value="item.value" v-for="item in locaList" :key="item.value">{{item.text}}</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import qs from 'qs'
import JPictrue from '@/components/group/j-pictrue'
export default {
  components: {
    JPictrue
  },
  data () {
    return {
      modal: false,
      detail: {
        type: 'text',
        txt: '文字',
        fontColor: '',
        elocation: 'NorthWest'
      },
      fontSize: 12,
      locaList: [
        { text: '左上角', value: 'NorthWest' },
        { text: '正上方', value: 'North' },
        { text: '右上角', value: 'NorthEast' },
        { text: '左居中', value: 'West' },
        { text: '中间', value: 'Center' },
        { text: '右居中', value: 'East' },
        { text: '左下角', value: 'SouthWest' },
        { text: '正下方', value: 'South' },
        { text: '右下角', value: 'SouthEast' }
      ]
    }
  },
  methods: {
    open () {
      this.modal = true
      this.$http.get('/rest/api/watermarkAlbum/detail').then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          this.detail.elocation = this.detail.elocation || 'NorthWest'
          this.fontSize = parseInt(this.detail.fontSize) || 12
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    cancel () {
      this.modal = false
    },
    change (e) {
      this.detail.txt = e.src
    },
    changeLoc () {
      let ch = this.detail.elocation
      let obj = this.$refs.obj.style
      var pWidth = obj.width
      var pHeight = obj.height
      var tCenter = (500 - pWidth) / 2
      var tRight = 500 - pWidth
      var lCenter = (500 - pHeight) / 2
      if (ch === 'NorthWest') {
        obj.left = '0px'
        obj.top = '0px'
      }
      if (ch === 'North') {
        obj.left = tCenter + 'px'
        obj.top = '0px'
      }
      if (ch === 'NorthEast') {
        obj.left = tRight + 'px'
        obj.top = '0px'
      }
      if (ch === 'West') {
        obj.left = '0px'
        obj.top = lCenter + 'px'
      }
      if (ch === 'Center') {
        obj.left = tCenter + 'px'
        obj.top = lCenter + 'px'
      }
      if (ch === 'East') {
        obj.left = tRight + 'px'
        obj.top = lCenter + 'px'
      }
      if (ch === 'SouthWest') {
        obj.left = '0px'
        obj.top = 400 - pHeight + 'px'
      }
      if (ch === 'South') {
        obj.left = tCenter + 'px'
        obj.top = 400 - pHeight + 'px'
      }
      if (ch === 'SouthEast') {
        obj.left = tRight + 'px'
        obj.top = 400 - pHeight + 'px'
      }
    },
    ok () {
      this.detail.fontSize = this.fontSize + 'px'
      let data = {
        model: JSON.stringify(this.detail),
        _method: 'put'
      }
      this.$http.post('/rest/api/watermarkAlbum/detail/' + this.detail.watermarkId, qs.stringify(data)).then((res) => {
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
.j_watermark{
  .img-wrap{
    border: 1px solid #E5E5E5;
    float: left;
    margin: 0 20px 0 0;
    padding: 3px;
    height: 500px;
    width: 500px;
    background: url(http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2016//12//09/e50696ed-7e9b-4456-b09a-81977d0c1379.jpg) no-repeat center center;
    overflow: hidden;
    span,img{
      position: relative;
    }
  }
}
</style>
