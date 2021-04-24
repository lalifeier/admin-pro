export default {
  namespaced: true,
  state: {
    isMobile: false,
    animate: {
      disabled: false,
      name: 'lightSpeed',
      direction: 'left'
    }
  },
  mutations: {
    SET_DEVICE: (state, isMobile) => {
      state.isMobile = isMobile
    },
    SET_ANIMATE (state, animate) {
      state.animate = animate
    }
  },
  actions: {
    setDevice ({ commit }, isMobile) {
      commit('SET_DEVICE', isMobile)
    },
    setAnimate ({ commit }, animate) {
      commit('SET_ANIMATE', animate)
    }
  },
  getters: { }
}
