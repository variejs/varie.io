<template>
    <div class="documentation">
       <component class="documentation__menu" :class="{ 'documentation__menu--open' : isMenuOpen }" :is="menu" v-if="menu && menu.template"></component>
       <router-view></router-view>
    </div>
</template>

<script>
import Vue from "vue";
import docsearch from "docsearch.js";
import throttle from "lodash.throttle";

export default Vue.extend({
  $inject: ["$documentationService"],
  mounted() {
    docsearch({
      apiKey: "453e1f447798dfe06777082b687f06f2",
      indexName: "varie",
      inputSelector: "#search",
      debug: false,
    });

    document.addEventListener("click", this.closeMenu);
    document.addEventListener("scroll", this.onScroll);
    document.addEventListener("keydown", this.keyDownSearch);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeMenu());
    document.removeEventListener("keydown", this.keyDownSearch);
  },
  methods: {
    closeMenu(e) {
      if (e.target.id !== "menu-search") {
        if (this.isMenuOpen) {
          this.$store.commit("menu/CLOSE_MENU");
        }
      }
    },
    keyDownSearch(e) {
      if (e.key === "/") {
        document.getElementById("search").focus();
        e.preventDefault();
      }
    },
    onScroll: throttle(function() {
      this.setActiveHash();
    }, 300),
    setActiveHash() {
      // // TODO - this dosen't seem to want to work like how vue press has it
      // const anchors = [].slice.call(
      //   document.querySelectorAll(
      //     ".documentation__body h2[id], .documentation__body h3[id]",
      //   ),
      // );
      //
      // const scrollTop = Math.max(
      //   window.pageYOffset,
      //   document.documentElement.scrollTop,
      //   document.body.scrollTop,
      // );
      //
      // for (let i = 0; i < anchors.length; i++) {
      //   const anchor = anchors[i];
      //   const nextAnchor = anchors[i + 1];
      //
      //   const isActive =
      //     (i === 0 && scrollTop === 0) ||
      //     (scrollTop >= anchor.parentElement.offsetTop + 10 &&
      //       (!nextAnchor ||
      //         scrollTop < nextAnchor.parentElement.offsetTop - 10));
      //
      //   if (isActive && this.$route.hash !== anchor.hash) {
      //     this.$router.replace({
      //       hash: `#${anchor.id}`,
      //       name: this.$route.name,
      //       params: Object.assign({}, this.$route.params, { replaced: true }),
      //     });
      //     return;
      //   }
      // }
    },
  },
  computed: {
    version() {
      return this.$route.params.version ? this.$route.params.version : "latest";
    },
    menu() {
      return {
        template: this.$documentationService.menu(this.version),
        mounted() {
          docsearch({
            apiKey: "453e1f447798dfe06777082b687f06f2",
            indexName: "varie",
            inputSelector: "#menu-search",
            debug: false,
          });
        },
      };
    },
    isMenuOpen() {
      return this.$store.state.menu.open;
    },
  },
});
</script>
