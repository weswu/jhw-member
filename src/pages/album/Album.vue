<template>
  <Layout class="ivu-layout-has-sider j_album">
    <Content :style="{padding: '0 23px 0 21px'}">
      <JHeader :title="'相册管理'"/>
      <Layout class="ivu-layout-has-sider">
        <ul ref="menu" class="menu j_panel">
          <li @click="edit">重命名</li>
          <li @click="itemModel = true">编辑</li>
          <li v-clipboard:copy="item.url3" v-clipboard:success="copy">复制</li>
          <li @click="move">移动</li>
          <li @click="del">删除</li>
          <Upload ref="upload" :action="'commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=01&attId=&id=' + attId"
            name="Filedata"
            multiple
            :max-size="2048"
            :on-success="handleSuccess"
            style="display: inline-block;margin-right: 5px;">
            <li >替换图片</li>
          </Upload>
          <li @click="refurbish">刷新</li>
          <li v-clipboard:copy="item.url2" v-clipboard:success="copy">复制图片的代码</li>
          <li v-clipboard:copy="item.url3" v-clipboard:success="copy" style="border:none;">复制链接的代码</li>
        </ul>
        <Cateogy ref="category" @on-change="changeCategory"/>
        <Layout class="j_album_container">
          <div class="j_search">
            <Row type="flex" justify="space-between">
              <Col>
                <Upload ref="upload" :action="'commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=00&attId=&id=' + attId"
                  name="Filedata"
                  multiple
                  :max-size="2048"
                  :on-success="handleSuccess"
                  style="display: inline-block;margin-right: 5px;">
                  <Button type="info"><i class="iconfont icon-shangchuan"></i>上传图片到当前目录</Button>
                </Upload>
                <Button class="info" @click="add"><i class="iconfont icon-wenjianjia"></i>新建相册</Button>
                <Button class="info" @click="recycle"><i class="iconfont icon-huishouzhan"></i>回收站</Button>
              </Col>
              <Col>
                <Input v-model="searchData.filename" class="w144" clearable placeholder="搜索图片名称"></Input>
                <Button class="search" @click="search">搜索</Button>
                <Poptip placement="bottom" class="j_poptip_confirm_edit"
                  confirm
                  @on-ok="get">
                  <Button class="grey">高级搜索</Button>
                  <div slot="title">
                    <Input v-model="searchData.filename" class="w244" placeholder="搜索图片"></Input><br/>
                    <Select v-model="searchData.searchType" class="w144">
                      <Option value="1">按名称搜索</Option>
                      <Option value="2">按图片地址搜索</Option>
                    </Select>
                  </div>
                </Poptip>
                <Button class="info" @click="update($Message)"><i class="iconfont icon-tupian3"></i>设置水印</Button>
                <Button class="info" @click="update($Message)" style="padding: 6px 5px;margin-right:0px;">一键载入产品分类名称</Button>
              </Col>
            </Row>
          </div>
          <Content class="picture">
            <div class="picture_header">
              <Row type="flex" justify="space-between">
                <Col>
                  <Breadcrumb separator=">">
                    <BreadcrumbItem v-for="(item, index) in breadList" :key="index" @click="breadClick(item, index)">
                      <i class="iconfont icon-tupian1" v-if="index === 0"></i>{{item.text}}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                <Col>
                  <Select v-model="searchData.sortType" class="select_sort" @on-change="get">
                    <Option v-for="item in sortList" :value="item.value" :key="item.value" :label="item.label">
                      <span>{{ item.label }}</span>
                      <i :class="{iconfont: true, 'icon-jiantou': item.value === '00', 'icon-jiantou-copy-copy': item.value === '01'}"></i>
                    </Option>
                  </Select>
                  <i :class="{iconfont_active: true, iconfont: true, 'icon-jiantou': searchData.sort === '00', 'icon-jiantou-copy-copy': searchData.sort === '01'}"></i>
                </Col>
              </Row>
            </div>
            <Row type="flex" justify="start" class="picture_warpper">
              <Col :xs="12" :sm="8" :md="6" :lg="4" v-for="(item, index) in fileList.children" :key="index" class="pic_item">
                <div class="box" @click="fileClick(item)">
                  <div class="file">
                    <i class="iconfont icon-weibiaoti5"></i>
                  </div>
                  <div class="title" :class="{hover: item._checked}">{{item.title}}</div>
                  <div class="size">{{item.attCount}}&nbsp;项</div>
                </div>
              </Col>
              <Col :xs="12" :sm="8" :md="6" :lg="4"  v-for="(item, index) in list" :key="index" class="pic_item">
                <div class="box" @click="selected(item)" @contextmenu.prevent="more($event, item)">
                  <Card dis-hover :class="{hover: item._checked}">
                    <img :src="$store.state.status.IMG_HOST + item.serverPath | picUrl(5)" :alt="item.filename">
                  </Card>
                  <div class="title" :class="{hover: item._checked}">{{item.filename}}</div>
                </div>
              </Col>
            </Row>
          </Content>
          <JPagination :checkbox="true" :fixed="true" :total="total" :searchData='searchData' @on-change="get" :unit="'个'">
            <span slot="btn">
              <Checkbox v-model="toggle" @on-change="handleSelectAll()"/>
              <Button type="ghost" size="small" @click="delAll">删除</Button>
              <Button type="ghost" size="small" @click="copyAll">复制</Button>
              <Button type="ghost" size="small" @click="moveAll">移动</Button>
            </span>
          </JPagination>
        </Layout>
      </Layout>
    </Content>
    <Add ref="add" @on-change="categoryChange"/>
    <Recycle ref="recycle"/>
    <Modal
      width="276"
      v-model="belongModel"
      title="移动图片"
      @on-ok="moveAll2">
      <Select v-model="belongId" class="w244">
        <Option :value="item.albumId" v-for="item in albumCategory" :key="item.albumId">{{item.name}}</Option>
      </Select>
    </Modal>
    <Modal
      class-name="j_edit_item"
      width="276"
      v-model="itemModel"
      title="编辑图片"
      @on-ok="editItem">
      <Input v-model="item.filename" class="w244" placeholder="图片名称"></Input><br/>
      <Input v-model="item.filedesc" type="textarea" class="w244" placeholder="图片描述"></Input><br/>
      <Input v-model="item.linkUrl" class="w244" placeholder="链接地址"></Input><br/>
      <InputNumber v-model="item.sort" placeholder="排序"></InputNumber>
    </Modal>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import Cateogy from '@/pages/album/AlbumCategory'
