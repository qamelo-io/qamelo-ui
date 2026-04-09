import * as React from "react";

import { cn } from "../tokens/cn";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Alert, AlertDescription } from "./alert";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error?: string;
  loading?: boolean;
  emailLabel?: string;
  passwordLabel?: string;
  submitLabel?: string;
  children?: React.ReactNode;
}

function LoginForm({
  onSubmit,
  error,
  loading = false,
  emailLabel = "Email",
  passwordLabel = "Password",
  submitLabel = "Sign in",
  children,
}: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onSubmit(email, password);
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-email">{emailLabel}</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="login-password">{passwordLabel}</Label>
          <Input
            id="login-password"
            name="password"
            type="password"
            required
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {submitLabel}
        </Button>
      </form>

      {children && (
        <div className={cn("flex flex-col gap-3")}>{children}</div>
      )}
    </div>
  );
}

export { LoginForm };
export type { LoginFormProps };
