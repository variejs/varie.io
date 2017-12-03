<template>
    <div class="documentation">
        <div class="documentation--menu">
            <component :is="menu"></component>
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