"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../tokens/cn";
import { ScrollArea } from "../components/scroll-area";

interface SettingsSection {
  key: string;
  label: string;
  icon?: LucideIcon;
}

interface SettingsLayoutProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange: (key: string) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function SettingsNavItem({
  section,
  active,
  onClick,
}: {
  section: SettingsSection;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = section.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span>{section.label}</span>
    </button>
  );
}

function SettingsLayout({
  sections,
  activeSection,
  onSectionChange,
  children,
  title = "Settings",
  description,
}: SettingsLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Mobile: horizontal scrollable nav */}
      <div className="md:hidden">
        <ScrollArea className="w-full">
          <div className="flex gap-1 pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => onSectionChange(section.key)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSection === section.key
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Desktop: sidebar + content */}
      <div className="flex gap-8">
        {/* Sidebar nav — hidden on mobile */}
        <nav className="hidden w-[220px] shrink-0 md:block" aria-label="Settings navigation">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1">
              {sections.map((section) => (
                <SettingsNavItem
                  key={section.key}
                  section={section}
                  active={activeSection === section.key}
                  onClick={() => onSectionChange(section.key)}
                />
              ))}
            </div>
          </ScrollArea>
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

export { SettingsLayout };
export type { SettingsSection, SettingsLayoutProps };
