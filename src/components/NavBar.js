import React, { forwardRef } from "react";

import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { Box, Flex, Link as LinkButton, Text } from "rebass";

export default (props) => {
  return (
    <Flex
      sx={{
        backgroundColor: "#d8e7e1",
        opacity: 0.9,
        zIndex: 2,
      }}
    >
      <Flex
        sx={{
          maxWidth: ["100%", "100%", "920px"],
        }}
        flex="1 1 auto"
        p={2}
        mx="auto"
        color="black"
        bg="transparent"
        alignItems="center"
      >
        <Text p={2} fontWeight="bold" fontSize="1.3rem">
          LiLab APP
        </Text>

        <Box mx="auto" />

        <Box>
          <Link variant="nav" to="/login" component={NavLink}>
            Login
          </Link>
          <Link variant="nav" to="/register" component={NavLink}>
            Register
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

const NavLink = forwardRef(({ children, href, ...rest }, ref) => {
  const { push } = useHistory();
  let match = useRouteMatch(href);

  const handleClick = (evt) => {
    evt.preventDefault();
    return push(href);
  };

  return (
    <LinkButton
      sx={{
        cursor: match ? "default" : "pointer",
        color: match ? "#7f7f7f" : "black",
        ":hover": {
          color: match ? "#7f7f7f" : "#205b9d",
        },
      }}
      ref={ref}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </LinkButton>
  );
});
