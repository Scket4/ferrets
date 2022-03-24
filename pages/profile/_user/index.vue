<template>
  <div class="header">
    <div class="header__info">
      <div class="header__about" :class="hideAbout ? 'hideAbout' : ''">
        <h2 class="header__about--name">{{ name || username }}</h2>
        <p class="header__about--introduce">знакомьтесь,</p>

        <div class="header__about--bio">
          <p class="header__about--me">обо мне</p>

          <p class="header__about--text">{{ aboutMe }}</p>
          <div class="header__like">
            <profile-like
              :is-liked="isLiked"
              class="header__like--icon"
              @click="likeHandler"
            />
            <span
              v-if="
                profileData.profile_likes && profileData.profile_likes.length
              "
              class="header__like--count"
              >{{ profileData.profile_likes.length }}</span
            >
          </div>
        </div>
        <v-badge
          class="header__badge"
          :style="isOnline ? 'background-color: green' : 'background-color: grey'"
        />
      </div>
    </div>
    <div class="header__photo" :style="`background-image: url(${photoPath})`">
      <span
        class="header__photo--overlay"
        :class="hideAbout ? 'hidePhoto' : ''"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  loading: true,
  data: () => ({
    menuOpened: false,
    hideAbout: true,
    currentUsername: '',
  }),
  computed: {
    isMyProfile() {
      return this.currentUsername === this.myData?.username
    },
    userData() {
      return this.$store.getters['user/getUserData']
    },
    myData() {
      return this.$store.getters['user/getMyUserData']
    },
    profileData() {
      return this.isMyProfile ? this.myData : this.userData
    },
    username() {
      return this.profileData?.username || ''
    },
    name() {
      if (!this.profileData.name && !this.profileData.surname) return
      return `${this.profileData.name}  ${this.profileData.surname}`
    },
    aboutMe() {
      return this.profileData.about
        ? this.profileData.about
        : 'тут основная информация обо мне'
    },
    photoPath() {
      return this.profileData?.profile_photo || ''
    },
    isLiked() {
      return this.profileData?.profile_likes?.includes(this.myData.username)
    },
    isOnline() {
      if (this.isMyProfile) return true
      return this.userData?.status?.isOnline
    },
  },
  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })

    this.$socket.on('setLikeNotification', ({ targetUser }) => {
      if (
        targetUser.username === this.username &&
        targetUser.username !== this.myData.username
      ) {
        this.$store.commit('user/setUserData', targetUser)
      }
    })

    this.$socket.on('userStatus', (data) => {
      if (this.isMyProfile || data.username !== this.username) return
      this.$store.commit('user/setUserData', {
        ...this.userData,
        status: { isOnline: data.status },
      })
    })

    this.currentUsername = this.$route.params.user

    if (!this.isMyProfile) {
      await this.getUserData(this.currentUsername)
    }

    this.hideAbout = false
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  },
  beforeDestroy() {
    this.$socket.off('userStatus')
    this.$socket.off('setLikeNotification')
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      toggleLike: 'user/toggleLike',
    }),
    async likeHandler() {
      await this.$socket.emit('setLike', {
        targetUsername: this.username,
        myUsername: this.myData.username,
      })

      // await this.toggleLike({
      //   targetUsername: this.username,
      //   myUsername: this.myData.username,
      // })
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

    @media (max-width: 650px) {
      position: absolute;
      z-index: 4;
      background: transparent;
      border: none;
      width: 70%;
    }
  }

  &__about {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    padding-top: 150px;
    padding-right: 75px;
    padding-left: 15%;
    transition: all ease 0.5s;

    @media (max-width: 650px) {
      padding-right: 40px;
    }

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
      display: inline-flex;
      width: auto;

      @media (max-width: 900px) {
        font-size: 36px;
      }

      @media (max-width: 650px) {
        font-size: 48px;
      }
    }

    &--bio {
      margin-top: 240px;
      max-width: 400px;
      display: flex;
      flex-direction: column;

      @media (max-width: 900px) {
        margin-top: 120px;
      }
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

      @media (max-width: 900px) {
        font-size: 14px;
      }
    }
  }

  &__badge {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 25px;
    right: 50px;

    @media (max-width: 650px) {
      left: 50px;
      top: 100px;
    }
  }

  &__like {
    margin-top: 150px;
    align-self: flex-end;
    display: flex;
    align-items: center;

    &--icon {
      width: 25px;
      cursor: pointer;
      margin-right: 12px;
    }

    &--count {
      color: white;
      font-weight: 500;
      font-weight: 12px;
    }
  }

  &__photo {
    width: 55%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;

    @media (max-width: 650px) {
      width: 100%;
    }

    &--overlay {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      transition: all ease 0.5s;
      background: rgb(0 0 0 / 35%);

      @media (max-width: 650px) {
        background: rgb(0 0 0 / 85%);
      }
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

.hideAbout {
  opacity: 0;
}

.hidePhoto {
  background: black;
}
</style>