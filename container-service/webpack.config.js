const path = require('path');
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;

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
    // modify the webpack config however you'd like to by adding to this object
    // experiments: {
    //   outputModule: true,
    // },
    // entry: path.resolve(__dirname, "./src/main.js"),
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
      // new ModuleFederationPlugin({
      //   name: "shipStatus",
      //   filename: "remoteEntry.js",
      //   library: {type: 'system'},
      //   exposes: {
      //     // "./initMap": "./src/components/ShipStatus.vue",
      //     // "./Button": "./src/components/Button",
      //   },
      //   remotes: {
      //     appl: "http://localhost:4173/assets/remoteEntry.js",
      //   },
      //   remoteType:'module',
      //   shared: {
      //     vue: {
      //       // singleton: true,
      //       import: false,
      //       requiredVersion: '^3.0.0'
      //     }
      //   }
      // }),
    ],
  });
};
