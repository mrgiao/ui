import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Badge, Button } from "./index";

describe("mrgiao/ui", () => {
  it("exports accessible primitives with shared semantic styling", async () => {
    const user = userEvent.setup();
    const onPress = () => undefined;

    render(
      <div>
        <Button onPress={onPress}>Continue</Button>
        <Badge>Ready</Badge>
      </div>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
    expect(screen.getByText("Ready")).toBeInTheDocument();
  });
});
