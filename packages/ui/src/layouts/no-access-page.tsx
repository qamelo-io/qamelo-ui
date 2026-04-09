import { Lock } from "lucide-react";
import { cn } from "../tokens/cn";
import { Button } from "../components/button";

interface NoAccessPageProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function NoAccessPage({
  title = "No Access",
  description = "You don't have permission to view this page. If you believe this is an error, please contact your administrator.",
  actionLabel = "Contact Administrator",
  onAction,
}: NoAccessPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="text-muted-foreground">
        <Lock className={cn("size-16")} />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-md text-muted-foreground">{description}</p>
      </div>
      {onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export { NoAccessPage };
export type { NoAccessPageProps };
