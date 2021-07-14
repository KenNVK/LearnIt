<template id="app">
  <router-view />
</template>

<script>
export default {
  name: "App",
  setup() {
    document.title = "LearnIt";
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-shadow: border-box;
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
