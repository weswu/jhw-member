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
            <JUpload :multiple="multiple" :id="albumId" @on-success="handleSuccess">
              <Button type="info" slot="content"><i class="iconfont icon-shangchuan"></i>本地上传</Button>
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
    multiple: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
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
      list: [],
      listTest: [
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '路人超能2',
          filename2: '路人超能2',
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
          _checked: false,
          editting: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '路人头像3.jpg',
          filename2: '路人头像3.jpg',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2017//08//22/d45b87db-460a-42ba-beee-c5551ea5a7ee.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001391538',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '183.159.177.57',
          filedesc: null,
          uploadTime: 1503382354821,
          technicView: null,
          _checked: false,
          editting: false
        }
      ],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 20
      },
      detail: {},
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
      this.$emit('on-change', res)
      if (this.type === 'multiple') {
        var ctx = this
        setTimeout(function () {
          ctx.get()
        }, 1000)
      } else {
        this.get()
      }
      if (!this.multiple) this.modal = false
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
      if (this.type === 'multiple') {
        this.imglist = []
        this.list.forEach(item => {
          if (item._checked) {
            this.imglist.push(item)
          }
        })
      } else {
        this.list.forEach(item => {
          if (item.attId !== e.attId) {
            item._checked = false
          }
        })
        this.detail = {}
        if (e._checked) {
          this.detail = {
            id: e.attId,
            src: e.serverPath
          }
        }
      }
    },
    ok () {
      if (this.type === 'multiple') {
        // 图片添加
        this.$emit('on-change', this.imglist)
      } else {
        this.detail.id && this.$emit('on-change', this.detail)
      }
      this.initList()
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_pictrue_upload{
  z-index: 1100 !important;
  .menu {
    display: none !important
  }
  // 上传
  .ivu-upload-list{
    right: 0
  }
  .j_album_category {
    height: 508px;
  }
  .ivu-tree{
    height: 416px !important;
  }
  .ivu-layout-content{
    margin-left: 10px
  }
}
</style>
