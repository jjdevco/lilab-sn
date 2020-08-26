import React, { useContext } from "react";
import { Link } from "react-router-dom";

import format from "date-fns/format";

import { Context } from "../state";
import { SHOW_POST_MODAL } from "../state/types";

import { Flex, Box, Card, Image, Text } from "rebass";

import ProfileButton from "./ProfileButton";
import PostLink from "./PostLink";

export default ({ data, height, comments }) => {
  const { dispatch } = useContext(Context);

  return (
    <Card
      sx={{
        borderRadius: 10,
        flexDirection: "column",
      }}
      px={4}
      py={3}
      mx={10}
      my={3}
    >
      <Flex flexDirection="row">
        <Image
          src={data.owner.picture}
          sx={{
            height: 48,
            minWidth: 48,
            borderRadius: 9999,
            border: "2px solid darkgray",
            cursor: "pointer",
          }}
          mr={2}
        />

        <Flex
          flexDirection="column"
          sx={{ height: 48 }}
          alignItems="start"
          justifyContent="center"
        >
          <ProfileButton
            id={data.owner.id}
            username={`${data.owner.firstName}_${data.owner.lastName}`}
          />

          <Text>
            {format(new Date(data.publishDate).getTime(), "MMM io, yyyy")}.
          </Text>
        </Flex>
      </Flex>

      <Text mt={3} mb={2} fontSize="1.2rem">
        {data.text}
      </Text>

      <Box
        sx={{
          borderRadius: "5px",
        }}
      >
        <Image
          sx={{
            borderRadius: "4px",
            maxHeight: height,
            width: "100%",
            objectFit: "cover",
          }}
          src={data.image}
        />
      </Box>

      {data.link && <PostLink my={2} link={data.link} image={data.image} />}

      <Box py={2}>
        {data.tags.map((tag, index) => (
          <Box m={1} key={`${index}-${tag}`} display="inline-block">
            <Link to={`/tag/${tag}`}>#{tag}</Link>
          </Box>
        ))}
      </Box>

      <Flex
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {comments && (
          <IconButton
            onClick={() => dispatch({ type: SHOW_POST_MODAL, payload: data })}
          />
        )}

        <Flex
          sx={{
            cursor: "default",
          }}
          alignItems="center"
        >
          <i
            className="material-icons"
            style={{
              color: data.likes > 0 ? "#389681" : "gray",
            }}
          >
            {data.likes > 0 ? "favorite" : "favorite_border"}
          </i>
          <Text fontSize={12} ml={1}>
            {data.likes}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

const IconButton = ({ onClick }) => (
  <Flex
    sx={{
      height: 36,
      minWidth: 36,
      borderRadius: 9999,
      color: "black",
      cursor: "pointer",
      transition: "all 100ms ease-out",
      border: "1px solid transparent",
      ":hover": {
        backgroundColor: "rgba(12, 12, 12, 0.15)",
      },
      ":active": {
        backgroundColor: "rgba(12, 12, 12, 0.25)",
        borderColor: "darkgray",
      },
    }}
    justifyContent="center"
    alignItems="center"
    className="material-icons-outlined"
    onClick={onClick}
  >
    comment
  </Flex>
);
