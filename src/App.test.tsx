import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getRepos } from "./__mocks__/getRepositories/handlers";
import mockRepositories from "./__mocks__/getRepositories/mockRepositories.json";
import { getUsers } from "./__mocks__/getUsers/handlers";
import mockUsersList from "./__mocks__/getUsers/mockUsersList.json";
import { server } from "./__mocks__/worker";
import { App } from "./App";
import { TEST_IDS } from "./constants";
import { AppProvider } from "./providers/AppProvider";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

const renderComponent = () =>
  render(
    <ReactQueryProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ReactQueryProvider>,
  );

describe("<App />", () => {
  test("should render the app with search container and no userlist", () => {
    renderComponent();

    const inputElem = screen.getByTestId(TEST_IDS.INPUT);
    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);
    const accordionElem = screen.queryByTestId(TEST_IDS.ACCORDION);

    expect(inputElem).toBeInTheDocument();
    expect(submitBtnElem).toBeInTheDocument();
    expect(accordionElem).not.toBeInTheDocument();
  });

  test("should render error message when api is failing", async () => {
    server.use(getUsers.errorHandler);

    const user = userEvent.setup();
    renderComponent();

    const inputElem = screen.getByTestId(TEST_IDS.INPUT);
    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);

    await user.type(inputElem, "testUser 1");
    await user.click(submitBtnElem);

    const errorElem = await screen.findByText("Error fetching the user data");

    expect(errorElem).toBeInTheDocument();
  });

  test("should render userlist when we submit the query & api is successful", async () => {
    server.use(getUsers.successHandler);

    const user = userEvent.setup();
    renderComponent();

    const inputElem = screen.getByTestId(TEST_IDS.INPUT);
    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);

    await user.type(inputElem, "testUser 1");
    await user.click(submitBtnElem);

    const accordionElements = await screen.findAllByTestId(TEST_IDS.ACCORDION);

    expect(accordionElements.length).toEqual(mockUsersList.items.length);
  });

  test("should show error message when repositories api fails", async () => {
    server.use(getUsers.successHandler);
    server.use(getRepos.errorHandler);

    const user = userEvent.setup();
    renderComponent();

    const inputElem = screen.getByTestId(TEST_IDS.INPUT);
    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);

    await user.type(inputElem, "testUser 3");
    await user.click(submitBtnElem);

    const accordionElements = await screen.findAllByTestId(TEST_IDS.ACCORDION);
    await user.click(accordionElements[0]);

    const errorTextElement = await screen.findByText(
      "Error fetching the user repositories",
    );

    expect(errorTextElement).toBeInTheDocument();
  });

  test("should show empty data message when repositories api data is empty", async () => {
    server.use(getUsers.successHandler);
    server.use(getRepos.emptyDataHandler);

    const user = userEvent.setup();
    renderComponent();

    const inputElem = screen.getByTestId(TEST_IDS.INPUT);
    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);

    await user.type(inputElem, "testUser 4");
    await user.click(submitBtnElem);

    const accordionElements = await screen.findAllByTestId(TEST_IDS.ACCORDION);
    await user.click(accordionElements[1]);

    const emptyTextElement = await screen.findByText(
      `No repositories available for "${mockUsersList.items[1].login}"`,
    );

    expect(emptyTextElement).toBeInTheDocument();
  });

  test("should show repositories when get repos api call is successful", async () => {
    server.use(getUsers.successHandler);
    server.use(getRepos.successHandler);

    const user = userEvent.setup();
    renderComponent();

    const inputElem = screen.getByTestId(TEST_IDS.INPUT);
    const submitBtnElem = screen.getByTestId(TEST_IDS.BUTTON);

    await user.type(inputElem, "testUser 5");
    await user.click(submitBtnElem);

    const accordionElements = await screen.findAllByTestId(TEST_IDS.ACCORDION);
    await user.click(accordionElements[0]);

    const repositoriesCardsElements = await screen.findAllByTestId(
      TEST_IDS.REPOSITORY_CARD,
    );

    expect(repositoriesCardsElements.length).toEqual(mockRepositories.length);
  });
});
