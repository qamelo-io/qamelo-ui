"use client";

import * as React from "react";

import { cn } from "../tokens/cn";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "../components/separator";

interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  breadcrumbs?: React.ReactNode;
  search?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

function TopBar({
  breadcrumbs,
  search,
  actions,
  children,
  className,
  ...props
}: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4",
        className,
      )}
      {...props}
    >
      {/* Left: trigger + breadcrumbs */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {breadcrumbs && (
          <>
            <Separator orientation="vertical" className="mx-1 h-5" />
            {breadcrumbs}
          </>
        )}
      </div>

      {/* Center / flexible space */}
      <div className="flex-1" />

      {/* Search */}
      {search && <div className="flex items-center">{search}</div>}

      {/* Right: actions */}
      {actions && (
        <div className="flex items-center gap-2">{actions}</div>
      )}

      {/* Fallback children */}
      {children}
    </header>
  );
}
TopBar.displayName = "TopBar";

export { TopBar };
export type { TopBarProps };
