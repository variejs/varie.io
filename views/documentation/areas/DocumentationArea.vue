<template>
  <router-view></router-view>
</template>

<script>
import VersionMixin from "@views/documentation/mixins/VersionMixin";

export default {
  mixins: [VersionMixin],
  $inject: ["DocumentationService"],
  created() {
    document.addEventListener("click", this.closeMenu);
    document.addEventListener("keydown", this.keyDownSearch);
  },
  methods: {
    closeMenu(e) {
      if (e && e.target && e.target.id !== "menu-search" && this.isMenuOpen) {
        this.$store.commit("menu/CLOSE_MENU");
      }
    },
    keyDownSearch(e) {
      if (e.key === "/") {
        document.getElementById("search").focus();
        e.preventDefault();
      }
    },
  },
  computed: {
    isMenuOpen() {
      return this.$store.state.menu.open;
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("click", this.closeMenu());
    document.removeEventListener("keydown", this.keyDownSearch);
  },
};
</script>
