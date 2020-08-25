import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Flex, Box, Heading, Button } from "rebass";
import { Label, Input, Checkbox } from "@rebass/forms";

import Parallax from "./Parrallax";

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Parallax
      flexDirection="column"
      justifyContent="center"
      src="/bg_au.jpg"
      opacity={0.5}
      px={20}
    >
      <Box>
        <Heading mb={40} textAlign="center" fontSize={[5, 6]}>
          Login
        </Heading>
      </Box>

      <Box
        sx={{ maxWidth: ["400px", "620px"], width: "100%" }}
        as="form"
        py={3}
        mx="auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <Flex flexDirection="column" alignItems="center">
          <Box width={1 / 2} px={2}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              bg="white"
              color="black"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              bg="white"
              color="black"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </Box>
          <Box mx={2} mt={15} mb={10}>
            <Label htmlFor="remember" alignItems="center" px={2}>
              <Checkbox id="remember" name="remember" />
              Remember Me
            </Label>
          </Box>
          <Box m={2}>
            <LoginButton disabled={!email || !password}>Login</LoginButton>
          </Box>

          <Box m={2}>
            <Link
              style={{
                color: "lightgray",
              }}
              to="/register"
            >
              Does not have an account?
            </Link>
          </Box>
        </Flex>
      </Box>
    </Parallax>
  );
};

const LoginButton = ({ children, disabled, ...props }) => (
  <Button
    sx={{
      cursor: disabled ? "default" : "pointer",
      backgroundColor: disabled ? "gray" : "blue",
      color: disabled ? "darkgray" : "inherit",
      ":hover": {
        backgroundColor: !disabled && "darkblue",
      },
      ":active": {
        fontSize: !disabled && "0.9rem",
      },
    }}
    {...props}
  >
    {children}
  </Button>
);
