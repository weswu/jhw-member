<template>
  <div class="j_pc_create_item">
    <Button icon="plus" class="orange" @click="add">新建空白网站</Button>
    <div class="static_list">
      <Card dis-hover v-for="(item, index) in list" :key="index">
        <img :src="'http://dfwjjingtai.b0.upaiyun.com/'+item.pic">
        <div class="container">
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
      this.$http.get('/rest/pc/index/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    add (item) {
      let obj = {
        title: '我的网站',
        seoTitle: '我的网站',
        language: '1',
        grade: 1,
        name: '我的网站',
        cellphone: '',
        categoryId: '7',
        entName: '',
        areaPath: ''
      }
      if (item.id) {
        obj = {
          title: item.title,
          seoTitle: item.seoTitle,
          language: item.language,
          grade: item.grade,
          name: item.name,
          cellphone: '',
          categoryId: item.categoryId,
          entName: '',
          areaPath: '',
          copyId: item.id
        }
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
  }
}
</style>
