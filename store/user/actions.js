export default {
  async getUserData({ commit }) {
    const data = await this.$axios.$get('/user/profile');

    if (data.username) {
      commit('setUserData', data)
      return data
    }

    return null
  },

  async updateUserData({ commit }, newData) {
    await this.$axios.$post('user/update', newData);
  }
}