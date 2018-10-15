export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
const showThisMenuEle = (item, access) => {
  if (item.meta && access) {
    let name = item.name
    if (item.path === '') {
      name = name + 'Man'
    }
    if (hasOneOf(name, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (item.meta && item.meta.showInMenu) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        href: (item.meta && item.meta.href) || '',
        name: item.name,
        meta: item.meta,
        path: item.path
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  console.log(res)
  return res
}
