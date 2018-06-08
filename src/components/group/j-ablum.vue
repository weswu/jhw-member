<template>
  <Modal class-name="j_pictrue_upload"
    v-model="modal" :width="width"
    :title="title"
    @on-ok="ok"
    cancelText="取消">
    <Layout class="ivu-layout-has-sider">
    <Cateogy @on-change="cateChange"/>
    <Content class="">
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="searchData.name" class="w144" placeholder="搜索图片名称"></Input>
            <Button class="search" @click="get">搜索</Button>
          </Col>
          <Col>
            <Upload ref="upload" :action="'commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=00&attId=&id=' + attId"
              name="Filedata"
              :max-size="2048"
              :on-success="handleSuccess">
              <Button type="info"><i class="iconfont icon-shangchuan"></i>本地上传</Button>
            </Upload>
          </Col>
        </Row>
      </div>
      <div class="admin-upload-list">
        <div class="admin-upload-item" v-for="item in list" :key="item.url" :class="{active: item._checked}" @click="select(item)">
          <img :src="$store.state.status.IMG_HOST+item.serverPath | picUrl(5)">
          <div class="admin-upload-list-cover">
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
export default {
  props: {
    title: {
      type: String,
      default: '上传图片'
    },
    width: {
      type: String,
      default: '800'
    }
  },
  components: {
    Cateogy,
    JPagination
  },
  data () {
    return {
      modal: false,
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 20,
        name: ''
      },
      detail: {},
      attId: 'all'
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/attr/list/' + this.attId + '?' + qs.stringify(this.searchData)).then((res) => {
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
    // 功能
    cateChange (e) {
      this.attId = e
      this.get()
    },
    handleSuccess (res, file) {
      let pic = res.split(',')[0]
      let src = pic.split('http://img.jihui88.com/')[1]
      let obj = {
        id: pic[1],
        src: src.replace(/_5/g, '')
      }
      this.$emit('on-change', obj)
      this.get()
      this.modal = false
      var ctx = this
      setTimeout(function () {
        ctx.$refs.upload.clearFiles()
      }, 1000)
    },
    // 完成
    select (e) {
      this.list.forEach(item => {
        item._checked = false
      })
      e._checked = true
      this.detail = {
        id: e.attId,
        src: e.serverPath
      }
    },
    ok () {
      this.$emit('on-change', this.detail)
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_pictrue_upload{
  z-index: 1001;
  .j_album_category {
    height: 508px;
  }
  .ivu-tree{
    height: 416px;
  }
  .ivu-layout-content{
    margin-left: 10px
  }
  .admin-upload-list{
    height: 420px;
  }
  .admin-upload-item {
    display: inline-block;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border: 1px solid transparent;
    overflow: hidden;
    background: #fff;
    position: relative;
    border: 1px solid #eee;
    margin: 5px 7px;
    cursor: pointer;
    padding: 1px;
    &.active {
      border: 2px solid #ffa000;
      padding: 0;
      .admin-upload-list-cover {
        background: rgba(0, 0, 0, 0.5);
        left: -1px;
        bottom: -1px;
      }
    }
    img {
       max-width: 100%;
       vertical-align: middle;
    }
    .admin-upload-list-cover {
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      height: 30px;
      line-height: 30px;
      text-align: left;
      width: 90px;
      padding: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: text;
    }
  }
}
</style>
