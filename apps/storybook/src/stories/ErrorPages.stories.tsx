import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NotFoundPage, ForbiddenPage, ServerErrorPage } from "@qamelo-io/ui";
import { AlertTriangle } from "lucide-react";

const meta = {
  title: "Layouts/ErrorPages",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const NotFound: Story = {
  render: () => <NotFoundPage onAction={fn()} />,
};

export const Forbidden: Story = {
  render: () => <ForbiddenPage onAction={fn()} />,
};

export const ServerError: Story = {
  render: () => <ServerErrorPage onAction={fn()} />,
};

export const CustomErrorPage: Story = {
  render: () => (
    <NotFoundPage
      title="Custom Title"
      description="This is a custom error description for i18n support."
      actionLabel="Return to Dashboard"
      onAction={fn()}
      icon={<AlertTriangle className="size-16" />}
    />
  ),
};
