<template>
  <FormItem label="标签：">
    <p style="padding:0 0 10px 0">
      <span v-for="(item, index) in list" :key="index" v-if="item.type === type">
        <Tag v-if="item._checked" type="border" closable @on-close="delTag(item)">{{item.name}}</Tag>
      </span>
    </p>
    <Dropdown>
      <Input v-model="name" class="w244" placeholder="请输入标签名称"></Input>
      <DropdownMenu slot="list">
        <p style="width:244px;padding: 0 5px">
          <span v-for="(item, index) in list" :key="index" v-if="item.type === type">
            <Tag v-if="!item._checked">
              <span @click="addTag(item)">{{item.name}}</span>
            </Tag>
          </span>
        </p>
      </DropdownMenu>
    </Dropdown>
    <Button icon="ios-plus-empty" type="dashed" @click="addTag" style="margin-left:5px;">添加标签</Button><br/>
    您可能感兴趣的标签：
    <span class="a_normal" @click="add('最新')">最新</span>
    <span class="a_normal" @click="add('热卖')" style="margin-left:5px;">热卖</span>
    <span class="a_normal" @click="add('推荐')" style="margin-left:5px;">推荐</span>
    <span class="a_normal" @click="add('置顶')" style="margin-left:5px;">置顶</span>
    <span class="a_normal" @click="add('促销')" style="margin-left:5px;">促销</span>
    <span class="a_normal" @click="add('打折')" style="margin-left:5px;">打折</span>
  </FormItem>
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
      name: '',
      list: []
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tagList
    })
  },
  watch: {
    tagList () {
      this.tagActive()
    }
  },
  created () {
    if (this.tagList.length === 0) {
      this.$store.dispatch('getTagList')
    } else {
      this.tagActive()
    }
  },
  methods: {
    // 初始化标签
    tagActive () {
      var ctx = this
      let list = JSON.parse(JSON.stringify(this.tagList))
      list.forEach(item => {
        if (item.type === ctx.type) {
          item._checked = false
          ctx.tagMapStore && this.tagMapStore.forEach(item2 => {
            if (item.tagId === item2.tagId) {
              item._checked = true
            }
          })
          ctx.list.push(item)
        }
      })
    },
    // 添加
    add (name) {
      this.name = name
      this.addTag(name)
    },
    addTag (item) {
      if (item.tagId) {
        this.name = item.name
        item._checked = true
      }
      let data = {
        model: JSON.stringify({
          tagId: item.tagId,
          name: this.name,
          type: this.type
        })
      }
      this.name = ''
      let url = this.id ? '/' + this.id : ''
      this.$http.post('/rest/api/tag/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          if (!item.tagId) {
            let data = res.attributes.data
            data._checked = true
            this.list.push(data)
            this.tagList.push(data)
            this.$store.commit('setTagList', this.tagList)
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    delTag (item) {
      let data = {
        _method: 'DELETE'
      }
      this.$http.post('/rest/api/tag/detail/' + this.id + '/' + item.tagId, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('删除成功')
          item._checked = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>
