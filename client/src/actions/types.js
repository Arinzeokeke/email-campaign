import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  fetchUser: ["payload"],
  custom: (a, b) => ({ type: "CUSTOM", total: a + b })
});
