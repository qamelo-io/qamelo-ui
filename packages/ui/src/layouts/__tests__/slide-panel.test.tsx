import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SlidePanel } from "../slide-panel";

describe("SlidePanel", () => {
  it("renders children when open", () => {
    render(
      <SlidePanel open onClose={() => {}}>
        <p>Panel content</p>
      </SlidePanel>,
    );
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <SlidePanel open onClose={() => {}} title="Details" description="More info here">
        <p>Content</p>
      </SlidePanel>,
    );
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("More info here")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <SlidePanel open onClose={onClose} title="Panel">
        <p>Content</p>
      </SlidePanel>,
    );

    await user.click(screen.getByRole("button", { name: "Close panel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies translate-x-full when closed (right side)", () => {
    const { container } = render(
      <SlidePanel open={false} onClose={() => {}} side="right">
        <p>Content</p>
      </SlidePanel>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("translate-x-full");
  });

  it("applies -translate-x-full when closed (left side)", () => {
    const { container } = render(
      <SlidePanel open={false} onClose={() => {}} side="left">
        <p>Content</p>
      </SlidePanel>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("-translate-x-full");
  });

  it("applies translate-x-0 when open", () => {
    const { container } = render(
      <SlidePanel open onClose={() => {}}>
        <p>Content</p>
      </SlidePanel>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("translate-x-0");
  });
});
