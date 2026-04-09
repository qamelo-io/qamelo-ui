import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { AppShell } from "../app-shell";

// Mock matchMedia for SidebarProvider
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("AppShell", () => {
  it("renders in default mode with sidebar and topbar slots", () => {
    render(
      <AppShell
        sidebar={<nav data-testid="sidebar">Sidebar</nav>}
        topBar={<header data-testid="topbar">TopBar</header>}
      >
        <div data-testid="content">Main content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("topbar")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders in canvas mode without sidebar", () => {
    render(
      <AppShell
        mode="canvas"
        canvasHeader={<span data-testid="canvas-header">Canvas Header</span>}
      >
        <div data-testid="canvas-content">Canvas content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("canvas-header")).toBeInTheDocument();
    expect(screen.getByTestId("canvas-content")).toBeInTheDocument();
    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });

  it("renders canvas mode without header when canvasHeader is not provided", () => {
    render(
      <AppShell mode="canvas">
        <div data-testid="canvas-content">Canvas content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("canvas-content")).toBeInTheDocument();
  });

  it("renders children in default mode", () => {
    render(
      <AppShell>
        <p>Hello world</p>
      </AppShell>,
    );

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
