const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/test/template.html",
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ["./src/test/template.html"],
    static: "./dist",
  },
});
