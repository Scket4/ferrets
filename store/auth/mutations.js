export default {
  setAuth(state, payload) {
    state.isAuth = payload;
  } ,
  setToken(state, payload) {
    state.token = payload;
  }
}
