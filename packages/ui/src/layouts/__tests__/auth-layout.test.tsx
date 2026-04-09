import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthLayout } from "../auth-layout";

describe("AuthLayout", () => {
  it("renders children", () => {
    render(
      <AuthLayout>
        <p>Form content</p>
      </AuthLayout>,
    );
    expect(screen.getByText("Form content")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <AuthLayout title="Sign in" description="Enter your credentials">
        <p>Form</p>
      </AuthLayout>,
    );
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Enter your credentials")).toBeInTheDocument();
  });

  it("renders logo when provided", () => {
    render(
      <AuthLayout logo={<img alt="Logo" src="/logo.png" />}>
        <p>Form</p>
      </AuthLayout>,
    );
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <AuthLayout footer={<a href="/terms">Terms of Service</a>}>
        <p>Form</p>
      </AuthLayout>,
    );
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  it("does not render footer when not provided", () => {
    const { container } = render(
      <AuthLayout>
        <p>Form</p>
      </AuthLayout>,
    );
    expect(container.querySelector("a")).toBeNull();
  });
});
