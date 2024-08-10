import { setupServer } from "msw/node";
import { getRepos } from "./getRepositories/handlers";
import { getUsers } from "./getUsers/handlers";

export const server = setupServer(...getUsers.handlers, ...getRepos.handlers);
