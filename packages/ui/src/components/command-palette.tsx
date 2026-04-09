"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "./command";

interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  shortcut?: string;
  group?: string;
  onSelect: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  items: CommandPaletteItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
}

function groupItems(
  items: CommandPaletteItem[],
): Record<string, CommandPaletteItem[]> {
  const groups: Record<string, CommandPaletteItem[]> = {};
  for (const item of items) {
    const group = item.group ?? "Actions";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
  }
  return groups;
}

function CommandPalette({
  items,
  open,
  onOpenChange,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = React.useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setInternalOpen(value);
      }
    },
    [isControlled, onOpenChange],
  );

  // Keyboard shortcut: Ctrl+K / Cmd+K
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setIsOpen]);

  const grouped = groupItems(items);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {Object.entries(grouped).map(([group, groupItems]) => (
          <CommandGroup key={group} heading={group}>
            {groupItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  item.onSelect();
                  setIsOpen(false);
                }}
                keywords={item.keywords}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
                {item.shortcut && (
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

export { CommandPalette };
export type { CommandPaletteItem, CommandPaletteProps };
