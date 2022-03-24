<template>
  <div class="container">
    <h1 class="heading">Настройки</h1>
    <v-form id="settings" ref="form" class="form" @submit.prevent="sendNewData">
      <label>
        <span>Имя</span>
        <v-text-field v-model="name" clearable />
      </label>
      <label>
        <span>Фамилия</span>
        <v-text-field v-model="surname" clearable />
      </label>
      <label>
        <span>О тебе</span>
        <v-textarea
          name="about"
          v-model="about"
          rows="2"
          row-height="15"
          clearable
        ></v-textarea>
      </label>
      <label>
        <span>Фото профиля</span>
        <v-file-input
          truncate-length="15"
          @change="uploadImage"
          hide-input
        ></v-file-input>
      </label>
      <img ref="photo" alt="" />
      <div class="actions">
        <v-btn class="button" for="settings" type="submit"> Сохранить</v-btn>
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
    photo: '',
  }),
  computed: {
    userData() {
      return this.$store.getters['user/getMyUserData']
    },
  },
  mounted() {
    this.name = this.userData.name || ''
    this.surname = this.userData.surname || ''
    this.about = this.userData.about || ''
  },
  watch: {
    userData(val) {
      this.name = val.name || ''
      this.surname = val.surname || ''
      this.about = val.about || ''
    },
  },
  methods: {
    ...mapActions({
      updateMyUserData: 'user/updateMyUserData',
    }),
    async sendNewData() {
      this.$nuxt.$loading.start()
      try {
        await this.updateMyUserData({
          name: this.name,
          surname: this.surname,
          about: this.about,
        })
        this.$toast.success('Данные изменены!')
      } catch (error) {
        console.error(error)
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async uploadImage(event) {
      const formData = new FormData()
      formData.append('file', event)

      this.$nuxt.$loading.start()
      try {
        await this.updateMyUserData(formData)
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

  @media (max-width: 650px) {
    padding: 40px;
  }
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