import Vue from 'vue'
import Vuex from 'vuex'
// import * as cook from 'cookie-universal-nuxt';
import auth from './auth';
import user from './user'

Vue.use(Vuex)

export default (app) => {
  return new Vuex.Store({
    modules: {
      auth,
      user,
    },
    strict: true,
  })
}
