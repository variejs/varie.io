<template>
  <nav class="nav" :class="{ 'nav--open': isMenuOpen }">
    <component :is="menu" v-if="menu && menu.template"></component>
  </nav>
</template>

<script>
import DocSearchMixin from "../mixins/DocSearchMixin";
import VersionMixin from "@views/documentation/mixins/VersionMixin";

export default {
  mixins: [VersionMixin, DocSearchMixin],
  $inject: ["DocumentationService"],
  mounted() {
    this.generateDocSearch("search");
  },
  computed: {
    menu() {
      return {
        mixins: [DocSearchMixin],
        template: this.documentationService.menu(this.version),
        mounted() {
          this.generateDocSearch("menu-search");
        },
      };
    },
    isMenuOpen() {
      return this.$store.state.menu.open;
    },
  },
};
</script>
