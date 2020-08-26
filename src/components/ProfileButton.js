import React, { useContext } from "react";

import { Context } from "../state";
import { SHOW_PROFILE } from "../state/types";

import { Text } from "rebass";

export default ({ id, username, ...props }) => {
  const { dispatch } = useContext(Context);

  return (
    <Text
      sx={{
        cursor: "pointer",
        fontWeight: 400,
        transition: "all 100ms ease-out",
        color: "#2687c2",
        ":hover": {
          color: "#1e6997",
        },
      }}
      {...props}
      onClick={({ target }) =>
        dispatch({
          type: SHOW_PROFILE,
          payload: {
            target,
            id,
          },
        })
      }
    >
      @{username}
    </Text>
  );
};
