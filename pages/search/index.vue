<template>
  <div class="search-page">
    <div class="search-component">
      <v-text-field
        v-model="searchText"
        clearable
        placeholder="введите имя пользователя"
        class="input"
      >
      </v-text-field>

      <div v-if="findedUseers && findedUseers.length" class="results">
        <span
          v-for="user in findedUseers"
          :key="'id_' + user.username"
          class="results__user"
          @click="$router.push(`/profile/${user.username}`)"
        >
          {{ user.username }}
        </span>
      </div>
    </div>

    <!-- <v-btn @click="search">найти</v-btn> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    searchText: '',
    isReady: true,
    findedUseers: [],
  }),
  methods: {
    ...mapActions({
      searchUsers: 'user/searchUsers',
    }),
  },
  watch: {
    async searchText(val) {
      if (!val) {
        this.findedUseers = []
        return
      }
      this.findedUseers = await this.searchUsers(val.toLowerCase().trim())
    },
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  padding: 150px 0px 0px 150px;
  display: flex;
  align-items: center;

  @media (max-width: 650px) {
    padding: 42px 0px 0px 50px;
  }
}

.search-component {
  width: 300px;
  position: relative;

  .input {
    width: 100%;
    margin-right: 70px;
  }

  .results {
    position: absolute;
    top: 50px;
    width: 100%;
    background: white;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

    &__user {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 12px;
      font-weight: 500;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid rgb(116, 116, 116);
      }
    }
  }
}
</style>