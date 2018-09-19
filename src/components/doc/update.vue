<template>
  <Layout class="ivu-layout-has-sider j_update">
    <MenuBar :data="'menuWord'" :active="'update'"/>
    <Layout class="j_layout_content">
      <JHeader :title="'更新日志'" ></JHeader>
      <Content>
        <div class="j_tip" style="margin-top:0">
          温馨提示：如果您对我们的系统有任何建议，<a href="http://wpa.qq.com/msgrd?v=3&uin=1550676880&site=qq&menu=yes" target="_blank" class="a_underline">请点这里提交</a>
        </div>
        <ul class="ul">
          <li v-for="(item, index) in list" :key="index" v-if="(index+1) > (searchData.page - 1) * searchData.pageSize && index < searchData.page * searchData.pageSize">
            <div class="pic">
              <img :src="item.pic" alt="" @click="showPic(item.pic)">
            </div>
            <div class="content">
              <div class="title">
                {{item.title}}
              </div>
              <div class="time">
                {{item.time}}
              </div>
              {{item.desc}}
            </div>
          </li>
        </ul>
        <JPagination :total="list.length" :searchData='searchData' style="margin-top:10px;"/>
      </Content>
      <Modal title="图片查看" v-model="visible" width="800">
        <img :src="src" v-if="visible" style="width: 100%">
      </Modal>
    </Layout>
  </Layout>
</template>

<script>
import MenuBar from '@/components/common/menu_bar'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    MenuBar,
    JHeader,
    JPagination
  },
  data () {
    return {
      list: [
        {
          pic: 'platform/img/doc/003.png',
          title: '系统升级日志: V4.0.4',
          time: '2018-09-12',
          desc: '新增合作伙伴功能'
        },
        {
          pic: 'platform/img/doc/004.png',
          title: '系统升级日志: V4.0.3',
          time: '2018-08-28',
          desc: '新增站点多域名功能'
        },
        {
          pic: 'platform/img/doc/001.png',
          title: '系统升级日志: V4.0.2',
          time: '2018-07-25',
          desc: '文本编辑框增加插入视频功能'
        },
        {
          pic: 'platform/img/doc/002.png',
          title: '系统升级日志: V4.0.1',
          time: '2018-07-17',
          desc: '新增附件存储服务（“数据管理中心”-“站点管理”增加子栏目：附件存储服务）'
        },
        {
          pic: 'https://pro.modao.cc/uploads3/images/1966/19661206/artboard_1527473050.png',
          title: '系统升级日志: V4.0.0',
          time: '2018-06-15',
          desc: '机汇网后台版本4上线了'
        }
      ],
      searchData: {
        page: 1,
        pageSize: 3
      },
      visible: false,
      src: ''
    }
  },
  methods: {
    showPic (e) {
      this.visible = true
      this.src = e
    }
  }
}
</script>

<style lang="less">
.j_update{
  .ul li{
    overflow: hidden;
    border-bottom: 1px solid #e9e9e9;
    padding: 10px 0;
    .pic{
      width: 254px;
      height: 174px;
      overflow: hidden;
      padding-right: 15px;
      float: left;
    }
    img{
      width: 100%;
      cursor: pointer;
    }
    .content{
      font-size: 13px;
    }
    .title{
      font-size: 16px;
      color: #000;
    }
    .time{
      font-size: 12px;
      color: #999;
      padding: 5px 0;
    }
  }
}
</style>
