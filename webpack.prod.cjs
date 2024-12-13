const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

module.exports = merge(common, {
  mode: "production",
  entry: {
    app: "./src/carousel.js",
  },
  devtool: "source-map",
});
