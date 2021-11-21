<template>
  <div class="signUp">
    <h5 class="heading">Регистрация</h5>
    <v-form id="signUp" class="form" @submit.prevent="signUp">
      <label v-for="field in fields" :key="field.id">
        <span class="input__label">{{ field.label }}</span>
        <v-text-field
          v-model="field.model"
          :placeholder="field.placeholder"
          outlined
          :type="field.password ? (field.show ? 'text' : 'password') : 'text'"
          :append-icon="
            field.password ? (field.show ? 'mdi-eye' : 'mdi-eye-off') : null
          "
          :rules="field.rules"
          class="input"
          @click:append="field.show = !field.show"
          @change="changeModel(field.model, field.name)"
        ></v-text-field>
      </label>
      <v-btn color="#ffd6ad" class="button" large for="signUp" type="submit">
        Регистрация</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    fields: [],
  }),
  mounted() {
    this.setFields()
  },
  methods: {
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
        {
          name: 'email',
          model: this.email,
          placeholder: 'forret@gmail.com',
          label: 'Почта',
          password: false,
          rules: [this.valRequired, this.valEmail],
          id: 2,
        },
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
      return value.length > 8 || 'Минимум 8 знаков'
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
    signUp() {
      // console.log(this.email, this.username, this.password, this.repeatPassword);
    },
  },
}
</script>

<style lang="scss" scoped>
@import './signUp.scss';
</style>