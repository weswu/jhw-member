<template>
  <Modal
    v-model="modal"
    title="设置用户权限"
    okText="确定"
    cancelText="取消"
    @on-ok="ok">
    <Tree ref="tree" :data="data" show-checkbox multiple style="max-height: 400px;overflow: auto;"></Tree>
  </Modal>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      modal: false,
      memberId: '',
      data: []
    }
  },
  computed: {
    ...mapState(['userprivilege'])
  },
  methods: {
    get () {
      if (this.userprivilege.length === 0) {
        this.$store.dispatch('getUserprivilege').then(e => {
          this.init()
        })
      } else {
        this.init()
      }
    },
    init () {
      var vm = this
      this.userprivilege.forEach(item => {
        if (!item.belongId) {
          vm.data.push({
            title: item.pname,
            id: item.userprivilegeId,
            expand: false,
            checked: false,
            children: []
          })
        }
      })
      vm.data.forEach(item => {
        vm.userprivilege.forEach(item2 => {
          if (item.id === item2.belongId) {
            item.children.push({
              title: item2.pname,
              id: item2.userprivilegeId,
              expand: false,
              checked: false,
              children: []
            })
          }
        })
      })
      vm.data.forEach(item => {
        item.children.forEach(row => {
          vm.userprivilege.forEach(item2 => {
            if (row.id === item2.belongId) {
              row.children.push({
                title: item2.pname,
                id: item2.userprivilegeId,
                checked: false
              })
            }
          })
        })
      })
    },
    open (id) {
      var ctx = this
      this.data = []
      this.get()
      this.modal = true
      this.memberId = id
      this.$http.get('/rest/api/userpriv/detail/' + id).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data && data.forEach(item => {
            ctx.data.forEach(item1 => {
              if (item.userprivilegeId === item1.id) {
                item1.checked = true
              }
              item1.children && item1.children.forEach(item2 => {
                if (item.userprivilegeId === item2.id) {
                  item2.checked = true
                }
                item2.children && item2.children.forEach(item3 => {
                  if (item.userprivilegeId === item3.id) {
                    item3.checked = true
                  }
                })
              })
            })
          })
        } else {
          ctx.$Message.success(res.msg)
        }
      })
    },
    ok () {
      var ctx = this
      let id = ''
      this.data.forEach(item => {
        if (item.checked) {
          id ? (id = id + ',' + item.id) : (id = item.id)
        }
        item.children && item.children.forEach(item1 => {
          if (item1.checked) {
            id ? (id = id + ',' + item1.id) : (id = item1.id)
          }
          item1.children && item1.children.forEach(item2 => {
            if (item2.checked) {
              id ? (id = id + ',' + item2.id) : (id = item2.id)
            }
          })
        })
      })
      let data = {
        userprivilegeId: id
      }
      this.$http.post('/rest/api/userpriv/detail/' + this.memberId, qs.stringify(data)).then((res) => {
        if (res.success) {
          ctx.$Message.success('保存成功')
        } else {
          ctx.$Message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
