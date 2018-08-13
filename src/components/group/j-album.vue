<template>
  <Modal class-name="j_pictrue_upload"
    v-model="modal" :width="width"
    :title="title"
    @on-ok="ok"
    @on-cancel="cancel"
    cancelText="取消">
    <Layout class="ivu-layout-has-sider">
    <Cateogy @on-change="categoryChange"/>
    <Content class="">
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="searchData.filename" class="w144" clearable placeholder="搜索图片名称" @on-change="clearInput"></Input>
            <Button class="search" @click="get">搜索</Button>
          </Col>
          <Col>
            <JUpload :id="albumId" @on-success="handleSuccess">
              <Button type="info" slot="content"><i class="iconfont icon-shangchuan"></i>上传图片到当前目录</Button>
            </JUpload>
          </Col>
        </Row>
      </div>
      <div class="modal-upload-list">
        <div class="modal-upload-item" v-for="item in list" :key="item.url" :class="{active: item._checked}" @click="select(item)">
          <img :src="$store.state.status.IMG_HOST+item.serverPath | picUrl(5)">
          <div class="modal-upload-item-cover">
            {{item.filename}}
          </div>
        </div>
        <div v-if="list.length === 0">
          暂无数据
        </div>
      </div>
      <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    </Content>
  </Layout>
  </Modal>
</template>

<script>
import qs from 'qs'
import Cateogy from '@/pages/album/AlbumCategory'
import JPagination from '@/components/group/j-pagination'
import JUpload from '@/components/group/j-upload'
export default {
  props: {
    title: {
      type: String,
      default: '上传图片'
    },
    width: {
      type: String,
      default: '800'
    },
    type: {
      type: String,
      default: 'single'
    }
  },
  components: {
    Cateogy,
    JPagination,
    JUpload
  },
  data () {
    return {
      modal: false,
      listTest: [],
      list: [
        {
          state: '01',
          type: '01',
          content: null,
          sort: 64,
          filename: 'timg.jpg',
          userId: 'User_000000000000000000000000082',
          belongId: null,
          serverPath: 'upload//g//g2//ggggfj//picture//2017//06//01/2be1866b-8f23-42a3-b34e-2cc5cfcbe2f9.jpg',
          attId: 'Attach_0000000000000000001353018',
          belongType: 'AD',
          storeType: null,
          serverIp: '125.120.83.147',
          filedesc: null,
          uploadTime: 1496296124960,
          technicView: null,
          linkUrl: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: 63,
          filename: '大逃杀.jpg',
          userId: 'User_000000000000000000000000082',
          belongId: null,
          serverPath: 'upload//g//g2//ggggfj//picture//2017//06//01/94526c88-cd49-4a3f-a75e-b6a4d29b3378.jpg',
          attId: 'Attach_0000000000000000001353022',
          belongType: 'AD',
          storeType: null,
          serverIp: '125.120.83.147',
          filedesc: null,
          uploadTime: 1496300661556,
          technicView: null,
          linkUrl: null,
          _checked: false
        }
      ],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 20
      },
      imglist: [],
      albumId: 'all'
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/attr/list/' + this.albumId + '?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.list = data || []
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open () {
      this.modal = true
      this.get()
    },
    cancel () {
      this.modal = false
    },
    // 功能
    clearInput () {
      if (this.searchData.filename === '') {
        this.get()
      }
    },
    categoryChange (e) {
      this.albumId = e.data.id
      this.get()
    },
    handleSuccess (res) {
      let data = []
      if (this.type === 'many') {
        data.push(res)
        this.$emit('on-change', data)
      } else {
        this.$emit('on-change', res)
      }
      this.modal = false
    },
    // 编辑器 选中的图片
    initList () {
      this.list.forEach(function (item) {
        item._checked = false
      })
    },
    // 完成
    select (e) {
      e._checked = !e._checked
      this.imglist = []
      if (this.type === 'many') {
        this.list.forEach(item => {
          if (item._checked) {
            this.imglist.push({
              id: item.attId,
              src: item.serverPath,
              name: item.filename
            })
          }
        })
      } else {
        this.list.forEach(item => {
          if (item.attId !== e.attId) {
            item._checked = false
          }
        })
        this.imglist = {
          id: e.attId,
          src: e.serverPath,
          name: e.filename
        }
      }
    },
    ok () {
      // 图片添加
      this.$emit('on-change', this.imglist)
      this.initList()
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_pictrue_upload{
  // 上传
  .ivu-upload-list{
    right: 0
  }
  .j_album_category {
    height: 508px;
  }
  .ivu-tree{
    height: 391px !important;
    margin-bottom: 5px;
  }
  .ivu-layout-content{
    margin-left: 10px
  }
}
</style>
