export default function ({ $axios, store, $toast }) {
  $axios.interceptors.request.use((config) => {
    const token = store.getters['auth/getToken'];

    if (token) {
      $axios.setToken(store.getters['auth/getToken'], 'Bearer');
    }

    return config;
  });

  $axios.interceptors.response.use(
    (error) => {
      const { message, response } = error;
      const errorsMessage = Array.isArray(response?.data.message)
        ? response.data.message.join('\r\n')
        : response.data.message;

      if (response) {
        $toast({
          title: serverMessages[message] || message,
          text: serverMessages[errorsMessage] || errorsMessage,
        })
      }
    }
  );
}
