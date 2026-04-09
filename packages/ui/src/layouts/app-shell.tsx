"use client";

import * as React from "react";

import { cn } from "../tokens/cn";
import { SidebarProvider } from "../hooks/use-sidebar";

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "default" | "canvas";
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  topBar?: React.ReactNode;
  canvasHeader?: React.ReactNode;
}

function AppShell({
  mode = "default",
  children,
  sidebar,
  topBar,
  canvasHeader,
  className,
  ...props
}: AppShellProps) {
  if (mode === "canvas") {
    return (
      <div
        className={cn("flex h-svh flex-col overflow-hidden", className)}
        {...props}
      >
        {canvasHeader && (
          <header className="flex h-10 shrink-0 items-center border-b bg-background px-4">
            {canvasHeader}
          </header>
        )}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div
        className={cn("flex h-svh overflow-hidden", className)}
        {...props}
      >
        {sidebar}
        <div className="flex flex-1 flex-col overflow-hidden">
          {topBar}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
AppShell.displayName = "AppShell";

export { AppShell };
export type { AppShellProps };
