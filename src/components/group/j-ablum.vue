<template>
  <Modal
    v-model="modal" width="600"
    :title="title"
    cancelText="取消">
    <Tabs type="card">
      <TabPane label="相册">
        <div class="" style="padding:10px">
          更新中..
        </div>
      </TabPane>
      <TabPane label="本地上传">
        <Upload
          multiple
          action="//jsonplaceholder.typicode.com/posts/" style="padding:10px">
          <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </TabPane>
    </Tabs>
  </Modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '上传图片'
    }
  },
  data () {
    return {
      modal: false,
      list: [],
      ablumCategory: [
        {
          name: '[系统]微信小程序Banner相册',
          state: '01',
          type: '11',
          tag: null,
          enterpriseId: 'Enterp_0000000000000000000000039',
          userId: 'User_000000000000000000000000082',
          albumId: 'Album_00000000000000000000074262',
          parentId: null,
          mainPic: 'upload/g/g2/ggggfj/picture/2017/08/24/9ba4b988-0cc6-4db7-b26f-184850f0fe9f.jpg',
          belongId: 'Enterp_0000000000000000000000039',
          attachList: null,
          addTime: 1502171403945,
          albumId2: '74262',
          blongType: 'CP',
          picCount: null,
          flashList: null,
          attCount: 0,
          adesc: null
        },
        {
          name: '产品批量上传',
          state: '01',
          type: '05',
          tag: null,
          enterpriseId: 'Enterp_0000000000000000000000039',
          userId: 'User_000000000000000000000000082',
          albumId: 'Album_00000000000000000000056104',
          parentId: null,
          mainPic: 'upload/g/g2/ggggfj/picture/2017/03/15/75f37c3a-4081-4bf8-8c36-1dd83113fe50.jpg',
          belongId: 'Enterp_0000000000000000000000039',
          attachList: null,
          addTime: null,
          albumId2: '56104',
          blongType: 'AP',
          picCount: null,
          flashList: null,
          attCount: 33,
          adesc: null
        }
      ]
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/album/list?pageSize=1000').then((res) => {
        if (res.success) {
          this.ablumCategory = res.attributes.data
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    open () {
      this.modal = true
    }
  }
}
</script>

<style lang="css">
</style>
