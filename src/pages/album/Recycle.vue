<template>
  <Modal class-name="j_recycle" width="552"
    v-model="modal"
    title="回收站"
    @on-cancel="cancel">
    <div class="picture_panel">
      <div class="picture_header">
        <Breadcrumb separator=">" style="padding-left: 10px;">
          <BreadcrumbItem v-for="(item, index) in menu" :key="index">
            <span @click="breadClick(item, index)" :style="index === active ? 'color: #666' : ''"><i class="iconfont icon-tupian1" v-if="index === 0"></i>{{item.text}}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div class="modal-upload-list j_scroll">
      <ul ref="menu" class="menu j_panel">
        <li @click="restoreImg('item')">还原</li>
        <li @click="cleanAll">清空回收站</li>
        <li @click="delAll('item')">批量删除</li>
        <li @click="selectAll">批量选择</li>
      </ul>
      <div class="modal-upload-item file"
        v-for="item in albumList"
        :key="item.url"
        :class="{active: item._checked}"
        v-if="searchData.page === 1"
        @click="select(item)" @contextmenu.prevent="more($event, item)">
        <i class="iconfont icon-weibiaoti5"></i>
        <div class="modal-upload-item-cover">
          {{item.name}}
        </div>
      </div>
      <div class="modal-upload-item" v-for="item in list" :key="item.url" :class="{active: item._checked}" @click="select(item)" @contextmenu.prevent="more($event, item)">
        <img :src="$store.state.status.IMG_HOST+item.serverPath | picUrl(5)">
        <div class="modal-upload-item-cover">
          {{item.filename}}
        </div>
      </div>
      <div class="j_empty" v-if="(list.length + albumList.length) === 0">
        暂无数据
      </div>
    </div>
    <JPagination :total="total" :searchData='searchData' @on-change="get" style="border-top: 1px solid #e9e9e9;"></JPagination>
  </Modal>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
