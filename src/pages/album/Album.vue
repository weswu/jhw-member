<template>
  <Layout class="ivu-layout-has-sider j_album">
    <Content :style="{padding: '0 23px 0 21px'}">
      <JHeader :title="'相册管理'"/>
      <Layout class="ivu-layout-has-sider">
        <Cateogy @change-category="changeCategory"/>
        <Layout class="j_album_container">
          <div class="j_search">
            <Row :gutter="24">
              <Col span="10">
                <Button type="info" @click="upload"><i class="iconfont icon-shangchuan"></i>上传图片到当前目录</Button>
                <Button class="info" @click="update"><i class="iconfont icon-wenjianjia"></i>新建相册</Button>
                <Button class="info" @click="update"><i class="iconfont icon-huishouzhan"></i>回收站</Button>
              </Col>
              <Col span="14" style="text-align:right">
                <Input v-model="pic" style="width:140px;padding-right:5px;" placeholder="搜索图片名称"></Input>
                <Button class="search" @click="update">搜索</Button>
                <Button class="grey" @click="update">高级搜索</Button>
                <Button class="info" @click="update"><i class="iconfont icon-tupian3"></i>设置水印</Button>
                <Button class="info" @click="update" style="padding: 6px 5px;margin-right:0px;">一键载入产品分类名称</Button>
              </Col>
            </Row>
          </div>
          <Content class="picture">
            <div class="picture_header">
              <Row :gutter="24">
                <Col span="10">
                  <Breadcrumb separator=">">
                    <BreadcrumbItem v-for="(item, index) in breadList" :key="item.value">
                      <i class="iconfont icon-tupian1" v-if="index === 0"></i>{{item.text}}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                <Col span="14" style="text-align:right">
                  <Select v-model="searchData.sort" class="select_sort">
                    <Option v-for="item in sortList" :value="item.value" :key="item.value" :label="item.label">
                      <span>{{ item.label }}</span>
                      <i :class="{iconfont: true, 'icon-jiantou': item.value === '00', 'icon-jiantou-copy-copy': item.value === '01'}"></i>
                    </Option>
                  </Select>
                  <i :class="{iconfont_active: true, iconfont: true, 'icon-jiantou': searchData.sort === '00', 'icon-jiantou-copy-copy': searchData.sort === '01'}"></i>
                </Col>
              </Row>
            </div>
            <Row type="flex" justify="start" align="middle" class="picture_warpper">
              <Col span="4" :xs="12" :sm="8" :md="6" :lg="4" v-for="(item, index) in list" :key="index" class="pic_item">
                <Card dis-hover>
                  <img :src="'http://img.jihui88.com/' + item.serverPath" alt="">
                </Card>
                <div class="title">
                  {{item.filename}}
                </div>
              </Col>
            </Row>
          </Content>
          <JPagination :checkbox="true" :fixed="true" :total="total" :searchData='searchData' @on-change="pageChange" :unit="'个'">
            <span slot="btn">
              <Checkbox v-model="toggle" @on-change="handleSelectAll(toggle)"/>
              <Button size="small">删除</Button>
              <Button size="small">复制</Button>
              <Button size="small">移动</Button>
              <Button size="small">重命名</Button>
              <Button size="small">一键删除非引用</Button>
            </span>
          </JPagination>
        </Layout>
      </Layout>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import Cateogy from '@/pages/album/AlbumCategory'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JHeader,
    Cateogy,
    JPagination
  },
  computed: {
    ...mapState({
      'user': state => state.user
    })
  },
  data () {
    return {
      pic: '',
      sortList: [
        { value: '00', label: '时间' },
        { value: '01', label: '时间' }
      ],
      breadList: [
        { value: '', text: '全部图片' }
      ],
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 18,
        sort: '00'
      },
      toggle: false,
      ids: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/attr/list/all?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    upload () {},
    changeCategory () {

    },
    pageChange (page) {
      this.searchData.page = page
      this.get()
    },
    pageVal () {
      this.searchData.page = this.page
      this.page = ''
      this.get()
    },
    update () {
      this.$Message.info('更新中')
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
  .ivu-layout-footer{
    height: auto;
    line-height: normal;
  }
  .picture_warpper{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .pic_item{
      margin-left: 0;
      max-width: 160px;
      display:flex;flex-flow: column;
      padding: 15px;
      .ivu-card{
        flex: 1;
        border: none;
        .ivu-card-body{
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          padding: 5px;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
          img{
            width: 100%;
            max-height: 160px;
            border: 1px solid #b3b3b3;
          }
        }
      }
      .title{
        height: 30px;
        line-height: 30px;
        flex: 0 0 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
        padding-right: 40px;
        color: #727272;
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
    font-size: 12px;
    color: #7a7a7a;
  }
}
</style>
