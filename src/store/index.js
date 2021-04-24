import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// import VuexPersistence from 'vuex-persist'
// import Cookies from 'js-cookie'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// const vuexCookie = new VuexPersistence({
//   restoreState: (key) => Cookies.getJSON(key),
//   saveState: (key, state) => Cookies.set(key, state, {
//     expires: 3
//   }),
//   modules: ['user'],
//   filter: (mutation) => mutation.type === 'login' || mutation.type === 'logout'
// })

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   modules,
//   filter: (mutation) => mutation.type !== 'login' && mutation.type !== 'logout'
// })

const store = new Vuex.Store({
  modules,
  getters
  // plugins: [vuexCookie.plugin, vuexLocal.plugin]
})

export default store
