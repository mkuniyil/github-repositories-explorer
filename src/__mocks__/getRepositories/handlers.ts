import { http, HttpResponse } from "msw";
import mockRepositories from "./mockRepositories.json";

const successHandler = http.get("/url/1", () =>
  HttpResponse.json(mockRepositories),
);

const emptyDataHandler = http.get("/url/2", () => HttpResponse.json([]));

const errorHandler = http.get("/url/1", () => HttpResponse.error());

const handlers = [successHandler, emptyDataHandler, errorHandler];

export const getRepos = {
  successHandler,
  emptyDataHandler,
  errorHandler,
  handlers,
};
