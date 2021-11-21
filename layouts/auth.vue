<template>
  <v-app class="auth">
    <div class="sideColor"></div>
    <div class="auth__container">
      <main class="auth__card">
        <div class="auth__info">
          <img src="~/assets/main.png" alt="main" class="auth__logo" />
          <h1 class="auth__title">
            Приветствуем в <span class="auth__title--name">Ferrets</span>!
          </h1>
          <p class="auth__description">Социальная сеть для дузей и знакомых.<br>Чтобы быть ближе</p>
        </div>
        <div class="auth__form">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import './auth';
</style>