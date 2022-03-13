<template>
  <div class="container">
    <h5 class="heading">Вход</h5>
    <v-form id="signIn" ref="form" class="form" @submit.prevent="login">
      <label>
        <span class="input__label">Никнейм</span>
        <v-text-field
          v-model="username"
          placeholder="ferret"
          :rules="[valRequired]"
          outlined
          tabindex="1"
          class="input"
        ></v-text-field>
      </label>
      <label>
        <span class="input__label">Пароль</span>
        <v-text-field
          v-model="password"
          :rules="[valPassword, valRequired]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          outlined
          placeholder="******"
          tabindex="1"
          class="input"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </label>
      <div class="actions">
        <p>Еще не зарегистированы?</p>
        <nuxt-link to="/signUp">Регистрация</nuxt-link>
      </div>
      <v-btn class="button" large for="signIn" type="submit">
        Вход</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  layout: 'auth',
  data: () => ({
    showPassword: false,
    password: '',
    username: '',
  }),
  methods: {
     ...mapActions({
      signIn: 'auth/signIn',
    }),
    valRequired(value) {
      return !!value || 'Обязательное поле'
    },
    valPassword(value) {
      return value.length > 7 || 'Минимум 8 знаков'
    },
    async login() {
      this.$nuxt.$loading.start()
      const isValidate = this.$refs.form.validate()

      if (!isValidate) {
        this.$toast.error('Заполните все поля правильно')
        setTimeout(() => {
          this.$nuxt.$loading.finish()
        }, 500)
        return
      }

      try {
        const result = await this.signIn({
          username: this.username,
          password: this.password,
        })

        if (result) {
          this.$toast.success('Добро пожаловать!')
          this.$router.push('/profile')
        } else {
          this.$toast.error('Проверьте данные!')
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../css/pages/auth.scss';
</style>