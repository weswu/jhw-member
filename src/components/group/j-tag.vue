<template>
  <div class="">
    <Select v-model="taglist" multiple style="width:350px" @on-change="change">
      <Option v-for="item in tagList" :value="item.name" :key="item.tagId" v-if="item.type === type">{{ item.name }}</Option>
    </Select>
    <Poptip placement="bottom" width="235">
      <span class="a_underline pl5">新增标签</span>
      <div slot="content">
        <Input v-model="tag" placeholder="请输入标签名称" style="width:200px;margin-bottom:10px;"></Input><br/>
        <Button type="primary" size="small" @click="addTag">添加</Button>
      </div>
    </Poptip>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  props: {
    tagMapStore: {},
    id: {},
    type: {}
  },
  data () {
    return {
      tag: '',
      taglist: [],
      oldVal: []
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tagList
    })
  },
  created () {
    this.tagList.length === 0 && this.$store.dispatch('getTagList')
    if (this.tagMapStore) {
      this.tagMapStore.forEach(item => {
        this.taglist.push(item.name)
        this.oldVal.push(item.name)
      })
    }
  },
  methods: {
    change (val) {
      if (val.length > this.oldVal.length) {
        let arr = this.unique(this.oldVal, val).join()
        this.tagList.forEach(item => {
          if (item.type === this.type && item.name === arr) {
            this.addTag(item)
          }
        })
      }
      if (val.length < this.oldVal.length) {
        let arr = this.unique(val, this.oldVal).join()
        this.tagList.forEach(item => {
          if (item.type === this.type && item.name === arr) {
            this.delTag(item)
          }
        })
      }
      this.oldVal = JSON.parse(JSON.stringify(this.taglist))
    },
    unique (arr, arr1) {
      arr1.forEach((item, index) => {
        arr.forEach(row => {
          if (item === row) {
            arr1.splice(index, 1)
          }
        })
      })
      return arr1
    },
    addTag (item) {
      if (this.id) {
        let data = {
          model: JSON.stringify({
            name: this.tag
          })
        }
        if (item) {
          data.model = JSON.stringify(item)
        }
        this.$http.post('/rest/api/tag/detail/' + this.id, qs.stringify(data)).then((res) => {
          if (res.success) {
            this.$Message.success('保存成功')
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.$Message.error('请先保存再来添加标签')
      }
    },
    delTag (item) {
      let data = {
        _method: 'DELETE'
      }
      this.$http.post('/rest/api/tag/detail/' + this.id + '/' + item.tagId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
