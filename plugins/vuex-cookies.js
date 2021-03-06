import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'auth.token',
      'auth.isAuth',
    ],
    storage: {
      getItem: (key) => (process.client ? Cookies.get(key) : cookie.parse(req.headers.cookie || '')[key]),
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store);
};