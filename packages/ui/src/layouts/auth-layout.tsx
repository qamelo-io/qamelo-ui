import * as React from "react";

import { cn } from "../tokens/cn";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  description?: string;
}

function AuthLayout({
  children,
  logo,
  footer,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-4">
      <div className="flex w-full max-w-[450px] flex-col items-center gap-6">
        <Card className="w-full">
          <CardHeader className="items-center text-center">
            {logo && <div className="mb-2">{logo}</div>}
            {title && <CardTitle>{title}</CardTitle>}
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        {footer && (
          <div
            className={cn(
              "text-center text-sm text-muted-foreground",
              "[&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary",
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export { AuthLayout };
export type { AuthLayoutProps };
