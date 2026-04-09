import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { LoginForm, OidcButton } from "@qamelo-io/ui";

const meta = {
  title: "Components/LoginForm",
  component: LoginForm,
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
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Invalid email or password. Please try again.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithOidcButtons: Story = {
  render: (args) => (
    <LoginForm {...args}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <OidcButton provider="Google" onClick={fn()} />
      <OidcButton provider="GitHub" onClick={fn()} />
      <OidcButton provider="Microsoft" onClick={fn()} />
    </LoginForm>
  ),
};

// Interaction test: fill email + password, submit, verify onSubmit called
export const SubmitInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText("Email");
    const passwordInput = canvas.getByLabelText("Password");
    const submitButton = canvas.getByRole("button", { name: "Sign in" });

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await expect(args.onSubmit).toHaveBeenCalledWith(
      "user@example.com",
      "password123",
    );
  },
};
