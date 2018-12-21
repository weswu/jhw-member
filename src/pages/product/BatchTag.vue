<template>
  <Layout class="j_layout_content j_form_detail">
    <Content>
      <JHeader :title="'批量导入标签'"/>
      <Form :model="detail" :label-width="130">
        <FormItem label="选择标签：">
          <Select v-model="tagId" multiple>
            <Option v-for="item in list" :value="item.tagId" :key="item.tagId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="选择产品：">
          已选择{{proCount}}件商品 <span class="a_underline" @click="selectProduct">选择商品</span>
        </FormItem>
        <FormItem label="指定产品分类：">
          <CategorySelect :categoryId="detail.categoryId" :list="categoryList" @on-change="categoryChange" :isDefalut="true"/>
        </FormItem>
      </Form>
      <SelectProduct ref="select" @on-change="idsChange"/>
    </Content>
    <Footer>
      <Button type="primary" size="small" @click="submit('batchAddProductTag')">产品批量添加标签</Button>
      <Button type="primary" size="small" @click="submit('batchRemoveProductTag')">产品批量删除标签</Button>
    </Footer>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JTag from '@/components/group/j-tag'
import SelectProduct from '@/components/product/select-product'
import CategorySelect from '@/components/group/j-category-select'
export default {
  components: {
    JHeader,
    JTag,
    SelectProduct,
    CategorySelect
  },
  data () {
    return {
      list: [],
      detail: {
        productIds: ''
      },
      proCount: 0,
      tagId: ''
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.productCategory,
      tagList: state => state.tagList
    })
  },
  watch: {
    tagList () {
      this.init()
    }
  },
  created () {
    if (this.tagList.length === 0) {
      this.$store.dispatch('getTagList')
    } else {
      this.init()
    }
    if (this.categoryList.length === 0) {
      this.$store.dispatch('getCategory', 'product')
    }
  },
  methods: {
    // 初始化标签
    init () {
      var ctx = this
      let list = JSON.parse(JSON.stringify(this.tagList))
      list.forEach(item => {
        if (item.type === 'product') {
          ctx.list.push(item)
        }
      })
    },
    count () {
      this.proCount = !this.detail.productIds ? 0 : this.detail.productIds.split(',').length
    },
    selectProduct () {
      this.$refs.select.open(this.detail.productIds)
    },
    idsChange (ids) {
      this.detail.productIds = ids
      this.count()
    },
    categoryChange (e) {
      this.detail.categoryId = e
    },
    submit (e) {
      this.detail.tagId = this.tagId.join()
      this.$http.post('/rest/api/tag/' + e, qs.stringify(this.detail)).then((res) => {
        if (res.success) {
          this.$Message.success('操作成功')
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
