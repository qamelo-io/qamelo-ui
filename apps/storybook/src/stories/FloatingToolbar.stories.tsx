import type { Meta, StoryObj } from "@storybook/react";
import { FloatingToolbar, Button, Separator } from "@qamelo-io/ui";
import { ZoomIn, ZoomOut, Maximize2, Map } from "lucide-react";

const meta = {
  title: "Layouts/FloatingToolbar",
  component: FloatingToolbar,
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[400px] w-full rounded-lg border bg-muted/30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToolbarButtons = () => (
  <div className="flex items-center gap-1">
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <ZoomIn />
    </Button>
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <ZoomOut />
    </Button>
    <Separator orientation="vertical" className="mx-1 h-6" />
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Maximize2 />
    </Button>
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Map />
    </Button>
  </div>
);

export const TopLeft: Story = {
  args: {
    position: "top-left",
    children: <ToolbarButtons />,
  },
};

export const TopCenter: Story = {
  args: {
    position: "top-center",
    children: <ToolbarButtons />,
  },
};

export const TopRight: Story = {
  args: {
    position: "top-right",
    children: <ToolbarButtons />,
  },
};

export const BottomLeft: Story = {
  args: {
    position: "bottom-left",
    children: <ToolbarButtons />,
  },
};

export const BottomCenter: Story = {
  args: {
    position: "bottom-center",
    children: <ToolbarButtons />,
  },
};

export const BottomRight: Story = {
  args: {
    position: "bottom-right",
    children: <ToolbarButtons />,
  },
};

export const AllPositions: Story = {
  args: { position: "top-left" },
  render: () => (
    <>
      <FloatingToolbar position="top-left">
        <span className="text-xs text-muted-foreground px-2">top-left</span>
      </FloatingToolbar>
      <FloatingToolbar position="top-center">
        <span className="text-xs text-muted-foreground px-2">top-center</span>
      </FloatingToolbar>
      <FloatingToolbar position="top-right">
        <span className="text-xs text-muted-foreground px-2">top-right</span>
      </FloatingToolbar>
      <FloatingToolbar position="bottom-left">
        <span className="text-xs text-muted-foreground px-2">bottom-left</span>
      </FloatingToolbar>
      <FloatingToolbar position="bottom-center">
        <span className="text-xs text-muted-foreground px-2">bottom-center</span>
      </FloatingToolbar>
      <FloatingToolbar position="bottom-right">
        <span className="text-xs text-muted-foreground px-2">bottom-right</span>
      </FloatingToolbar>
    </>
  ),
};
