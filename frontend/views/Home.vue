<template>
  <div>
    <Header />
    <main>
      <div class="carousel">
        <div
          v-for="(music, index) in musicList"
          :key="index"
          class="carousel-item"
        >
          <h2>{{ music.title }}</h2>
          <p>Artiste : {{ music.artist }}</p>
          <p>Date de sortie : {{ music.releaseDate }}</p>
          <p>Genre : {{ music.genre }}</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import popularMusicController from "../../backend/controllers/popularMusicController.js";

export default {
  data() {
    return {
      musicList: [],
    };
  },
  async mounted() {
    this.musicList = await popularMusicController.getPopularMusic();
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.carousel-item {
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
}
</style>
