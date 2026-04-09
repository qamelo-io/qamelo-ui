import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it.each(["secondary", "destructive", "outline"] as const)(
    "renders with variant=%s",
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
    },
  );

  it("renders children text", () => {
    render(<Badge>Status: Active</Badge>);
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });
});
