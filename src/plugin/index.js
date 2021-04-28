import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

export default {
  install(Vue, options) {
    const modulesFiles = require.context('./modules', true, /\.js$/)
    modulesFiles.keys().forEach((key) => {
      Vue.use(modulesFiles(key).default)
    })

    Vue.prototype.$bus = new Vue()

    Vue.prototype.dayjs = dayjs
  },
}
