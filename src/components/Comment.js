import React from "react";
import { Link } from "react-router-dom";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { Flex, Image, Text } from "rebass";

export default ({ data, ...props }) => {
  return (
    <Flex>
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

      <Flex flexDirection="column">
        <Flex
          flexDirection="row"
          justifyContent="start"
          alignItems="first baseline"
        >
          <Link to={`/user/${data.owner.id}`}>
            @{data.owner.firstName} {data.owner.lastName}
          </Link>

          <span>&nbsp;&#183;&nbsp;</span>

          <Text fontSize={12} fontWeight={300}>
            {formatDistanceToNow(new Date(data.publishDate).getTime())} ago
          </Text>
        </Flex>

        <Text mr={2}>{data.text}</Text>
      </Flex>
    </Flex>
  );
};
