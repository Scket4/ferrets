<template>
  <div class="container">
    <h1 class="heading">Настройки</h1>
    <v-form id="settings" ref="form" class="form" @submit.prevent="sendNewData">
      <label>
        <span>Имя</span>
        <v-text-field v-model="name" />
      </label>
      <label>
        <span>Фамилия</span>
        <v-text-field v-model="surname" />
      </label>
      <label>
        <span>О тебе</span>
        <v-textarea
          name="about"
          v-model="about"
        ></v-textarea>
      </label>
      <div class="actions">
        <v-btn class="button" for="settings" type="submit"> Сохранить</v-btn>
        <v-btn class="button" @click="$router.push('profile')">В профиль</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Settings',
  data: () => ({
    name: '',
    surname: '',
    about: '',
  }),
  computed: {
    userData() {
      return this.$store.getters['user/getUserData']
    },
  },
  async mounted() {
    await this.getUserData()

    this.name = this.userData.name || ''
    this.surname = this.userData.surname || ''
    this.about = this.userData.about || ''
  },
  watch: {
    userData(val) {
      this.name = val.name | ''
      this.surname = val.surname || ''
      this.about = val.about || ''
    },
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      updateUserData: 'user/updateUserData',
    }),
    async sendNewData() {
      this.$nuxt.$loading.start()
      try {
        await this.updateUserData({
          name: this.name,
          surname: this.surname,
          about: this.about
        })

        await this.getUserData()

        this.$toast.success('Данные изменены!')
      } catch (error) {
        console.error(error)
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 100px;
}

.heading {
  font-size: 26px;
  margin-bottom: 64px;
}

.form {
  max-width: 350px;

  label {
    font-weight: 500;
  }

  .button {
    margin-top: 24px;
    margin-right: 16px;
  }
}

.actions {
  display: flex;
  align-items: center;
}
</style>