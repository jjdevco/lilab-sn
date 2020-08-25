import React from "react";

import { Flex, Box } from "rebass";

export default ({ children, opacity, ...props }) => (
  <Box
    sx={{
      backgroundImage: `url(${props.src})`,
      backgroundSize: "cover",
      objectFit: "fit",
      width: "100%",
      height: "auto",
      color: "white",
      bg: "gray",
    }}
  >
    <Flex
      sx={{
        backgroundColor: `rgba(12, 12, 12, ${opacity ? opacity : 0.2})`,
      }}
      {...props}
      height="100%"
    >
      {children}
    </Flex>
  </Box>
);
