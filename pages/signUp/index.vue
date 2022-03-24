<template>
  <div class="container">
    <h5 class="heading">Регистрация</h5>
    <v-form id="signUp" ref="form" class="form" @submit.prevent="register">
      <label v-for="field in fields" :key="field.id">
        <span class="input__label">{{ field.label }}</span>
        <v-text-field
          v-model="field.model"
          :placeholder="field.placeholder"
          :type="field.password ? (field.show ? 'text' : 'password') : 'text'"
          :append-icon="
            field.password ? (field.show ? 'mdi-eye' : 'mdi-eye-off') : null
          "
          :rules="field.rules"
          outlined
          tabindex="1"
          class="input"
          @click:append="field.show = !field.show"
          @change="changeModel(field.model, field.name)"
        ></v-text-field>
      </label>
      <div class="actions">
        <p>Уже зарегистированы?</p>
        <a href="/signIn">Вход</a>
      </div>
      <v-btn class="button" large for="signUp" type="submit">
        Регистрация</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'auth',
  loading: true,
  data: () => ({
    // email: '',
    username: '',
    password: '',
    repeatPassword: '',
    fields: [],
  }),
  created() {
    this.setFields()
  },
  methods: {
    ...mapActions({
      signUp: 'auth/signUp',
    }),
    setFields() {
      this.fields = [
        {
          name: 'username',
          model: this.username,
          placeholder: 'forret',
          label: 'Имя пользователя',
          password: false,
          rules: [this.valRequired],
          id: 1,
        },
        // {
        //   name: 'email',
        //   model: this.email,
        //   placeholder: 'forret@gmail.com',
        //   label: 'Почта',
        //   password: false,
        //   rules: [this.valRequired, this.valEmail],
        //   id: 2,
        // },
        {
          name: 'password',
          model: this.password,
          placeholder: '******',
          password: true,
          label: 'Пароль',
          show: false,
          rules: [this.valPassword, this.valRequired],
          id: 3,
        },
        {
          name: 'repeatPassword',
          model: this.repeatPassword,
          placeholder: '******',
          label: 'Повторим пароль',
          password: true,
          show: false,
          rules: [this.valPassword, this.valRequired, this.valRepeatPassword],
          id: 4,
        },
      ]
    },
    valRequired(value) {
      return !!value || 'Обязательное поле'
    },
    valPassword(value) {
      return value.length > 7 || 'Минимум 8 знаков'
    },
    valRepeatPassword(value) {
      return value === this.password || 'Пароли не совпадают'
    },
    valEmail(value) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(value).toLowerCase()) || 'Введите правильную почту'
    },
    changeModel(val, model) {
      this[model] = val
    },
    async register() {
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
        const result = await this.signUp({
          username: this.username,
          // email: this.email,
          password: this.password,
        })

        if (result?.access_token) {
          this.$toast.success('Добро пожаловать!')
          this.$router.push('/profile')
        } else {
          this.$toast.error('Произошла ошибка')
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
