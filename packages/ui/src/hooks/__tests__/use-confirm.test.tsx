import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import * as React from "react";
import { useConfirm } from "../use-confirm";

function TestComponent() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [result, setResult] = React.useState<string>("pending");

  const handleClick = async () => {
    const confirmed = await confirm({
      title: "Delete item?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Keep",
      variant: "destructive",
    });
    setResult(confirmed ? "confirmed" : "cancelled");
  };

  return (
    <div>
      <button onClick={handleClick}>Open</button>
      <p data-testid="result">{result}</p>
      <ConfirmDialog />
    </div>
  );
}

describe("useConfirm", () => {
  it("resolves true when the confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: "Open" }));

    // Dialog should be visible
    expect(screen.getByText("Delete item?")).toBeInTheDocument();
    expect(
      screen.getByText("This action cannot be undone."),
    ).toBeInTheDocument();

    // Click confirm
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByTestId("result")).toHaveTextContent("confirmed");
  });

  it("resolves false when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.click(screen.getByRole("button", { name: "Open" }));

    // Click cancel
    await user.click(screen.getByRole("button", { name: "Keep" }));

    expect(screen.getByTestId("result")).toHaveTextContent("cancelled");
  });
});
