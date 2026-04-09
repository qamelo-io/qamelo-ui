import * as React from "react";
import { FileQuestion, ShieldX, ServerCrash } from "lucide-react";
import { cn } from "../tokens/cn";
import { Button } from "../components/button";

interface ErrorPageProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

function ErrorPageShell({
  code,
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: ErrorPageProps & { code: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="text-muted-foreground">{icon}</div>
      <p className="text-6xl font-bold text-muted-foreground">{code}</p>
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

function NotFoundPage({
  title = "Page Not Found",
  description = "The page you are looking for does not exist or has been moved.",
  actionLabel = "Go Home",
  onAction,
  icon,
}: ErrorPageProps) {
  return (
    <ErrorPageShell
      code="404"
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
      icon={icon ?? <FileQuestion className={cn("size-16")} />}
    />
  );
}

function ForbiddenPage({
  title = "Access Forbidden",
  description = "You do not have permission to access this resource.",
  actionLabel = "Go Back",
  onAction,
  icon,
}: ErrorPageProps) {
  return (
    <ErrorPageShell
      code="403"
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
      icon={icon ?? <ShieldX className={cn("size-16")} />}
    />
  );
}

function ServerErrorPage({
  title = "Server Error",
  description = "Something went wrong on our end. Please try again later.",
  actionLabel = "Go Home",
  onAction,
  icon,
}: ErrorPageProps) {
  return (
    <ErrorPageShell
      code="500"
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
      icon={icon ?? <ServerCrash className={cn("size-16")} />}
    />
  );
}

export { NotFoundPage, ForbiddenPage, ServerErrorPage };
export type { ErrorPageProps };
