// import 'core-js/stable'
// import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './icons'

import 'normalize.css'
import 'animate.css'

import '@/styles/index.scss'

import installPlugin from './plugin'
import installDirective from './directive'
import installFilter from './filter'

// import { initThemeColor } from '@/utils/themeColorClient'
// initThemeColor()

Vue.use(installPlugin)
Vue.use(installDirective)
Vue.use(installFilter)

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
