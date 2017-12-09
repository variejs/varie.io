<template>
    <div class="documentation">
        <div class="documentation--menu">
            <component :is="menu" v-if="menu && menu.template"></component>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { DocumentationServiceInterface } from '@app/contracts/DocumentationServiceInterface'

  export default Vue.extend({
    data() {
    	return {
            inject : ['$documentationService']
        }
    },
    computed : {
      version () {
        return this.$route.params.version ? this.$route.params.version : 'latest';
      },
      menu() {
        return {
          template : this.$documentationService.menu(this.version)
        };
      }
    }
  });
</script>