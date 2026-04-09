import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, it, expect, vi } from "vitest";
import { Home, Settings } from "lucide-react";
import { CommandPalette } from "../command-palette";

beforeAll(() => {
  // cmdk uses ResizeObserver which is not available in jsdom
  (globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  // cmdk calls scrollIntoView which jsdom doesn't implement
  Element.prototype.scrollIntoView = vi.fn();
});

const sampleItems = [
  {
    id: "home",
    label: "Go to Home",
    icon: Home,
    group: "Navigation",
    onSelect: vi.fn(),
  },
  {
    id: "settings",
    label: "Go to Settings",
    icon: Settings,
    group: "Navigation",
    onSelect: vi.fn(),
  },
  {
    id: "logout",
    label: "Log Out",
    group: "Actions",
    onSelect: vi.fn(),
  },
];

describe("CommandPalette", () => {
  it("renders when open", () => {
    render(
      <CommandPalette items={sampleItems} open={true} onOpenChange={() => {}} />,
    );

    expect(screen.getByText("Go to Home")).toBeInTheDocument();
    expect(screen.getByText("Go to Settings")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("shows items grouped by group heading", () => {
    render(
      <CommandPalette items={sampleItems} open={true} onOpenChange={() => {}} />,
    );

    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("calls onSelect when item selected", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const items = [
      {
        id: "test",
        label: "Test Action",
        group: "Actions",
        onSelect,
      },
    ];

    render(
      <CommandPalette items={items} open={true} onOpenChange={() => {}} />,
    );

    await user.click(screen.getByText("Test Action"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("does not render when closed", () => {
    render(
      <CommandPalette
        items={sampleItems}
        open={false}
        onOpenChange={() => {}}
      />,
    );

    expect(screen.queryByText("Go to Home")).not.toBeInTheDocument();
  });
});
