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
            appId: "D3Y4VSJS08",
            inputSelector: `#${selector}`,
            apiKey: "27d3603b119f10625aa67d5cf98d07e5",
          });
        } catch (error) {
          console.warn("unable to load doc search");
        }
      });
    },
  },
};
