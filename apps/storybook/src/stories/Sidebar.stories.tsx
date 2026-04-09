import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  NavGroup,
  NavItem,
  NavCollapsible,
} from "@qamelo-io/ui";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Inbox,
  Package,
  Shield,
} from "lucide-react";

function SidebarDemo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="h-[600px] border rounded-md overflow-hidden">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              Q
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold">Qamelo</span>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavGroup label="Main">
            <NavItem icon={Home} label="Dashboard" to="/" active />
            <NavItem icon={Inbox} label="Inbox" to="/inbox" />
            <NavItem icon={BarChart3} label="Analytics" to="/analytics" />
          </NavGroup>
          <NavGroup label="Management">
            <NavItem icon={Users} label="Users" to="/users" />
            <NavItem icon={Package} label="Products" to="/products" />
            <NavCollapsible icon={FileText} label="Documents" defaultOpen>
              <NavItem label="All Documents" to="/documents" />
              <NavItem label="Drafts" to="/documents/drafts" />
              <NavItem label="Published" to="/documents/published" />
            </NavCollapsible>
          </NavGroup>
          <NavGroup label="System">
            <NavItem icon={Shield} label="Security" to="/security" />
          </NavGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavItem icon={Settings} label="Settings" to="/settings" />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

const meta = {
  title: "Layouts/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  render: () => <SidebarDemo />,
};

export const WithNavGroups: Story = {
  render: () => <SidebarDemo />,
};

export const WithNavCollapsible: Story = {
  render: () => <SidebarDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Find the collapsible trigger for "Documents"
    const trigger = canvas.getByRole("button", { name: /Documents/i });
    await expect(trigger).toBeInTheDocument();

    // Click to collapse it (it starts open with defaultOpen)
    await userEvent.click(trigger);
    // Click to re-expand
    await userEvent.click(trigger);
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <SidebarDemo />,
};
