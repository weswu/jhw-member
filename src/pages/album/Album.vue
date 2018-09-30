<template>
  <Layout class="ivu-layout-has-sider j_album">
    <Content :style="{padding: '0 23px 0 21px'}">
      <JHeader :title="'相册管理'"/>
      <Layout class="ivu-layout-has-sider">
        <ul ref="menu" class="menu j_panel">
          <li @click="edit">重命名</li>
          <li @click="itemModel = true">编辑</li>
          <li @click="copyAll('item')">复制</li>
          <li @click="moveAll('item')">移动</li>
          <li @click="delAll('item')">删除</li>
          <JUpload :multiple="false" :show="false" :replace="'01'" :id="attId" :attId="item.attId" @on-success="handleSuccess">
            <li slot="content">替换图片</li>
          </JUpload>
          <li @click="refurbish">刷新</li>
          <li v-clipboard:copy="item.url2" v-clipboard:success="copy">复制图片的代码</li>
          <li v-clipboard:copy="item.url3" v-clipboard:success="copy" style="border:none;">复制链接的代码</li>
        </ul>
        <Cateogy ref="category" @on-change="changeCategory" @on-file="changeFile" @on-breadList="changeBreadList" @on-del="fileChange"/>
        <Layout class="j_album_container">
          <div class="j_search">
            <Row type="flex" justify="space-between">
              <Col>
                <JUpload :id="attId" @on-success="get" style="display: inline-block;margin-right: 5px;">
                  <Button type="info" slot="content"><i class="iconfont icon-shangchuan"></i>上传图片到当前目录</Button>
                </JUpload>
                <Button class="info" @click="add"><i class="iconfont icon-wenjianjia"></i>新建相册</Button>
                <Button class="info" @click="recycle"><i class="iconfont icon-huishouzhan"></i>回收站</Button>
              </Col>
              <Col>
                <Input v-model="filename" class="w144" clearable placeholder="搜索图片名称" @on-change="clearInput"></Input>
                <Button class="search" @click="search">搜索</Button>
                <Poptip placement="bottom" class="j_poptip_confirm_edit"
                  confirm
                  @on-ok="advancedSearch">
                  <Button class="grey">高级搜索</Button>
                  <div slot="title">
                    <Input v-model="filename2" class="w244" placeholder="搜索图片" clearable></Input><br/>
                    <Select v-model="searchData.searchType" class="w144">
                      <Option value="1">按名称搜索</Option>
                      <Option value="2">按图片地址搜索</Option>
                    </Select>
                  </div>
                </Poptip>
                <Button class="info" @click="watermark"><i class="iconfont icon-tupian3"></i>设置水印</Button>
              </Col>
            </Row>
          </div>
          <Content class="picture_panel">
            <div class="picture_header">
              <Row type="flex" justify="space-between">
                <Col>
                  <Breadcrumb separator=">">
                    <BreadcrumbItem v-for="(item, index) in breadList" :key="index">
                      <span @click="breadClick(item, index)"><i class="iconfont icon-tupian1" v-if="index === 0"></i>{{item.text}}</span>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                <Col>
                  <Select v-model="searchData.sortField" class="select_sort">
                    <Option v-for="(item, index) in sortList" :key="index" :value="item.value" :label="item.label">
                      <div @click="sortChange">
                        <span>{{ item.label }}</span>
                        <i class="iconfont icon-jiantou"></i>
                        <i class="iconfont icon-jiantou-copy-copy"></i>
                      </div>
                    </Option>
                  </Select>
                  <i :class="{iconfont_active: true, iconfont: true, 'icon-jiantou': searchData.sortType === 'desc', 'icon-jiantou-copy-copy': searchData.sortType === 'asc'}"></i>
                </Col>
              </Row>
            </div>
            <Row type="flex" justify="start" class="picture_warpper" data-id="frame">
              <Col :xs="12" :sm="8" :md="6" :lg="4" v-for="item in fileList" :key="item.id" class="pic_item" v-if="searchData.page === 1" ref="file" data-id="frame">
                <div class="box" @click.stop="fileClick(item)" @dblclick="filedbClick(item)" @contextmenu.prevent="filemore($event, item)" data-id="frame">
                  <div class="file" :class="{hover: item._checked}" data-id="frame">
                    <i class="iconfont icon-weibiaoti5" data-id="frame"></i>
                  </div>
                  <div class="title" :class="{hover: item._checked && !item.editting}" data-id="frame">
                    <span><Input v-model="item.title" @on-blur="filenameChange(item)" v-if="item.editting && $refs.category.fileNameEdit"/></span>
                    <span v-if="!item.editting || !$refs.category.fileNameEdit" data-id="frame">{{item.title}}</span>
                  </div>
                  <div class="size" data-id="frame">{{item.attCount || 0}}&nbsp;项</div>
                </div>
              </Col>
              <Col :xs="12" :sm="8" :md="6" :lg="4"  v-for="(item, index) in list" :key="index" class="pic_item" ref="pic" data-id="frame">
                <div class="box" @click.stop="selected(item)" @contextmenu.prevent="imagemore($event, item)" data-id="frame">
                  <Card dis-hover :class="{hover: item._checked}" data-id="frame">
                    <img :src="$store.state.status.IMG_HOST + item.serverPath | picUrl(5)" :alt="item.filename" @error="imgError($event, item)"/>

                    <div class="sort" v-if="searchData.sortField === 'sort'">
                      <i class="iconfont icon-zuojiantou" @click.stop="prev(item, index)" v-if="index !== 0"></i>
                      <i class="iconfont icon-youjiantou" @click.stop="next(item, index)" v-if="index !== list.length - 1"></i>
                    </div>
                  </Card>
                  <div class="title" :class="{hover: item._checked && !item.editting}" data-id="frame">
                    <span><Input v-model="item.filename2" @on-blur="nameChange(item)" v-if="item.editting"/></span>
                    <span v-if="!item.editting" data-id="frame">{{item.filename2}} <span class="postfix">{{item.serverPath | postfix}}</span> </span>
                  </div>
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
    <Recycle ref="recycle" :menu="breadList" @on-cate-change="categoryChange" @on-change="get"/>
    <Watermark ref="watermark"/>
    <Modal
      width="276"
      v-model="belongModel"
      title="移动图片"
      @on-ok="moveAll2">
      <CategorySelect @on-change="picCatechange"/>
    </Modal>
    <Modal
      class-name="j_edit_item"
      width="276"
      v-model="itemModel"
      title="编辑图片"
      @on-ok="editItem">
      <Input v-model="item.filename2" class="w244" placeholder="图片名称"></Input><br/>
      <Input v-model="item.filedesc" type="textarea" class="w244" placeholder="图片描述"></Input><br/>
      <Input v-model="item.linkUrl" class="w244" placeholder="链接地址"></Input><br/>
      排序：<InputNumber v-model="item.sort" placeholder="排序"></InputNumber>
    </Modal>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import Cateogy from '@/pages/album/AlbumCategory'
