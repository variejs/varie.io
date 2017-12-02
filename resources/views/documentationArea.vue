<template>
    <div class="documentation">
        <div class="documentation--menu hidden z-50 fixed pin-y pin-l overflow-y-scroll md:overflow-visible scrolling-touch md:scrolling-auto w-4/5 md:w-full md:max-w-xs flex-none border-r-2 md:flex flex-col" >
            <component class="flex-1 overflow-y-scroll" :is="menu"></component>
        </div>
        <div class="documentation--content md:ml-80">
            <router-view></router-view>
        </div>
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