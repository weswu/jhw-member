<template>
  <div class="j_map" style="width:100%;">
    <!-- 百度地图不用了 -->
    <Input v-model="keyword" placeholder="关键词: 如杭州" style="margin-bottom:10px" class="w180"></Input>
    <baidu-map class="map" :center="center" :zoom="15" ak="YOUR_APP_KEY" @click="clickMap($event)" @ready="handler" style="width:100%;">
      <bm-marker :position="center" :dragging="true" :clicking="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend($event)"></bm-marker>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"></bm-local-search>
    </baidu-map>
  </div>
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
      keyword: '',
      center: {lng: 120.229355, lat: 30.2145}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
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
