"use client";

import * as React from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
import { Label } from "./label";
import { Alert, AlertDescription } from "./alert";

interface TotpInputProps {
  onComplete: (code: string) => void;
  error?: string;
  loading?: boolean;
  length?: number;
  label?: string;
}

function TotpInput({
  onComplete,
  error,
  loading = false,
  length = 6,
  label = "Verification code",
}: TotpInputProps) {
  const [value, setValue] = React.useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length === length) {
      onComplete(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2">
        <Label>{label}</Label>
        <InputOTP
          maxLength={length}
          value={value}
          onChange={handleChange}
          disabled={loading}
        >
          <InputOTPGroup>
            {Array.from({ length }, (_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}

export { TotpInput };
export type { TotpInputProps };
