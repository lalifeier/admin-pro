export default {
  theme: (state) => state.setting.theme,
  menuType: (state) => state.setting.menuType,
  sidebar: (state) => state.setting.sidebar,
  tagsView: (state) => state.setting.tagsView,
  wideType: (state) => state.setting.wideType,
  fixedHeader: (state) => state.setting.fixedHeader,
  fixedSide: (state) => state.setting.fixedSide,

  // routes: (state) => state.permission.routes,
  // addRoutes: (state) => state.permission.addRoutes,
  permission_routes: (state) => state.permission.routes,

  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,

  uid: (state) => state.user.uid,
  username: (state) => state.user.username,
  avatar: (state) => state.user.avatar,
  access_token: (state) => state.user.access_token,
  refresh_token: (state) => state.user.refresh_token,
  roles: (state) => state.user.roles,

  isMobile: (state) => state.app.isMobile,
  animate: (state) => state.app.animate,
}
