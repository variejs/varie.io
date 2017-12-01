<template>
   <section v-html="content"></section>
</template>

<script>
  import Vue from 'vue';
  export default Vue.extend({
    data() {
        return {
          page : 'getting-started',
        }
    },
    computed : {
      content() {
        return this.$parent.documentationService.page(this.$parent.version, this.page);
      }
    }
  });
</script>