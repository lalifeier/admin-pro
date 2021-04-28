import { login, getUserInfo } from '@/api/user'
import { resetRouter } from '@/router/index'

import cookies from '@/utils/cookies'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants'

export default {
  namespaced: true,
  state: {
    uid: '',
    username: '',
    avatar: '',
    access_token: '',
    refresh_token: '',
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state = Object.assign(state, data)
    },
    RESET_TOKEN: (state) => {
      state = Object.assign(state, {
        access_token: '',
        refresh_token: '',
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      state = Object.assign(state, userInfo)
    },
    RESET_USER_INFO: (state) => {
      state = Object.assign(state, {
        uid: '',
        username: '',
        avatar: '',
      })
    },
  },
  actions: {
    async login({ commit }, params) {
      const res = await login(params)
      const { data } = res
      const { access_token, refresh_token } = data
      cookies.set(ACCESS_TOKEN, access_token)
      cookies.set(REFRESH_TOKEN, refresh_token)

      commit('SET_TOKEN', data)
    },

    async getUserInfo({ commit, state }) {
      const { data } = await getUserInfo(state.access_token)
      commit('SET_USER_INFO', data)
      return data
    },

    logout() {
      resetRouter()
      cookies.remove(ACCESS_TOKEN)
      cookies.remove(REFRESH_TOKEN)
      window.location.reload()
    },

    resetToken({ commit }) {
      commit('RESET_TOKEN')
    },
  },
  getters: {},
}
