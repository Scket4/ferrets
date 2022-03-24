export default {
  async getUserData({ commit }, username) {
    const data = await this.$axios.$get(`/user/profile/${username}`)

    if (data.username) {
      commit('setUserData', data)
      return data
    }

    return null
  },

  async getMyUserData({ commit }) {
    const data = await this.$axios.$get('/user/my-profile')

    if (data.username) {
      commit('setMyUserData', data)
      return data
    }

    return null
  },

  async updateMyUserData({ commit }, newData) {
    const data = await this.$axios.$post('user/update', newData, {
      headers: {
        'Content-Type': newData.file
          ? 'multipart/form-data'
          : 'application/json',
      },
    })

    if (data.username) {
      commit('setMyUserData', data)
    }
  },

  async toggleLike({ commit }, likeInfo) {
    const data = await this.$axios.$post('user/like', likeInfo)
    
    if (data.username) {
      if (likeInfo.targetUsername === likeInfo.myUsername) {
        commit('setMyUserData', data)
        return
      }
      
      commit('setUserData', data)
    }
  },

  async searchUsers(_, searchQuery) {
    const findedUsers = await this.$axios.$get(`user/search/${searchQuery}`)

    return findedUsers
  }
}
