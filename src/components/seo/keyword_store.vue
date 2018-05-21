<template>
  <div class="j_keyword_store">
    <div class="j_search">
      <Input v-model="name" placeholder="请输入关键词名称" style="width:200px"></Input>
      <Button class="search" @click="add">添加</Button>
      <Button class="search" @click="allDel">批量删除</Button>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <Checkbox v-model="item._checked">{{item.keywords}}</Checkbox>
        <i class="iconfont icon-huishouzhan" @click='del(item.keywordsId)'></i>
      </li>
    </ul>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      name: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/keywords/list?pageSize=500').then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            item._checked = false
          })
          this.list = data || []
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 功能
    add () {
      let data = {
        keywords: this.name
      }
      this.$http.post('/rest/api/keywords/detail', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          this.list.splice(0, 0, res.attributes.data[0])
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    del (id) {
      var ctx = this
      let data = {
        _method: 'DELETE'
      }
      this.$http.post('/rest/api/keywords/detail/' + id, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          for (let i = 0; i < ctx.list.length; i++) {
            if (ctx.list[i].keywordsId === id) {
              ctx.list.splice(i, 1)
            }
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    allDel () {
      var ctx = this
      let ids = ''
      this.list.forEach(item => {
        if (item._checked) {
          ids = !ids ? item.keywordsId : (ids + ',' + item.keywordsId)
        }
      })
      if (!ids) {
        return this.$Message.error('未选择')
      }
      let data = {
        ids: ids
      }
      this.$http.post('/rest/api/keywords/batch/del', qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          ids.split(',').forEach(id => {
            for (let i = 0; i < ctx.list.length; i++) {
              if (ctx.list[i].keywordsId === id) {
                ctx.list.splice(i, 1)
              }
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.j_keyword_store {
  ul{
    li{
      width: 200px;
      float:left;
      padding: 4px 10px;
      margin: 1px;
      .ivu-checkbox-wrapper{
        width: 150px;
        .ivu-checkbox{
          padding-right: 5px;
        }
      }
      &:nth-child(odd){
        background: #f5f5f5;
      }
      .icon-huishouzhan{
        cursor: pointer;
      }
    }
  }
}
</style>
