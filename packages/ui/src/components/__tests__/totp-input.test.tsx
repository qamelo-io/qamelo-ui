import { render, screen } from "@testing-library/react";
import { beforeAll, describe, it, expect, vi } from "vitest";
import { TotpInput } from "../totp-input";

beforeAll(() => {
  // input-otp uses ResizeObserver which is not available in jsdom
  (globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("TotpInput", () => {
  it("renders the label", () => {
    render(<TotpInput onComplete={vi.fn()} />);
    expect(screen.getByText("Verification code")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<TotpInput onComplete={vi.fn()} label="Enter OTP" />);
    expect(screen.getByText("Enter OTP")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<TotpInput onComplete={vi.fn()} error="Invalid code" />);
    expect(screen.getByText("Invalid code")).toBeInTheDocument();
  });

  it("renders the OTP input slots", () => {
    const { container } = render(<TotpInput onComplete={vi.fn()} />);
    // InputOTP renders an input element
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });
});
