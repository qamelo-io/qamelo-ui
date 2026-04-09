import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { ThemeProvider, useTheme, Button } from "@qamelo-io/ui";
import { Sun, Moon, Monitor } from "lucide-react";

function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6 text-card-foreground">
      <div>
        <h3 className="text-lg font-semibold">Theme Switcher</h3>
        <p className="text-sm text-muted-foreground">
          Current theme: <strong>{theme}</strong> (resolved:{" "}
          <strong>{resolvedTheme}</strong>)
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("light")}
          aria-label="Light theme"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("dark")}
          aria-label="Dark theme"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("system")}
          aria-label="System theme"
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md bg-background p-4 text-foreground">
          <p className="text-sm font-medium">Background / Foreground</p>
        </div>
        <div className="rounded-md bg-muted p-4 text-muted-foreground">
          <p className="text-sm font-medium">Muted / Muted Foreground</p>
        </div>
        <div className="rounded-md bg-primary p-4 text-primary-foreground">
          <p className="text-sm font-medium">Primary / Primary Foreground</p>
        </div>
        <div className="rounded-md bg-secondary p-4 text-secondary-foreground">
          <p className="text-sm font-medium">Secondary / Secondary Foreground</p>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Hooks/ThemeSwitcher",
  component: ThemeSwitcher,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ToggleDark: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const darkButton = canvas.getByRole("button", { name: "Dark theme" });

    await userEvent.click(darkButton);
    await expect(darkButton).toBeInTheDocument();

    // Switch back to light
    const lightButton = canvas.getByRole("button", { name: "Light theme" });
    await userEvent.click(lightButton);
  },
};
