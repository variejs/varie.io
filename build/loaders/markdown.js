module.exports = function jsonLoader() {
  return {
    test: /\.md$/,
    use: [
      {
        loader: "html-loader",
      },
      {
        loader: "markdown-loader",
      },
    ],
  };
};
