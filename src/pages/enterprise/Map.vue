<template>
  <Modal class-name="j_map"
    v-model="modal"
    width="650"
    title="地图定位"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit('modalForm')">保存</Button>
    </div>
    <Input v-model="keyword" placeholder="关键词: 如杭州" style="margin-bottom:10px" class="w180"></Input>
    <baidu-map class="map" :center="center" :zoom="15" ak="YOUR_APP_KEY" @click="clickMap($event)" @ready="handler">
      <bm-marker :position="center" :dragging="true" :clicking="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend($event)"></bm-marker>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"></bm-local-search>
    </baidu-map>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import { BaiduMap, BmMarker, BmNavigation, BmLocalSearch } from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmMarker,
    BmNavigation,
    BmLocalSearch
  },
  data () {
    return {
      modal: false,
      keyword: '',
      center: {lng: 120.229355, lat: 30.2145}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created () {
    this.modal = true
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      map.width = 620
      map.height = 450
      if (this.user.enterprise.mapaddress) {
        this.center.lng = this.user.enterprise.mapaddress.split(',')[0]
        this.center.lat = this.user.enterprise.mapaddress.split(',')[1]
      }
    },
    open () {
      this.modal = true
    },
    cancel () {
      this.modal = false
    },
    dragend (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    clickMap (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    submit () {
      this.user.enterprise.mapaddress = this.center.lng + ',' + this.center.lat
      this.user.enterprise.regTime = this.dateFormat(this.user.enterprise.regTime, 'yyyy-MM-dd')
      let data = {
        model: JSON.stringify(this.user.enterprise),
        _method: 'put'
      }
      this.$http.post('/rest/api/enterprise/detail/' + this.user.enterprise.enterpriseId, qs.stringify(data)).then((res) => {
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
.j_map{
  .map {
    width:100%;
    height:450px;
  }
}
</style>
