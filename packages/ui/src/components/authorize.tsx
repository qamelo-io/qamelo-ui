import * as React from "react";
import { NoAccessPage } from "../layouts/no-access-page";

interface AuthorizeProps {
  allowed: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function Authorize({ allowed, children, fallback }: AuthorizeProps) {
  if (allowed) {
    return <>{children}</>;
  }
  return <>{fallback ?? <NoAccessPage />}</>;
}

export { Authorize };
export type { AuthorizeProps };
