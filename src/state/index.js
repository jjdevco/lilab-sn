import { createContext } from "react";

import {
  SHOW_POST_MODAL,
  CLOSE_POST_MODAL,
  SHOW_PROFILE,
  SET_PROFILE,
  CLOSE_PROFILE,
} from "./types";

export const Context = createContext({
  openPost: false,
  post: null,
  openProfile: false,
  profileTarget: null,
  profileId: null,
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

    case SHOW_PROFILE:
      return {
        ...state,
        openProfile: true,
        profileTarget: payload.target,
        profileId: payload.id,
      };

    case SET_PROFILE:
      return {
        ...state,
        profileData: payload.data,
      };

    case CLOSE_PROFILE:
      return {
        ...state,
        openProfile: false,
        profileTarget: null,
        profileId: null,
      };

    default:
      return state;
  }
};
