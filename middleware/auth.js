export default async function ({ store, redirect, route }) {
  if (!store.getters['auth/getAuth'] && route.path !== '/signUp') {
    redirect('/signIn');
  } else {
    const user = store.getters['user/getMyUserData'];
    const token = store.getters['auth/getToken'];
    if (!user && token) {
      await store.dispatch('user/getMyUserData')
    }
  }
}
