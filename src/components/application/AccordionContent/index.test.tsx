import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AccordionContent } from ".";
import mockRespoitories from "../../../__mocks__/getRepositories/mockRepositories.json";
import * as fetchUserRepositoriesHook from "../../../api/hooks/useGetUserRepositories";
import { TEST_IDS } from "../../../constants";

const defaultParams = { isLoading: false, error: null, data: null };

const renderComponent = () =>
  render(<AccordionContent reposUrl="testUrl" title="test" />);

describe("<AccordionContent />", () => {
  test("should show Loading when api is fetching", () => {
    vi.spyOn(
      fetchUserRepositoriesHook,
      "useGetUserRepositories",
    ).mockImplementation(() => ({
      ...defaultParams,
      isLoading: true,
    }));

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should show error when api returns error", () => {
    vi.spyOn(
      fetchUserRepositoriesHook,
      "useGetUserRepositories",
    ).mockImplementation(() => ({
      ...defaultParams,
      error: new Error(),
    }));

    renderComponent();

    expect(
      screen.getByText("Error fetching the user repositories"),
    ).toBeInTheDocument();
  });

  test("should show 'No data available' when empty data returns", () => {
    vi.spyOn(
      fetchUserRepositoriesHook,
      "useGetUserRepositories",
    ).mockImplementation(() => ({
      ...defaultParams,
      data: [],
    }));

    renderComponent();

    expect(
      screen.getByText(`No repositories available for "test"`),
    ).toBeInTheDocument();
  });

  test("should display n number of respoitory cards based on response", () => {
    vi.spyOn(
      fetchUserRepositoriesHook,
      "useGetUserRepositories",
    ).mockImplementation(() => ({
      ...defaultParams,
      data: mockRespoitories,
    }));

    renderComponent();

    expect(screen.getAllByTestId(TEST_IDS.REPOSITORY_CARD)).toHaveLength(
      mockRespoitories.length,
    );
  });
});
