"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "../tokens/cn";
import { Button } from "../components/button";
import { ScrollArea } from "../components/scroll-area";

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  width?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function SlidePanel({
  open,
  onClose,
  side = "right",
  width = "400px",
  title,
  description,
  children,
  className,
}: SlidePanelProps) {
  const isRight = side === "right";

  return (
    <div
      className={cn(
        "absolute top-0 z-40 h-full transition-transform duration-300 ease-in-out",
        isRight ? "right-0 border-l" : "left-0 border-r",
        open
          ? "translate-x-0"
          : isRight
            ? "translate-x-full"
            : "-translate-x-full",
        "bg-background",
        className,
      )}
      style={{ width }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 border-b p-4">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1.5 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close panel"
            className="shrink-0"
          >
            <X />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

export { SlidePanel };
export type { SlidePanelProps };
