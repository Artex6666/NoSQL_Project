<template>
  <header class="header">
    <img src="../assets/images/Spotify_logo.png" alt="Logo" class="logo" />
    <div class="search-container">
      <input
        type="text"
        placeholder="Rechercher..."
        v-model="searchQuery"
        @input="performSearch"
        class="search-bar"
      />
    </div>
    <button v-if="!isLoggedIn" @click="goToLogin" class="auth-button">
      Connexion
    </button>
    <button v-else @click="logout" class="auth-button">Déconnexion</button>
  </header>
</template>

<script>
import searchController from "../../backend/controllers/searchController.js";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      searchQuery: "",
      isLoggedIn: false,
    };
  },
  methods: {
    performSearch() {
      searchController.search(this.searchQuery);
    },
    goToLogin() {
      this.$router.push("/login");
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1db954;
  color: white;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  height: 40px;
}

.search-container {
  flex-grow: 1;
  text-align: center;
}

.search-bar {
  width: 50%;
  padding: 5px;
  border-radius: 4px;
  border: none;
}

.auth-button {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
