<template>
  <header class="header">
    <nav class="site-header">
      <div class="site-header__logo">
        <router-link to="/" tag="span" class="cursor-pointer logo">
          <img src="./../../../resources/assets/img/varie.png" />
        </router-link>
      </div>
      <div v-show="docsPage" class="site-header__search">
        <input id="search" type="text" placeholder="Search" name="search" />
      </div>
      <div v-show="docsPage === false">
        <router-link
          :to="{
            name: 'docs',
            params: { version: versions[0], page: 'what-is-varie' },
          }"
        >
          Documentation
        </router-link>
      </div>
      <div class="nav-button">
        <a
          target="_blank"
          href="https://discord.gg/PAHqzNy"
          class="fab fa-discord fa-2x"
        ></a>
      </div>
      <div class="nav-button">
        <a
          href="https://github.com/variejs/varie"
          class="fab fa-github fa-2x"
        ></a>
      </div>
      <div
        class="site-header__mobile nav-button"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
      >
        <span>
          <i class="fal fa-bars fa-2x"></i>
        </span>
      </div>
      <div
        class="nav-dropdown"
        @click="showVersionDropDown = !showVersionDropDown"
        v-show="docsPage && versions.length > 1"
      >
        <div class="dropdown" :class="{ open: showVersionDropDown }">
          {{ currentVersion }} &nbsp;
          <i class="arrow"></i>
          <div class="dropdown--menu" v-show="showVersionDropDown">
            <template v-for="version in versions">
              <div @click="selectVersion(version)" class="dropdown--menu-item">
                {{ version }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  $inject: ["DocumentationService"],
  data() {
    return {
      showVersionDropDown: false,
    };
  },
  methods: {
    selectVersion(version) {
      this.$router.push({
        name: "docs",
        params: { version: version, page: "what-is-varie" },
      });
    },
    toggleMenu() {
      if (!this.isMenuOpen) {
        this.$nextTick(() => {
          this.$store.commit("menu/OPEN_MENU");
        });
      } else {
        this.$store.commit("menu/CLOSE_MENU");
      }
    },
  },
  computed: {
    docsPage() {
      return this.$route.name === "docs";
    },
    isMenuOpen() {
      return this.$store.state.menu.open;
    },
    versions() {
      return this.documentationService.getVersions();
    },
    currentVersion() {
      return this.$route.params.version ? this.$route.params.version : "latest";
    },
  },
};
</script>
