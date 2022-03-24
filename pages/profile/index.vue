<template>
  <div style="width: 100vw; height: 100vh; background-color: black"></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    myUserData() {
      return this.$store.getters['user/getMyUserData']
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    })

    // await this.getMyUserData()
    if (this.myUserData.username) {
      this.$router.push(`/profile/${this.myUserData.username}`)
    } else {
      this.$router.push('/feed')
    }
  },
  methods: {
    ...mapActions({
      getMyUserData: 'user/getMyUserData',
    })
  }
}
</script>

<style>

</style>