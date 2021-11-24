export default {
  async signUp({ commit }, userData) {
    const data = await this.$axios.$post('auth/signUp', userData)
    
    if (data) {
      commit('setAuth', true)
      commit('setToken', 'lolkek')
      return true
    } else {
      return null
    }
  },

  async signIn({ commit }, userData) {
    const { data } = await this.$axios.$post('/user/signIn', userData)
    return data
  },
}
