<template>
  <div class="default-container">
    <Menu
      @profileClick="$router.push('/profile')"
      @optionsClick="$router.push('/settings')"
      @searchClick="$router.push('/search')"
      @logoutClick="logoutHandle"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Menu from '@/components/SideMenu/Menu.vue'

export default {
  components: {
    Menu,
  },
  middleware: 'auth',
  methods: {
    ...mapActions({
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
.default-container {
  padding-left: 40px;
  position: relative;
  min-height: 100vh;
}
</style>
