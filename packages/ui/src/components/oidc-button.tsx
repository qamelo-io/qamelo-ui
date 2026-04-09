import * as React from "react";

import { cn } from "../tokens/cn";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

interface OidcButtonProps {
  provider: string;
  icon?: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  className?: string;
}

function OidcButton({
  provider,
  icon,
  onClick,
  loading = false,
  className,
}: OidcButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn("w-full", className)}
      onClick={onClick}
      disabled={loading}
      type="button"
    >
      {loading ? <Loader2 className="animate-spin" /> : icon}
      Continue with {provider}
    </Button>
  );
}

export { OidcButton };
export type { OidcButtonProps };
