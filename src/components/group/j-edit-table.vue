<template>
  <Table :ref="refs" :columns="columnsList" :data="thisTableData" border disabled-hover></Table>
</template>

<script>
const saveIncellEditBtn = (vm, h, param) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'checkmark'
    },
    on: {
      click: (event) => {
        vm.edittingStore[param.index].edittingCell[param.column.key] = false
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key)
      }
    }
  })
}
const cellInput = (vm, h, param, item) => {
  return h('Input', {
    props: {
      type: 'text',
      value: vm.edittingStore[param.index][item.key]
    },
    on: {
      'on-change' (event) {
        let key = item.key;
        vm.edittingStore[param.index][key] = event.target.value
      }
    }
  })
}
const incellEditBtn = (vm, h, param) => {
  if (vm.hoverShow) {
    return h('div', {
      class: {
          'show-edit-btn': vm.hoverShow
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          icon: 'edit'
        },
        on: {
          click: (event) => {
            vm.edittingStore[param.index].edittingCell[param.column.key] = true
            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
          }
        }
      })
    ])
  } else {
    return h('Button', {
      props: {
        type: 'text',
        icon: 'edit'
      },
      on: {
        click: (event) => {
          vm.edittingStore[param.index].edittingCell[param.column.key] = true
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        }
      }
    })
  }
}
const saveIncellEditBtn = (vm, h, param) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'checkmark'
    },
    on: {
      click: (event) => {
        vm.edittingStore[param.index].edittingCell[param.column.key] = false
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key)
        let data = {
          model: JSON.stringify({
            id: params.row.productId,
            prodtype: params.row.prodtype2
          }),
          _method: 'put'
        }
        ctx.$http.post('/rest/api/product/detail/' + params.row.productId, qs.stringify(data)).then((res) => {
          if (res.success) {
            ctx.$Message.success('修改成功')
            ctx.list[params.index].prodtype = params.row.prodtype2
          } else {
            ctx.$Message.error(res.msg)
          }
        })
      }
    }
  })
}
export default {
  name: 'jEditTable',
  props: {
    refs: String,
    columnsList: Array,
    value: Array,
    url: String,
    editIncell: {
      type: Boolean,
      default: false
    },
    hoverShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columns: [],
      thisTableData: [],
      edittingStore: []
    }
  },
  created () {
    this.init()
  },
}
</script>

<style lang="css">
</style>
