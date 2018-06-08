<template>
  <FormItem label="标签：">
    <p style="padding:0 0 10px 0">
      <span v-for="item in tagList" :key="item.tagId" v-if="item.type === type">
        <Tag v-if="item._checked" type="border" closable @on-close="delTag(item)">{{item.name}}</Tag>
      </span>
    </p>
    <Dropdown>
      <Input v-model="name" class="w244" placeholder="请输入标签名称"></Input>
      <DropdownMenu slot="list">
        <p style="width:244px;padding: 0 5px">
          <span v-for="item in tagList" :key="item.tagId" v-if="item.type === type">
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
      taglist: []
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tagList
    })
  },
  created () {
    this.tagActive()
  },
  methods: {
    // 初始化标签
    tagActive () {
      this.tagList.forEach(item => {
        item._checked = false
        this.tagMapStore && this.tagMapStore.forEach(item2 => {
          if (item.tagId === item2.tagId) {
            item._checked = true
          }
        })
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
      }
      let data = {
        model: JSON.stringify({
          name: this.name,
          type: this.type
        })
      }
      this.name = ''
      let url = this.id ? '/' + this.id : ''
      this.$http.post('/rest/api/tag/detail' + url, qs.stringify(data)).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
          let data = res.attributes.data
          data._checked = true
          this.tagList.push(data)
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
          this.tagList.forEach(tag => {
            if (tag.tagId === item.tagId) {
              tag._checked = false
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
