import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TEST_IDS } from "../../../constants";
import { Input } from ".";

const renderComponent = (onChange: () => void) =>
  render(<Input value="" placeholder="" onChange={onChange} required />);

describe("<Input />", () => {
  test("should render the component", () => {
    renderComponent(vi.fn());

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    expect(elem).toBeInTheDocument();
  });

  test("should call callback", async () => {
    const value = "name";
    const onChange = vi.fn();
    const user = userEvent.setup();

    renderComponent(onChange);

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    await user.type(elem, value);

    expect(onChange).toHaveBeenCalledTimes(value.length);
  });
});
