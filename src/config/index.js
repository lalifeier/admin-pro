module.exports = {
  // 标题
  title: 'Admin Pro',

  // 是否显示顶部进度条
  progressBar: true,

  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  //  白名单路由
  routerWhiteList: ['/login', '/register', '/404', '/401', '/403', '/500'],

  // 加载时显示文字
  loadingText: '正在加载中...',
  // 消息框消失时间
  messageDuration: 3000,

  // 接口超时时间
  timeout: 5000,

  github: 'https://github.com/lalifeier/admin-pro',

  copyright: '2021 后台管理系统',

  animate: {
    name: 'roll',
    direction: 'default',
  },
}
