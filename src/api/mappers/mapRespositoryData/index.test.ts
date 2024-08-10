import mockRepositoryData from "../../../__mocks__/getRepositories/mockRepositories.json";
import { mapRepositoryData } from "./index";

describe("mapRepositoryData", () => {
  test("should map data to correct format", () => {
    const { name, description, gitUrl, starCount } = mockRepositoryData[0];

    expect(
      mapRepositoryData({
        name,
        description,
        git_url: gitUrl,
        stargazers_count: starCount,
      }),
    ).toEqual({
      name,
      description,
      gitUrl,
      starCount,
    });
  });
});
