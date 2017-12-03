<template>
   <div class="documentation--content" v-html="content"></div>
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