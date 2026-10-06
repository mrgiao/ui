import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./index";

it("traps dialog focus and restores the trigger after Escape", async () => {
  const user = userEvent.setup();
  render(
    <DialogTrigger>
      <Button>Open settings</Button>
      <Dialog>
        <DialogTitle>Settings</DialogTitle>
        <Button>First action</Button>
        <Button>Last action</Button>
      </Dialog>
    </DialogTrigger>,
  );
  const trigger = screen.getByRole("button", { name: "Open settings" });
  await user.click(trigger);
  const dialog = await screen.findByRole("dialog", { name: "Settings" });
  await waitFor(() =>
    expect(dialog.contains(document.activeElement)).toBe(true),
  );
  for (let step = 0; step < 6; step++) {
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  }
  await user.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  await waitFor(() => expect(trigger).toHaveFocus());
});

it("opens a menu by keyboard, selects an item, and restores trigger focus", async () => {
  const user = userEvent.setup();
  let selected = "";
  render(
    <DropdownMenuTrigger>
      <Button>Actions</Button>
      <DropdownMenu
        aria-label="Document actions"
        onAction={(key) => {
          selected = String(key);
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem id="rename">Rename</DropdownMenuItem>
          <DropdownMenuItem id="move">Move</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>,
  );
  const trigger = screen.getByRole("button", { name: "Actions" });
  await user.tab();
  await user.keyboard("{ArrowDown}");
  expect(
    await screen.findByRole("menu", { name: "Actions" }),
  ).toBeInTheDocument();
  await user.keyboard("{ArrowDown}{Enter}");
  await waitFor(() => expect(selected).toBe("move"));
  await waitFor(() => expect(trigger).toHaveFocus());
});
