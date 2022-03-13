import Vue from 'vue'
import Vuex from 'vuex'
// import * as cook from 'cookie-universal-nuxt';
import auth from './auth';

Vue.use(Vuex)

export default (app) => {
  return new Vuex.Store({
    modules: {
      auth,
    },
    // plugins: [
    //   createPersistedState(
    //     {
    //       key: 'vuex',
    //       paths: [
    //         'auth.token',
    //         'auth.isAuth'
    //       ],
    //       storage: {
    //         getItem: key => Cookies.get(key, { domain: process.env.DOMAIN }),
    //         setItem: (key, value) => Cookies.set(key, value, { expires: 3, domain: process.env.DOMAIN }),
    //         removeItem: key => Cookies.remove(key, { domain: process.env.DOMAIN })
    //       }
    //     }
    //   )
    // ],

    strict: true,
  })
}
