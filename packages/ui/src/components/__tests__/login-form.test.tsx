import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "../login-form";

describe("LoginForm", () => {
  it("renders email and password inputs", () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("submits with email and password values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "secret123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(onSubmit).toHaveBeenCalledWith("test@example.com", "secret123");
  });

  it("displays error message", () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials" />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("disables inputs when loading", () => {
    render(<LoginForm onSubmit={vi.fn()} loading />);
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Password")).toBeDisabled();
    expect(screen.getByRole("button", { name: /Sign in/ })).toBeDisabled();
  });

  it("renders custom labels", () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        emailLabel="E-mail"
        passwordLabel="Heslo"
        submitLabel="Prihlasiť"
      />,
    );
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Heslo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Prihlasiť" })).toBeInTheDocument();
  });

  it("renders children slot", () => {
    render(
      <LoginForm onSubmit={vi.fn()}>
        <button type="button">Sign in with Google</button>
      </LoginForm>,
    );
    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
  });
});
