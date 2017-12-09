<template>
    <nav class="navigation">
        <div>
            <router-link to="/" tag="span" class="font-semibold text-xl tracking-tight cursor-pointer">
                Varie
            </router-link>
        </div>
        <div class="flex flex-grow">
            <input id="search" type="text" placeholder="Search" name="search">
        </div>
        <div>
            <router-link :to="{ name : 'docs', params : { version : versions[0], page : 'installation' } }">
                Documentation
            </router-link>
        </div>
        <div class="nav-dropdown" @click="showVersionDropDown = !showVersionDropDown" v-if="docsPage">
            <div class="dropdown" :class="{ open : showVersionDropDown }">
                {{ $route.params.version }} &nbsp;
                <i class="arrow"></i>
                <div class="dropdown--menu" v-show="showVersionDropDown">
                    <template v-for="version in versions">
                        <div @click="selectVersion(version)" class="dropdown--menu-item">{{ version }}</div>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
      data() {
        return {
          inject : ['$documentationService'],
          showVersionDropDown : false,
        }
      },
      methods : {
        selectVersion(version) {
          this.$router.push({ name: 'docs', params: { version : version }});
        }
      },
      computed : {
        docsPage() {
          return this.$route.name === 'docs';
        },
        versions() {
          return this.$documentationService.getVersions();
        },
      }
    }
</script>