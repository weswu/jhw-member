<template>
  <div class="j_pc_create_item">
    <div class="static_list">
      <Card dis-hover v-for="(item, index) in list" :key="index">
        <div class="text" @click="add(item)" v-if="index === 0 && searchData.page === 1">
          新建空白网站
        </div>
        <img :src="'http://dfwjjingtai.b0.upaiyun.com/'+item.pic">
        <div class="container" v-if="!(index === 0 && searchData.page === 1)">
          <div class="bg"></div>
          <div class="btn">
            <a :href="'http://pc.jihui88.com/pc/demo.html?layoutId='+item.id" target="_blank">查看</a>
            <a href="javascript:;" @click="add(item)">使用</a>
          </div>
        </div>
      </Card>
      <div class="j_empty" v-if="list.length === 0">
        暂无数据
      </div>
    </div>
    <JPagination :total="total" :searchData='searchData' @on-change="get" style="border-top: 1px solid #e9e9e9;"></JPagination>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JPagination
  },
  data () {
    return {
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 9,
        sort: 'addTime!desc'
      }
    }
  },
  computed: {
    ...mapState(['staticList'])
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.searchData.page === 1 ? this.searchData.pageSize = 8 : this.searchData.pageSize = 9
      this.$http.get('/rest/pc/index/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          if (this.searchData.page === 1) {
            data.splice(0, 0, {
              title: '我的网站',
              seoTitle: '我的网站',
              language: '1',
              grade: 1,
              name: '我的网站',
              cellphone: '',
              categoryId: '7',
              entName: '',
              areaPath: '',
              pic: 'upload//a//a1//admin//picture//2018//04//10/6443c6f9-c107-48e3-8588-004e2bf4c3cf.jpg'
            })
          }
          this.list = data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    add (item) {
      let obj = {
        title: item.title,
        seoTitle: item.seoTitle,
        language: item.language,
        grade: item.grade,
        name: item.name,
        cellphone: '',
        categoryId: item.categoryId,
        entName: '',
        areaPath: ''
      }
      if (item.id) {
        obj.copyId = parseInt(item.id)
      }
      let data = {
        model: JSON.stringify(obj)
      }
      this.$http.post('/rest/pc/api/baseLayout/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.staticList.splice(0, 0, res.attributes.data)
          this.$store.commit('setStaticList', this.staticList)
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
.j_pc_create_item{
  .static_list{
    overflow: hidden;
    .ivu-card{
      width: 32.6%;
      position: relative;
      float: left;
      overflow: hidden;
      cursor: pointer;
      margin: 11px 0;
      margin-right: 1%;
      background: url(http://dfwjjingtai.b0.upaiyun.com/upload//a//a1//admin//picture//2017//05//23/9c42cdda-6592-441f-a508-e4f9abe50c3f.png) no-repeat 0 0;
      background-size: 100%;
      &:nth-child(3n+3){
        margin-right: 0;
      }
      .ivu-card-body{
        padding: 0;
        padding-top: 5%;
        &:hover{
          .container{
            display: block;
            .bg{
              opacity: 1;
            }
          }
        }
        img{
          width: 100%
        }
        .container{
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: none;
          .bg{
            opacity: 0;
            transition: 0.5s;
            background: rgba(0, 0, 0, 0.3);
            width: 100%;
            height: 100%;
            margin-top: 9px;
            position: absolute;
          }
          .btn{
            text-align: center;
            margin-top: 32%;
            position: relative;
            a{
              background: #ff5241;
              color: #fff;
              padding: 3% 10%;
              border-radius: 30px;
              margin: 0 2%;
              display: inline-block;
            }
          }
        }
      }
    }
    .text{
      background-color: #fff;
      padding-top: 28%;
      text-align: center;
      font-size: 14px;
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
      &:hover{
        color: #ff5241;
      }
    }
  }
}
</style>
