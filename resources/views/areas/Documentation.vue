<template>
    <div class="documentation">
       <div class="documentation--menu">
           <component :is="menu" v-if="menu && menu.template"></component>
       </div>
       <router-view></router-view>
    </div>
</template>

<script>
import Vue from "vue";
import docsearch from "docsearch.js";

export default Vue.extend({
  $inject: ["$documentationService"],
  mounted() {
    docsearch({
      apiKey: "453e1f447798dfe06777082b687f06f2",
      indexName: "varie",
      inputSelector: "#search",
      debug: false,
    });
  },
  computed: {
    version() {
      return this.$route.params.version ? this.$route.params.version : "latest";
    },
    menu() {
      return {
        template: this.$documentationService.menu(this.version),
      };
    },
  },
});
</script>
