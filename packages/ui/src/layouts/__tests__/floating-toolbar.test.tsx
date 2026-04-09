import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FloatingToolbar } from "../floating-toolbar";

describe("FloatingToolbar", () => {
  it("renders children", () => {
    render(
      <FloatingToolbar position="top-left">
        <button>Zoom</button>
      </FloatingToolbar>,
    );
    expect(screen.getByRole("button", { name: "Zoom" })).toBeInTheDocument();
  });

  it("applies top-left position classes", () => {
    const { container } = render(
      <FloatingToolbar position="top-left">
        <span>Content</span>
      </FloatingToolbar>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("top-4");
    expect(el.className).toContain("left-4");
  });

  it("applies top-center position classes", () => {
    const { container } = render(
      <FloatingToolbar position="top-center">
        <span>Content</span>
      </FloatingToolbar>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("top-4");
    expect(el.className).toContain("left-1/2");
    expect(el.className).toContain("-translate-x-1/2");
  });

  it("applies bottom-right position classes", () => {
    const { container } = render(
      <FloatingToolbar position="bottom-right">
        <span>Content</span>
      </FloatingToolbar>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bottom-4");
    expect(el.className).toContain("right-4");
  });

  it("applies custom className", () => {
    const { container } = render(
      <FloatingToolbar position="top-left" className="custom-class">
        <span>Content</span>
      </FloatingToolbar>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("custom-class");
  });
});
