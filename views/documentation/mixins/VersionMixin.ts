export default {
  computed: {
    version() {
      return this.$route.params.version ? this.$route.params.version : "latest";
    },
  },
};
