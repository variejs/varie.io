<template>
    <div id="app">
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  head: {
    meta: [
      { name: "application-name", content: "Varie - A Vue.js Framework" },
      {
        name: "description",
        content:
          "A Vue.js Typescript Framework for building elegant Vue.js Applications",
      },

      // Twitter
      { name: "twitter:title", content: "Varie - A Vue.js Framework" },
      {
        n: "twitter:description",
        c:
          "A Vue.js Typescript Framework for building elegant Vue.js Applications",
      },

      // Google+ / Schema.org
      { itemprop: "name", content: "Varie - A Vue.js Framework" },
      {
        itemprop: "description",
        content:
          "A Vue.js Typescript Framework for building elegant Vue.js Applications",
      },
      { p: "og:image", c: "https://varie.io/img/varie-banner.png" },
    ],
  },
};
</script>
