import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Authorize } from "../authorize";

describe("Authorize", () => {
  it("renders children when allowed is true", () => {
    render(
      <Authorize allowed={true}>
        <p>Secret content</p>
      </Authorize>,
    );
    expect(screen.getByText("Secret content")).toBeInTheDocument();
  });

  it("renders NoAccessPage fallback when allowed is false", () => {
    render(
      <Authorize allowed={false}>
        <p>Secret content</p>
      </Authorize>,
    );
    expect(screen.queryByText("Secret content")).not.toBeInTheDocument();
    expect(screen.getByText("No Access")).toBeInTheDocument();
  });

  it("renders custom fallback when allowed is false and fallback is provided", () => {
    render(
      <Authorize allowed={false} fallback={<p>Custom denied message</p>}>
        <p>Secret content</p>
      </Authorize>,
    );
    expect(screen.queryByText("Secret content")).not.toBeInTheDocument();
    expect(screen.getByText("Custom denied message")).toBeInTheDocument();
  });
});
