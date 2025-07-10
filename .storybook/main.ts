import type { StorybookConfig } from "@storybook/nextjs";
import postcss from "postcss";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.mdx",
  ],
  addons: ["@chromatic-com/storybook", {
    name: "@storybook/addon-docs",
    options: {
      csfPluginOptions: null,
      mdxPluginOptions: {},
    },
  }, {
    name: "@storybook/addon-postcss",
    options: {
      postcssLoaderOptions: {
        implementation: postcss,
      },
    },
  }],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {
    defaultName: "Documentation",
  },
};
export default config;
