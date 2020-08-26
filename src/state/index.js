import { createContext } from "react";

import { SHOW_POST_MODAL, CLOSE_POST_MODAL } from "./types";

export const Context = createContext({
  openPost: false,
  post: null,
});

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case SHOW_POST_MODAL:
      return {
        ...state,
        openPost: true,
        post: payload,
      };

    case CLOSE_POST_MODAL:
      return {
        ...state,
        openPost: false,
        post: null,
      };

    default:
      return state;
  }
};
