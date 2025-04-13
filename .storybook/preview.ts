import type { Preview } from "@storybook/react";

//Global Styles
import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";

const preview: Preview = {
  //👇 Enables auto-generated documentation for all stories
  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        contentsSelector: ".sbdocs-content",
        headingSelector: "h1, h2, h3",
        ignoreSelector: "#primary",
        title: "Table of Contents",
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
};

export default preview;
