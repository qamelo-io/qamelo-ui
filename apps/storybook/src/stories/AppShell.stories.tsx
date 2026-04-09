import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  AppShell,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  TopBar,
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
  Bell,
} from "lucide-react";

function DemoSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
            Q
          </div>
          <span className="text-lg font-semibold">Qamelo</span>
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
          <NavCollapsible icon={FileText} label="Documents">
            <NavItem label="All Documents" to="/documents" />
            <NavItem label="Drafts" to="/documents/drafts" />
            <NavItem label="Published" to="/documents/published" />
          </NavCollapsible>
        </NavGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavItem icon={Settings} label="Settings" to="/settings" />
      </SidebarFooter>
    </Sidebar>
  );
}

function DemoTopBar() {
  return (
    <TopBar
      breadcrumbs={
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground font-medium">Dashboard</span>
        </nav>
      }
      actions={
        <button
          type="button"
          className="relative rounded-md p-2 hover:bg-accent"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      }
    />
  );
}

const meta = {
  title: "Layouts/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell sidebar={<DemoSidebar />} topBar={<DemoTopBar />}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          This is the default AppShell layout with sidebar and topbar.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border bg-card p-6 text-card-foreground"
            >
              <h3 className="font-semibold">Card {i + 1}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sample content
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  ),
};

export const CanvasMode: Story = {
  render: () => (
    <AppShell
      mode="canvas"
      canvasHeader={
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-semibold">Canvas Editor</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-1 text-sm hover:bg-accent"
            >
              Save
            </button>
            <button
              type="button"
              className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Publish
            </button>
          </div>
        </div>
      }
    >
      <div className="flex h-full items-center justify-center bg-muted">
        <p className="text-muted-foreground">Full viewport canvas area</p>
      </div>
    </AppShell>
  ),
};

export const SidebarToggle: Story = {
  render: () => (
    <AppShell sidebar={<DemoSidebar />} topBar={<DemoTopBar />}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Sidebar Toggle Test</h1>
        <p className="mt-2 text-muted-foreground">
          Click the sidebar trigger button in the top bar to toggle the sidebar.
        </p>
      </div>
    </AppShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Toggle sidebar" });

    // Click to collapse
    await userEvent.click(trigger);

    // Click to expand
    await userEvent.click(trigger);

    await expect(trigger).toBeInTheDocument();
  },
};
