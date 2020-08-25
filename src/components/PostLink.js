import React, { useState, useEffect } from "react";

import { getLinkInfo } from "../api";

import { Flex, Box, Text, Image } from "rebass";

export default ({ link }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      const validUrlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      if (validUrlRegex.test(link)) {
        try {
          const { title, description, ogImage, images } = (
            await getLinkInfo(link)
          ).data;

          if (title) setTitle(title);

          if (description) setDescription(description);

          if (ogImage) setImage(ogImage);
          else if (images && images.length > 0) setImage(images[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetcher();
  }, [link]);

  return (
    <Box
      sx={{
        cursor: "pointer",
        borderRadius: "5px",
        transition: "all 100ms ease-out",
        border: "1px solid transparent",
        ":hover": {
          backgroundColor: "rgba(12, 12, 12, 0.25)",
        },
        ":active": {
          backgroundColor: "rgba(12, 12, 12, 0.4)",
          borderColor: "black",
        },
      }}
      bg="gray"
      onClick={() => window.open(link, "_blank")}
    >
      <Flex flexDirection="row">
        {image && (
          <Image
            sx={{
              height: "auto",
              maxWidth: "60px",
              opacity: 0.9,
              borderRadius: "5px 0 0 5px",
              backgroundColor: "rgba(12, 12, 12, 0.4)",
            }}
            src={image}
          />
        )}

        <Flex px={3} py={2} flexDirection="column" justifyContent="center">
          {title && (
            <Text
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              my={1}
            >
              {description}
            </Text>
          )}

          <Text
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: "#666666",
              textDecoration: "underline",
              textOverflow: "ellipsis",
            }}
          >
            {link}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
