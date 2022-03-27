<template id="app">
  <router-view />
</template>

<script>
export default {
  name: "App",
   setup() {
    const siteData = reactive({
      title: `Learnit`,
      description: `Learnit is a simple blog`,
    })

    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    })
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
