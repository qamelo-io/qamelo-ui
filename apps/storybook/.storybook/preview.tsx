import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "@qamelo-io/ui/styles/globals.css";

initialize({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${import.meta.env.BASE_URL || "/"}mockServiceWorker.js`,
  },
});

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color mode",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: "Text direction",
      toolbar: {
        title: "Direction",
        items: [
          { value: "ltr", icon: "paragraph", title: "LTR" },
          { value: "rtl", icon: "paragraph", title: "RTL" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    direction: "ltr",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const dir = context.globals.direction;
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.dir = dir;
      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
