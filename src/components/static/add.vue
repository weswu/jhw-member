<template>
  <Modal class-name="j_static_add" width="576"
    v-model="modal"
    title="创建网站"
    @on-cancel="cancel">
    <div class="static_list">
      <Card dis-hover v-if="searchData.page === 1 && list.length < 9">
        <div class="text" @click="add">
          新建空白网站
        </div>
      </Card>
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
    </div>
    <JPagination :total="total" :searchData='searchData' @on-change="get" style="border-top: 1px solid #e9e9e9;"></JPagination>
  </Modal>
</template>

<script>
import qs from 'qs'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JPagination
  },
  data () {
    return {
      modal: false,
      list: [],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 9,
        sort: 'addTime!desc'
      }
    }
  },
  methods: {
    get () {
      this.searchData.page === 1 ? this.searchData.pageSize = 8 : this.searchData.pageSize = 9
      this.$http.get('/rest/pc/index/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open () {
      this.modal = true
      if (this.list.length === 0) {
        this.get()
      }
    },
    cancel () {
      this.modal = false
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
          copyId: parseInt(item.id)
        }
      }
      let data = {
        model: JSON.stringify(obj)
      }
      this.$http.post('/rest/pc/api/baseLayout/detail', qs.stringify(data), {
        headers: {
          'X-CSRF-Token': this.$store.state.user.token
        }
      }).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.$emit('on-change')
          this.cancel()
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_static_add{
  .static_list{
    overflow: hidden;
    .ivu-card{
      width: 178px;
      height: 112px;
      position: relative;
      float: left;
      overflow: hidden;
      cursor: pointer;
      margin: 11px 0;
      background: url(http://dfwjjingtai.b0.upaiyun.com/upload//a//a1//admin//picture//2017//05//23/9c42cdda-6592-441f-a508-e4f9abe50c3f.png) no-repeat 0 0;
      background-size: 177px;
      &:nth-child(3n+2){
        margin-left: 5px;
        margin-right: 5px;
      }
      .ivu-card-body{
        padding: 0;
        padding-top: 9px;
        &:hover{
          .container{
            display: block;
            .bg{
              opacity: 1;
            }
          }
        }
        img{
          width:176px
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
            margin-top: 46px;
            position: relative;
            a{
              background: #ff5241;
              color: #fff;
              padding: 3px 14px;
              border-radius: 30px;
              margin: 0 5px;
              display: inline-block;
            }
          }
        }
      }
    }
    .text{
      background-color: #fff;
      line-height: 100px;
      text-align: center;
      font-size: 14px;
      width: 176px;
      height: 101px;
      cursor: pointer;
      &:hover{
        color: #ff5241;
      }
    }
  }
  .ivu-modal-footer{
    display: none;
  }
}
</style>
