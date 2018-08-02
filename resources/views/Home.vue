<template>
   <div>
      <img src="@resources/assets/img/varie_banner.png">
   </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  computed: {
    page() {
      return this.$route.params.page ? this.$route.params.page : "installation";
    },
    content() {
      return this.$parent.$documentationService.page(
        this.$parent.version,
        this.page,
      );
    },
  },
});
</script>
