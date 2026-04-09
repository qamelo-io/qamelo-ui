"use client";

import * as React from "react";
import { PanelLeft, ChevronRight, type LucideIcon } from "lucide-react";

import { cn } from "../tokens/cn";
import { Button } from "../components/button";
import { ScrollArea } from "../components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "../components/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/collapsible";
import { useSidebar } from "../hooks/use-sidebar";

/* ─── SidebarRoot ──────────────────────────────────────────────── */

interface SidebarRootProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function SidebarRoot({ children, className, ...props }: SidebarRootProps) {
  const { collapsed, isMobile, mobileOpen, setMobileOpen } = useSidebar();

  const sidebarContent = (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0" aria-describedby={undefined}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <aside
            className={cn(
              "flex h-full flex-col bg-sidebar text-sidebar-foreground",
              className,
            )}
            {...props}
          >
            {children}
          </aside>
        </SheetContent>
      </Sheet>
    );
  }

  return sidebarContent;
}
SidebarRoot.displayName = "SidebarRoot";

/* ─── SidebarHeader ────────────────────────────────────────────── */

function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2 px-4 py-3", className)}
      {...props}
    />
  );
}
SidebarHeader.displayName = "SidebarHeader";

/* ─── SidebarContent ───────────────────────────────────────────── */

function SidebarContent({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ScrollArea className={cn("flex-1 px-2", className)}>
      <div className="py-2">{children}</div>
    </ScrollArea>
  );
}
SidebarContent.displayName = "SidebarContent";

/* ─── SidebarFooter ────────────────────────────────────────────── */

function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto shrink-0 border-t border-sidebar-border px-4 py-3",
        className,
      )}
      {...props}
    />
  );
}
SidebarFooter.displayName = "SidebarFooter";

/* ─── SidebarTrigger ───────────────────────────────────────────── */

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggle } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={toggle}
      aria-label="Toggle sidebar"
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

/* ─── NavGroup ─────────────────────────────────────────────────── */

interface NavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

function NavGroup({ label, children, className, ...props }: NavGroupProps) {
  const { collapsed } = useSidebar();

  return (
    <div className={cn("py-2", className)} role="group" aria-label={label} {...props}>
      {!collapsed && (
        <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      )}
      {collapsed && (
        <div className="mb-1 px-3">
          <div className="h-px w-full bg-sidebar-border" />
        </div>
      )}
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
}
NavGroup.displayName = "NavGroup";

/* ─── NavItem ──────────────────────────────────────────────────── */

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  icon?: LucideIcon;
  label: string;
  to?: string;
  active?: boolean;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ icon: Icon, label, to = "#", active = false, className, ...props }, ref) => {
    const { collapsed, isMobile, setMobileOpen } = useSidebar();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isMobile) {
        setMobileOpen(false);
      }
      props.onClick?.(e);
    };

    const content = (
      <a
        ref={ref}
        href={to}
        data-active={active || undefined}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          active &&
            "bg-sidebar-accent text-sidebar-accent-foreground",
          collapsed && "justify-center px-0",
          className,
        )}
        {...props}
        onClick={handleClick}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        {!collapsed && <span className="truncate">{label}</span>}
      </a>
    );

    if (collapsed && !isMobile) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      );
    }

    return content;
  },
);
NavItem.displayName = "NavItem";

/* ─── NavCollapsible ───────────────────────────────────────────── */

interface NavCollapsibleProps {
  icon?: LucideIcon;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function NavCollapsible({
  icon: Icon,
  label,
  defaultOpen = false,
  children,
}: NavCollapsibleProps) {
  const { collapsed, isMobile } = useSidebar();
  const [open, setOpen] = React.useState(defaultOpen);

  // When collapsed (desktop), show tooltip with label
  if (collapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setOpen(!open)}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          <span className="flex-1 truncate text-left">{label}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              open && "rotate-90",
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border pl-2 pt-1">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
NavCollapsible.displayName = "NavCollapsible";

/* ─── Sidebar (convenience compound) ──────────────────────────── */

function Sidebar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarRoot className={className} {...props}>
        {children}
      </SidebarRoot>
    </TooltipProvider>
  );
}
Sidebar.displayName = "Sidebar";

export {
  Sidebar,
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  NavGroup,
  NavItem,
  NavCollapsible,
};

export type { NavItemProps, NavGroupProps, NavCollapsibleProps };
