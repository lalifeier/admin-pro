import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import cookies from '@/utils/cookies'
import { ACCESS_TOKEN } from '@/utils/constants'

import { constantRoutes } from '@/router/routes'

import { routerMode, routerWhiteList, progressBar } from '@/config'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const createRouter = (routes = []) =>
  new VueRouter({
    // base: process.env.BASE_URL,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  })

const router = createRouter(constantRoutes)

export function resetRouter(routes = []) {
  router.matcher = createRouter(routes).matcher
}

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  if (progressBar) {
    NProgress.start()
  }

  store.dispatch('setting/setTheme', store.getters.theme)

  const token = cookies.get(ACCESS_TOKEN)
  if (token) {
    const { roles } = store.getters
    if (roles.length > 0) {
      next()
      return
    }
    try {
      const { roles } = await store.dispatch('user/getUserInfo')
      const asyncRoutes = await store.dispatch('permission/generateRoutes', roles)
      // console.log(asyncRoutes)
      // router.addRoutes(asyncRoutes)

      const routes = constantRoutes.concat(asyncRoutes)
      resetRouter(routes)
      router.addRoutes([{ path: '*', redirect: '/404' }])

      next({ ...to, replace: true })
      // next()
    } catch (error) {
      console.log(error)
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  } else if (routerWhiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next({ name: 'login', query: { redirect: to.fullPath } })
  }
})

router.afterEach(() => {
  if (progressBar) {
    NProgress.done()
  }
})

export default router
