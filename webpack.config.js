"use strict";

const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");

var moduleRules = [
  {
    test: /\.vue$/,
    use: {
      loader: "vue-loader"
    }
  },
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"]
  },
  {
    test: /\.s[ac]ss$/,
    use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader", "sass-loader"]
  },
  {
    test: /\.svg/,
    use: {
      loader: "url-loader"
    }
  },
];

module.exports = function(env, argv) {
  return {
    entry: path.resolve(__dirname, "src/main.js"),
    module: {
      rules: moduleRules
    },
    resolve: {
      extensions: [".js", ".vue"]
    },
    externals: {
      vue: "Vue"
    },
    output: {
      filename: argv.mode === "development" ? "survey.js" : "survey.min.js",
      library: "Survey",
      libraryTarget: "umd",
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({ filename: argv.mode === "development" ? "survey.css" : "survey.min.css" })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new TerserPlugin({terserOptions: { mangle: false }})
      ]
    }
  }
};
