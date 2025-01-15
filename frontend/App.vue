<template>
  <div id="app">
    <router-view />
    <!-- Affiche les vues en fonction des routes -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Styles globaux */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}
</style>
