export default {
  async signUp({ commit }, userData) {
    const data = await this.$axios.$post('auth/signUp', userData)

    if (data) {
      commit('setAuth', true)
      commit('setToken', data.access_token)
      return true
    } else {
      commit('setAuth', false)
      commit('setToken', null)
      return null
    }
  },

  async signIn({ commit }, userData) {
    const data = await this.$axios.$post('auth/signIn', userData)
    console.log(data);
    if (data) {
      commit('setAuth', true)
      commit('setToken', data.access_token)
      return true
    }

    commit('setAuth', false)
    commit('setToken', null)
    return data
  },
}
