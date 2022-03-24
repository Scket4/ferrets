export default async function (context, inject) {
  const currentUser = await context.app.store.getters['user/getMyUserData']
  const currentUsername = currentUser?.username
  const socket = context.app.$nuxtSocket({
    name: 'default',
    reconnection: true,
  })

  inject('socket', socket)

  socket.emit('setStatusOnline', { username: currentUsername })

  socket.on('setLikeNotification', ({ targetUser, whoSetLike }) => {
    if (targetUser.username === currentUsername) {
      context.app.store.commit('user/setMyUserData', targetUser)
      if (targetUser.profile_likes.includes(whoSetLike) && whoSetLike !== currentUsername) {
        context.app.$toast.success(`${whoSetLike} нравится ваш профиль!`)
      }
    }
  })

  socket.on('disconnect', () => {
    const interval = setInterval(() => {
      if (socket.connected) {
        clearInterval(interval)
        socket.emit('setStatusOnline', { username: currentUsername })
        return
      }

      socket.connect()
    }, 500)
  })
}
