const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/caryfy/latest/",
  },
  resolve: { extensions: ["", ".ts", ".tsx", ".js", ".json"], },
  plugins: [
    new ModuleFederationPlugin({
      name: "caryfy",
      filename: "remoteEntry.js",
      exposes: {
        "./CaryfyApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
