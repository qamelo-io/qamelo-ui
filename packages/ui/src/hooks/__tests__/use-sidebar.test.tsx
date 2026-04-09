import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { SidebarProvider, useSidebar } from "../use-sidebar";

// Provide a default matchMedia mock for jsdom
function createMatchMediaMock(matches = false) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: createMatchMediaMock(false),
});

function SidebarConsumer() {
  const { collapsed, toggle, isMobile, mobileOpen, setMobileOpen } =
    useSidebar();
  return (
    <div>
      <span data-testid="collapsed">{String(collapsed)}</span>
      <span data-testid="isMobile">{String(isMobile)}</span>
      <span data-testid="mobileOpen">{String(mobileOpen)}</span>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setMobileOpen(true)}>Open Mobile</button>
    </div>
  );
}

describe("useSidebar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("throws when used outside SidebarProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<SidebarConsumer />)).toThrow(
      "useSidebar must be used within a SidebarProvider",
    );
    spy.mockRestore();
  });

  it("defaults to expanded (collapsed=false)", () => {
    render(
      <SidebarProvider>
        <SidebarConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("collapsed").textContent).toBe("false");
  });

  it("toggles collapsed state", async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <SidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("collapsed").textContent).toBe("false");

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("collapsed").textContent).toBe("true");

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("collapsed").textContent).toBe("false");
  });

  it("persists collapsed state to localStorage", async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <SidebarConsumer />
      </SidebarProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(localStorage.getItem("qamelo-sidebar-collapsed")).toBe("true");

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(localStorage.getItem("qamelo-sidebar-collapsed")).toBe("false");
  });

  it("restores collapsed state from localStorage", () => {
    localStorage.setItem("qamelo-sidebar-collapsed", "true");

    render(
      <SidebarProvider>
        <SidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("collapsed").textContent).toBe("true");
  });

  it("detects mobile via matchMedia", () => {
    let capturedListener: ((e: MediaQueryListEvent) => void) | null = null;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn((_event: string, fn: (e: MediaQueryListEvent) => void) => {
        capturedListener = fn;
      }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <SidebarProvider>
        <SidebarConsumer />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("isMobile").textContent).toBe("true");

    // Simulate switching to desktop
    act(() => {
      capturedListener?.({ matches: false } as MediaQueryListEvent);
    });

    expect(screen.getByTestId("isMobile").textContent).toBe("false");

    // Restore default mock
    window.matchMedia = createMatchMediaMock(false);
  });
});
