<template>
  <div class="j_amap">
    <div id="container" class="mymap"></div>
    <div id="myPageTop">
      <table>
          <tr>
              <td>
                  <label>请输入关键字：</label>
              </td>
          </tr>
          <tr>
              <td>
                  <input id="tipinput"/>
              </td>
          </tr>
      </table>
    </div>
  </div>
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
        zoom: 13 // 地图显示的缩放级别
      })
      console.log(map)
      this.marker = new AMap.Marker({ // 添加自定义点标记
        map: map,
        position: center, // 基点位置
        // offset: new AMap.Pixel(-10, -33), // 相对于基点的偏移位置
        draggable: true, // 是否可拖动
        content: '<div class="marker-route"></div>' // 自定义点标记覆盖物内容
      })
      let vm = this
      // 移动标签
      this.marker.on('dragend', function (e) {
        vm.center.lng = e.lnglat.lng
        vm.center.lat = e.lnglat.lat
      })
      // 点击生成新标点
      map.on('click', e => {
        vm.center.lng = e.lnglat.lng
        vm.center.lat = e.lnglat.lat
        vm.marker.setPosition([e.lnglat.lng, e.lnglat.lat])
      })
      // 输入提示
      var autoOptions = {
        input: 'tipinput'
      }
      var auto = new AMap.Autocomplete(autoOptions)
      var placeSearch = new AMap.PlaceSearch({
        map: map
      }) // 构造地点查询类
      AMap.event.addListener(auto, 'select', select) // 注册监听，当选中某条记录时会触发
      function select (e) {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name) // 关键字查询查询
      }
      // 工具
      map.plugin(['AMap.ToolBar'], function () {
        map.addControl(new AMap.ToolBar())
      })
      if (location.href.indexOf('&guide=1') !== -1) {
        map.setStatus({scrollWheel: false})
      }
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
/** 搜索 **/
.j_amap{
  position: relative;
}
#myPageTop {
  position: absolute;
  top: 0;
  right: 5px;
  background: #fff none repeat scroll 0 0;
  border: 1px solid #ccc;
  margin: 10px auto;
  padding:6px;
  font-family: 'Microsoft Yahei', '微软雅黑', 'Pinghei';
  font-size: 14px;
  label {
    margin: 0 20px 0 0;
    color: #666666;
    font-weight: normal;
  }
  input {
    width: 170px;
  }
  .column2 {
    padding-left: 25px;
  }
}
</style>
