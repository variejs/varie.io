<template>
    <div class="flex flex-wrap">
        <div class="md:w-1/4" v-html="menu"></div>
        <router-view class="container py-4 pl-4 md:w-3/4"></router-view>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { DocumentationServiceInterface } from '@app/contracts/DocumentationServiceInterface'

  export default Vue.extend({
    data() {
      return {
        version : 'latest',
      }
    },
    computed : {
      documentationService() {
        return $container.get('$documentationService');
      },
      menu() {
        return this.documentationService.menu(this.version);
      }
    }
  });
</script>