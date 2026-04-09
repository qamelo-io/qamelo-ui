import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { NotFoundPage, ForbiddenPage, ServerErrorPage } from "../error-pages";

describe("NotFoundPage", () => {
  it("renders the 404 code and default text", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you are looking for does not exist or has been moved.",
      ),
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <NotFoundPage title="Custom Title" description="Custom description" />,
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders the action button when onAction is provided", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<NotFoundPage onAction={onAction} />);

    const button = screen.getByRole("button", { name: "Go Home" });
    await user.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("does not render the action button when onAction is not provided", () => {
    render(<NotFoundPage />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("ForbiddenPage", () => {
  it("renders the 403 code and default text", () => {
    render(<ForbiddenPage />);
    expect(screen.getByText("403")).toBeInTheDocument();
    expect(screen.getByText("Access Forbidden")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You do not have permission to access this resource.",
      ),
    ).toBeInTheDocument();
  });

  it("calls onAction when action button is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ForbiddenPage onAction={onAction} />);

    const button = screen.getByRole("button", { name: "Go Back" });
    await user.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe("ServerErrorPage", () => {
  it("renders the 500 code and default text", () => {
    render(<ServerErrorPage />);
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Server Error")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Something went wrong on our end. Please try again later.",
      ),
    ).toBeInTheDocument();
  });

  it("supports custom action label", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ServerErrorPage onAction={onAction} actionLabel="Retry" />);

    const button = screen.getByRole("button", { name: "Retry" });
    await user.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
