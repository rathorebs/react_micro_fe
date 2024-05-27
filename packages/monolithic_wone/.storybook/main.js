module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  features: {
    interactionsDebugger: true,
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  // See https://github.com/storybookjs/storybook/issues/1291#issuecomment-795251283
  webpackFinal: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.output.publicPath = "/storybook/";
    }
    return config;
  },
  managerWebpack: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.output.publicPath = "/storybook/";
    }
    return config;
  },
};
