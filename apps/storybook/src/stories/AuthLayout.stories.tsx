import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AuthLayout, LoginForm, PasswordForm, TotpInput, OidcButton } from "@qamelo-io/ui";
import { Shield } from "lucide-react";

const meta = {
  title: "Layouts/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLoginForm: Story = {
  render: () => (
    <AuthLayout
      title="Sign in"
      description="Enter your credentials to access your account"
      footer={
        <p>
          Don&apos;t have an account? <a href="#">Sign up</a>
        </p>
      }
    >
      <LoginForm onSubmit={fn()}>
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
      </LoginForm>
    </AuthLayout>
  ),
};

export const WithPasswordForm: Story = {
  render: () => (
    <AuthLayout
      title="Reset Password"
      description="Enter your new password below"
      footer={
        <p>
          <a href="#">Back to login</a>
        </p>
      }
    >
      <PasswordForm onSubmit={fn()} />
    </AuthLayout>
  ),
};

export const WithTotpInput: Story = {
  render: () => (
    <AuthLayout
      title="Two-Factor Authentication"
      description="Enter the verification code from your authenticator app"
      footer={
        <p>
          <a href="#">Back to login</a> &middot; <a href="#">Use recovery code</a>
        </p>
      }
    >
      <TotpInput onComplete={fn()} />
    </AuthLayout>
  ),
};

export const WithCustomLogo: Story = {
  render: () => (
    <AuthLayout
      logo={
        <div className="flex items-center gap-2 text-primary">
          <Shield className="h-8 w-8" />
          <span className="text-xl font-bold">Qamelo</span>
        </div>
      }
      title="Welcome back"
      description="Sign in to your account"
    >
      <LoginForm onSubmit={fn()} />
    </AuthLayout>
  ),
};
