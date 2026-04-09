"use client";

import * as React from "react";

import { cn } from "../tokens/cn";

type ToolbarPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface FloatingToolbarProps {
  position: ToolbarPosition;
  children: React.ReactNode;
  className?: string;
}

const positionClasses: Record<ToolbarPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

function FloatingToolbar({ position, children, className }: FloatingToolbarProps) {
  return (
    <div
      className={cn(
        "absolute z-50 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-2",
        positionClasses[position],
        className,
      )}
    >
      {children}
    </div>
  );
}

export { FloatingToolbar };
export type { FloatingToolbarProps, ToolbarPosition };
