<template>
  <div id="container" class="mymap"></div>
</template>

<script>
import qs from 'qs'
import AMap from 'AMap' // 在页面中引入高德地图
import { mapState } from 'vuex'
export default {
  data () {
    return {
      center: {lng: 120.229355, lat: 30.2145}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted () {
    this.loadmap() // 加载地图和相关组件
  },
  methods: {
    loadmap () {
      if (this.user.enterprise.mapaddress) {
        this.center.lng = parseFloat(this.user.enterprise.mapaddress.split(',')[0])
        this.center.lat = parseFloat(this.user.enterprise.mapaddress.split(',')[1])
      }
      let center = [this.center.lng, this.center.lat]
      var map = new AMap.Map('container', {
        resizeEnable: true,
        center: center, // 地图中心点
        zoom: 14 // 地图显示的缩放级别
      })
      console.log(map)
      let marker = new AMap.Marker({ // 添加自定义点标记
        map: map,
        position: center, // 基点位置
        // offset: new AMap.Pixel(-10, -33), // 相对于基点的偏移位置
        draggable: true, // 是否可拖动
        content: '<div class="marker-route"></div>' // 自定义点标记覆盖物内容
      })
      let vm = this
      marker.on('dragend', function (e) {
        vm.center.lng = e.lnglat.lng
        vm.center.lat = e.lnglat.lat
      })
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

<style>
.mymap {
  width: 620px;
  height: 450px;
}
.amap-marker .marker-route {
  position: absolute;
  width: 19px;
  height: 33px;
  color: #e90000;
  background: url(https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png) no-repeat;
  cursor: pointer;
}
</style>
