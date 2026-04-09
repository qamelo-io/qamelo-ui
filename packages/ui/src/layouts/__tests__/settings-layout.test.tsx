import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, it, expect, vi } from "vitest";
import { User, Shield, Bell } from "lucide-react";
import { SettingsLayout } from "../settings-layout";

beforeAll(() => {
  // ScrollArea uses ResizeObserver which is not available in jsdom
  (globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const sections = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
];

describe("SettingsLayout", () => {
  it("renders title and sections", () => {
    render(
      <SettingsLayout
        sections={sections}
        activeSection="profile"
        onSectionChange={() => {}}
        title="Settings"
        description="Manage your account"
      >
        <div>Profile content</div>
      </SettingsLayout>,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Manage your account")).toBeInTheDocument();
    // Each section appears at least once (desktop nav)
    expect(screen.getAllByText("Profile").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Security").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Notifications").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Profile content")).toBeInTheDocument();
  });

  it("highlights active section", () => {
    render(
      <SettingsLayout
        sections={sections}
        activeSection="security"
        onSectionChange={() => {}}
      >
        <div>Content</div>
      </SettingsLayout>,
    );

    // Find buttons with "Security" text — at least one should have active class
    const securityButtons = screen.getAllByRole("button", { name: /Security/ });
    const hasActive = securityButtons.some((btn) =>
      btn.className.includes("bg-accent"),
    );
    expect(hasActive).toBe(true);
  });

  it("calls onSectionChange when section clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SettingsLayout
        sections={sections}
        activeSection="profile"
        onSectionChange={handleChange}
      >
        <div>Content</div>
      </SettingsLayout>,
    );

    // Click a non-active section
    const securityButtons = screen.getAllByRole("button", { name: /Security/ });
    await user.click(securityButtons[0]);

    expect(handleChange).toHaveBeenCalledWith("security");
  });

  it("uses default title when none provided", () => {
    render(
      <SettingsLayout
        sections={sections}
        activeSection="profile"
        onSectionChange={() => {}}
      >
        <div>Content</div>
      </SettingsLayout>,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
