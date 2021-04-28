import layout from '@/layout'

import { github } from '@/config'

let moduleRouters = []
const modulesFiles = require.context('./modules', true, /\.js$/)
modulesFiles.keys().forEach((key) => {
  moduleRouters = moduleRouters.concat(modulesFiles(key).default)
})

export const asyncRoutes = moduleRouters

export const constantRoutes = [
  {
    path: '/',
    redirect: 'index',
    component: layout,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { title: '首页', icon: 'dashboard' },
        component: () => import('@/views/index/index'),
      },
    ],
  },
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next((vm) => vm.$router.replace(from.fullPath))
      },
      render: (h) => h(),
    },
  },
  // 页面重定向 必须保留
  {
    path: '/redirect/:path(.*)',
    name: 'redirect',
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next((vm) => vm.$router.replace(JSON.parse(from.params.route)))
      },
      render: (h) => h(),
    },
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index'),
  },
  {
    path: '/link',
    component: layout,
    children: [
      {
        path: github,
        meta: { title: 'github', icon: 'link' },
      },
    ],
  },
  {
    path: '/demo',
    component: layout,
    meta: {
      title: 'demo',
    },
    children: [
      // {
      //   path: 'index', name: 'index', meta: { title: 'demo' }, component: () => import('@/views/demo/index')
      // },
      {
        path: 'zTree',
        name: 'index',
        meta: { title: 'zTree' },
        component: () => import('@/views/demo/zTree'),
      },
      {
        path: 'file',
        name: 'index',
        meta: { title: 'file' },
        component: () => import('@/views/demo/file'),
      },
      {
        path: 'tooltip',
        name: 'tooltip',
        meta: { title: 'tooltip' },
        component: () => import('@/views/demo/tooltip'),
      },
    ],
  },
]
