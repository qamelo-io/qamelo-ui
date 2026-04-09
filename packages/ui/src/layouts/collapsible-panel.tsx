"use client";

import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

import { cn } from "../tokens/cn";
import { Button } from "../components/button";
import { ScrollArea } from "../components/scroll-area";

interface CollapsiblePanelProps {
  open: boolean;
  onToggle: () => void;
  height?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function CollapsiblePanel({
  open,
  onToggle,
  height = "300px",
  title,
  children,
  className,
}: CollapsiblePanelProps) {
  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 border-t bg-background", className)}
    >
      {/* Header bar — always visible */}
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={open ? "Collapse panel" : "Expand panel"}
          className="h-8 w-8"
        >
          {open ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>

      {/* Content area */}
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? height : "0px" }}
      >
        <ScrollArea style={{ height }}>
          <div className="px-4 pb-4">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

export { CollapsiblePanel };
export type { CollapsiblePanelProps };
