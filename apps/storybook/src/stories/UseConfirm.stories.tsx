import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { useConfirm, Button } from "@qamelo-io/ui";

function DefaultConfirmDemo() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [result, setResult] = useState<string>("—");

  const handleClick = async () => {
    const ok = await confirm({
      title: "Confirm Action",
      description: "Are you sure you want to proceed?",
    });
    setResult(ok ? "Confirmed" : "Cancelled");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Button onClick={handleClick}>Open Confirm</Button>
      <p data-testid="result">Result: {result}</p>
      <ConfirmDialog />
    </div>
  );
}

function DestructiveConfirmDemo() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [result, setResult] = useState<string>("—");

  const handleClick = async () => {
    const ok = await confirm({
      title: "Delete Project",
      description:
        "This will permanently delete the project and all associated data. This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Keep",
      variant: "destructive",
    });
    setResult(ok ? "Deleted" : "Kept");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Button variant="destructive" onClick={handleClick}>
        Delete Project
      </Button>
      <p data-testid="result">Result: {result}</p>
      <ConfirmDialog />
    </div>
  );
}

const meta = {
  title: "Hooks/UseConfirm",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DefaultConfirmDemo />,
};

export const Destructive: Story = {
  render: () => <DestructiveConfirmDemo />,
};

export const ConfirmInteraction: Story = {
  render: () => <DefaultConfirmDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the dialog
    await userEvent.click(canvas.getByRole("button", { name: "Open Confirm" }));

    // The dialog renders in a portal, so query from document.body
    const body = within(document.body);
    await expect(body.getByText("Confirm Action")).toBeVisible();

    // Click confirm
    await userEvent.click(body.getByRole("button", { name: "Confirm" }));

    // Check result
    await expect(canvas.getByTestId("result")).toHaveTextContent("Confirmed");
  },
};

export const CancelInteraction: Story = {
  render: () => <DefaultConfirmDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the dialog
    await userEvent.click(canvas.getByRole("button", { name: "Open Confirm" }));

    // The dialog renders in a portal, so query from document.body
    const body = within(document.body);
    await expect(body.getByText("Confirm Action")).toBeVisible();

    // Click cancel
    await userEvent.click(body.getByRole("button", { name: "Cancel" }));

    // Check result
    await expect(canvas.getByTestId("result")).toHaveTextContent("Cancelled");
  },
};
