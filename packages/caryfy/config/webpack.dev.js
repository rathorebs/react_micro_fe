const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8084/",
  },
  resolve: {
    /* alias: {
      'components': path.resolve(__dirname, 'src/components/'),
    }, */
    extensions: [".js", ".jsx", ".json", ".graphql"],
  },
  devServer: {
    port: 8084,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "caryfy",
      filename: "remoteEntry.js",
      exposes: {
        "./CaryfyApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
