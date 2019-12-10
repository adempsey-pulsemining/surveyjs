"use strict";

const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

var moduleRules = [
  {
    test: /\.vue$/,
    use: {
      loader: "vue-loader"
    }
  },
  {
    test: /\.(ts|tsx)$/,
    use: {
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] }
    }
  },
  {
    test: /\.s[ac]ss$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
  },
  {
    test: /\.svg/,
    use: { loader: "url-loader" }
  },
];

module.exports = {
  entry: path.resolve(__dirname, "src/entries/vue.ts"),
  module: {
    rules: moduleRules
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".scss"]
  },
  externals: {
    vue: { root: "Vue", commonjs2: "vue", commonjs: "vue", amd: "vue" }
  },
  output: {
    filename: "survey.js",
    library: "Survey",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ filename: "survey.css" })
  ]
};
