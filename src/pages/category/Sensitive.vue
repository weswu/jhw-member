<template>
  <Layout class="j_layout_content">
    <JHeader :title="($route.meta.id === 'product' ? '产品' : '新闻') + '敏感词'" :lan="true" @on-change="get"/>
    <Content>
      <Table :columns="columns" :data="list"/>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    return {
      columns: [
        { type: 'index', title: '序号', align: 'center', width: 60 },
        { title: '新闻标题', key: 'title' },
        { title: '敏感词', render: this.wordFilter }
      ],
      list: []
    }
  },
  created () {
    if (this.$route.meta.id === 'product') this.columns[1] = { title: '产品名称', key: 'name' }
    this.get()
  },
  methods: {
    get () {
      let url = 'news/badWordNewsList'
      if (this.$route.meta.id === 'product') {
        url = 'product/badWordProductList'
      }
      this.$http.get('/rest/api/' + url).then(res => {
        if (res.success) {
          this.list = res.attributes.data
        }
      })
    },
    // 过滤
    wordFilter (h, params) {
      let text = ''
      let list = []
      params.row.words.forEach((item, index) => {
        if (index > 0) {
          list.push(
            h('span', {
              class: { delimiter: true },
              style: {
                padding: '0'
              }
            }, '、')
          )
        }
        list.push(
          h('a', [
            h('Poptip', {
              props: {
                confirm: true,
                width: '400',
                placement: 'right'
              },
              class: {
                j_poptip_confirm_edit: true
              },
              on: {
                'on-ok': () => {
                  let data = {
                    word: item,
                    newWord: text
                  }
                  let url = 'news/updateNewsBadWorld?'
                  if (this.$route.meta.id === 'product') {
                    url = 'product/updateProductBadWorld?'
                    data.productId = params.row.productId
                  } else {
                    data.newsId = params.row.newsId
                  }
                  this.$http.post('/rest/api/' + url + qs.stringify(data)).then((res) => {
                    if (res.success) {
                      this.$Message.success('替换成功')
                      this.get()
                    } else {
                      this.$Message.success(res.msg)
                    }
                  })
                }
              }
            }, [
              h('span', item),
              h('div', {
                slot: 'title'
              }, [
                h('Input', {
                  props: {
                    type: 'text',
                    value: text,
                    placeholder: '替换敏感词'
                  },
                  on: {
                    input: (val) => {
                      text = val
                    }
                  }
                })
              ])
            ])
          ])
        )
      })
      return h('div', list)
    }
  }
}
</script>

<style lang="less">
</style>
