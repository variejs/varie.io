<template>
   <div id="doc-area" class="documentation__body">
       <div class="documentation__content" >
           <component :is="pageMenu" v-if="pageMenu && pageMenu.template"></component>
           <component :is="content" v-if="content && content.template"></component>
       </div>
      <not-found v-if="!content"></not-found>
   </div>
</template>

<script>
import Vue from "vue";
import Prism from "prismjs";
export default Vue.extend({
  computed: {
    page() {
      return this.$route.params.page;
    },
    content() {
      return {
        template: this.$parent.documentationService.page(
          this.$parent.version,
          this.page,
        ),
      };
    },
    pageMenu: function() {
      return {
        template: this.$parent.documentationService.pageMenu(
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
