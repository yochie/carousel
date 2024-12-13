const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/test/template.html",
    }),
  ],
  entry: {
    app: "./src/test/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ["./src/test/template.html"],
    static: "./dist",
  },
});
