import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchContainer } from ".";
import { AppProvider } from "../../../providers/AppProvider";
import { TEST_IDS } from "../../../constants";

const renderComponent = () =>
  render(
    <AppProvider>
      <SearchContainer />
    </AppProvider>,
  );

describe("<SearchContainer />", () => {
  test("should validate input field", async () => {
    const user = userEvent.setup();
    renderComponent();

    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);
    await user.click(submitBtnElem);

    const inputElem = await screen.findByTestId(TEST_IDS.INPUT);
    expect(inputElem).toBeInvalid();

    await user.type(inputElem, "testUser");
    await user.click(submitBtnElem);
    expect(inputElem).toBeValid();
  });
});
