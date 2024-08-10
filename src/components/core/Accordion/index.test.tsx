import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TEST_IDS } from "../../../constants";
import { Accordion } from ".";

const contentText = "Accordion content";

const renderComponent = () =>
  render(
    <Accordion title="Title">
      <div>{contentText}</div>
    </Accordion>,
  );

describe("<Input />", () => {
  test("should render the component", () => {
    renderComponent();
    const elem = screen.getByTestId(TEST_IDS.ACCORDION);

    expect(elem).toBeInTheDocument();
  });

  test("should not show the content", async () => {
    renderComponent();

    expect(screen.queryByText(contentText)).not.toBeInTheDocument();
  });

  test("should show the content on click", async () => {
    const user = userEvent.setup();

    renderComponent();
    const elem = screen.getByTestId(TEST_IDS.ACCORDION);

    await user.click(elem);
    expect(screen.queryByText(contentText)).toBeInTheDocument();
  });
});
