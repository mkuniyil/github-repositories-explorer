import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { UsersList } from ".";
import mockUsersList from "../../../__mocks__/getUsers/mockUsersList.json";
import * as fetchUsersHook from "../../../api/hooks/useGetUsers";
import { TEST_IDS } from "../../../constants";
import { AppContext } from "../../../providers/AppProvider";

const defaultParams = {
  isLoading: false,
  error: null,
  data: { ...mockUsersList },
};

const renderComponent = () =>
  render(
    <AppContext.Provider value={{ searchStr: "test", onSearch: vi.fn() }}>
      <UsersList />
    </AppContext.Provider>,
  );

describe("<UsersList />", () => {
  test("should show Loading when api is fetching", () => {
    vi.spyOn(fetchUsersHook, "useGetUsers").mockImplementation(() => ({
      ...defaultParams,
      isLoading: true,
    }));

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should show error when api returns error", () => {
    vi.spyOn(fetchUsersHook, "useGetUsers").mockImplementation(() => ({
      ...defaultParams,
      error: new Error(),
    }));

    renderComponent();

    expect(
      screen.getByText("Error fetching the user data"),
    ).toBeInTheDocument();
  });

  test("should display No data avialble when data is empty", async () => {
    vi.spyOn(fetchUsersHook, "useGetUsers").mockImplementation(() => ({
      ...defaultParams,
      data: { items: [], totalCount: 0 },
    }));

    renderComponent();

    const elem = await screen.findByText(
      `No users available with username "test"`,
    );

    expect(elem).toBeInTheDocument();
  });

  test("should display n number of users based on response", () => {
    vi.spyOn(fetchUsersHook, "useGetUsers").mockImplementation(() => ({
      ...defaultParams,
      data: { ...mockUsersList },
    }));

    renderComponent();

    expect(screen.getAllByTestId(TEST_IDS.ACCORDION)).toHaveLength(
      mockUsersList.items.length,
    );
  });
});
