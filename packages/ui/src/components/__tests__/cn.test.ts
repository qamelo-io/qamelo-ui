import { describe, it, expect } from "vitest";
import { cn } from "../../tokens/cn";

describe("cn", () => {
  it("merges classes correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe(
      "base active",
    );
  });

  it("handles undefined/null/false values", () => {
    expect(cn("base", undefined, null, false, "extra")).toBe("base extra");
  });
});
