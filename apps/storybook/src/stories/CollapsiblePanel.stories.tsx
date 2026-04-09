import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { CollapsiblePanel, Button } from "@qamelo-io/ui";

const meta = {
  title: "Layouts/CollapsiblePanel",
  component: CollapsiblePanel,
  decorators: [
    (Story) => (
      <div className="relative min-h-[500px] w-full rounded-lg border bg-muted/30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CollapsiblePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const ConsoleContent = () => (
  <div className="space-y-1 font-mono text-xs">
    {Array.from({ length: 30 }, (_, i) => (
      <div key={i} className="text-muted-foreground">
        <span className="text-foreground/50">[{String(i + 1).padStart(2, "0")}:00:00]</span>{" "}
        Log message line {i + 1}
      </div>
    ))}
  </div>
);

export const Expanded: Story = {
  args: {
    open: true,
    onToggle: () => {},
    title: "Console Output",
    children: <ConsoleContent />,
  },
};

export const Collapsed: Story = {
  args: {
    open: false,
    onToggle: () => {},
    title: "Console Output",
    children: <ConsoleContent />,
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <CollapsiblePanel
        open={open}
        onToggle={() => setOpen((prev) => !prev)}
        title="Console Output"
        height="250px"
      >
        <ConsoleContent />
      </CollapsiblePanel>
    );
  },
};

export const ToggleInteraction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <span data-testid="panel-state">{open ? "expanded" : "collapsed"}</span>
        <CollapsiblePanel
          open={open}
          onToggle={() => setOpen((prev) => !prev)}
          title="Console"
        >
          <p>Log content here</p>
        </CollapsiblePanel>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Panel should start collapsed
    await expect(canvas.getByTestId("panel-state")).toHaveTextContent(
      "collapsed",
    );
    // Click expand
    const toggleButton = canvas.getByRole("button", { name: "Expand panel" });
    await userEvent.click(toggleButton);
    await expect(canvas.getByTestId("panel-state")).toHaveTextContent(
      "expanded",
    );
    // Click collapse
    const collapseButton = canvas.getByRole("button", {
      name: "Collapse panel",
    });
    await userEvent.click(collapseButton);
    await expect(canvas.getByTestId("panel-state")).toHaveTextContent(
      "collapsed",
    );
  },
};