import JPagination from '@/components/group/j-pagination'
import JUpload from '@/components/group/j-upload'
import Add from '@/pages/album/Add'
import Recycle from '@/pages/album/Recycle'
import Watermark from '@/pages/album/Watermark'
import CategorySelect from '@/pages/album/CategorySelect'
export default {
  components: {
    JHeader,
    Cateogy,
    JPagination,
    JUpload,
    Add,
    Recycle,
    Watermark,
    CategorySelect
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
        { value: 'sort', label: '默认' },
        { value: 'uploadTime', label: '时间' },
        { value: 'filename', label: '名称' }
      ],
      breadList: [
        { value: 'all', text: '全部图片' }
      ],
      list: [],
      listTest: this.$store.state.status.test_album,
      total: 0,
      filename: '',
      filename2: '',
      searchData: {
        page: 1,
        pageSize: 18,
        filename: '',
        sortField: 'sort',
        searchType: '1',
        sortType: 'desc'
      },
      toggle: false,
      ids: '',
      fileids: '',
      attId: 'all', // albumId
      fileList: [],
      belongModel: false,
      belongId: '',
      itemModel: false,
      item: {}
    }
  },
  created () {
    // 用于小窗口
    let params = window.location.search.substr(1).split('&')
    params.forEach(item => {
      let arr = item.split('=')
      if (arr[0] === 'albumId') {
        this.attId = arr[1]
      }
    })
    this.get()
  },
  mounted () {
    var ctx = this
    window.document.addEventListener('click', function (e) {
      if (ctx.$refs.menu) ctx.$refs.menu.style.display = 'none'
      if (e.target.innerHTML !== '重命名') {
        ctx.list.forEach(item => {
          item.editting = false
        })
      }
      // 点击空白关闭选中
      if (e.target.innerHTML.indexOf('div') > -1) {
        ctx.list.forEach(item => {
          item._checked = false
        })
        ctx.fileList.forEach(item => {
          item._checked = false
        })
        ctx.initSelected()
      }
    })
    // 鼠标框选
    window.document.onmousedown = (e) => {
      if (e.target.dataset.id === 'frame') {
        let startX = (e.x || e.clientX)
        let startY = (e.y || e.clientY)
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
        console.log('x-' + startX + '  y-' + startY)
        let isSelect = true
        let selDiv = document.createElement('div')
        selDiv.style.cssText = 'position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;'
        selDiv.id = 'selectDiv'
        document.body.appendChild(selDiv)
        selDiv.style.left = startX + 'px'
        selDiv.style.top = startY + 'px'
        let _x = null
        let _y = null
        document.onmousemove = (evt) => {
          if (isSelect) {
            if (selDiv.style.display === 'none') {
              selDiv.style.display = ''
            }
            _x = (evt.x || evt.clientX)
            _y = (evt.y || evt.clientY)
            selDiv.style.left = Math.min(_x, startX) + 'px'
            selDiv.style.top = Math.min(_y, startY) + 'px'
            selDiv.style.width = Math.abs(_x - startX) + 'px'
            selDiv.style.height = Math.abs(_y - startY) + 'px'
            this.$refs.pic && this.$refs.pic.forEach((item, index) => {
              this.initMouse(startX, startY, _x, _y, item)
            })
            this.$refs.file && this.$refs.file.forEach((item, index) => {
              this.initMouse(startX, startY, _x, _y, item)
            })
          }
        }
        window.document.onmouseup = (e) => {
          let endX = (e.x || e.clientX)
          let endY = (e.y || e.clientY)
          console.log('x-' + endX + '  y-' + endY)
          isSelect = false
          if (selDiv) {
            document.body.removeChild(selDiv)
          }
          if (startX !== endX && startY !== endY) {
            this.$refs.pic && this.$refs.pic.forEach((item, index) => {
              if (this.initMouse(startX, startY, endX, endY, item)) this.list[index]._checked = true
              item.$el.firstChild.setAttribute('class', 'box')
            })
            this.$refs.file && this.$refs.file.forEach((item, index) => {
              if (this.initMouse(startX, startY, endX, endY, item)) this.fileList[index]._checked = true
              item.$el.firstChild.setAttribute('class', 'box')
            })
            this.initSelected()
          }
          if (startX === endX && startY === endY) {
          }
          window.document.onmousemove = document.onmouseup = null
        }
      }
    }
  },
  methods: {
    get () {
      var ctx = this
      this.ids = ''
      this.$http.get('/rest/api/album/attr/list/' + this.attId + '?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
            item.editting = false
            item.filename2 = ctx.picName(item.filename)
          })
          this.list = data
          if (this.attId !== 'all') this.$refs.category.intiCount(this.attId, this.total)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    initMouse (startX, startY, endX, endY, item) {
      let left = item.$el.offsetLeft
      let top = item.$el.offsetTop
      let width = item.$el.offsetWidth
      let height = item.$el.offsetHeight
      let isSelect = true
      if (startX > endX) {
        if (left > startX || (left + width) < endX) isSelect = false
      } else {
        if (left > endX || (left + width) < startX) isSelect = false
      }
      if (startY > endY) {
        if (top > startY || (top + height) < endY) isSelect = false
      } else {
        if (top > endY || (top + height) < startY) isSelect = false
      }
      if (isSelect) {
        item.$el.firstChild.setAttribute('class', 'box hover')
      } else {
        item.$el.firstChild.setAttribute('class', 'box')
      }
      return isSelect
    },
    picName (src) {
      if (!src) return ''
      let arr = src.split('.')
      if (arr.length > 1) {
        arr.splice(arr.length - 1, 1)
      }
      arr = arr.join()
      return arr
    },
    // 相册分类
    changeCategory (res) {
      this.attId = res.data.id
      this.breadList = res.breadList
      this.fileList = res.data.children
      this.searchData.page = 1
      this.get()
    },
    changeFile (data) {
      this.fileList = data.children
    },
    changeBreadList (data) {
      this.breadList = data
    },
    breadClick (item, index) {
      var ctx = this
      this.attId = item.value
      this.get()
      this.breadList.splice(index + 2, 1)
      this.breadList.splice(index + 1, 1)
      this.$refs.category.data[0].children.forEach(row => {
        if (row.id === ctx.attId) {
          ctx.fileList = row.children
        } else {
          row.children.forEach(row1 => {
            if (row1.id === ctx.attId) {
              ctx.fileList = row1.children
            } else {
              row1.children.forEach(row2 => {
                if (row2.id === ctx.attId) {
                  ctx.fileList = row2.children
                }
              })
            }
          })
        }
      })
      this.$refs.category.bread(item.value)
    },
    fileChange (id) {
      this.fileList.forEach((item, index, arr) => {
        if (item.id === id) {
          arr.splice(index, 1)
        }
      })
    },
    fileClick (item) {
      if (item) item._checked = !item._checked
      this.initSelected()
    },
    filenameChange (item) {
      this.$refs.category.fileNameEdit = false
      let data = {
        model: JSON.stringify({
          id: item.id,
          name: item.title
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/album/detail/' + item.id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    filedbClick (item) {
      this.attId = item.id
      if (this.breadList[this.breadList.length - 1].value !== item.id) {
        this.breadList.push({
          value: item.id,
          text: item.title
        })
      }
      this.fileList = item.children
      this.get()
      this.$refs.category.bread(item.id)
    },
    filemore (e, item) {
      // 其它已选变未选
      this.ids = ''
      this.fileids = ''
      this.list.forEach((row, index) => {
        row._checked = false
      })
      this.fileList.forEach((row, index) => {
        row._checked = false
      })
      this.$refs.menu.style.display = 'none'
      this.$refs.category.$refs.menu.style.display = 'block'
      let dom = e.target.getBoundingClientRect()
      this.$refs.category.$refs.menu.style.left = dom.left + dom.width / 2 + 'px'
      this.$refs.category.$refs.menu.style.top = dom.top + dom.height / 2 + 'px'
      this.$refs.category.item = item
      // 重命名
      this.$refs.category.data[0].children.forEach(row => {
        row.editting = false
        row.children.forEach(row1 => {
          row1.editting = false
          row1.children.forEach(row2 => {
            row2.editting = false
          })
        })
      })
      this.$refs.category.fileNameEdit = true
      e.preventDefault()
    },
    // 左
    add () {
      this.$refs.add.open()
    },
    categoryChange () {
      this.$refs.category.get()
    },
    recycle () {
      this.$refs.recycle.open(this.attId)
    },
    // 右
    clearInput () {
      if (this.filename === '') {
        this.searchData.filename = ''
        this.get()
      }
    },
    search () {
      this.searchData.filename = this.filename
      this.searchData.searchType = '1'
      this.get()
    },
    advancedSearch () {
      this.searchData.page = 1
      this.searchData.filename = this.filename2
      this.get()
    },
    watermark () {
      this.$refs.watermark.open()
    },
    importProductCategory () {
      this.$http.get('/api/album/importProductCate2Album').then((res) => {
        if (res.success) {
          this.$Message.success('导入成功')
          this.$refs.category.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    sortChange () {
      let sort = this.searchData.sortField
      var ctx = this
      setTimeout(function () {
        if (sort === ctx.searchData.sortField) {
          ctx.searchData.sortType = ctx.searchData.sortType === 'desc' ? 'asc' : 'desc'
        }
        ctx.get()
      }, 100)
    },
    // 图片中
    picCatechange (e) {
      this.belongId = e
    },
    imagemore (e, item) {
      this.item = item
      this.item.url2 = '<img src="http://img.jihui88.com/' + item.serverPath + '" alt="' + item.filename + '">'
      this.item.url3 = this.$store.state.status.IMG_HOST + item.serverPath
      // 其它已选变未选
      this.ids = ''
      this.fileids = ''
      this.list.forEach((row, index) => {
        row._checked = false
      })
      this.fileList.forEach((row, index) => {
        row._checked = false
      })
      this.$refs.menu.style.display = 'block'
      this.$refs.category.$refs.menu.style.display = 'none'
      let dom = e.target.getBoundingClientRect()
      this.$refs.menu.style.left = dom.left + dom.width / 2 + 'px'
      this.$refs.menu.style.top = dom.top + dom.height / 2 + 'px'
      e.preventDefault()
    },
    edit () {
      this.list.forEach(item => {
        item.editting = false
      })
      this.item.editting = true
    },
    nameChange (item) {
      item.filename = item.filename2 + '.' + item.serverPath.split('.')[1]
      let data = {
        model: JSON.stringify({
          id: item.attId,
          filename: item.filename,
          editField: true
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/album/attr/img/detail/' + item.attId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.item.editting = false
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    editItem () {
      var ctx = this
      let data = {
        model: JSON.stringify({
          id: this.item.attId,
          filename: this.item.filename2 + '.' + this.item.serverPath.split('.')[1],
          filedesc: this.item.filedesc || '',
          sort: this.item.sort,
          linkUrl: this.item.linkUrl,
          editField: true
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/album/attr/img/detail/' + this.item.attId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
          this.list.forEach(item => {
            if (item.attId === ctx.item.attId) {
              item = ctx.item
            }
          })
        } else {
          ctx.$Message.error(res.msg)
        }
      })
    },
    handleSuccess (res, file) {
      this.$Message.success({
        content: '替换成功,图片5分钟左右生效。',
        duration: 3
      })
      this.refurbish('tip')
    },
    refurbish (e) {
      let data = {
        serverPath: this.item.serverPath
      }
      this.$http.post('/rest/api/album/single/refurbish', qs.stringify(data)).then((res) => {
        if (res.success) {
          if (e !== 'tip') {
            this.$Message.success({
              content: '刷新成功',
              duration: 3
            })
          }
          this.item.serverPath = this.item.serverPath + '?0'
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    copy () {
      this.$Message.success('复制成功')
    },
    imgError (e, item) {
      if (e.target.src.indexOf('_5') > -1) {
        e.target.src = this.$store.state.status.IMG_HOST + item.serverPath
      }
      e.target.onerror = null
    },
    prev (item, index) {
      let obj = this.list[index - 1]
      this.sortinit(obj.attId, item.sort)
      this.sortinit(item.attId, obj.sort)
      this.list.splice(index + 1, 0, obj)
      this.list.splice(index - 1, 1)
    },
    next (item, index) {
      let obj = this.list[index + 1]
      this.sortinit(obj.attId, item.sort)
      this.sortinit(item.attId, obj.sort)
      this.list.splice(index + 2, 0, item)
      this.list.splice(index, 1)
    },
    sortinit (id, sort) {
      let data = {
        model: JSON.stringify({
          id: id,
          sort: sort,
          editField: true
        }),
        _method: 'put'
      }
      this.$http.post('/rest/api/album/attr/img/detail/' + id, qs.stringify(data)).then((res) => {
        if (!res.success) {
          this.$Message.error(res.msg)
        }
      })
    },
    // 批量
    initSelected () {
      var ctx = this
      this.ids = ''
      this.list.forEach((item, index) => {
        if (item._checked) {
          ctx.ids = ctx.ids ? (ctx.ids + ',' + item.attId) : item.attId
        }
      })
      this.fileids = ''
      this.fileList.forEach((item, index) => {
        if (item._checked) {
          ctx.fileids = ctx.fileids ? (ctx.fileids + ',' + item.id) : item.id
        }
      })
    },
    selected (item) {
      if (item) item._checked = !item._checked
      this.initSelected()
    },
    handleSelectAll () {
      this.list.forEach((item, index) => {
        item._checked = this.toggle
      })
      this.fileList.forEach((item, index) => {
        item._checked = this.toggle
      })
      this.initSelected()
    },
    delAll (e) {
      if (e === 'item') {
        this.ids = this.item.attId
      }
      if (!this.ids && !this.fileids) {
        return this.$Message.error('未选择')
      }
      this.ids && this.$http.post('/rest/api/album/attr/img/delete?attIds=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
      if (this.fileids) {
        var ctx = this
        let list = this.fileids.split(',')
        list.forEach((id, index) => {
          let type = ''
          if (list.length === index + 1) {
            type = 'end'
          }
          ctx.$refs.category.del(type, id)
        })
      }
    },
    copyAll (e) {
      if (e === 'item') {
        this.ids = this.item.attId
      }
      if (!this.ids && !this.fileids) {
        return this.$Message.error('未选择')
      }
      this.ids && this.$http.post('/rest/api/album/attr/img/copy?attIds=' + this.ids).then((res) => {
        if (res.success) {
          this.$Message.success('复制成功')
          this.get()
        } else {
          this.$Message.error(res.msg)
        }
      })
      if (this.fileids) {
        var ctx = this
        let list = this.fileids.split(',')
        list.forEach((id, index) => {
          let type = ''
          if (list.length === index + 1) {
            type = 'end'
          }
          ctx.$refs.category.copy(type, id)
        })
      }
    },
    moveAll (e) {
      if (e === 'item') {
        this.ids = this.item.attId
      }
      if (!this.ids && !this.fileids) {
        return this.$Message.error('未选择')
      }
      this.belongModel = true
    },
    moveAll2 () {
      if (this.ids) {
        this.$http.post('/rest/api/album/attr/img/move?attIds=' + this.ids + '&belongId=' + this.belongId).then((res) => {
          if (res.success) {
            this.$Message.success('图片移动成功')
            this.get()
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
      if (this.fileids) {
        var ctx = this
        let list = this.fileids.split(',')
        list.forEach((id, index) => {
          let data = {
            model: JSON.stringify({
              parentId: ctx.belongId
            }),
            _method: 'put'
          }
          ctx.$http.post('/rest/api/album/detail/' + id, qs.stringify(data)).then((res) => {
            if (res.success) {
              if (list.length === index + 1) {
                ctx.$Message.success('相册转移成功')
                ctx.$refs.category.initCopyId(id)
                ctx.$refs.category.get()
              }
            } else {
              ctx.$Message.error(res.msg)
            }
          })
        })
      }
      this.belongModel = false
    }
  }
}
</script>

<style lang="less">
.j_album{
  .ivu-layout-footer{
    height: auto;
    line-height: normal;
  }
  .picture_warpper{
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
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
        border: 1px solid transparent;
        &.hover{
          border: 1px dashed #ddd;
        }
        &:hover{
          .ivu-card{
            background: #e4e4e4;
          }
          .sort{
            opacity: 1;
            transition: all 0.2s ease-in-out;
          }
        }
        // 文件
        .file{
          flex: 1;
          align-items: center;
          display: flex;
          &.hover{
            background: #e4e4e4;
          }
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
            max-height: 140px;
            border: 1px solid #b3b3b3;
            vertical-align: middle;
          }
        }
      }
      .sort{
        opacity: 0;
        background: #ccc;
        position: absolute;
        bottom: 0;left: 0;
        width: 100%;
        border-radius: 6px;height: 29px;
        line-height: 29px;
        i{
          color: #fff;
          padding: 0 10px;
          font-size: 18px;
        }
        .icon-zuojiantou{
          float: left
        }
        .icon-youjiantou{
          float: right
        }
      }
      .title{
        &.hover{
          background: #0369d9;
          color: #fff;
          .postfix{
            color: #fff;
          }
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
        .ivu-input{
          height: 18px;
          padding: 4px 5px;
        }
        .postfix{
          color: #999;
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
