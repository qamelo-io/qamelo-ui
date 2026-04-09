import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { SlidePanel, Button } from "@qamelo-io/ui";

const meta = {
  title: "Layouts/SlidePanel",
  component: SlidePanel,
  decorators: [
    (Story) => (
      <div className="relative min-h-[500px] w-full overflow-hidden rounded-lg border bg-muted/30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SlidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      This is a slide panel with scrollable content. It slides in from the side
      without overlaying a backdrop.
    </p>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="rounded border p-3">
        <p className="font-medium">Item {i + 1}</p>
        <p className="text-sm text-muted-foreground">
          Description for item {i + 1}
        </p>
      </div>
    ))}
  </div>
);

export const OpenFromRight: Story = {
  args: {
    open: true,
    onClose: () => {},
    side: "right",
    title: "Properties",
    description: "Edit the selected element properties",
    children: <SampleContent />,
  },
};

export const OpenFromLeft: Story = {
  args: {
    open: true,
    onClose: () => {},
    side: "left",
    title: "Layers",
    description: "Manage canvas layers",
    children: <SampleContent />,
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>Open Panel</Button>
        </div>
        <SlidePanel
          open={open}
          onClose={() => setOpen(false)}
          title="Details"
          description="View element details"
        >
          <SampleContent />
        </SlidePanel>
      </>
    );
  },
};

export const ClickClose: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>Open Panel</Button>
          <span data-testid="panel-state">{open ? "open" : "closed"}</span>
        </div>
        <SlidePanel
          open={open}
          onClose={() => setOpen(false)}
          title="Test Panel"
        >
          <p>Content</p>
        </SlidePanel>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Panel should start open
    await expect(canvas.getByTestId("panel-state")).toHaveTextContent("open");
    // Click close
    const closeButton = canvas.getByRole("button", { name: "Close panel" });
    await userEvent.click(closeButton);
    await expect(canvas.getByTestId("panel-state")).toHaveTextContent("closed");
  },
};