export default {
  props: {
    menu: {
      type: Array,
      default () {
        return [
          { value: 'all', text: '全部图片' }
        ]
      }
    }
  },
  components: {
    JPagination
  },
  data () {
    return {
      modal: false,
      albumList: [],
      albumListTest: [
        {
          'name': '产品批量上传',
          'state': '01',
          'type': '05',
          'tag': null,
          'enterpriseId': 'Enterp_0000000000000000000049090',
          'adesc': null,
          'userId': 'User_000000000000000000000001220',
          'albumId': 'Album_00000000000000000000008251',
          'parentId': null,
          'mainPic': null,
          'belongId': 'Enterp_0000000000000000000049090',
          'attachList': null,
          'addTime': null,
          'blongType': 'AP',
          'attCount': null,
          'picCount': null,
          'flashList': null,
          'albumId2': '8251',
          _checked: false
        }
      ],
      list: [],
      listTest: [
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '路人超能2',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2017//09//15/cb9ea426-772f-4667-afc3-18ac954008d1.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001403056',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '125.120.86.154',
          filedesc: null,
          uploadTime: 1505440558943,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '路人超能2',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2017//09//15/cb9ea426-772f-4667-afc3-18ac954008d1.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001403056',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '125.120.86.154',
          filedesc: null,
          uploadTime: 1505440558943,
          technicView: null,
          _checked: false
        }
      ],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 20
      },
      id: 'all',
      ids: '',
      albumIds: '',
      item: {},
      toggle: false,
      active: 4
    }
  },
  mounted () {
    var ctx = this
    window.document.addEventListener('click', function (e) {
      if (ctx.$refs.menu) ctx.$refs.menu.style.display = 'none'
    })
  },
  methods: {
    get () {
      this.ids = ''
      this.$http.get('/rest/api/album/attr/recycle/' + this.id + '?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.list = data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    getCate () {
      this.albumIds = ''
      this.$http.get('/rest/api/album/recycle/list?parentId=' + this.id).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.albumList = data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open (id) {
      this.modal = true
      this.id = id
      this.get()
      this.getCate()
    },
    cancel () {
      this.modal = false
    },
    breadClick (item, index) {
      this.id = item.value
      this.active = index
      this.get()
    },
    // 批量操作
    restoreImg (e) {
      if (this.item.attId) {
        this.ids = this.ids + ',' + this.item.attId
      } else {
        this.albumIds = this.albumIds + ',' + this.item.albumId
      }
      let count = 0
      if (this.ids.length > 10) count += 1
      if (this.albumIds.length > 10) count += 1
      this.ids.length > 10 && this.$http.post('/rest/api/album/restoreImg?attIds=' + this.ids).then((res) => {
        if (res.success) {
          count -= 1
          if (count === 0) this.$Message.success('还原成功')
          this.get()
          this.$emit('on-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
      this.albumIds.length > 10 && this.$http.post('/rest/api/album/restore?albumIds=' + this.albumIds).then((res) => {
        if (res.success) {
          count -= 1
          if (count === 0) this.$Message.success('还原成功')
          this.getCate()
          this.$emit('on-cate-change')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    cleanAll () {
      let count = 0
      if (this.list.length > 0) count += 1
      if (this.albumList.length > 0) count += 1
      this.list.length > 0 && this.$http.post('/rest/api/album/attCleanAll').then((res) => {
        if (res.success) {
          count -= 1
          if (count === 0) this.$Message.success('清空回收站成功')
          this.list = []
        } else {
          this.$Message.error(res.msg)
        }
      })
      if (this.albumList.length > 0) {
        let albumIds = ''
        this.albumList.forEach(item => {
          albumIds = albumIds ? (albumIds + ',' + item.albumId) : item.albumId
        })
        this.$http.post('/rest/api/album/recycleDel?albumIds=' + albumIds).then((res) => {
          if (res.success) {
            count -= 1
            if (count === 0) this.$Message.success('清空回收站成功')
            this.albumList = []
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    },
    delAll (e) {
      if (this.item.attId) {
        this.ids = this.ids + ',' + this.item.attId
      } else {
        this.albumIds = this.albumIds + ',' + this.item.albumId
      }
      let count = 0
      if (this.ids.length > 10) count += 1
      if (this.albumIds.length > 10) count += 1
      this.ids.length > 10 && this.$http.post('/rest/api/album/attBatchDel?attIds=' + this.ids).then((res) => {
        if (res.success) {
          count -= 1
          if (count === 0) this.$Message.success('删除成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
      this.albumIds.length > 10 && this.$http.post('/rest/api/album/recycleDel?albumIds=' + this.albumIds).then((res) => {
        if (res.success) {
          count -= 1
          if (count === 0) this.$Message.success('删除成功')
          this.getCate()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 选择
    more (e, item) {
      this.$refs.menu.style.display = 'block'
      let dom = e.target.getBoundingClientRect()
      this.$refs.menu.style.left = dom.left + dom.width / 2 + 'px'
      this.$refs.menu.style.top = dom.top + dom.height / 2 + 'px'
      this.item = item
      this.select()
      e.preventDefault()
    },
    select (e) {
      if (e) e._checked = !e._checked
      this.idsChange()
    },
    selectAll () {
      this.toggle = !this.toggle
      this.list.forEach((item, index) => {
        item._checked = this.toggle
      })
      this.albumList.forEach((item, index) => {
        item._checked = this.toggle
      })
      this.idsChange()
    },
    idsChange () {
      this.ids = ''
      this.list.forEach(item => {
        if (item._checked) {
          this.ids = this.ids ? (this.ids + ',' + item.attId) : item.attId
        }
      })
      this.albumIds = ''
      this.albumList.forEach(item => {
        if (item._checked) {
          this.albumIds = this.albumIds ? (this.albumIds + ',' + item.albumId) : item.albumId
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_recycle .menu{
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 159px;
    border: 1px solid #e0e0e0;
    background: #f0f0f0;
    border-radius: 5px;
    li{
      border-bottom: 1px solid #dfdfdf;
      color: #4c4a46;padding: 4px 0 4px 15px;
      cursor: pointer;
      width: 157px;
    }
    .ivu-poptip,.ivu-poptip-rel{
      width: 100%
    }
  }
</style>
