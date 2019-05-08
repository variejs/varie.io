import docsearch from "docsearch.js";

export default {
  methods: {
    generateDocSearch(selector) {
      this.$nextTick(() => {
        docsearch({
          indexName: "varie",
          inputSelector: `#${selector}`,
          apiKey: $config.get("documentation.apiKey"),
          debug: $config.get("app.env") === "development",
        });
      });
    },
  },
};
