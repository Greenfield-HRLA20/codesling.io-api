import { globalController } from "../../lib/components/globals";
import { friendQuery } from "./friendsQueries";

export const friendController = globalController(
  friendQuery,
  "friendController"
);
