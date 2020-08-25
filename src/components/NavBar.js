import React, { forwardRef } from "react";

import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { Box, Flex, Link as LinkButton, Text } from "rebass";

export default (props) => {
  return (
    <Box
      sx={{
        width: "100vw",
        position: "fixed",
        top: 0,
      }}
    >
      <Flex
        sx={{
          backgroundColor: "#d8e7e1",
          opacity: 0.95,
          zIndex: 2,
        }}
        px={3}
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
          <Link
            variant="nav"
            fontWeight="bold"
            fontSize="1.3rem"
            p={2}
            to="/"
            exact
            component={NavLink}
          >
            LiLab APP
          </Link>
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
    </Box>
  );
};

const NavLink = forwardRef(({ children, href, ...rest }, ref) => {
  const { push } = useHistory();
  const match = useRouteMatch(href);

  const handleClick = (evt) => {
    evt.preventDefault();
    return push(href);
  };

  return (
    <LinkButton
      sx={{
        cursor: match && match.isExact ? "default" : "pointer",
        color: match && match.isExact ? "#7f7f7f" : "black",
        ":hover": {
          color: match && match.isExact ? "#7f7f7f" : "#205b9d",
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
