import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../data-table";

interface TestUser {
  id: string;
  name: string;
  email: string;
  status: string;
}

const columns: ColumnDef<TestUser, unknown>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const data: TestUser[] = [
  { id: "1", name: "Alice", email: "alice@example.com", status: "Active" },
  { id: "2", name: "Bob", email: "bob@example.com", status: "Inactive" },
  { id: "3", name: "Charlie", email: "charlie@example.com", status: "Active" },
];

describe("DataTable", () => {
  it("renders with data and columns", () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("sorts on header click", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    const nameButton = screen.getByRole("button", { name: /name/i });
    await user.click(nameButton);

    // After first click, should be sorted ascending
    const rows = screen.getAllByRole("row");
    // Row 0 is header, rows 1-3 are data
    const firstDataRow = rows[1];
    expect(within(firstDataRow).getByText("Alice")).toBeInTheDocument();

    await user.click(nameButton);

    // After second click, should be sorted descending
    const rowsDesc = screen.getAllByRole("row");
    const firstDataRowDesc = rowsDesc[1];
    expect(within(firstDataRowDesc).getByText("Charlie")).toBeInTheDocument();
  });

  it("filters when search input is used", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Filter names..."
      />,
    );

    const searchInput = screen.getByPlaceholderText("Filter names...");
    await user.type(searchInput, "Alice");

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No users found."
      />,
    );

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    render(
      <DataTable columns={columns} data={[]} loading={true} loadingRows={3} />,
    );

    // Should not show data or empty message
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.queryByText("No results.")).not.toBeInTheDocument();

    // Should have skeleton rows (3 rows x 3 columns = 9 skeletons)
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(9);
  });

  it("row selection works", async () => {
    const user = userEvent.setup();
    const onRowSelect = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={data}
        onRowSelect={onRowSelect}
      />,
    );

    // Should have checkboxes (header + 3 rows = 4)
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(4);

    // Click first data row checkbox
    await user.click(checkboxes[1]);

    // onRowSelect should have been called with the selected row
    expect(onRowSelect).toHaveBeenCalled();
    const lastCall = onRowSelect.mock.calls[onRowSelect.mock.calls.length - 1];
    expect(lastCall[0]).toHaveLength(1);
    expect(lastCall[0][0].name).toBe("Alice");
  });

  it("shows selection count text", async () => {
    const user = userEvent.setup();
    const onRowSelect = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={data}
        onRowSelect={onRowSelect}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    expect(screen.getByText("1 of 3 row(s) selected")).toBeInTheDocument();
  });

  it("paginates data", async () => {
    const user = userEvent.setup();
    const largeData: TestUser[] = Array.from({ length: 15 }, (_, i) => ({
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 2 === 0 ? "Active" : "Inactive",
    }));

    render(
      <DataTable columns={columns} data={largeData} pageSize={5} />,
    );

    // Should show first 5 rows
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 5")).toBeInTheDocument();
    expect(screen.queryByText("User 6")).not.toBeInTheDocument();

    // Page indicator
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();

    // Click next
    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    expect(screen.getByText("User 6")).toBeInTheDocument();
    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();

    // Click previous
    const prevButton = screen.getByRole("button", { name: /previous/i });
    await user.click(prevButton);

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });
});
