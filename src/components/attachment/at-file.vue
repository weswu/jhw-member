<template>
  <Modal class-name="j_file_upload"
    v-model="modal" width="800" title="上传附件"
    @on-ok="ok"
    @on-cancel="cancel"
    cancelText="取消">
    <Layout class="ivu-layout-has-sider">
      <ul ref="menu" class="menu j_panel">
        <li v-clipboard:copy="item.serverPath" v-clipboard:success="copy" style="border:none;">复制链接</li>
        <li @click="del">删除</li>
      </ul>
    <Cateogy ref="category" @on-change="categoryChange"/>
    <Content>
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="searchData.name" class="w144" clearable placeholder="搜索附件名称" @on-change="clearInput"></Input>
            <Button class="search" @click="get">搜索</Button>
          </Col>
          <Col>
            <a href="#/storage_service" class="a_underline">配置附件上传类型</a>
            <JUpload :albumId="searchData.belongId" @on-success="get" style="display: inline-block;margin-left: 7px;">
              <Button type="info" slot="content" @click="config"><i class="iconfont icon-shangchuan"></i>上传附件到当前目录</Button>
            </JUpload>
          </Col>
        </Row>
      </div>
      <div class="modal-upload-list">
        <div class="modal-upload-item file" v-for="item in list" :key="item.url" :class="{active: item._checked}" @click="select(item)" @contextmenu.prevent="more($event, item)">

          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'doc'">
            <use xlink:href="#icon-DOC"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'docx'">
            <use xlink:href="#icon-geshi_wendangdocx"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'ppt'">
            <use xlink:href="#icon-PPTs"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'pptx'">
            <use xlink:href="#icon-geshi_wendangpptx"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'xls'">
            <use xlink:href="#icon-xls"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'xlsx'">
            <use xlink:href="#icon-geshi_wendangxlsx"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'rtf'">
            <use xlink:href="#icon-rtf"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'wps'">
            <use xlink:href="#icon-docx"></use>
          </svg>

          <img :src="'platform/img/' + item.fileType + '.png'" v-else-if="item.fileType === 'et'"/>
          <img :src="'platform/img/' + item.fileType + '.png'" v-else-if="item.fileType === 'dps'"/>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'pdf'">
            <use xlink:href="#icon-PDF"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.fileType === 'txt'">
            <use xlink:href="#icon-txt"></use>
          </svg>
          <i class="iconfont icon-weibiaoti5" v-else></i>

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
import Cateogy from '@/components/attachment/at-file-category'
import JPagination from '@/components/group/j-pagination'
import JUpload from '@/components/attachment/at-file-upload'
export default {
  props: {
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
          addTime: 1531987290000,
          attId: 8334,
          belongId: '256',
          filename: '测试text文件上传.txt',
          fsize: 0,
          height: null,
          id: '',
          serverPath: 'upload//g//g2//ggggfj//attachment//2018//07//19/测试text文件上传.txt',
          type: 'attachment',
          width: null,
          _checked: false,
          fileType: 'rtf'
        },
        {
          'addTime': 1520994478000,
          'attId': 4200,
          'belongId': '1',
          'enterpriseId': 'Enterp_0000000000000000000049090',
          'filedesc': '',
          'filename': '3c79f0ffc84c3dfbf746344683a9c56c.jpg',
          'fsize': 58374,
          'height': 1114,
          'id': '',
          'serverIp': '183.157.9.137',
          'serverPath': 'upload//j//j2//jihui88//picture//2018//03//14/57d4f42a-91e2-4bb7-a9ed-4fa930dfc215.jpg',
          'state': '0',
          'type': '',
          'width': 1182,
          _checked: false,
          fileType: 'et'
        }
      ],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 20,
        type: 'attachment',
        belongId: ''
      },
      item: {},
      imglist: [],
      hasConfig: false
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
      this.$http.get('/rest/pc/api/att/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
            item.fileType = item.serverPath.substr(item.serverPath.lastIndexOf('.') + 1).toLowerCase()
          })
          this.list = data || []
          this.total = res.attributes.count
          this.hasConfig = res.attributes.hasConfig
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open () {
      this.modal = true
      this.get()
      this.$refs.category.get()
    },
    cancel () {
      this.modal = false
    },
    // 功能
    clearInput () {
      if (this.searchData.name === '') {
        this.get()
      }
    },
    categoryChange (e) {
      this.searchData.belongId = e.data.id
      this.get()
    },
    config (e) {
      if (!this.hasConfig) {
        this.$Message.info('请配置附件上传类型')
        e.preventDefault()
        e.stopPropagation()
      }
    },
    // 右击
    more (e, item) {
      this.item = item
      this.$refs.menu.style.display = 'block'
      let dom = e.target.getBoundingClientRect()
      this.$refs.menu.style.left = dom.left + dom.width / 2 + 'px'
      this.$refs.menu.style.top = dom.top + dom.height / 2 + 'px'
      e.preventDefault()
    },
    copy () {
      this.$Message.success('复制成功')
    },
    del () {
      let data = {
        _method: 'delete'
      }
      this.$http.post('/rest/pc/api/att/detail/' + this.item.attId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
          this.$emit('on-disk')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 完成
    select (e) {
      e._checked = !e._checked
      this.imglist = []
      this.list.forEach(item => {
        if (item._checked) {
          this.imglist.push(item)
        }
      })
    },
    ok () {
      // 文档添加
      this.$emit('on-change', this.imglist)
      this.$emit('on-disk')
      // 取消选中的图片
      this.list.forEach(function (item) {
        item._checked = false
      })
      this.modal = false
    }
  }
}
</script>

<style lang="less">
.j_file_upload{
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
  .modal-upload-list .modal-upload-item{
    .iconfont{
      font-size: 50px;
    }
    .icon{
      height: 85px;
      font-size: 50px;
    }
    img{
      height: 50px;
    }
    .modal-upload-item-cover {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
