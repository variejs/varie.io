<template>
    <div class="flex flex-wrap documentation overflow-y-scroll">
        <div class="md:w-1/4">
            <component :is="menu"></component>
        </div>
        <router-view class="container py-4 pl-4 md:w-3/4"></router-view>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { DocumentationServiceInterface } from '@app/contracts/DocumentationServiceInterface'

  export default Vue.extend({
    data() {
      return {
        version : this.$route.params.version ? this.$route.params.version : 'latest',
      }
    },
    computed : {
      documentationService() {
        return $container.get('$documentationService');
      },
      menu() {
        return {
          template : this.documentationService.menu(this.version)
        };
      }
    }
  });
</script>