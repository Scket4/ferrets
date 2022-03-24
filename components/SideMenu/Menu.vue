<template>
  <div class="menu" :class="{ 'menu--opened': isOpened }">
    <img
      v-if="!isOpened"
      src="~/assets/burger.svg"
      alt="burger"
      @click="isOpened = !isOpened"
    />
    <img
      v-else
      src="~/assets/cross.svg"
      alt="cross"
      @click="isOpened = !isOpened"
    />
    <p :class="{ 'menu__title--hidden': isOpened }" class="menu__title">меню</p>
    <div :class="{ 'menu__icons--visible': isOpened }" class="menu__icons">
      <img
        src="~/assets/profile.svg"
        alt="profile"
        @click="$emit('profileClick')"
      />
      <img
        src="~/assets/search.svg"
        alt="search"
        @click="$emit('searchClick')"
      />
      <img
        src="~/assets/options.svg"
        alt="options"
        @click="$emit('optionsClick')"
      />
      <img
        src="~/assets/log-out.svg"
        alt="log-out"
        @click="$emit('logoutClick')"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpened: false,
  }),
  watch: {
    // доделать
    '$router.path'() {
      this.isOpened = false
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 100%;
  background: black;
  border-right: 1px solid #202020;
  padding-top: 25px;
  transition: all ease 0.5s;
  z-index: 8;

  &--opened {
    width: 70px;
  }

  img {
    cursor: pointer;
  }

  &__title {
    letter-spacing: 4px;
    text-transform: uppercase;
    font-size: 14px;
    transform: rotate(90deg);
    color: white;
    margin-top: 70px;
    transition: all ease 1s;

    &--hidden {
      display: none;
    }
  }

  &__icons {
    display: flex;
    opacity: 0;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-top: 50px;
    z-index: -10;
    transition: all ease .3s;

    &--visible {
      opacity: 1;
      z-index: 1;
    }

    img {
      margin-bottom: 20px;
    }
  }
}
</style>