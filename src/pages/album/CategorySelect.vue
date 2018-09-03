<template>
  <categorySelect :albumId="albumId" :list="data" :isDefalut="true" @on-change="categoryChange"/>
</template>

<script>
import { mapState } from 'vuex'
import categorySelect from '@/components/group/j-category-select'
export default {
  props: {
    albumId: {},
    isDefalut: Boolean
  },
  components: {
    categorySelect
  },
  data () {
    return {
      visible: false,
      data: [],
      name: ''
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.albumCategory
    })
  },
  watch: {
    categoryList: {
      handler () {
        this.init()
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let list = []
      // 1级
      this.categoryList.forEach(item => {
        if (!item.parentId) {
          item.isroot = false // 根目录和三角
          item.expand = true // 三角图标展开-关闭
          item.bg = false // 层级背景颜色
          item.grade = '1'
          item.categoryId = item.albumId
          item.belongId = item.parentId
          list.push(item)
        }
      })
      // 2级
      this.categoryList.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '1' && (row.parentId === item.albumId)) {
            item.isroot = true
            row.isroot = false
            row.hidden = false // 显示隐藏
            row.expand = true
            row.bg = false
            row.grade = '2'
            row.categoryId = row.albumId
            row.belongId = row.parentId
            list.splice(index + 1, 0, row)
          }
        })
      })
      // 3级
      this.categoryList.forEach(row => {
        list.forEach((item, index) => {
          if (item.grade === '2' && (row.parentId === item.albumId)) {
            item.isroot = true
            row.isroot = false
            row.hidden = false
            row.bg = false
            row.grade = '3'
            row.categoryId = row.albumId
            row.belongId = row.parentId
            list.splice(index + 1, 0, row)
          }
        })
      })
      this.data = list
    },
    categoryChange (e) {
      this.$emit('on-change', e)
    }
  }
}
</script>
