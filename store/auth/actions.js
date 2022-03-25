export default {
  async signUp({ commit }, userData) {
    const data = await this.$axios.$post('auth/signUp', userData)

    if (data.access_token) {
      commit('setAuth', true)
      commit('setToken', data.access_token)
      commit('user/setMyUserData', data.user, { root: true })
      return data
    }

    commit('setAuth', false)
    commit('setToken', null)
    return null
  },

  async signIn({ commit }, userData) {
    const data = await this.$axios.$post('auth/signIn', userData)

    if (data.access_token) {
      commit('setAuth', true)
      commit('setToken', data.access_token)
      commit('user/setMyUserData', data.user, { root: true })
      return data
    }

    commit('setAuth', false)
    commit('setToken', null)
    return null
  },

  logout({ commit }) {
    commit('setAuth', false)
    commit('setToken', null)
    commit('setMyUserData', {})
  },
}
