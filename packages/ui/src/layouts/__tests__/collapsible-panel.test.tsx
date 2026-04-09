import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CollapsiblePanel } from "../collapsible-panel";

describe("CollapsiblePanel", () => {
  it("renders title", () => {
    render(
      <CollapsiblePanel open onToggle={() => {}} title="Console">
        <p>Log output</p>
      </CollapsiblePanel>,
    );
    expect(screen.getByText("Console")).toBeInTheDocument();
  });

  it("renders children when open", () => {
    render(
      <CollapsiblePanel open onToggle={() => {}} title="Console">
        <p>Log output</p>
      </CollapsiblePanel>,
    );
    expect(screen.getByText("Log output")).toBeInTheDocument();
  });

  it("calls onToggle when toggle button is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <CollapsiblePanel open onToggle={onToggle} title="Console">
        <p>Log output</p>
      </CollapsiblePanel>,
    );

    await user.click(screen.getByRole("button", { name: "Collapse panel" }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows expand label when collapsed", () => {
    render(
      <CollapsiblePanel open={false} onToggle={() => {}} title="Console">
        <p>Log output</p>
      </CollapsiblePanel>,
    );
    expect(
      screen.getByRole("button", { name: "Expand panel" }),
    ).toBeInTheDocument();
  });

  it("shows collapse label when expanded", () => {
    render(
      <CollapsiblePanel open onToggle={() => {}} title="Console">
        <p>Log output</p>
      </CollapsiblePanel>,
    );
    expect(
      screen.getByRole("button", { name: "Collapse panel" }),
    ).toBeInTheDocument();
  });

  it("sets max-height to 0 when collapsed", () => {
    const { container } = render(
      <CollapsiblePanel open={false} onToggle={() => {}} title="Console">
        <p>Log output</p>
      </CollapsiblePanel>,
    );
    // The content wrapper div (second child of the root)
    const root = container.firstChild as HTMLElement;
    const contentWrapper = root.children[1] as HTMLElement;
    expect(contentWrapper.style.maxHeight).toBe("0px");
  });

  it("sets max-height to specified height when expanded", () => {
    const { container } = render(
      <CollapsiblePanel open onToggle={() => {}} title="Console" height="400px">
        <p>Log output</p>
      </CollapsiblePanel>,
    );
    const root = container.firstChild as HTMLElement;
    const contentWrapper = root.children[1] as HTMLElement;
    expect(contentWrapper.style.maxHeight).toBe("400px");
  });
});
