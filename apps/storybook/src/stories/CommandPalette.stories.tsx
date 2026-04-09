import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { CommandPalette, Button } from "@qamelo-io/ui";
import type { CommandPaletteItem } from "@qamelo-io/ui";
import { Home, Settings, User, Sun, LogOut } from "lucide-react";

const createSampleItems = (
  overrides: Partial<Record<string, () => void>> = {},
): CommandPaletteItem[] => [
  {
    id: "home",
    label: "Go to Home",
    icon: Home,
    group: "Navigation",
    onSelect: overrides.home ?? fn(),
  },
  {
    id: "settings",
    label: "Go to Settings",
    icon: Settings,
    group: "Navigation",
    onSelect: overrides.settings ?? fn(),
  },
  {
    id: "profile",
    label: "Edit Profile",
    icon: User,
    group: "Actions",
    shortcut: "\u2318P",
    onSelect: overrides.profile ?? fn(),
  },
  {
    id: "theme",
    label: "Toggle Theme",
    icon: Sun,
    group: "Actions",
    shortcut: "\u2318T",
    onSelect: overrides.theme ?? fn(),
  },
  {
    id: "logout",
    label: "Log Out",
    icon: LogOut,
    group: "Actions",
    onSelect: overrides.logout ?? fn(),
  },
];

const meta = {
  title: "Components/CommandPalette",
  component: CommandPalette,
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const items = createSampleItems();
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <p className="text-sm text-muted-foreground">
          Press <kbd className="rounded border px-1.5 py-0.5 text-xs font-mono">Ctrl+K</kbd> or click the button below.
        </p>
        <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
        <CommandPalette
          items={items}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

export const Open: Story = {
  args: {
    items: createSampleItems(),
    open: true,
    onOpenChange: fn(),
  },
};

export const SearchInteraction: Story = {
  args: {
    items: createSampleItems(),
    open: true,
    onOpenChange: fn(),
  },
  play: async ({ canvasElement }) => {
    // CommandDialog renders in a portal, so we need document.body
    const body = within(document.body);

    // Type a search query
    const input = body.getByPlaceholderText("Type a command or search...");
    await userEvent.type(input, "Home");

    // "Go to Home" should still be visible
    await expect(body.getByText("Go to Home")).toBeInTheDocument();
  },
};

export const SelectInteraction: Story = {
  render: () => {
    const onSelect = fn();
    const [open, setOpen] = useState(true);
    const items: CommandPaletteItem[] = [
      {
        id: "test-action",
        label: "Test Action",
        group: "Actions",
        onSelect,
      },
    ];
    return (
      <>
        <span data-testid="palette-state">{open ? "open" : "closed"}</span>
        <CommandPalette items={items} open={open} onOpenChange={setOpen} />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Palette should be open
    await expect(body.getByText("Test Action")).toBeInTheDocument();

    // Click the item
    await userEvent.click(body.getByText("Test Action"));

    // Palette should close
    await expect(canvas.getByTestId("palette-state")).toHaveTextContent(
      "closed",
    );
  },
};
