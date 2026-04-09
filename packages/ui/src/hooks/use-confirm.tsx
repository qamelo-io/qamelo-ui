"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/alert-dialog";
import { buttonVariants } from "../components/button";
import { cn } from "../tokens/cn";

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}

interface UseConfirmReturn {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  ConfirmDialog: React.FC;
}

function useConfirm(): UseConfirmReturn {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ConfirmOptions>({ title: "" });
  const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

  const confirm = React.useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setOptions(opts);
      resolveRef.current = resolve;
      setOpen(true);
    });
  }, []);

  const handleConfirm = React.useCallback(() => {
    resolveRef.current?.(true);
    resolveRef.current = null;
    setOpen(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    resolveRef.current?.(false);
    resolveRef.current = null;
    setOpen(false);
  }, []);

  const ConfirmDialog: React.FC = React.useCallback(() => {
    const {
      title,
      description,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      variant = "default",
    } = options;

    return (
      <AlertDialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) handleCancel();
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {cancelLabel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={cn(
                variant === "destructive" &&
                  buttonVariants({ variant: "destructive" }),
              )}
            >
              {confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }, [open, options, handleConfirm, handleCancel]);

  return { confirm, ConfirmDialog };
}

export { useConfirm };
export type { ConfirmOptions, UseConfirmReturn };
