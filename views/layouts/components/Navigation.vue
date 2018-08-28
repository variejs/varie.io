<template>
    <nav class="navigation">
        <div>
            <router-link to="/" tag="span" class="cursor-pointer logo">
                <img src="./../../../resources/assets/img/varie.png">
            </router-link>
        </div>
        <div v-show="docsPage">
            <input id="search" type="text" placeholder="Search" name="search">
        </div>
        <div v-show="docsPage === false">
            <router-link :to="{ name : 'docs', params : { version : versions[0], page : 'what-is-varie' } }">
                Documentation
            </router-link>
        </div>
        <div class="nav-button">
            <a href="https://github.com/variejs/varie" class="fab fa-github fa-2x"></a>
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
  $inject: ["$documentationService"],
  data() {
    return {
      showVersionDropDown: false,
    };
  },
  methods: {
    selectVersion(version) {
      this.$router.push({ name: "docs", params: { version: version } });
    },
  },
  computed: {
    docsPage() {
      return this.$route.name === "docs";
    },
    versions() {
      return this.$documentationService.getVersions();
    },
    currentVersion() {
      return this.$route.params.version ? this.$route.params.version : "latest";
    },
  },
};
</script>
