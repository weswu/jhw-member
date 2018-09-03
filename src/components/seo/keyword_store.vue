<template>
  <div class="j_keyword_store">
    <div class="j_search">
      <Input v-model="name" placeholder="请输入关键词名称" style="width:200px"></Input>
      <Button class="search" @click="add">添加</Button>
    </div>
    <JTable :title="'关键词'" class="j_table_li">
      <tbody slot="tbody">
        <tr>
          <td>
            <ul slot="content">
              <li v-for="(item, index) in list" :key="index" :title="item.keywords">
                <Checkbox v-model="item._checked">{{item.keywords}}</Checkbox>
                <i class="iconfont icon-huishouzhan" @click='del(item.keywordsId)'></i>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </JTable>
    <div class="j_pagination fixed">
      <div class="btn">
        <Checkbox v-model="toggle" @on-change="handleSelectAll"/>
        <Button type="ghost" size="small" @click="allDel">批量删除</Button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import JTable from '@/components/group/j-table'
export default {
  components: {
    JTable
  },
  data () {
    return {
      list: [],
      name: '',
      toggle: false
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
    // 批量
    handleSelectAll () {
      var ctx = this
      this.list.forEach(item => {
        item._checked = ctx.toggle
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
      float: left;
      width: 14.285%;
      color: #656565;
      margin-right: 0;
      padding: 15px 10px;
      border-right: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      position: relative;
      .ivu-checkbox-wrapper{
        .ivu-checkbox{
          padding-right: 5px;
        }
      }
      .icon-huishouzhan{
        cursor: pointer;
        position: absolute;
        right: 8px;
      }
    }
  }
}
</style>
