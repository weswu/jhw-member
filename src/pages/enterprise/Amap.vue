<template>
  <div class="j_map">
    <div id="container" class="map"></div>
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
    <div class="button-group">
      <Button type="primary" size="small" @click="lanChange('en')">查看英文</Button>
      <Button type="primary" size="small" @click="lanChange('zh_en')">查看中英文</Button>
      <Button type="primary" size="small" @click="lanChange('zh_cn')">查看中文</Button>
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
      placeSearch: '',
      count: 0
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      let vm = this
      this.user = JSON.parse(JSON.stringify(this.$store.state.user))
      if (!this.user.userId && this.count < 3) {
        setTimeout(function () {
          vm.get()
          vm.count += 1
        }, 500)
      } else if (this.user.enterprise.mapaddress) {
        this.center.lng = parseFloat(this.user.enterprise.mapaddress.split(',')[0])
        this.center.lat = parseFloat(this.user.enterprise.mapaddress.split(',')[1])
        this.loadmap() // 加载地图和相关组件
      } else {
        this.loadmap()
      }
    },
    open () {
      this.user = JSON.parse(JSON.stringify(this.$store.state.user))
      if (this.marker) {
        if (this.user.enterprise.mapaddress) {
          this.center.lng = parseFloat(this.user.enterprise.mapaddress.split(',')[0])
          this.center.lat = parseFloat(this.user.enterprise.mapaddress.split(',')[1])
        } else {
          this.center = {lng: 120.229355, lat: 30.2145}
        }
        let center = [this.center.lng, this.center.lat]
        this.marker.setPosition(center)
        this.map.setCenter(center)
        if (this.$store.state.lanId === '2') {
          this.map.setLang('zh_en')
        } else {
          this.map.setLang('zh_cn')
        }
      }
    },
    loadmap () {
      let vm = this
      let center = [this.center.lng, this.center.lat]
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: center, // 地图中心点
        zoom: 13 // 地图显示的缩放级别
      })
      if (this.$store.state.lanId === '2') {
        this.map.setLang('zh_en')
      } else {
        this.map.setLang('zh_cn')
      }
      this.marker = new AMap.Marker({ // 添加自定义点标记
        map: this.map,
        position: center, // 基点位置
        // offset: new AMap.Pixel(-10, -33), // 相对于基点的偏移位置
        draggable: true, // 是否可拖动
        content: '<div class="marker-route"></div>' // 自定义点标记覆盖物内容
      })
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
    lanChange (e) {
      this.map.setLang(e)
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
.j_map{
  position: relative;
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
  }
}
.button-group{
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  padding: 10px;
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
