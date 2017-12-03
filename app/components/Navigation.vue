<template>
    <nav class="navigation">
        <div>
            <router-link to="/" tag="span" class="font-semibold text-xl tracking-tight cursor-pointer">
                Varie
            </router-link>
        </div>
        <div class="flex flex-grow">
            <input class="flex-auto" type="text" placeholder="Search" name="search">
        </div>
        <div>
            <router-link :to="{ name : 'docs', params : { version : 'latest', page : 'installation' } }">
                Documentation
            </router-link>
        </div>
        <div class="nav-dropdown" @click="showVersionDropDown = !showVersionDropDown">
            <div class="dropdown" :class="{ open : showVersionDropDown }">
                <div class="btn">
                    {{ selectedVersion }} &nbsp;
                    <i class="arrow"></i>
                </div>
                <div class="dropdown--menu" v-show="showVersionDropDown">
                    <template v-for="version in versions">
                        <div @click="selectedVersion = version" class="dropdown--menu-item">{{ version }}</div>
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
          selectedVersion : 'latest',
          versions : [
            'latest',
            'master'
          ],
          showVersionDropDown : false,
        }
      }
    }
</script>