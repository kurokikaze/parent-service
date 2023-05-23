const path = require('path');
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const {ModuleFederationPlugin} = require("webpack").container;

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "T-Systems";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    output: {
      publicPath: 'auto',
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
    devServer: {
      proxy: {
        "/api": {
          target: "https://api.spacetraders.io/v2/",
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  });
};
