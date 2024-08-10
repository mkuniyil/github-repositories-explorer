import { http, HttpResponse } from "msw";
import mockUsersList from "./mockUsersList.json";

const path = "https://api.github.com/search/users";

const successHandler = http.get(path, () => HttpResponse.json(mockUsersList));

const errorHandler = http.get(path, () => {
  return new HttpResponse(null, {
    status: 404,
    statusText: "Error",
  });
});

const handlers = [successHandler, errorHandler];

export const getUsers = {
  successHandler,
  errorHandler,
  handlers,
};
