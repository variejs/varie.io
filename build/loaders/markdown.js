module.exports = function() {
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