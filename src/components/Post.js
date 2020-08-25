import React from "react";
import { Link } from "react-router-dom";

import format from "date-fns/format";

import { Flex, Box, Card, Image, Text } from "rebass";

import PostLink from "./PostLink";

export default ({ data }) => (
  <Box mx={10} my={3}>
    <Card
      sx={{
        borderRadius: 10,
      }}
      width="100%"
      maxHeight="100%"
      px={4}
      py={3}
    >
      <Box>
        <Flex flexDirection="column">
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
              <Link to={`/user/${data.owner.id}`}>
                @{data.owner.firstName} {data.owner.lastName}
              </Link>
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
              }}
              height="auto"
              src={data.image}
            />

            {data.link && <PostLink link={data.link} image={data.image} />}
          </Box>

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
            <IconButton onClick={() => console.log("clikc")} />

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
        </Flex>
      </Box>
    </Card>
  </Box>
);

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
