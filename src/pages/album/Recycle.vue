<template>
  <Modal class-name="j_static_add" width="530"
    v-model="modal"
    title="回收站"
    @on-cancel="cancel">
    <div class="modal-upload-list">
      <div class="modal-upload-item" v-for="item in list" :key="item.url" :class="{active: item._checked}" @click="select(item)">
        <img :src="$store.state.status.IMG_HOST+item.serverPath | picUrl(5)">
        <div class="modal-upload-item-cover">
          {{item.filename}}
        </div>
      </div>
      <div v-if="list.length === 0">
        暂无数据
      </div>
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
      list: [
        {}
      ],
      total: 0,
      searchData: {
        page: 1,
        pageSize: 20
      },
      id: 'all'
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/attr/recycle/' + this.id + '?' + qs.stringify(this.searchData)).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
          this.total = res.attributes.count
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open (id) {
      this.modal = true
      this.id = id
      this.get()
    },
    cancel () {
      this.modal = false
    }
  }
}
</script>

<style lang="less">
</style>
