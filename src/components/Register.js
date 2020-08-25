import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Flex, Box, Heading, Button } from "rebass";
import { Input } from "@rebass/forms";

import Parallax from "./Parrallax";

export default (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
          Register
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
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              bg="white"
              color="black"
              mb={1}
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              bg="white"
              color="black"
              mb={1}
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
              mb={1}
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <Input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="Repeat Password"
              bg="white"
              color="black"
              mb={1}
              value={repeatPassword}
              onChange={({ target: { value } }) => setRepeatPassword(value)}
            />
          </Box>

          <Box mx={2} mt={3} mb={2}>
            <RegisterButton
              disabled={!name || !email || !password || !repeatPassword}
            >
              Register
            </RegisterButton>
          </Box>

          <Box m={2}>
            <Link
              style={{
                color: "lightgray",
              }}
              to="/login"
            >
              Have an account?
            </Link>
          </Box>
        </Flex>
      </Box>
    </Parallax>
  );
};

const RegisterButton = ({ children, disabled, ...props }) => (
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
