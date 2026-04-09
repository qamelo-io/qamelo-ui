import type { Meta, StoryObj } from "@storybook/react";

const Welcome = () => (
  <div style={{ padding: "2rem" }}>
    <h1>@qamelo/ui Storybook</h1>
    <p>Component stories will be added in slice 1.5.</p>
  </div>
);

const meta = {
  title: "Welcome",
  component: Welcome,
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
