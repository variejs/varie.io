<template>
    <nav class="navigation">
        <div class="navigation__logo">
            <router-link to="/" tag="span" class="cursor-pointer logo">
                <img src="./../../../resources/assets/img/varie.png">
            </router-link>
        </div>
        <div v-show="docsPage" class="navigation__search">
            <input id="search" type="text" placeholder="Search" name="search">
        </div>
        <div v-show="docsPage === false">
            <router-link :to="{ name : 'docs', params : { version : versions[0], page : 'what-is-varie' } }">
                Documentation
            </router-link>
        </div>
        <div class="nav-button">
            <a target="_blank" href="https://discord.gg/PAHqzNy" class="fab fa-discord fa-2x"></a>
        </div>
        <div class="nav-button">
            <a href="https://github.com/variejs/varie" class="fab fa-github fa-2x"></a>
        </div>
        <div class="navigation__mobile nav-button" :class="{ active : isMenuOpen }" @click="toggleMenu">
            <span>
                <i class="fal fa-bars fa-2x"></i>
            </span>
        </div>
        <!--<div class="nav-dropdown" @click="showVersionDropDown = !showVersionDropDown" v-show="docsPage">-->
            <!--<div class="dropdown" :class="{ open : showVersionDropDown }">-->
                <!--{{ currentVersion }} &nbsp;-->
                <!--<i class="arrow"></i>-->
                <!--<div class="dropdown&#45;&#45;menu" v-show="showVersionDropDown">-->
                    <!--<template v-for="version in versions">-->
                        <!--<div @click="selectVersion(version)" class="dropdown&#45;&#45;menu-item">{{ version }}</div>-->
                    <!--</template>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </nav>
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
    // selectVersion(version) {
    //   this.$router.push({ name: "docs", params: { version: version } });
    // },
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
    // currentVersion() {
    //   return this.$route.params.version ? this.$route.params.version : "latest";
    // },
  },
};
</script>
