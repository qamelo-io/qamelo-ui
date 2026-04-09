import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { SettingsLayout } from "@qamelo-io/ui";
import type { SettingsSection } from "@qamelo-io/ui";
import { User, Shield, Bell, Palette, Key } from "lucide-react";

const sections: SettingsSection[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "account", label: "Account", icon: Key },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
];

const SectionContent = ({ section }: { section: string }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold capitalize">{section}</h2>
    <div className="rounded-lg border p-6">
      <p className="text-sm text-muted-foreground">
        Content for the <strong>{section}</strong> section goes here.
      </p>
    </div>
    <div className="rounded-lg border p-6">
      <p className="text-sm text-muted-foreground">
        Another card for <strong>{section}</strong> settings.
      </p>
    </div>
  </div>
);

const meta = {
  title: "Layouts/SettingsLayout",
  component: SettingsLayout,
  decorators: [
    (Story) => (
      <div className="min-h-[500px] w-full rounded-lg border bg-background p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("profile");
    return (
      <SettingsLayout
        sections={sections}
        activeSection={active}
        onSectionChange={setActive}
        description="Manage your account settings and preferences."
      >
        <SectionContent section={active} />
      </SettingsLayout>
    );
  },
};

export const WithActiveSection: Story = {
  render: () => {
    const [active, setActive] = useState("notifications");
    return (
      <SettingsLayout
        sections={sections}
        activeSection={active}
        onSectionChange={setActive}
        title="Preferences"
        description="Customize how the application works for you."
      >
        <SectionContent section={active} />
      </SettingsLayout>
    );
  },
};

export const InteractionTest: Story = {
  render: () => {
    const [active, setActive] = useState("profile");
    return (
      <SettingsLayout
        sections={sections}
        activeSection={active}
        onSectionChange={setActive}
      >
        <div data-testid="active-section">{active}</div>
        <SectionContent section={active} />
      </SettingsLayout>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial state
    await expect(canvas.getByTestId("active-section")).toHaveTextContent(
      "profile",
    );

    // Click "Security" section
    const securityButtons = canvas.getAllByRole("button", { name: /Security/ });
    await userEvent.click(securityButtons[0]);

    // Verify active section changed
    await expect(canvas.getByTestId("active-section")).toHaveTextContent(
      "security",
    );
  },
};
