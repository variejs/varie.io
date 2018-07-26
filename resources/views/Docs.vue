<template>
   <div id="doc-area" class="documentation--body">
      <component class="documentation--content" :is="content" v-if="content && content.template"></component>
      <not-found v-if="!content"></not-found>
   </div>
</template>

<script>
import Vue from "vue";
import Prism from "prismjs";
export default Vue.extend({
  computed: {
    page() {
      return this.$route.params.page ? this.$route.params.page : "installation";
    },
    content() {
      return {
        template: this.$parent.$documentationService.page(
          this.$parent.version,
          this.page,
        ),
      };
    },
  },
  watch: {
    content: function() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
  },
});
</script>
