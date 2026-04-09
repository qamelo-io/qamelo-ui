import type { Meta, StoryObj } from "@storybook/react";
import { Authorize } from "@qamelo-io/ui";

const meta = {
  title: "Components/Authorize",
  component: Authorize,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Authorize>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authorized: Story = {
  args: {
    allowed: true,
    children: (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border bg-card p-8 text-card-foreground shadow">
          <h2 className="text-xl font-semibold">Protected Content</h2>
          <p className="mt-2 text-muted-foreground">
            You have access to this content.
          </p>
        </div>
      </div>
    ),
  },
};

export const Unauthorized: Story = {
  args: {
    allowed: false,
    children: <p>Secret content — should not appear</p>,
  },
};

export const CustomFallback: Story = {
  args: {
    allowed: false,
    children: <p>Secret content — should not appear</p>,
    fallback: (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-8">
          <h2 className="text-xl font-semibold text-destructive">Access Denied</h2>
          <p className="mt-2 text-muted-foreground">
            Custom fallback component for access denied.
          </p>
        </div>
      </div>
    ),
  },
};
