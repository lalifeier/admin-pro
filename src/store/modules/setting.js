import variables from '@/styles/element-variables.scss'

export default {
  namespaced: true,
  state: {
    theme: {
      mode: 'light',
      color: variables.themeColor,
    },
    menuType: 'side',
    sidebar: true,
    tagsView: true,
    wideType: 'flow',
    fixedHeader: true,
    fixedSide: true,
  },
  mutations: {
    SET_THEME: (state, theme) => {
      state.theme = theme
    },
    SET_MENU_TYPE: (state, type) => {
      state.menuType = type
    },
    SET_SIDEBAR: (state) => {
      state.sidebar = !state.sidebar
    },
    SET_TAGS_VIEW: (state) => {
      state.tagsView = !state.tagsView
    },
    SET_WIDE_TYPE: (state, type) => {
      state.wideType = type
    },
    SET_FIXED_HEADER: (state, isFixed) => {
      state.fixedHeader = isFixed
    },
    SET_FIXED_SIDE: (state, isFixed) => {
      state.fixedSide = isFixed
    },
  },
  actions: {
    setTheme: ({ commit }, theme) => {
      document.body.className = `theme-${theme.mode}`

      document.documentElement.dataset.theme = theme.mode

      commit('SET_THEME', theme)
    },
    setMenuType: ({ commit }, type) => {
      commit('SET_MENU_TYPE', type)
    },
    setSideBar: ({ commit }) => {
      commit('SET_SIDEBAR')
    },
    setTagsView: ({ commit }) => {
      commit('SET_TAGS_VIEW')
    },
    setWideType: ({ commit }, type) => {
      commit('SET_WIDE_TYPE', type)
    },
    setFixedHeader: ({ commit }, isFixed) => {
      commit('SET_FIXED_HEADER', isFixed)
    },
    setFixedSide: ({ commit }, isFixed) => {
      commit('SET_FIXED_SIDE', isFixed)
    },
  },
  getters: {},
}
