<template>
    <div class="content">
        <h3>Version:{{ version }} -- todo make sure reactive</h3>
        <component :is="pageMenu" v-if="pageMenu && pageMenu.template"></component>
        <component :is="content" v-if="content && content.template"></component>
        <not-found v-if="!content"></not-found>
    </div>
</template>

<script>
    import Prism from 'prismjs';
    import VersionMixin from '@views/documentation/mixins/VersionMixin'

    export default {
      mixins : [VersionMixin],
      $inject: ["DocumentationService"],
      computed: {
        page() {
          return this.$route.params.page;
        },
        content() {
          return {
            template: this.documentationService.page(
              this.version,
              this.page,
            ),
          };
        },
        pageMenu() {
          return {
            template: this.documentationService.pageMenu(
              this.version,
              this.page,
            ),
          };
        },
      },
      watch: {
        content() {
          this.$nextTick(() => {
            Prism.highlightAll();
          });
        },
      },
    }
</script>