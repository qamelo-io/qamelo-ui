import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "../use-theme";

// Provide a default matchMedia mock for jsdom
const matchMediaListeners = new Map<string, ((e: MediaQueryListEvent) => void)[]>();

function createMatchMediaMock(matches = false) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn((event: string, fn: (e: MediaQueryListEvent) => void) => {
      const key = `${query}:${event}`;
      if (!matchMediaListeners.has(key)) matchMediaListeners.set(key, []);
      matchMediaListeners.get(key)!.push(fn);
    }),
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

function ThemeConsumer() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("system")}>Set System</button>
    </div>
  );
}

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("throws when used outside ThemeProvider", () => {
    // Suppress console.error for expected error
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
    spy.mockRestore();
  });

  it("defaults to system theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
  });

  it("respects defaultTheme prop", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });

  it("switches to dark and persists to localStorage", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme").textContent).toBe("light");

    await user.click(screen.getByRole("button", { name: "Set Dark" }));

    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(localStorage.getItem("test-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("restores theme from localStorage", () => {
    localStorage.setItem("test-theme", "dark");

    render(
      <ThemeProvider storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("applies dark class to documentElement", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(screen.getByRole("button", { name: "Set Dark" }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Set Light" }));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("listens for system theme change when theme is system", async () => {
    // Replace matchMedia with a version that captures listeners
    let capturedListener: ((e: MediaQueryListEvent) => void) | null = null;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
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
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("resolved").textContent).toBe("light");

    // Simulate system switching to dark
    act(() => {
      capturedListener?.({ matches: true } as MediaQueryListEvent);
    });

    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Restore default mock
    window.matchMedia = createMatchMediaMock(false);
  });
});
