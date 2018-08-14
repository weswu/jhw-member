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
                  <input id="tipinput" v-model="name"/>
              </td>
              <td>
                  <Button type="primary" size="small" @click="search">搜索</Button>
                  <Button type="primary" size="small" @click="submit" v-if="$route.path === '/map'">保存</Button>
              </td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import AMap from 'AMap' // 在页面中引入高德地图
export default {
  data () {
    return {
      user: {},
      center: {lng: 120.229355, lat: 30.2145},
      name: '',
      map: '',
      marker: '',
      placeSearch: ''
    }
  },
  mounted () {
    this.loadmap() // 加载地图和相关组件
  },
  methods: {
    get () {
      this.user = JSON.parse(JSON.stringify(this.$store.state.user))
      if (this.user.enterprise.mapaddress) {
        this.center.lng = parseFloat(this.user.enterprise.mapaddress.split(',')[0])
        this.center.lat = parseFloat(this.user.enterprise.mapaddress.split(',')[1])
      }
    },
    open () {
      if (this.marker) {
        this.get()
        this.marker.setPosition([this.center.lng, this.center.lat])
        this.map.setCenter([this.center.lng, this.center.lat])
      }
    },
    loadmap () {
      this.get()
      let center = [this.center.lng, this.center.lat]
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: center, // 地图中心点
        zoom: 13 // 地图显示的缩放级别
      })
      this.marker = new AMap.Marker({ // 添加自定义点标记
        map: this.map,
        position: center, // 基点位置
        // offset: new AMap.Pixel(-10, -33), // 相对于基点的偏移位置
        draggable: true, // 是否可拖动
        content: '<div class="marker-route"></div>' // 自定义点标记覆盖物内容
      })
      let vm = this
      // 移动标签
      this.marker.on('dragend', function (e) {
        vm.center = e.lnglat
      })
      // 点击生成新标点
      this.map.on('click', e => {
        vm.center = e.lnglat
        vm.marker.setPosition([e.lnglat.lng, e.lnglat.lat])
      })
      // 输入提示
      var autoOptions = {
        input: 'tipinput'
      }
      var auto = new AMap.Autocomplete(autoOptions)
      this.placeSearch = new AMap.PlaceSearch({
        map: this.map
      }) // 构造地点查询类
      AMap.event.addListener(auto, 'select', select) // 注册监听，当选中某条记录时会触发
      function select (e) {
        vm.placeSearch.setCity(e.poi.adcode)
        vm.placeSearch.search(e.poi.name) // 关键字查询查询
      }
      // 工具
      this.map.plugin(['AMap.ToolBar'], function () {
        vm.map.addControl(new AMap.ToolBar())
      })
      if (location.href.indexOf('&guide=1') !== -1) {
        this.map.setStatus({scrollWheel: false})
      }
    },
    search () {
      this.placeSearch.search(this.name)
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
          this.$store.commit('setUser', this.user)
          this.$emit('on-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
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
  .mymap {
    width: 650px;
    height: 450px;
  }
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
    padding: 0 3px;
    width: 170px;
    color: #333;
  }
  .column2 {
    padding-left: 25px;
  }
}
</style>
