import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { TotpInput } from "@qamelo-io/ui";

const meta = {
  title: "Components/TotpInput",
  component: TotpInput,
  args: {
    onComplete: fn(),
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[400px] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TotpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Invalid verification code. Please try again.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

// Interaction test: enter 6 digits, verify onComplete called
export const CompleteInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // InputOTP renders a hidden input that accepts typed characters
    const input = canvas.getByRole("textbox");
    await userEvent.type(input, "123456");

    await expect(args.onComplete).toHaveBeenCalledWith("123456");
  },
};
