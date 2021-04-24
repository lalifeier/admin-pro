import layout from '@/layout'

export default [
  {
    path: '/error',
    component: layout,
    name: 'Error',
    meta: {
      title: '错误页面',
      icon: 'warning'
    },
    children: [
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error/401'),
        meta: { title: '401' }
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@/views/error/403'),
        meta: { title: '403' }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404'),
        meta: { title: '404' }
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/error/500'),
        meta: { title: '500' }
      }]
  }
]
