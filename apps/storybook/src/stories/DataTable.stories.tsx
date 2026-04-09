import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { DataTable } from "@qamelo-io/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { Inbox } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  role: "Admin" | "Editor" | "Viewer";
  createdAt: string;
}

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={
            status === "Active"
              ? "text-green-600"
              : status === "Inactive"
                ? "text-red-600"
                : "text-yellow-600"
          }
        >
          {status}
        </span>
      );
    },
  },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "createdAt", header: "Created At" },
];

function makeUsers(count: number): User[] {
  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Eve Wilson",
    "Frank Castle",
    "Grace Hopper",
    "Henry Ford",
    "Iris West",
    "Jack Ryan",
    "Karen Page",
    "Leo Messi",
    "Maya Lopez",
    "Nick Fury",
    "Olivia Pope",
    "Peter Parker",
    "Quinn Hughes",
    "Rachel Green",
    "Steve Rogers",
    "Tony Stark",
    "Uma Thurman",
    "Vera Wang",
    "Wade Wilson",
    "Xena Warrior",
    "Yara Shahidi",
  ];
  const statuses: User["status"][] = ["Active", "Inactive", "Pending"];
  const roles: User["role"][] = ["Admin", "Editor", "Viewer"];

  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@example.com`,
    status: statuses[i % statuses.length],
    role: roles[i % roles.length],
    createdAt: new Date(2024, 0, i + 1).toLocaleDateString(),
  }));
}

const smallData = makeUsers(5);
const largeData = makeUsers(25);

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: smallData,
  },
};

export const WithSearch: Story = {
  args: {
    columns,
    data: smallData,
    searchKey: "name",
    searchPlaceholder: "Filter by name...",
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: largeData,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
  },
};

export const WithRowSelection: Story = {
  args: {
    columns,
    data: smallData,
    onRowSelect: fn(),
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    loadingRows: 5,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No users found.",
    emptyIcon: <Inbox className="h-10 w-10" />,
  },
};

export const Combined: Story = {
  args: {
    columns,
    data: largeData,
    searchKey: "name",
    searchPlaceholder: "Search users...",
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    onRowSelect: fn(),
  },
};

// Interaction tests

export const SortInteraction: Story = {
  args: {
    columns,
    data: smallData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameButton = canvas.getByRole("button", { name: /name/i });

    // Click to sort ascending
    await userEvent.click(nameButton);

    // Verify first row is Alice (alphabetically first)
    const rows = canvas.getAllByRole("row");
    const firstDataRow = rows[1];
    await expect(within(firstDataRow).getByText("Alice Johnson")).toBeTruthy();
  },
};

export const SearchInteraction: Story = {
  args: {
    columns,
    data: smallData,
    searchKey: "name",
    searchPlaceholder: "Filter by name...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Filter by name...");

    await userEvent.type(searchInput, "Alice");

    // Alice should be visible
    await expect(canvas.getByText("Alice Johnson")).toBeTruthy();

    // Bob should not be visible
    await expect(canvas.queryByText("Bob Smith")).toBeNull();
  },
};

export const PaginationInteraction: Story = {
  args: {
    columns,
    data: largeData,
    pageSize: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show page 1
    await expect(canvas.getByText("Page 1 of 5")).toBeTruthy();

    // Click next
    const nextButton = canvas.getByRole("button", { name: /next/i });
    await userEvent.click(nextButton);

    // Should now show page 2
    await expect(canvas.getByText("Page 2 of 5")).toBeTruthy();

    // Click previous
    const prevButton = canvas.getByRole("button", { name: /previous/i });
    await userEvent.click(prevButton);

    // Should be back on page 1
    await expect(canvas.getByText("Page 1 of 5")).toBeTruthy();
  },
};

export const SelectionInteraction: Story = {
  args: {
    columns,
    data: smallData,
    onRowSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get checkboxes (header + 5 data rows)
    const checkboxes = canvas.getAllByRole("checkbox");
    await expect(checkboxes.length).toBe(6);

    // Click first data row checkbox
    await userEvent.click(checkboxes[1]);

    // Should show selection count
    await expect(canvas.getByText("1 of 5 row(s) selected")).toBeTruthy();
  },
};
