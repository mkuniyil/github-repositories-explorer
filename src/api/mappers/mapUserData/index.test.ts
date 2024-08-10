import mockUsersData from "../../../__mocks__/getUsers/mockUsersList.json";
import { mapUsersData } from "./index";

describe("mapUsersData", () => {
  test("should map data to correct format", () => {
    const { login, repos_url } = mockUsersData.items[0];

    expect(mapUsersData({ login, repos_url })).toEqual({
      userName: login,
      reposUrl: repos_url,
    });
  });
});
