<template>
  <div class="header">
    <div class="header__info">
      <div class="header__menu" :class="{ openedMenu: menuOpened }">
        <img
          v-if="!menuOpened"
          src="~/assets/burger.svg"
          alt=""
          @click="menuOpened = !menuOpened"
        />
        <img
          v-else
          src="~/assets/cross.svg"
          alt=""
          @click="menuOpened = !menuOpened"
        />
        <p :class="{ hideText: menuOpened }" class="header__menu--text">меню</p>
        <div :class="{ showIcons: menuOpened }" class="header__icons">
          <img
            src="~/assets/options.svg"
            alt="options"
            @click="$router.push('/settings')"
          />
          <img src="~/assets/log-out.svg" alt="log-out" @click="logoutHandle" />
        </div>
      </div>
      <div class="header__about">
        <h2 class="header__about--name">{{ name || username }}</h2>
        <p class="header__about--introduce">знакомьтесь,</p>
        <div class="header__about--bio">
          <p class="header__about--me">обо мне</p>
          <p class="header__about--text">{{ aboutMe }}</p>
        </div>
      </div>
    </div>
    <div class="header__photo">
      <span class="header__photo--overlay"></span>
    </div>
  </div>
  <!-- <div style="padding: 24px; display: flex; justify-content: space-between; flex-wrap: wrap;">
    <div style="display: flex; align-items: center">
      <p style="margin-right: 10px; font-size: 24px">
        {{ 'Хай, это:' }}
      </p>
      <h1 style="font-size: 36px">{{  name || username }}</h1>
    </div>
    <div class="actions">
      <v-btn style="margin-top: 50px" @click="$router.push('/settings')"
        >Настройки аккаунта</v-btn
      >
      <v-btn style="margin-top: 20px" @click="logoutHandle"
        >Выйти из аккаунта</v-btn
      >
    </div>
  </div> -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  data: () => ({
    menuOpened: false,
  }),
  computed: {
    userData() {
      return this.$store.getters['user/getUserData']
    },
    username() {
      return this.userData.username
    },
    name() {
      if (!this.userData.name || !this.userData.surname) return
      return `${this.userData.name}  ${this.userData.surname}`
    },
    aboutMe() {
      return this.userData.about ? this.userData.about : ''
    },
  },
  async mounted() {
    await this.getUserData()
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      logout: 'auth/logout',
    }),
    logoutHandle() {
      this.logout()
      this.$router.go()
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100vh;
  display: flex;

  &__info {
    width: 45%;
    height: 100%;
    border-right: 1px solid;
    background-color: black;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__menu {
    width: 10%;
    height: 100%;
    border-right: 1px solid #202020;
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: all ease 0.5s;

    img {
      cursor: pointer;
    }

    &--text {
      letter-spacing: 4px;
      text-transform: uppercase;
      font-size: 14px;
      transform: rotate(90deg);
      color: white;
      margin-top: 70px;
      transition: all ease 1s;
      left: 0;
    }
  }

  &__icons {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: -150px;

    img {
      margin-bottom: 20px;
    }
  }

  &__about {
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    padding-top: 150px;
    padding-right: 75px;
    padding-left: 20%;

    &--introduce {
      color: white;
      font-size: 12px;
      font-weight: 500;
      margin-right: 100px;
    }

    &--name {
      color: white;
      font-size: 64px;
      font-weight: 500;
      max-width: 400px;
      text-align: left;
    }

    &--bio {
      margin-top: 240px;
    }

    &--me {
      color: white;
      font-size: 12px;
    }

    &--text {
      color: white;
      font-weight: 500;
      font-size: 18px;
      text-align: left;
    }
  }

  &__photo {
    width: 55%;
    height: 100%;
    background-image: url('@/assets/images/profile.jpeg');
    background-size: cover;
    background-position: center;
    position: relative;

    &--overlay {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: 0.1);
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.actions {
  display: flex;
  flex-direction: column;
}

.openedMenu {
  width: 20%;
}

.hideText {
  position: absolute;
  animation: slide 1s forwards;
}

@keyframes slide {
  0% {
    left: 0;
    opacity: 1;
  }
  100% {
    left: 150px;
    opacity: 0;
  }
}

@keyframes slideIcons {
  0% {
    left: -150px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
    position: relative;
  }
}

.showIcons {
  animation: slideIcons 0.5s forwards;
}
</style>