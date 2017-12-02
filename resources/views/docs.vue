<template>
   <div class="px-6 pb-8 pt-20 md:pt-16 w-full max-w-lg mx-auto" v-html="content"></div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.extend({
    computed : {
      page() {
        return this.$route.params.page ? this.$route.params.page : 'installation';
      },
      content() {
        return this.$parent.documentationService.page(this.$parent.version, this.page);
      }
    }
  });
</script>