import JPagination from '@/components/group/j-pagination'
import Add from '@/pages/album/Add'
import Recycle from '@/pages/album/Recycle'
export default {
  components: {
    JHeader,
    Cateogy,
    JPagination,
    Add,
    Recycle
  },
  computed: {
    ...mapState({
      albumCategory: state => state.albumCategory
    })
  },
  data () {
    return {
      pic: '',
      sortList: [
        { value: 'desc', label: '时间' },
        { value: 'asc', label: '时间' }
      ],
      breadList: [
        { value: 'all', text: '全部图片' }
      ],
      list: [
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '路人超能2.jpg',
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
          filename: '路人头像3.jpg',
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
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '9e4246d9-7150-49f0-af69-237598418759.png',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2017//08//04/69521af9-edbf-4c83-b615-03d53f64c252.png',
          belongId: null,
          attId: 'Attach_0000000000000000001384336',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '36.24.223.42',
          filedesc: null,
          uploadTime: 1501815560527,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '大逃杀.jpg',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2017//06//01/94526c88-cd49-4a3f-a75e-b6a4d29b3378.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001353022',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '125.120.83.147',
          filedesc: null,
          uploadTime: 1496300661556,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: 'timg.jpg',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2017//06//01/2be1866b-8f23-42a3-b34e-2cc5cfcbe2f9.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001353018',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '125.120.83.147',
          filedesc: null,
          uploadTime: 1496296124960,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: 29,
          filename: '产品.png',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload/g/g2/ggggfj/picture/2018/06/06/bb79b2bf-8075-4f84-9f41-d881b956ff77.png',
          belongId: null,
          attId: 'Attach_0000000000000000001514776',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '10.30.197.254',
          filedesc: null,
          uploadTime: 1528285374461,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: 28,
          filename: 'nopic.png',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload/g/g2/ggggfj/picture/2018/05/23/b7e30dee-599f-4867-b821-75e6b7b0d755.png',
          belongId: 'Album_00000000000000000000064887',
          attId: 'Attach_0000000000000000001507691',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '10.30.197.254',
          filedesc: null,
          uploadTime: 1527073768068,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: 27,
          filename: '1.png',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload/g/g2/ggggfj/picture/2018/05/22/97ec231a-1795-4b7c-9382-dc437383c5d2.png',
          belongId: null,
          attId: 'Attach_0000000000000000001507317',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '10.30.197.254',
          filedesc: null,
          uploadTime: 1526982781866,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: 'tmp_f20db1581edca3cecd0c2e3e9d13a3863e52b861fccf49ec.jpg',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2018//05//02/3686976e-b6fd-4d64-9862-fdee09780c39.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001493938',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '115.192.36.239',
          filedesc: null,
          uploadTime: 1525252073511,
          technicView: null,
          _checked: false
        },
        {
          state: '01',
          type: '01',
          content: null,
          sort: null,
          filename: '路人头像3.jpg',
          userId: 'User_000000000000000000000000082',
          serverPath: 'upload//g//g2//ggggfj//picture//2018//04//03/1d77f759-40ed-4c6e-b0e1-dec453dae438.jpg',
          belongId: null,
          attId: 'Attach_0000000000000000001476614',
          belongType: 'AD',
          linkUrl: null,
          storeType: null,
          serverIp: '125.122.222.10',
          filedesc: null,
          uploadTime: 1522733211003,
          technicView: null,
          _checked: false
        }
      ],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 18,
        filename: '',
        sortField: 'uploadTime',
        searchType: '1',
        sortType: 'desc'
      },
      toggle: false,
      ids: '',
      attId: 'all',
      fileList: {},
      belongModel: false,
      belongId: '',
      itemModel: false,
      item: {}
    }
  },
  created () {
    this.get()
  },
  mounted () {
    var ctx = this
    window.document.addEventListener('click', function (e) {
      if (ctx.$refs.menu) ctx.$refs.menu.style.display = 'none'
    })
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/attr/list/' + this.attId + '?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.list = data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 相册分类
    changeCategory (res) {
      this.attId = res.data.id
      this.breadList = res.breadList
      this.fileList = res.data
      this.get()
    },
    breadClick (item, index) {
      this.attId = item.value
      this.get()
      this.breadList.splice(index + 2, 1)
      this.breadList.splice(index + 1, 1)
      this.$refs.category.bread(item.value)
    },
    fileClick () {},
    fileClick2 (item) {
      this.attId = item.id
      this.get()
      this.breadList.push({
        value: item.id,
        text: item.title
      })
      this.$refs.category.bread(item.id)
    },
    // 左
    add () {
      this.$refs.add.open()
    },
    categoryChange () {
      this.$refs.category.get()
    },
    handleSuccess (res, file) {
      var ctx = this
      setTimeout(function () {
        ctx.$refs.upload.clearFiles()
      }, 1000)
      this.get()
    },
    recycle () {
      this.$refs.recycle.open(this.attId)
    },
    // 右
    search () {
      this.searchData.searchType = '1'
      this.get()
    },
    // 图片中
    more (e, item) {
      this.$refs.menu.style.display = 'block'
      let dom = e.target.getBoundingClientRect()
      this.$refs.menu.style.left = dom.left + dom.width / 2 + 'px'
      this.$refs.menu.style.top = dom.top + dom.height / 2 + 'px'
      this.item = item
      this.item.url2 = this.$store.state.status.IMG_HOST + item.serverPath
      this.item.url3 = '<img src="http://img.jihui88.com/' + item.serverPath + '" alt="' + item.filename + '">'
      e.preventDefault()
    },
    edit () {
      var ctx = this
      this.$Modal.confirm({
        width: 280,
        render: (h) => {
          return h('Input', {
            props: {
              value: this.item.filename,
              autofocus: true,
              placeholder: '修改图片名称'
            },
            on: {
              input: (val) => {
                this.item.filename = val
              }
            }
          })
        },
        onOk: () => {
          if (!this.item.filename) return this.$Message.info('图片名称不能为空')
          let data = {
            model: JSON.stringify(this.item),
            _method: 'put'
          }
          this.$http.post('/rest/api/album/attr/img/detail/' + this.item.attId, qs.stringify(data)).then((res) => {
            if (res.success) {
              ctx.$Message.success('修改成功')
              ctx.list.forEach(item => {
                if (item.attId === ctx.item.attId) {
                  item.filename = ctx.item.filename
                }
              })
            } else {
              ctx.$Message.error(res.msg)
            }
          })
        }
      })
    },
    editItem () {
      var ctx = this
      let data = {
        model: JSON.stringify(this.item),
        _method: 'put'
      }
      this.$http.post('/rest/api/album/attr/img/detail/' + this.item.attId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
          this.list.forEach(item => {
            if (item.attId === ctx.item.attId) {
              item.filename = ctx.item.filename
            }
          })
        } else {
          ctx.$Message.error(res.msg)
        }
      })
    },
    move () {
      this.belongModel = true
      this.$http.post('/rest/api/album/attr/img/move?attIds=' + this.item.attId + '&belongId=' + this.belongId).then((res) => {
        if (res.success) {
          this.$Message.success('移动成功')
          this.get()
          this.belongModel = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    del () {
      let data = {
        _method: 'delete'
      }
      this.$http.post('/rest/api/album/attr/img/detail/' + this.item.attId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    refurbish () {
      var ctx = this
      this.list.forEach(item => {
        if (item.attId === ctx.item.attId) {
          item.serverPath = this.item.serverPath + '?1'
        }
      })
      let data = {
        serverPath: this.item.serverPath
      }
      this.$http.post('/rest/api/album/single/refurbish', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('刷新成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    copy () {
      this.$Message.success('复制成功')
    },
    // 批量
    selected (item) {
      var ctx = this
      item._checked = !item._checked
      this.ids = ''
      this.list.forEach((item, index) => {
        if (item._checked) {
          ctx.ids = ctx.ids ? (ctx.ids + ',' + item.attId) : item.attId
        }
      })
    },
    handleSelectAll () {
      this.list.forEach(item => {
        item._checked = this.toggle
      })
    },
    delAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/album/attr/img/delete?attIds=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    copyAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.$http.post('/rest/api/album/attr/img/copy?attIds=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('复制成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    moveAll () {
      if (!this.ids) {
        return this.$Message.error('未选择')
      }
      this.belongModel = true
    },
    moveAll2 () {
      this.$http.post('/rest/api/album/attr/img/move?attIds=' + this.ids + '&belongId=' + this.belongId).then((res) => {
        if (res.success) {
          this.$Message.success('移动成功')
          this.get()
          this.belongModel = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.picture_warpper::-webkit-scrollbar-track{background-color: transparent;}
.picture_warpper::-webkit-scrollbar{width: 6px;height: 6px;}
.picture_warpper::-webkit-scrollbar-thumb{background-color: #dedee4;}
.picture_warpper::-webkit-scrollbar-corner {background-color: transparent;}
.j_album{
  .menu{
    display: none;
    position: absolute;
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
  // 上传
  .ivu-upload-list{
    position: absolute;
    z-index: 99;
    background: #fff;
    border: 1px solid #f0f0f0;
  }
  .ivu-layout-footer{
    height: auto;
    line-height: normal;
  }
  .picture_warpper{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    padding: 0 10px;
    .pic_item{
      display:flex;
      flex-flow: column;
      max-width: 160px;
      max-height: 200px;
      padding: 10px 5px;
      cursor: pointer;
      .box{
        display: flex;
        flex-flow: column;
        height: 100%;
        // 文件
        .file{
          flex: 1;
          align-items: center;
          display: flex;
        }
        .icon-weibiaoti5{
          color: #79d3fb;
          font-size: 71px;
          margin: 0 auto;
        }
        .size{
          color: #77a0d9;
          font-size: 8px;
          text-align: center;
        }
      }
      .ivu-card{
        padding: 10px;
        border-radius: 6px;
        border: none;
        flex: 1;
        align-items: center;
        display: flex;
        &.hover{
          background: #e4e4e4;
        }
        .ivu-card-body{
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          padding: 5px;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
          background: #fff;
          margin: 0 auto;
          img{
            width: 100%;
            max-height: 160px;
            border: 1px solid #b3b3b3;
            vertical-align: middle;
          }
        }
      }
      .title{
        &.hover{
          background: #0369d9;
          color: #fff;
        }
        flex: 0 0 20px;
        height: 20px;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
        display: inline-block;
        margin: 3px auto;
        border-radius: 3px;
        padding: 0 4px;
        width: 100%;
      }
    }
  }
  .picture{
    border: 1px solid #e9e9e9;
    border-bottom: none;
    .picture_header{
      background: #f5f6fa;
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #e9e9e9;
      .ivu-breadcrumb{
        padding-left: 21px;
        font-size: 12px;
        .icon-tupian1{
          padding-right: 3px;
          font-size: 14px;
        }
        span{
          font-weight: normal;
          color: #bfbfc0;
          margin: 0 3px;
          cursor: pointer;
        }
        a{
          font-size: 12px;
          color: #a8a8a8;
          font-weight: normal;
        }
      }
    }
  }
  .select_sort.ivu-select-single{
    width:144px;
    color: #666;
    margin-right: 23px;
    position: relative;
    margin-top: -1px;
    &::after{
      content: '排序：';
      position: absolute;
      left: 13px;
      top: 3px;
      color: #a0a0a0;
      font-size: 12px;
    }
    .ivu-select-selection{
      height: 22px;
      line-height: 22px;
      border: 1px solid #c9c9c9;
      .ivu-select-selected-value{
        height: 22px;
        line-height: 22px;
        color: #727272;
        text-align: center;
      }
      .ivu-icon-arrow-down-b{
        &::before{
          content: '\e729';
          font-family: "iconfont" !important;
        }
      }
    }
    .ivu-select-dropdown{
      .ivu-select-item{
        padding-right: 24px;
      }
      .iconfont{
        font-size: 12px;
        color: #7a7a7a;
      }
    }
  }
  .iconfont_active{
    position: absolute;
    right: 60px;
    top: 0;
    font-size: 12px;
    color: #7a7a7a;
  }
}
.j_edit_item{
  .ivu-input-wrapper{
    margin-bottom: 10px;
  }
  .ivu-modal-footer{
    .ivu-btn{
      height: 32px;
      padding: 0 10px;
    }
  }
}
</style>
