import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { PasswordForm } from "@qamelo-io/ui";

const meta = {
  title: "Components/PasswordForm",
  component: PasswordForm,
  args: {
    onSubmit: fn(),
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[400px] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Password reset link has expired.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

// Interaction test: enter mismatched passwords, verify client-side error
export const PasswordMismatchInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const newPasswordInput = canvas.getByLabelText("New password");
    const confirmPasswordInput = canvas.getByLabelText("Confirm password");
    const submitButton = canvas.getByRole("button", { name: "Set password" });

    await userEvent.type(newPasswordInput, "password123");
    await userEvent.type(confirmPasswordInput, "different456");
    await userEvent.click(submitButton);

    // Should show mismatch error and NOT call onSubmit
    await expect(canvas.getByText("Passwords do not match")).toBeVisible();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};
