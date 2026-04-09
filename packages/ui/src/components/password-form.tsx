import * as React from "react";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Alert, AlertDescription } from "./alert";
import { Loader2 } from "lucide-react";

interface PasswordFormProps {
  onSubmit: (password: string) => void;
  error?: string;
  loading?: boolean;
  title?: string;
  newPasswordLabel?: string;
  confirmPasswordLabel?: string;
  submitLabel?: string;
}

function PasswordForm({
  onSubmit,
  error,
  loading = false,
  newPasswordLabel = "New password",
  confirmPasswordLabel = "Confirm password",
  submitLabel = "Set password",
}: PasswordFormProps) {
  const [mismatchError, setMismatchError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMismatchError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("new-password") as string;
    const confirm = formData.get("confirm-password") as string;

    if (password !== confirm) {
      setMismatchError("Passwords do not match");
      return;
    }

    onSubmit(password);
  };

  const displayError = error ?? mismatchError;

  return (
    <div className="flex flex-col gap-4">
      {displayError && (
        <Alert variant="destructive">
          <AlertDescription>{displayError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">{newPasswordLabel}</Label>
          <Input
            id="new-password"
            name="new-password"
            type="password"
            required
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm-password">{confirmPasswordLabel}</Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {submitLabel}
        </Button>
      </form>
    </div>
  );
}

export { PasswordForm };
export type { PasswordFormProps };
