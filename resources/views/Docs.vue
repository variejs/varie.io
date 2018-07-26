<template>
   <div class="documentation--body">
      <div class="documentation--content" v-html="content" v-if="content"></div>
      <not-found v-if="!content"></not-found>
   </div>
</template>

<script>
  import Vue from 'vue';
  import  Prism from 'prismjs'
  export default Vue.extend({
    computed : {
      page() {
        return this.$route.params.page ? this.$route.params.page : 'installation';
      },
      content() {
        return this.$parent.$documentationService.page(this.$parent.version, this.page);
      }
    },
      watch : {
        content : function() {
            this.$nextTick(() => {
                Prism.highlightAll();
            })
        }
      }
  });
</script>