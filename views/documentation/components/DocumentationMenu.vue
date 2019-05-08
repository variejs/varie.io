<template>
  <nav class="nav" :class="{ 'nav--open': isMenuOpen }">
    <component :is="menu" v-if="menu && menu.template"></component>
  </nav>
</template>

<script>
import VersionMixin from "@views/documentation/mixins/VersionMixin";
export default {
  mixins: [VersionMixin],
  $inject: ["DocumentationService"],
  computed: {
    menu() {
      return {
        template: this.documentationService.menu(this.version),
        mounted() {
          // TODO - reinsert doc search
          // docsearch({
          //   apiKey: "453e1f447798dfe06777082b687f06f2",
          //   indexName: "varie",
          //   inputSelector: "#menu-search",
          //   debug: false,
          // });
        },
      };
    },
    isMenuOpen() {
      return this.$store.state.menu.open;
    },
  },
};
</script>
