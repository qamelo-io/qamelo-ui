"use client";

import * as React from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const MOBILE_BREAKPOINT = 768;
const STORAGE_KEY = "qamelo-sidebar-collapsed";

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined,
);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  });

  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const setCollapsed = React.useCallback((value: boolean) => {
    setCollapsedState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(value));
    }
  }, []);

  const toggle = React.useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed(!collapsed);
    }
  }, [isMobile, collapsed, setCollapsed]);

  // Detect mobile via matchMedia
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setMobileOpen(false);
      }
    };

    setIsMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const value = React.useMemo(
    () => ({ collapsed, setCollapsed, toggle, isMobile, mobileOpen, setMobileOpen }),
    [collapsed, setCollapsed, toggle, isMobile, mobileOpen],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export { SidebarProvider, useSidebar };
export type { SidebarContextValue };
