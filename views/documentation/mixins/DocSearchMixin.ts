export default {
  methods: {
    generateDocSearch(selector) {
      // this is for algolia search and is loaded too early.
      window.process = {
        env: {
          debug: false,
        },
      };

      const docsearch = require("docsearch.js");

      this.$nextTick(() => {
        try {
          docsearch({
            indexName: "varie",
            inputSelector: `#${selector}`,
            apiKey: "453e1f447798dfe06777082b687f06f2",
          });
        } catch (error) {
          console.warn("unable to load doc search");
        }
      });
    },
  },
};
