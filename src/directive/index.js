import permission from './modules/permission'
import clipboard from './modules/clipboard'

export default {
  install (Vue, options) {
    Vue.directive('clipboard', clipboard)
    Vue.directive('permission', permission)
  }
}
