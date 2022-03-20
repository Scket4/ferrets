export default function ({ $axios, redirect, store, $toast }) {
  $axios.onRequest(config => {
    const token = store.getters['auth/getToken']

    if (token) {
      $axios.setToken(store.getters['auth/getToken'], 'Bearer')
    }

    return config
  })

  $axios.onError(error => {
    if (error?.response?.data?.message) {
      $toast.error(error.response.data.message)
    } else {
      $toast.error('Произошла ошибка ' + error?.response?.status)
    }
  })
}