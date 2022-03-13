export default function ({ store, redirect, route }) {
  if (!store.getters['auth/getAuth'] && route.path !== '/signUp') {
    redirect('/signIn');
  }
}
